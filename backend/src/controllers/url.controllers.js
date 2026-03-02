import { shortenUrlSchema } from "../validators/url-validation.js";
import { ensureHttps, isValidUrl } from "../utils/validateUrl.js";
import { nanoid } from "nanoid";
import Url from "../models/url.model.js";

export const shortenLongUrlController = async (req, res, next) => {
  try {
    const { longUrl } = shortenUrlSchema.parse(req.body);

    const normalizedUrl = ensureHttps(longUrl);

    if (!isValidUrl(normalizedUrl)) {
      return res.status(400).json({
        success: false,
        message: "Invalid URL provided.",
      });
    }

    const query = req.user
      ? { longUrl: normalizedUrl, userId: req.user._id }
      : { longUrl: normalizedUrl };

    const existingUrl = await Url.findOne(query);

    if (existingUrl) {
      return res.status(200).json({
        success: true,
        message: "URL already shortened.",
        data: {
          shortCode: existingUrl.shortCode,
          shortUrl: `${process.env.APP_BASE_URL || "http://localhost:5000"}/r/${existingUrl.shortCode}`,
        },
      });
    }

    let shortCode;
    let collision;

    do {
      shortCode = nanoid(6);
      collision = await Url.findOne({ shortCode });
    } while (collision);

    const urlPayload = {
      longUrl: normalizedUrl,
      shortCode,
      ...(req.user && { userId: req.user._id }),
    };

    const newUrl = await Url.create(urlPayload);

    const shortUrl = `${process.env.APP_BASE_URL || "http://localhost:5000"}/r/${shortCode}`;

    return res.status(201).json({
      success: true,
      message: "Long URL shortened successfully.",
      data: { shortCode, shortUrl },
    });
  } catch (error) {
    next(error);
  }
};

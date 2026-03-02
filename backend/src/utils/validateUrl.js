export const isValidUrl = (url) => {
  try {
    const urlObj = new URL(url);
    return urlObj.protocol === "http:" || urlObj.protocol === "https:";
  } catch (error) {
    return false;
  }
};

export const ensureHttps = (url) => {
  const trimmedUrl = url.trim();

  if (!trimmedUrl.startsWith("http://") && !trimmedUrl.startsWith("https://")) {
    return `https://${trimmedUrl}`;
  }

  return trimmedUrl;
};

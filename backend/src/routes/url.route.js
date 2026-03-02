import { Router } from "express";
import { shortenLongUrlController } from "../controllers/url.controllers.js";

const urlRouter = Router();

urlRouter.post("/shorten", shortenLongUrlController);

export default urlRouter;

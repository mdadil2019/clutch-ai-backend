/**
 * This file defines the routes for handling streaming data in the application. 
 * It uses Express.js to create a router that can be used to manage streaming endpoints. 
 */

import express from "express";
import { handleIncomingStream } from "../controllers/stream.controller";

const router = express.Router();

router.get("/stream",handleIncomingStream)
router.get("/status/:streamId",)

export default router;
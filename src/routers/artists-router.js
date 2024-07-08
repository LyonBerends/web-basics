import express from 'express';
import {getArtists} from "../controllers/artist-controller.js";
const router = express.Router();

export default router;

router.get('', getArtists);
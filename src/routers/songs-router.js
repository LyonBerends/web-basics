import express from 'express';
import {getSongs} from "../controllers/song-controller.js";
const router = express.Router();

export default router;

router.get('', getSongs);
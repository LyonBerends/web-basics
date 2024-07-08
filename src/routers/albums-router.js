import express from 'express';
import {getAlbums} from "../controllers/album-controller.js";
const router = express.Router();

export default router;

router.get('', getAlbums);
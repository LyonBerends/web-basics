import express from 'express';
import {deleteSong, getSong, postSong, putSong} from "../controllers/song-controller.js";
const router = express.Router();

export default router;

router.get('/:id', getSong);
router.post('/', postSong);
router.put('/:query', putSong);
router.delete('/:query', deleteSong);
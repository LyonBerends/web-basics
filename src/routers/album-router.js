import express from 'express';
import {deleteAlbum, getAlbum, getAlbumSongs, postAlbum, putAlbum} from "../controllers/album-controller.js";
const router = express.Router();

export default router;

router.get('', (req, res) => {res.status(400).send({"status": 400});});
router.get('/:id', getAlbum);
router.get('/songs/:query', getAlbumSongs);
router.post('/', postAlbum);
router.put('/:query', putAlbum);
router.delete('/:query', deleteAlbum);
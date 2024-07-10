import express from 'express';
import {deleteArtist, getArtist, getArtistAlbums, postArtist, putArtist} from "../controllers/artist-controller.js";
const router = express.Router();

export default router;

router.get('', (req, res) => {res.status(400).send({"status": 400});});
router.get('/:id', getArtist);
router.get('/albums/:query', getArtistAlbums);
router.post('/', postArtist);
router.put('/:query', putArtist);
router.delete('/:query', deleteArtist);




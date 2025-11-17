import express from 'express';
import { getAllTags, getPostsByTag } from '../controllers/tagController.js';

const router = express.Router();

router.get('/', getAllTags);
router.get('/:tagName/posts', getPostsByTag);

export default router;

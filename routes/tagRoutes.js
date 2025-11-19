import express from 'express';
import { getAllTags, getPostsByTag, deleteOrphanedTags } from '../controllers/tagController.js';

const router = express.Router();

router.get('/', getAllTags);
router.get('/:tagName/posts', getPostsByTag);
router.delete('/cleanup', deleteOrphanedTags);

export default router;

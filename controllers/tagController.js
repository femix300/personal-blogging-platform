import { Post, Tag } from '../models/associations.js';
import { Op } from 'sequelize';

// Get all tags
export const getAllTags = async (req, res) => {
  try {
    const tags = await Tag.findAll();
    res.json(tags);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all posts by tag
export const getPostsByTag = async (req, res) => {
  try {
    const tagName = req.params.tagName.trim();
    const tag = await Tag.findOne({
      where: {
        name: {
          [Op.iLike]: tagName
        }
      },
      include: [{
        model: Post,
        as: 'posts',
        through: { attributes: [] }
      }]
    });

    if (!tag) {
      return res.status(404).json({ error: 'Tag not found' });
    }

    res.json(tag.posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a single post with tags
export const getPostById = async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id, {
      include: [{
        model: Tag,
        as: 'tags',
        through: { attributes: [] }
      }]
    });

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// manually delete tags that are not attached to any posts
export const deleteOrphanedTags = async (req, res) => {
  try {
    const allTags = await Tag.findAll();
    let deletedCount = 0;

    for (const tag of allTags) {
      const postCount = await tag.countPosts();
      if (postCount === 0) {
        await tag.destroy();
        deletedCount++;
      }
    }

    res.json({ message: `Deleted ${deletedCount} orphaned tags(s)`, deletedCount });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

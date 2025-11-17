import { Post, Tag } from '../models/associations.js';

// Create a new post (with tags)
export const createPost = async (req, res) => {
  try {
    const { title, content, author, publishedAt, tags } = req.body;

    const post = await Post.create({ title, content, author, publishedAt });

    if (tags && tags.length > 0) {
      const tagInstances = await Promise.all(
        tags.map(tagName =>
          Tag.findOrCreate({ where: { name: tagName.toLowerCase() } })
        )
      );

      const tagObjects = tagInstances.map(([tag]) => tag);
      await post.addTags(tagObjects);
    }

    const postWithTags = await Post.findByPk(post.id, {
      include: [{
        model: Tag,
        as: 'tags',
        through: { attributes: [] }
      }]
    });

    res.status(201).json(postWithTags);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all posts with their tags
export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.findAll({
      include: [{
        model: Tag,
        as: 'tags',
        through: { attributes: [] }
      }],
      order: [['createdAt', 'DESC']]
    });
    res.json(posts);
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

    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a post and the tags associated with it
export const updatePost = async (req, res) => {
  try {
    const { title, content, author, tags, publishedAt } = req.body;
    const post = await Post.findByPk(req.params.id);

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    await post.update({ title, content, author, publishedAt });

    if (tags) {
      const tagInstances = await Promise.all(
        tags.map(tagName =>
          Tag.findOrCreate({ where: { name: tagName } })
        )
      );

      const tagObjects = tagInstances.map(([tag]) => tag);
      await post.setTags(tagObjects);
    }

    const updatedPost = await Post.findByPk(post.id, {
      include: [{
        model: Tag,
        as: 'tags',
        through: { attributes: [] }
      }]
    });

    res.json(updatedPost);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a post
export const deletePost = async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    await post.destroy();
    res.json({ message: 'Post deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

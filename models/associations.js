import Post from './posts.js';
import Tag from './tags.js';

/**
 * Creating a junction table called 'Post Tags' for the
 * many to many relationship
 */

Post.belongsToMany(Tag, {
  through: 'PostTags',
  as: 'tags',
  foreignKey: 'postId'
});

Tag.belongsToMany(Post, {
  through: 'PostTags',
  as: 'posts',
  foreignKey: 'tagId'
});

export { Post, Tag };

import { INTEGER, STRING, TEXT, DATE } from 'sequelize';
import sequelize from './db.js';

/**
 *  This function creates the database schema
 */

const Post = sequelize.define('Post', {
  id: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true
  },

  title: {
    type: STRING(200),
    allowNull: false
  },

  content: {
    type: TEXT,
    allowNull: true
  },

  author: {
    type: STRING(200),
    allowNUll: true
  },

  publishedAt: {
    type: DATE,
    allowNull: true,
    defaultValue: null
  }

});

export default Post;

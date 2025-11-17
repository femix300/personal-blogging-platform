import { INTEGER, STRING } from 'sequelize';
import sequelize from './db.js';

const Tag = sequelize.define('Tag', {
  id: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true
  },

  name: {
    type: STRING(50),
    allowNull: false,
    unique: true
  }
},
{
  tableName: 'tags',
  timestamps: true
});

export default Tag;

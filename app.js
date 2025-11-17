import express from 'express';
import sequelize from './models/db.js';
import './models/associations.js';
import postRoutes from './routes/postRoutes.js';
import tagRoutes from './routes/tagRoutes.js';

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/posts', postRoutes);
app.use('/tags', tagRoutes);

// test route to see if the api is running
app.get('/', (req, res) => {
  res.json({ message: 'Blog API is running' });
});

// sync database
sequelize.sync({ alter: true })
  .then(() => console.log('Database synced'))
  .catch(err => console.log('Sync error:', err));

export default app;

# Personal Blogging Platform API

A robust, production-ready RESTful API built with Node.js, Express, and PostgreSQL. Features a well-architected MVC pattern, complex database relationships, and comprehensive CRUD operations for managing blog posts with tagging functionality.

## 🚀 Features

- **RESTful API Design** - Clean, intuitive endpoints following REST principles
- **MVC Architecture** - Organized codebase with separation of concerns
- **Advanced Database Relationships** - Many-to-many relationship between posts and tags
- **PostgreSQL Integration** - Production-grade relational database with Sequelize ORM
- **Automatic Tag Management** - Smart tag creation and association
- **Query Optimization** - Efficient database queries with eager loading
- **Error Handling** - Error handling and validation
- **ES6 Modules** - Modern JavaScript syntax throughout

## 🛠️ Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** PostgreSQL
- **ORM:** Sequelize
- **Environment Management:** dotenv

## 📋 Prerequisites

Before running this project, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [PostgreSQL](https://www.postgresql.org/) (v12 or higher)
- npm (comes with Node.js)

## 🏗️ Project Structure

```
personal-blogging-platform/
├── models/
│   ├── db.js              # Database configuration and connection
│   ├── Post.js            # Post model definition
│   ├── Tag.js             # Tag model definition
│   └── associations.js    # Model relationships (many-to-many)
├── controllers/
│   ├── postController.js  # Post business logic
│   └── tagController.js   # Tag business logic
├── routes/
│   ├── postRoutes.js      # Post API endpoints
│   └── tagRoutes.js       # Tag API endpoints
├── app.js                 # Express app configuration
├── server.js              # Server entry point
├── .env                   # Environment variables (not in repo)
├── package.json           # Dependencies and scripts
└── README.md             # Project documentation
```

## 🔧 Installation & Setup

### 1. Clone the repository

```bash
git clone <repository-url>
cd personal-blogging-platform
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up PostgreSQL

**Access PostgreSQL:**
```bash
sudo -u postgres psql
```

**Create the database:**
```sql
CREATE DATABASE myblog;
\q
```

### 4. Configure environment variables

Create a `.env` file in the root directory:

```env
DB_NAME=myblog
DB_USER=postgres
DB_PASSWORD=your_password
DB_HOST=localhost
DB_DIALECT=postgres
PORT=3000
```

**⚠️ Important:** Replace `your_password` with your actual PostgreSQL password.

### 5. Start the server

**Production mode:**
```bash
npm start
```

**Development mode (with auto-restart):**
```bash
npm run dev
```

The server will start on `http://localhost:3000` and automatically sync the database schema.

## 📡 API Endpoints

### Posts

| Method | Endpoint | Description | Request Body |
|--------|----------|-------------|--------------|
| POST | `/posts` | Create a new post | `{ title, content, author, publishedAt, tags: [] }` |
| GET | `/posts` | Get all posts | - |
| GET | `/posts/:id` | Get a single post | - |
| PUT | `/posts/:id` | Update a post | `{ title, content, author, publishedAt, tags: [] }` |
| DELETE | `/posts/:id` | Delete a post | - |

### Tags

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/tags` | Get all tags |
| GET | `/tags/:tagName/posts` | Get all posts with a specific tag |

## 🧪 Testing the API

### Using cURL

**1. Create a post with tags:**
```bash
curl -X POST http://localhost:3000/posts \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Getting Started with Node.js",
    "content": "Node.js is a powerful JavaScript runtime...",
    "author": "John Doe",
    "tags": ["nodejs", "javascript", "backend"]
  }'
```

**2. Get all posts:**
```bash
curl http://localhost:3000/posts
```

**3. Get a specific post:**
```bash
curl http://localhost:3000/posts/1
```

**4. Update a post:**
```bash
curl -X PUT http://localhost:3000/posts/1 \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Updated: Getting Started with Node.js",
    "tags": ["nodejs", "tutorial"]
  }'
```

**5. Get all posts with a specific tag:**
```bash
curl http://localhost:3000/tags/nodejs/posts
```

**6. Get all tags:**
```bash
curl http://localhost:3000/tags
```

**7. Delete a post:**
```bash
curl -X DELETE http://localhost:3000/posts/1
```

### Using Postman

1. Import the following collection or create requests manually
2. Set base URL to `http://localhost:3000`
3. For POST/PUT requests, set headers: `Content-Type: application/json`
4. Use the endpoint examples above

## 🎯 Key Implementation Details

### Database Schema

The application implements a many-to-many relationship between Posts and Tags:

- **Posts Table:** Stores blog post information (id, title, content, author, publishedAt, timestamps)
- **Tags Table:** Stores unique tag names (id, name, timestamps)
- **PostTags Junction Table:** Links posts to tags (postId, tagId, timestamps)

### Sequelize ORM Features

- **Model Associations:** Implements `belongsToMany` for many-to-many relationships
- **Eager Loading:** Uses `include` to fetch related data in a single query
- **Auto-sync:** Database schema automatically created/updated on startup
- **Transaction Safety:** Built-in transaction support for data integrity

### Smart Tag Management

- Tags are automatically created if they don't exist (`findOrCreate`)
- Duplicate tags are prevented with unique constraints
- Tags can be reused across multiple posts
- Unused tags remain in database for consistency

## 🔒 Database Connection Handling

The application uses connection pooling for optimal performance:

```javascript
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: 'postgres',
  logging: false, // Set to console.log to see SQL queries
});
```

Connection is tested on startup and errors are logged to console.

## 📊 Sample Data Structure

**Post Response Example:**
```json
{
  "id": 1,
  "title": "Getting Started with Node.js",
  "content": "Node.js is a powerful JavaScript runtime...",
  "author": "John Doe",
  "createdAt": "2025-11-17T10:30:00.000Z",
  "updatedAt": "2025-11-17T10:30:00.000Z",
  "tags": [
    {
      "id": 1,
      "name": "nodejs",
      "createdAt": "2025-11-17T10:30:00.000Z",
      "updatedAt": "2025-11-17T10:30:00.000Z"
    },
    {
      "id": 2,
      "name": "javascript",
      "createdAt": "2025-11-17T10:30:00.000Z",
      "updatedAt": "2025-11-17T10:30:00.000Z"
    }
  ]
}
```

## 🚀 Future Enhancements

- [ ] User authentication and authorization (JWT)
- [ ] Comment system for posts
- [ ] Pagination and filtering
- [ ] Full-text search functionality
- [ ] Image upload for posts
- [ ] Rate limiting and API security
- [ ] Comprehensive unit and integration tests
- [ ] API documentation with Swagger/OpenAPI
- [ ] Caching layer (Redis)
- [ ] Docker containerization



## 👤 Author

**Your Name**
- GitHub: [@femix300](https://github.com/femix300)
- Instagram: [ajimoti_peter](https://www.instagram.com/ajimoti_peter/)

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](issues-url).

---

**Note:** This is a portfolio project demonstrating backend development skills including RESTful API design, database modeling, ORM usage, and clean code architecture.

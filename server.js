import app from './app.js';
import http from 'http';
// import fs from 'fs';
// import https from 'https';

const PORT = process.env.PORT || 3000;

// Load certificate files
// const options = {
//     key: fs.readFileSync('./key.pem'),
//     cert: fs.readFileSync('./cert.pem')
// };

const server = http.createServer(app);
// const server = https.createServer(options, app);

server.listen(PORT, () => {
  console.log(`Http Server running on port ${PORT}`);
});

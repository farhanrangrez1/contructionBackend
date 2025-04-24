const express = require('express');
const { DBconnect } = require('./Config/db_config');
const routerapi = require('./routerapi');
const path = require('path');
const colors = require('colors');
const cors = require('cors');
const fileUpload = require('express-fileupload');
require('dotenv').config();
const session = require('express-session');

// Create Express app
const app = express();
const PORT = process.env.PORT || 3000;

// ✅ Connect to the database
DBconnect();

// ✅ Safe temp dir path for file uploads (cross-platform)
const tempDir = path.join(__dirname, 'tmp');

// ✅ CORS setup (Allow all domains or restrict it)
app.use(cors({
  origin: "*", // Or restrict to specific domain
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// ✅ Parse JSON and large payloads (for handling large files or data)
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// ✅ File upload middleware (Using express-fileupload)
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: tempDir,
    limits: { fileSize: 50 * 1024 * 1024 }, // 50MB
    safeFileNames: true,
    preserveExtension: 4,
    abortOnLimit: true,
    limitHandler: function(req, res, next) {
      res.status(400).send('File size limit exceeded');
    }
  }));
  
// ✅ Static file directories (serving uploaded files)
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'upload')));

// ✅ Session middleware (for session management)
app.use(session({
  secret: 'your_secret_key', // 🔒 Replace with strong secret in production
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 86400000 } // 1 day
}));

// ✅ Sample route (Hello World)
app.post('/', (req, res) => {
  res.send('Hello World');
});

// ✅ API Router (Your API routes)
app.use(routerapi);

// ✅ Static file handling for uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ✅ Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

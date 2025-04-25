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


DBconnect();

const tempDir = path.join(__dirname, 'tmp');

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));


app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: tempDir,
    limits: { fileSize: 50 * 1024 * 1024 }, 
    safeFileNames: true,
    preserveExtension: 4,
    abortOnLimit: true,
    limitHandler: function(req, res, next) {
      res.status(400).send('File size limit exceeded');
    }
  }));
  
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'upload')));

app.use(session({
  secret: 'your_secret_key', 
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 86400000 } 
}));

app.post('/', (req, res) => {
  res.send('Hello World');
});

app.use(routerapi);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

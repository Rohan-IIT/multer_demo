const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(express.static('uploads'));

// Multer configuration for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  }
});

const upload = multer({ storage });

// Routes
app.get('/', (req, res) => {
  const files = fs.readdirSync('uploads');
  res.render('index');
});

app.post('/upload', upload.single('file'), (req, res) => {
  // File upload
  console.log("file uploaded", req.body);
  res.redirect('/');
});


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
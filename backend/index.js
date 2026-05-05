const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/files', require('./routes/fileRoutes'));

app.get('/', (req, res) => {
  res.send('active');
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error'
  });
});

const port = process.env.PORT || 5000;
const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/shnoor-cloud';

mongoose.connect(uri).then(() => {
  console.log('db active');
  app.listen(port, () => {
    console.log('server active');
  });
}).catch((err) => {
  console.error(err);
});
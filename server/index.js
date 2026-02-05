const express = require('express');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// MongoDB Schema
const counterSchema = new mongoose.Schema({
  name: { type: String, default: 'global' },
  count: { type: Number, default: 0 }
});
const Counter = mongoose.model('Counter', counterSchema);

// RAM "Database"
let ramCounter = 0;

// API Endpoints
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from Express (with MongoDB)!' });
});

// RAM Counter Endpoints
app.get('/api/counter', (req, res) => {
  res.json({ count: ramCounter });
});

app.post('/api/counter/increment', (req, res) => {
  ramCounter++;
  res.json({ count: ramCounter });
});

// MongoDB Counter Endpoints
app.get('/api/persistent-counter', async (req, res) => {
  let doc = await Counter.findOne({ name: 'global' });
  if (!doc) {
    doc = await Counter.create({ name: 'global', count: 0 });
  }
  res.json({ count: doc.count });
});

app.post('/api/persistent-counter/increment', async (req, res) => {
  let doc = await Counter.findOneAndUpdate(
    { name: 'global' },
    { $inc: { count: 1 } },
    { new: true, upsert: true }
  );
  res.json({ count: doc.count });
});

// Serve frontend in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/dist')));

  // Catch-all route for SPA: must be the last route
  app.use((req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist', 'index.html'));
  });
}

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is starting in ${process.env.NODE_ENV} mode`);
  console.log(`Listening on 0.0.0.0:${PORT}`);
});

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import translationsRoutes from './routes/translation.js';

const app = express();

app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/translations', translationsRoutes);

const CONNECTION_URL = '';
const PORT = process.env.PORT || 5000;

mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server Running on Port: http://localhost:${PORT}`)
    )
  )
  .catch((error) => console.log(`${error} failed to connect`));

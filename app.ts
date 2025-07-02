import 'dotenv/config';

import path from 'path';
import express from 'express';
import mongoose from 'mongoose';

import productRouter from './routes/products';

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(process.cwd(), 'public')));
app.use(express.json({ limit: '2mb' }));

app.get('/', (req, res, next) => {
  res.json('Hello World');
});

app.use(productRouter);

const dbName =
  process.env.NODE_ENV === 'production'
    ? 'inventory-warung'
    : 'inventory-warung-developmnet';

mongoose
  .connect(process.env.MONGODB_URI as string, { dbName })
  .then(() => {
    console.log('Connected to mongodb!');

    app.listen(3004);
  })
  .catch((err) => console.log(err));

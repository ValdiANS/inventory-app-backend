import path from 'path';
import express from 'express';

import productRoutes from './routes/product';

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(process.cwd(), 'public')));

app.get('/', (req, res, next) => {
  res.json('Hello World');
});

app.use(productRoutes);

app.listen(3004);

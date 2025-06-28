import express from 'express';
import {
  addProduct,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct,
} from '../controller/productController';

const productRouter = express.Router();

productRouter.get('/product/:productId', getProduct);
productRouter.get('/products', getProducts);

productRouter.post('/product', addProduct);

productRouter.put('/product/:productId', updateProduct);

productRouter.delete('/product/:productId', deleteProduct);

export default productRouter;

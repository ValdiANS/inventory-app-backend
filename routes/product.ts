import express from 'express';

const productRouter = express.Router();

productRouter.get('/product', (req, res, next) => {
  res.json({
    error: false,
    message: 'Product successfully fetched!',
    data: [],
  });
});

productRouter.post('/product', (req, res, next) => {
  res.json({
    error: false,
    message: 'Product successfully posted!',
    data: {},
  });
});

productRouter.put('/product/:productId', (req, res, next) => {
  res.json({
    error: false,
    message: 'Product successfully updated!',
    newData: {},
    oldData: {},
  });
});

productRouter.delete('/product/:productId', (req, res, next) => {
  const { productId } = req.params as { productId: string };

  res.json({
    error: false,
    message: `Successfully delete product with product ID: ${productId}`,
    deletedData: {},
  });
});

export default productRouter;

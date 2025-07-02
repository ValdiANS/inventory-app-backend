import { RequestHandler } from 'express';
import { ObjectId } from 'mongodb';
import { asyncHandler } from '../util/utils';
import Products, { IProduct } from '../models/products';

export const getProduct: RequestHandler = asyncHandler(
  async (req, res, next) => {
    const { productId } = req.params as { productId: string };

    res.json({
      error: false,
      message: `Product successfully fetched! Product ID: ${productId}`,
      data: {},
    });
  }
);

export const getProducts: RequestHandler = asyncHandler(
  async (req, res, next) => {
    res.json({
      error: false,
      message: 'Products successfully fetched!',
      data: [],
    });
  }
);

export const addProduct: RequestHandler = asyncHandler(
  async (req, res, next) => {
    const { name, price, description } = req.body as Omit<IProduct, 'images'>;

    try {
      await Products.createProductAndPriceHistory({ name, price, description });
    } catch (error) {
      console.log('Error while adding product!');

      if (error instanceof Error) {
        console.log(error.message);

        res.status(400).json({
          error: true,
          message: error.message,
          data: req.body,
        });
      }
    }

    res.json({
      error: false,
      message: 'Product successfully posted!',
      data: {},
    });
  }
);

export const updateProduct: RequestHandler = asyncHandler(
  async (req, res, next) => {
    const { name, price, description } = req.body as Omit<IProduct, 'images'>;
    const { productId } = req.params as { productId: string };

    try {
      const product = await Products.findById(productId);

      await Products.updateProductAndCreatePriceHistory(
        {
          _id: new ObjectId(productId),
          name,
          price: parseFloat(String(price)),
          description,
        },
        product as IProduct
      );
    } catch (error) {
      console.log('Error while adding product!');

      if (error instanceof Error) {
        console.log(error.message);

        res.status(400).json({
          error: true,
          message: error.message,
          data: req.body,
        });
      }
    }

    res.json({
      error: false,
      message: 'Product successfully updated!',
      newData: {},
      oldData: {},
    });
  }
);

export const deleteProduct: RequestHandler = asyncHandler(
  async (req, res, next) => {
    const { productId } = req.params as { productId: string };

    res.json({
      error: false,
      message: `Successfully delete product with product ID: ${productId}`,
      deletedData: {},
    });
  }
);

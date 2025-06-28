import { RequestHandler } from 'express';
import { asyncHandler } from '../util/utils';

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
    res.json({
      error: false,
      message: 'Product successfully posted!',
      data: {},
    });
  }
);

export const updateProduct: RequestHandler = asyncHandler(
  async (req, res, next) => {
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

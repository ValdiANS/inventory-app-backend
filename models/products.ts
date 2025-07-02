import { Model, model, Schema, startSession } from 'mongoose';
import { COLLECTION_NAMES } from '../util/config';
import PriceHistories from './priceHistories';
import { WithId } from 'mongodb';

interface IProduct {
  name: string;
  price: number;
  description: string;
  images?: { name: string; url: string; createdAt: Date }[];
}

interface IProductModel extends Model<IProduct> {
  createProductAndPriceHistory(product: IProduct): Promise<void>;
  updateProductAndCreatePriceHistory(
    newProductData: WithId<IProduct>,
    oldProductData: IProduct
  ): Promise<void>;
}

const productSchema = new Schema<IProduct, IProductModel>(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String },
    images: [
      {
        name: { type: String, required: true },
        url: { type: String, required: true },
        createdAt: { type: Date, required: true, default: Date.now() },
      },
    ],
  },
  {
    timestamps: true,

    statics: {
      async createProductAndPriceHistory(product: IProduct) {
        const session = await startSession();

        try {
          const [newProduct] = await this.create([product], { session });

          const [newPriceHistory] = await PriceHistories.create(
            [
              {
                price: newProduct.price,
                productId: newProduct._id,
              },
            ],
            { session }
          );
        } catch (error) {
          if (error instanceof Error) {
            console.log(error.message);
          }

          await session.abortTransaction();
        } finally {
          await session.endSession();
        }
      },

      async updateProductAndCreatePriceHistory(
        newProductData: WithId<IProduct>,
        oldProductData: IProduct
      ) {
        const session = await startSession();

        console.log({
          newProductDataPrice: newProductData.price,
          oldProductDataPrice: oldProductData.price,
        });

        try {
          const isNewPrice = newProductData.price !== oldProductData.price;

          console.log(isNewPrice);

          if (isNewPrice) {
            const [newPriceHistory] = await PriceHistories.create(
              [
                {
                  price: newProductData.price,
                  productId: newProductData._id,
                },
              ],
              { session }
            );

            console.log({ newPriceHistory: newPriceHistory });
          }

          const updatedProduct = await this.findOneAndUpdate(
            { _id: newProductData._id },
            newProductData
          );

          console.log({ updatedProduct: updatedProduct });
        } catch (error) {
          if (error instanceof Error) {
            console.log(error.message);
          }

          await session.abortTransaction();
        } finally {
          await session.endSession();
        }
      },
    },
  }
);

const Products = model<IProduct, IProductModel>(
  COLLECTION_NAMES.PRODUCTS,
  productSchema
);

export { IProduct };
export default Products;

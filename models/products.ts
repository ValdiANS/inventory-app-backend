import { model, Schema } from 'mongoose';
import { COLLECTION_NAMES } from '../util/config';

interface IProduct {
  name: string;
  price: number;
  thumbnailUrl: string;
  description: string;
  images: { name: string; url: string; createdAt: Date }[];
}

const productSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    thumbnailUrl: { type: String, required: false },
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
  }
);

const Products = model<IProduct>(COLLECTION_NAMES.PRODUCTS, productSchema);

export { IProduct };
export default Products;

import { ObjectId } from 'mongodb';
import { model, Schema } from 'mongoose';
import { COLLECTION_NAMES } from '../util/config';

interface IPriceHistory {
  productId: ObjectId;
  price: number;
}

const priceHistorySchema = new Schema<IPriceHistory>(
  {
    productId: {
      type: Schema.ObjectId,
      ref: COLLECTION_NAMES.PRODUCTS,
      required: true,
    },

    price: { type: Number, required: true },
  },
  { timestamps: true }
);

const PriceHistories = model<IPriceHistory>(COLLECTION_NAMES.PRICE_HISTORIES);

export { IPriceHistory };
export default PriceHistories;

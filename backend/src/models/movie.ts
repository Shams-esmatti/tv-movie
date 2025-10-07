import mongoose, { Schema } from "mongoose";

export interface IMovie extends Document {
  title: string;
  genre: mongoose.Types.ObjectId;
  numberInStock: number;
  dailyRentalRate: number;
}

const movieSchema = new Schema<IMovie>({
  title: { type: String, required: true },
  genre: { type: Schema.Types.ObjectId, ref: "Genre", required: true },
  numberInStock: { type: Number, default: 0 },
  dailyRentalRate: { type: Number, default: 0 },
});

export default mongoose.model<IMovie>("Movie", movieSchema);

import mongoose from "mongoose";

export interface IGenre {
  name: string;
}

const genreSchema = new mongoose.Schema<IGenre>({
  name: { type: String, required: true, minlength: 3, maxlength: 50 },
});

export default mongoose.model<IGenre>("Genre", genreSchema);

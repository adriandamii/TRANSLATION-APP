import mongoose from 'mongoose';

const translationSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    office: { type: String, required: true },
    numberOfPages: { type: String, required: true },
    pagePrice: { type: String, required: true },
    translated: { type: Boolean, default: 'false' },
    month: { type: Number, default: new Date().getMonth() + 1 },
    date: { type: Date, default: new Date() },
  },
  {
    timestamps: true,
  }
);

var Translation = mongoose.model('Translation', translationSchema);

export default Translation;

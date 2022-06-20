import mongoose from 'mongoose';

const translationSchema = mongoose.Schema({
  name: { type: String, required: true },
  office: { type: String, required: true },
  numberOfPages: { type: String, required: true },
  pagePrice: { type: String, required: true },
});

var Translation = mongoose.model('Translation', translationSchema);

export default Translation;

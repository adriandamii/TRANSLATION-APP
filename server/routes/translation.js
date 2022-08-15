import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Translation from '../models/translation.js';
import mongoose from 'mongoose';

const router = express.Router();

router.get(
  '/',
  expressAsyncHandler(async (req, res) => {
    const name = req.query.name || '';
    const office = req.query.office || '';
    const translated = req.query.translated || '';
    const month =
      req.query.month && Number(req.query.month) !== 0
        ? Number(req.query.month)
        : 0;
    const nameFilter = name ? { name: { $regex: name, $options: 'i' } } : {};
    const officeFilter = office ? { office } : {};
    const translatedFilter = translated ? { translated } : {};
    const monthFilter = month ? { month: { $eq: month } } : {};

    const count = await Translation.countDocuments({
      ...nameFilter,
      ...officeFilter,
      ...translatedFilter,
      ...monthFilter,
    });

    const translations = await Translation.find({
      ...nameFilter,
      ...officeFilter,
      ...translatedFilter,
      ...monthFilter,
    })

    res.send({ translations, count });
  })
);

router.get(
  '/offices',
  expressAsyncHandler(async (req, res) => {
    const offices = await Translation.find().distinct('office');
    res.send(offices);
  })
);

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const translation = await Translation.findById(id);
    res.status(200).json(translation);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, office, pagePrice, numberOfPages } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  const updatedTranslation = {
    name,
    office,
    pagePrice,
    numberOfPages,
    _id: id,
  };
  await Translation.findByIdAndUpdate(id, updatedTranslation, { new: true });
  res.json(updatedTranslation);
});

router.get('/complete/:id', async (req, res) => {
  const translation = await Translation.findById(req.params.id);
  translation.translated = !translation.translated;
  translation.save();
  res.json(translation);
});

router.post('/', async (req, res) => {
  const { name, office, pagePrice, numberOfPages } = req.body;
  const newTranslation = new Translation({
    name,
    office,
    pagePrice,
    numberOfPages,
  });
  try {
    await newTranslation.save();
    res.status(201).json(newTranslation);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No office with id: ${id}`);
  await Translation.findByIdAndRemove(id);
  res.json({ message: 'Post deleted successfully.' });
});

export default router;

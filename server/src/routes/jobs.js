import { Router } from 'express';
import Job from '../models/Job.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();
router.use(requireAuth);

router.get('/', async (req, res, next) => {
  try {
    const { search = '', status } = req.query;
    const query = { userId: req.user.id };
    if (status && status !== 'all') query.status = status;
    if (search) query.$or = [{ company: { $regex: search, $options: 'i' } }, { position: { $regex: search, $options: 'i' } }, { location: { $regex: search, $options: 'i' } }];
    res.json(await Job.find(query).sort({ updatedAt: -1 }));
  } catch (error) { next(error); }
});

router.post('/', async (req, res, next) => {
  try { res.status(201).json(await Job.create({ ...req.body, userId: req.user.id })); } catch (error) { next(error); }
});

router.get('/:id', async (req, res, next) => {
  try { const job = await Job.findOne({ _id: req.params.id, userId: req.user.id }); if (!job) return res.status(404).json({ message: 'Application not found.' }); res.json(job); } catch (error) { next(error); }
});

router.put('/:id', async (req, res, next) => {
  try { const job = await Job.findOneAndUpdate({ _id: req.params.id, userId: req.user.id }, req.body, { new: true, runValidators: true }); if (!job) return res.status(404).json({ message: 'Application not found.' }); res.json(job); } catch (error) { next(error); }
});

router.delete('/:id', async (req, res, next) => {
  try { const job = await Job.findOneAndDelete({ _id: req.params.id, userId: req.user.id }); if (!job) return res.status(404).json({ message: 'Application not found.' }); res.status(204).end(); } catch (error) { next(error); }
});
export default router;

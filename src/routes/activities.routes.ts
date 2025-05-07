import express from 'express';
import {
  getActivities,
  getActivity,
  createActivity,
  updateActivity,
  deleteActivity
} from '../controllers/activities.controller';
import { validateBody } from '../middleware/validation.middleware';
import { createActivitySchema, updateActivitySchema } from '../validations/activity.validation';
import { protect } from '../middleware/auth.middleware';

const router = express.Router();

// @route   GET /api/activities
router.get('/', getActivities);

// @route   GET /api/activities/:id
router.get('/:id', getActivity);

// @route   POST /api/activities
router.post(
  '/',
  protect,
  validateBody(createActivitySchema),
  createActivity
);

// @route   PUT /api/activities/:id
router.put(
  '/:id',
  protect,
  validateBody(updateActivitySchema),
  updateActivity
);

router.post('/createActivity' , protect , createActivity );

// @route   DELETE /api/activities/:id
router.delete('/:id', protect, deleteActivity);

export default router;
import { Request, Response } from 'express';
import Activity from '../models/Activity.model';
import { CreateActivityInput, UpdateActivityInput } from '../validations/activity.validation';

// @desc    Get all activities
// @route   GET /api/activities
// @access  Public
export const getActivities = async (req: Request, res: Response) => {
  try {
    const activities = await Activity.find()
      .sort({ date: 1, time: 1 }) // Sort by date and time
      .select('title description location date time');

    res.json({
      success: true,
      count: activities.length,
      data: activities
    });
  } catch (error: any) {
    console.error('Get activities error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Get single activity
// @route   GET /api/activities/:id
// @access  Public
export const getActivity = async (req: Request, res: Response) => {
  try {
    const activity = await Activity.findById(req.params.id);

    if (!activity) {
      return res.status(404).json({
        success: false,
        message: 'Activity not found'
      });
    }

    res.json({
      success: true,
      data: activity
    });
  } catch (error: any) {
    console.error('Get activity error:', error);
    
    // Check if error is due to invalid ID format
    if (error.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        message: 'Activity not found'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Create new activity
// @route   POST /api/activities
// @access  Private/Admin
export const createActivity = async (req: Request, res: Response) => {
  try {
    const activityData: CreateActivityInput = req.body;
    
    // @ts-ignore - Add creator ID if available
    if (req.user && req.user._id) {
      // @ts-ignore
      activityData.createdBy = req.user._id;
    }

    const activity = await Activity.create(activityData);

    res.status(201).json({
      success: true,
      data: activity
    });
  } catch (error: any) {
    console.error('Create activity error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Update activity
// @route   PUT /api/activities/:id
// @access  Private/Admin
export const updateActivity = async (req: Request, res: Response) => {
  try {
    const updateData: UpdateActivityInput = req.body;
    
    let activity = await Activity.findById(req.params.id);

    if (!activity) {
      return res.status(404).json({
        success: false,
        message: 'Activity not found'
      });
    }

    activity = await Activity.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      data: activity
    });
  } catch (error: any) {
    console.error('Update activity error:', error);
    
    // Check if error is due to invalid ID format
    if (error.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        message: 'Activity not found'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Delete activity
// @route   DELETE /api/activities/:id
// @access  Private/Admin
export const deleteActivity = async (req: Request, res: Response) => {
  try {
    const activity = await Activity.findById(req.params.id);

    if (!activity) {
      return res.status(404).json({
        success: false,
        message: 'Activity not found'
      });
    }

    await activity.deleteOne();

    res.json({
      success: true,
      message: 'Activity removed'
    });
  } catch (error: any) {
    console.error('Delete activity error:', error);
    
    // Check if error is due to invalid ID format
    if (error.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        message: 'Activity not found'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};
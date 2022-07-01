const express = require('express');
const activitiesRouter = express.Router();

const {
    // getAllActivities,
    // createActivity,
    // updateActivity,
    // getPublicRoutinesByActivity,
} = require("../db");

// GET /api/activities/:activityId/routines

// GET /api/activities
activitiesRouter.get("/", async (req, res, next) => {
    try {
      const allActivities = await getAllActivities();
  
      res.send(allActivities);
    } catch (error) {
      next(error);
    }
  });
// POST /api/activities

// PATCH /api/activities/:activityId

module.exports = activitiesRouter;

const express = require('express');
const activitiesRouter = express.Router();

const {
    getAllActivities,
    createActivity,
    updateActivity,
    getPublicRoutinesByActivity,
} = require("../db");

// GET /api/activities/:activityId/routines
activitiesRouter.get("/:activityId/routines", async (req, res, next) => {
  const id  = req.params.activityId
  
  try {
    const newActivity = await getPublicRoutinesByActivity({ id });
    res.send(newActivity);
  } catch (error) {
    next(error);
  }
})




// GET /api/activities
activitiesRouter.get("/", async (req, res, next) => {
    try {
      const activities = await getAllActivities();
      res.send(activities);
    } catch (error) {
      next(error);
    }
  });
  
// POST /api/activities
activitiesRouter.post("/", async (req, res, next) => {
    const { name, description } = req.body;
    try {
      const newActivity = await createActivity({ name, description });
      res.send(newActivity);
    } catch (error) {
      next(error);
    }
  });
// PATCH /api/activities/:activityId
activitiesRouter.patch("/:activityId", async (req, res, next) => {
  const { name, description } = req.body;
  const id  = req.params.activityId

  try {
    const newActivity = await updateActivity({ id , name, description });
    res.send(newActivity);
  } catch (error) {
    next(error);
  }
})


module.exports = activitiesRouter;

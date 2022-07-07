const express = require("express");
const routineActivitiesRouter = express.Router();
const {
    getRoutineActivityById,
    destroyRoutineActivity,
    updateRoutineActivity,
    getRoutineById
} = require('../db');


routineActivitiesRouter.patch("/:routineActivityId/", async (req, res, next) => {
    const { count, duration } = req.body;
    const id = req.params.routineActivityId;
    try {
      const oldRoutineActivity = await getRoutineActivityById(id);
      const newRoutine = await getRoutineById(oldRoutineActivity.routineId)
      if(req.user.id != newRoutine.creatorId) {
        res.status(500).send(err)
      } else {
      const newRoutineActivity = await updateRoutineActivity({ id, count, duration });
      res.send(newRoutineActivity);
      }

    } catch (error) {
      next(error);
    }
});


routineActivitiesRouter.delete("/:routineActivityId/", async (req, res, next) => {
  const id = req.params.routineActivityId;
  try {
    const oldRoutineActivity = await getRoutineActivityById(id);
    const newRoutine = await getRoutineById(oldRoutineActivity.routineId)
    if(req.user.id != newRoutine.creatorId) {
      res.status(500).send(err)
    }
    const newRoutineActivity = await destroyRoutineActivity(id);
    res.send(newRoutineActivity);
  } catch (error) {
    next(error);
  }
});

module.exports = routineActivitiesRouter;
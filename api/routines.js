const express = require("express");
const routinesRouter = express.Router();

const {
  createRoutine,
  getRoutineById,
  updateRoutine,
  destroyRoutine,
  getAllPublicRoutines,
  addActivityToRoutine,
  getRoutineActivitiesByRoutine,
} = require("../db");
// POST, POST /routines/:routineId/activities, PATCH /routine_activities/:routineActivityIdm, DELETE /routine_activities/:routineActivityId 
//(**) check creatorId === req.user.id userId

routinesRouter.get("/", async (req, res, next) => {
  try {
    const allPublicRoutines = await getAllPublicRoutines();

    res.send(allPublicRoutines);
  } catch (error) {
    next(error);
  }
});

// routinesRouter.post("/:creatorId", async (req, res, next) => {
//   const { isPublic, name, goal } = req.body;
//   const { creatorId } = req.user;

//   try {
//     const newRoutine = await createRoutine({ creatorId, isPublic, name, goal });

//     res.send(newRoutine);
//   } catch (error) {
//     next(error);
//   }
// });

routinesRouter.patch("/:routineId", async (req, res, next) => {
  const { isPublic, name, goal } = req.body;
  const id = req.params.routineId;

  try {
    const newRoutine = await updateRoutine({ id, isPublic, name, goal });

    res.send(newRoutine);
  } catch (error) {
    next(error);
  }
});

routinesRouter.delete("/:routineId", async (req, res, next) => {
  const id = req.params.routineId;
  try {
    const newRoutine = await destroyRoutine(id);

    res.send(newRoutine);
  } catch (error) {
    next(error);
  }
});

routinesRouter.post("/:routineId/activities", async (req, res, next) => {
  const {routineId, activityId, count, duration } = req.body;
  const id = req.params.routineId;

  try {
    const newRoutineActivity = await addActivityToRoutine({ routineId: id, activityId, count, duration });
    if(!newRoutineActivity) {
      res.status(500).send(err)
    }
    else 
      res.send(newRoutineActivity);
  } catch (error) {
    next(error);
  }
});

module.exports = routinesRouter
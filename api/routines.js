const express = require('express');
const routinesRouter = express.Router();

const {
    // createRoutine,
    // getRoutineById,
    // updateRoutine,
    // destroyRoutine,
    // getAllPublicRoutines,
    // addActivityToRoutine,
    // getRoutineActivitiesByRoutine,
  } = require("../db");
// GET /api/routines
routinesRouter.get("/", async (req, res, next) => {
    try {
      const allPublicRoutines = await getAllPublicRoutines();
  
      res.send(allPublicRoutines);
    } catch (error) {
      next(error);
    }
  });
// POST /api/routines
routinesRouter.post("/",  async (req, res, next) => {
    const { isPublic, name, goal } = req.body;
    const { id: creatorId } = req.user;
  
    try {
      const newRoutine = await createRoutine({ creatorId, isPublic, name, goal });
  
      res.send(newRoutine);
    } catch (error) {
      next(error);
    }
  });
// PATCH /api/routines/:routineId

// DELETE /api/routines/:routineId

// POST /api/routines/:routineId/activities

module.exports = routinesRouter;

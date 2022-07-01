const client = require("./client")

// database functions
async function getAllActivities(){
  try{
    const {rows: allActivities} = await client.query(`
    SELECT * FROM activities
    `, )

    return allActivities;

  }catch(error){
    throw error;
  }
}
async function getActivityById(id) {
  
}

async function getActivityByName(name) {

}

async function attachActivitiesToRoutines(routines) {
}

// select and return an array of all activities
async function createActivity({ name, description }){
  try{
    const {rows: [activity]} = await client.query(`
    INSERT INTO activities (name, description)
    VALUES ($1, $2)
    RETURNING *
    `, [name, description])

    return activity;
  }catch(error){
    throw error;
  }
}

// return the new activity
async function updateActivity({ id, ...fields }) {

}

// don't try to update the id
// do update the name and description
// return the updated activity
module.exports = {
  getAllActivities,
  getActivityById,
  getActivityByName,
  attachActivitiesToRoutines,
  createActivity,
  updateActivity,
}

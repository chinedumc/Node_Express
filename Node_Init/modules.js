const xyz = require('./people')

console.log(xyz.people, xyz.ages)

// Same as 

const {people, ages} = require('./people')

console.log(people, ages)
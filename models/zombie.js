var mongoose = require('mongoose');

var zombieSchema = new mongoose.Schema({
  stats: Array,
  name: {type: String, default: "Zombie"},
  cravesBrains: {type: Boolean, default: true}
})

zombieSchema.methods.crave = function(){
  if (cravesBrains) console.log("this zombie continues to crave brains.");
}
module.exports = mongoose.model('Zombie', zombieSchema)
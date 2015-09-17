var mongoose = require('mongoose');

var pirateSchema = new mongoose.Schema({
  stats: Array,
  name: String,
  favShanty: {type: String, default: "Yo Ho Ho"},
  isZombie: {type: Boolean, default: false}
})

pirateSchema.methods.sing = function() {
  console.log(this.name + " begins to sing " + this.favShanty)
}

module.exports = mongoose.model('Pirate', pirateSchema)
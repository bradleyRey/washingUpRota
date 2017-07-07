'use strict'

var mongoose = require('mongoose');

const db = {
  user : 'indigoBrad',
  pass: 'indigo96'
}

mongoose.connect(`mongodb://${db.user}:${db.pass}@ds131492.mlab.com:31492/washinguprota`);
mongoose.Promise = global.Promise;
const Schema = mongoose.schema;

const teamSchema = new Schema ({
  Email: String,
  Turn: Boolean
})

module.exports = mongoose.model('Team',teamSchema);

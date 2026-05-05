const mongoose = require('mongoose');
const uri = 'mongodb://localhost:27017/shnoor-cloud';
mongoose.connect(uri).then(() => {
  console.log('SUCCESS');
  process.exit(0);
}).catch(err => {
  console.error(err.message);
  process.exit(1);
});

const mongoose = require('mongoose');
const uri =
  'mongodb+srv://laxmi_db_user:Pxg023jryDRhQyMd@cluster0.j3w86mb.mongodb.net/ergopack?retryWrites=true&w=majority';

console.log('⏳ Testing MongoDB Connection...');
console.log(`URI: ${uri.replace(/:([^:@]+)@/, ':****@')}`); // Hide password in logs

mongoose
  .connect(uri, { serverSelectionTimeoutMS: 5000 })
  .then(() => {
    console.log('✅ SUCCESS: Connected to MongoDB successfully!');
    console.log('Database Name:', mongoose.connection.name);
    process.exit(0);
  })
  .catch((err) => {
    console.error('❌ FAILURE: Could not connect to MongoDB.');
    console.error('Error Name:', err.name);
    console.error('Error Message:', err.message);
    if (err.message.includes('bad auth')) {
      console.error('👉 CAUSE: Incorrect Username or Password.');
    } else if (err.message.includes('ECONNREFUSED')) {
      console.error('👉 CAUSE: Network blocked or Server down.');
    } else if (err.message.includes('authorized')) {
      console.error('👉 CAUSE: IP Address not whitelisted (Network Access).');
    }
    process.exit(1);
  });

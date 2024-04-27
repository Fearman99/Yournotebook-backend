const mongoose =require('mongoose');
const mongoURI = 'mongodb://127.0.0.1:27017/?directConnection=true'

// async function connectToMongo() {
//     await
//     mongoose.connect(mongoURI).then(()=>{
//         console.log(`connected to mongo`);
//     }).catch((err)=>{
//         console.log(err);
//     })
        
// }
mongoose.connect(
    (mongoURI),
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 10000, // Increase timeout (in milliseconds)
    },
    (err) => {
      if (err) {
        console.error("MongoDB connection error:", err);
      } else {
        console.log("MongoDB connected successfully");
      }
    }
  );

module.exports = connectToMongo;

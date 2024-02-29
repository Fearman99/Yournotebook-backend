//1. db.js- mongodb database se connect hone ke liye function banaya.

//2. index.js- connecttoMongo function call kiya, [expressjs] framework import kiya,routes banaye app.use se.....mainly pure backend ki main file hae ye jaise react ki index.js hoti hae.

//3. models- Notes.js aur User.js ....mainly in files mae name,password,date,etc store hoge uska format {Schema} bataya hae.

//4. routes- {endpoints} auth.js and notes.js.... [router],[expressjs],[models(Users,Notes.js)] import kiye aur router.get/delete/post(request,respond system throught which data is requested from client and the respond is stored in the mongodb database)

//5. auth.js- imported [express-validator],[User model],[router],[expresjs] created a validation function and under a try block created a dublicate check using findOne.

//6. ThunderClient- collection created(yourNotebook folder) request created(create new-user)

//7. Added and imported [bcrypt] salt mechanism in auth.js for password encryption

//8. Adding json web token in auth.js for secure communication between client and server.

// -- jwt consist of 3 parts [algorithm][data][JWT_SECRET] provides user with a token after sign-up process (it prevents every time sign in process if user visits the site)

//9. created a sign-in {endpoint} in auth.js just like sign-up

//10. created a logged-in user detail {endpoint} in auth.js 

//11. middleware- acts as a middle man for fetching userId from auth-token(auth-token is added as a header in thunderclient) using jwt.verify

//12. fetchUser.js- fetches user details and acts as a middleware in [logged-in userdetail] {endpoint} | from the details fetched ,from auth-token, userId is taken for fetching particular user details



const connectToMongo = require("./db");
const express = require("express");
var cors = require('cors')


connectToMongo();
var app = express()
app.use(cors())
app.use(express.json())

const port = 5000;

app.use(express.json());

//Available Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

app.listen(port, () => {
  console.log(`YourNotebook app listening on port ${port}`);
});

const express = require('express');
const bodyParser = require("body-parser");
const cors = require("cors");

const initializeConnectionDb = require("./DB/db.connect");
const  authMiddle = require("./middlewares/authIT");
const auth = require("./middlewares/authIT")
const user = require("./routers/user.router")
const post = require("./routers/post.router")


const app = express();

app.use(cors())
app.use(bodyParser.json())

const port = 3000;

initializeConnectionDb();


app.get('/', (req, res) => {
  res.send('Hello Express')
});


app.use("/user",user);
app.use("/post",auth,post)

app.listen( process.env.PORT || port, () => {
    console.log(`server Online!`)
  })
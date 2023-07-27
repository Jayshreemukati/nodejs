const express = require("express");
const mongoose = require("mongoose");
const user = require("./model/user");
const bcrypt = require("bcryptjs");
const course = require("./model/course");

const bodyParser = require("body-parser");
const app = express();
const port = 3002;
app.use(bodyParser());

mongoose
  .connect(
    "mongodb+srv://jayshreemukati22:jayshree321@cluster0.b4w76zz.mongodb.net/?retryWrites=true&w=majority",
    { useUnifiedTopology: true }
  )
  .then((res) => {
    console.log("database connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.post("/user", async (req, res) => {
  //   const userData= new user(req.body);
  const passwordhash = await bcrypt.hash(req.body.password, 12);

  const userData = new user({
    fullname: req.body.fullname,
    contact: req.body.contact,
    age: req.body.age,
    email: req.body.email,
    password: passwordhash,
    address: req.body.address,
    salary: req.body.salary,
    usertype: req.body.usertype,
  });

  userData
    .save()
    .then(() => {
      res.json({ msg: "data added in table" });
    })
    .catch((err) => {
      res.json(err);
    });
});

app.post("/course", (req, res) => {
  const usercourse = new course(req.body);
  usercourse
    .save()
    .then(() => {
      res.json({ msg: "course added" });
    })
    .catch((err) => {
      res.json(err);
    });
});

app.get("/alldata", async (req, res) => {
  try {
    const result = await user.find({});

    res.json({ result });
  } catch (err) {
    res.json(err);
  }
});

app.get("/courseData", async (req, res) => {
  try {
    const result = await course.find({});

    res.json({ result });
  } catch (err) {
    res.json(err);
  }
});

app.delete("/deletedata/:id", async (req, res) => {
  try {
    const deletedata = await user.deleteOne({ _id: req.params.id });
    res.json(deletedata);
    console.log(deletedata)
  } catch (err) {
    res.json(err);
  }
});

app.patch("/updatedata",async(req,res)=>{
  try{
    const updateresult= await user.findByIdAndUpdate(req.body._id,req.body)
    res.json(updateresult)

  }catch(err){
    res.json(err)
  }
})

app.listen(port, () => {
  console.log("success");
});

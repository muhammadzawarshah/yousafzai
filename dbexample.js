const mongoose = require("mongoose");
require('dotenv').config();
const User = require("./UserSchema");




mongoose.connect('mongodb+srv://tauseef:123456765@cluster0.w6xiz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => console.log('Connected!'));


  async function doSave() {
      
        try {
          const newUser = new User({
            name:"Ahmad",
            email: "ahmad@yahoo.com",
            age: 36,
          });
      
          const savedUser = await newUser.save();
      
          console.log(savedUser)
      }
      catch(err){
          console.log(err)
      }
  }

  doSave();
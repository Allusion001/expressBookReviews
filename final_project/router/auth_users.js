const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [{"username":"user2","password":"password2"}];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
}

const authenticatedUser = (username,password)=>{
  let validusers = users.filter((user)=>{
    return (user.username === username && user.password === password)
  });
  if(validusers.length > 0){
    return true;
  } else {
    return false;
  }
}

//only registered users can login
regd_users.post("/login", (req,res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
      return res.status(404).json({message: "Error logging in"});
  }

  if (authenticatedUser(username,password)) {
    let accessToken = jwt.sign({
      data: password
    }, 'access', { expiresIn: 600 * 600 });

    req.session.authorization = {
      accessToken,username
  }
  return res.status(200).send("User successfully logged in");
  } else {
    return res.status(208).json({message: "Invalid Login. Check username and password"});
  }
});

// Add a book review
regd_users.put("/review/:isbn", (req, res) => {
  const rev=req.body.review;
  const isbn=req.params.isbn;
  console.log("sfsf")
  for (i in books){
    if(String(i)===isbn){
      for (j in rev){
        books[i].reviews[j]=rev[j]
        result=books[i];
        break;
      }
      break
      

      }
}
 

  return res.status(200).json(result)
});



module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;

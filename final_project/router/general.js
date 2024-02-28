const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

const doesExist = (username)=>{
  let userswithsamename = users.filter((user)=>{
    return user.username === username
  });
  if(userswithsamename.length > 0){
    return true;
  } else {
    return false;
  }
}

public_users.post("/register", (req,res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (username && password) {
    if (!doesExist(username)) {
      users.push({"username":username,"password":password});
      return res.status(200).json({message: "User successfully registred. Now you can login"});
    } else {
      return res.status(404).json({message: "User already exists!"});
    }
  }
  return res.status(404).json({message: username});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  const customPromise = new Promise((resolve, reject) => {
    if(books){
      resolve(books)
      return res.status(200).json({books});
    }
    else{
      reject(new Error("Invalid"))
    }

  }

  
)});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  const customPromise = new Promise((resolve, reject) => {
  const isbn= req.params.isbn;
  const book=books[isbn]
  if(book){
    resolve(book)
    return res.status(200).json({book});
  }
  else{
    reject(new Error("invalid ISBN"))
  }
 
 })});
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  const customPromise = new Promise((resolve, reject) => {
  const author=req.params.author;
  let result;
  for (filterAuthor in books){
    if(books[filterAuthor]['author']===author){
      result=books[filterAuthor];
      break;
    }
  }

  if(result){
    resolve("author found")
    return res.status(200).json({result});
  }
  else{
    reject(new Error("AUthor not found"))
  }

  
  
  
 
})});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  const customPromise = new Promise((resolve, reject) => {
 
  const title=req.params.title;
  let result;
  for (filterTitle in books){
    if(books[filterTitle]['title']===title){
      result=books[filterTitle];
      break;
    }
  }

  if(result){
    resolve("Found")
    return res.status(300).json({result});
  }
  else{
    reject(new Error("Book no found"))
  }

  
  
})});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const isbn=req.params.isbn;
  for (i in books){
      if(String(i)===isbn){
        result=books[String(i)];
         break;
      }
  }

  return res.status(200).json(result)
});

module.exports.general = public_users;

const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

// IMPORT SCHEMA FROM BOOK.JS
const bookSchema = require('./Book');

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Must use a valid email address'],
    },
    password: {
      type: String,
      required: true,
    },
    // SET SAVED BOOKS TO BE AN ARRAY OF DATA THAT ADHERES TO THE BOOKSCHEMA
    savedBooks: [bookSchema],
  },
  // SET THIS TO USE VIRTUAL BELOW
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// HASH USER PASSWORD
userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// CUSTOM METHOD TO COMPARE AND VALIDATE PASSWORD FOR LOGIN 
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

// QUERY A USER, TO GET A FIELD CALLED `BOOKCOUNT` WITH THE NUMBER OF SAVED BOOKS
userSchema.virtual('bookCount').get(function () {
  return this.savedBooks.length;
});

const User = model('User', userSchema);

module.exports = User;

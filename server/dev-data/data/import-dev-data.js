const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Post = require('./../../models/postModel');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => console.log('DB connection succesfull !'));

const posts = JSON.parse(
  fs.readFileSync(`${__dirname}/posts-simple.json`, 'utf-8')
);

// Import data into database
const importData = async () => {
  try {
    await Post.create(posts);
    console.log('Data succesfully loaded!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// DELETE ALL DATA FROM DB
const deleteData = async () => {
  try {
    await Post.deleteMany();
    console.log('Data succesfully deleted!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}

console.log(process.argv);

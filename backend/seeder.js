const mongoose = require('mongoose');
const dotenv = require('dotenv');
const users = require('./src/data/users');
const User = require('./src/models/User');
const Product = require('./src/models/Product');
const Category = require('./src/models/Category');
const connectDB = require('./src/config/db');

dotenv.config();

connectDB();

const importData = async () => {
  try {
    // Only seeding users now as requested
    await User.deleteMany();

    // Use loop to trigger pre-save middleware
    for (const user of users) {
        await User.create(user);
    }
    
    console.log('Users Imported!');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Product.deleteMany();
    await User.deleteMany();
    await Category.deleteMany();

    console.log('Data Destroyed!');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
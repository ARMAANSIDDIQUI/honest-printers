const mongoose = require('mongoose');
const dotenv = require('dotenv');
const users = require('./src/data/users');
const products = require('./src/data/products');
const categories = require('./src/data/categories');
const User = require('./src/models/User');
const Product = require('./src/models/Product');
const Category = require('./src/models/Category');
const connectDB = require('./src/config/db');

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await Product.deleteMany();
    await User.deleteMany();
    await Category.deleteMany();

    // Use loop to trigger pre-save middleware
    const createdUsers = [];
    for (const user of users) {
        const newUser = await User.create(user);
        createdUsers.push(newUser);
    }
    
    // Make the first user the admin and owner of products
    const adminUser = createdUsers[0]._id;
    
    // Import Categories
    const createdCategories = await Category.insertMany(categories);

    // Map products to categories
    const sampleProducts = products.map((product) => {
        // Find the category object that matches the slug
        const category = createdCategories.find(c => c.slug === product.categoryId);
        return { 
            ...product, 
            categoryId: category ? category.slug : 'general', // Keeping slug as ID for simplicity or reference
            user: adminUser 
        };
    });

    await Product.insertMany(sampleProducts);

    console.log('Data Imported!');
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

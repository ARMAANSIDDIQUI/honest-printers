const asyncHandler = require('express-async-handler');
const Product = require('../models/Product');

// @desc    Get all products
// @route   GET /api/products
// @access  Public
exports.getProducts = asyncHandler(async (req, res) => {
  const pageSize = 12;
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {};

  const category = req.query.category 
    ? { categoryId: req.query.category } 
    : {};

  const count = await Product.countDocuments({ ...keyword, ...category });
  const products = await Product.find({ ...keyword, ...category })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({ products, page, pages: Math.ceil(count / pageSize) });
});

// @desc    Get product by slug
// @route   GET /api/products/:slug
// @access  Public
exports.getProductBySlug = asyncHandler(async (req, res) => {
  const product = await Product.findOne({ slug: req.params.slug });

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
exports.createProduct = asyncHandler(async (req, res) => {
  const {
    name,
    slug,
    description,
    categoryId,
    thumbnail,
    previewImages,
    variants,
    tags
  } = req.body;

  const product = new Product({
    name,
    slug,
    description,
    categoryId,
    thumbnail,
    previewImages,
    variants,
    tags,
    user: req.user._id,
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
exports.updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    slug,
    description,
    categoryId,
    thumbnail,
    previewImages,
    variants,
    tags,
    featured
  } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name || product.name;
    product.slug = slug || product.slug;
    product.description = description || product.description;
    product.categoryId = categoryId || product.categoryId;
    product.thumbnail = thumbnail || product.thumbnail;
    product.previewImages = previewImages || product.previewImages;
    product.variants = variants || product.variants;
    product.tags = tags || product.tags;
    product.featured = featured !== undefined ? featured : product.featured;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
exports.deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await product.deleteOne();
    res.json({ message: 'Product removed' });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

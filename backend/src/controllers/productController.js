const asyncHandler = require('express-async-handler');
const Product = require('../models/Product');

// @desc    Get all products
// @route   GET /api/products
// @access  Public
exports.getProducts = asyncHandler(async (req, res) => {
  const pageSize = 12;
  const page = Number(req.query.pageNumber) || 1;

  // Build Filter Query
  const query = {};

  if (req.query.keyword) {
    query.name = {
      $regex: req.query.keyword,
      $options: 'i',
    };
  }

  if (req.query.category) {
    query.categoryId = req.query.category;
  }

  if (req.query.minPrice || req.query.maxPrice) {
    query['variants.price'] = {};
    if (req.query.minPrice) query['variants.price'].$gte = Number(req.query.minPrice);
    if (req.query.maxPrice) query['variants.price'].$lte = Number(req.query.maxPrice);
  }

  if (req.query.discount === 'true') {
    // Check if any variant has price < originalPrice
    query.variants = {
      $elemMatch: {
        $expr: { $lt: ["$price", "$originalPrice"] }
      }
    };
  }

  // Build Sort Option
  let sort = { createdAt: -1 }; // Default: Newest
  if (req.query.sort) {
    switch (req.query.sort) {
      case 'price-asc':
        sort = { 'variants.price': 1 };
        break;
      case 'price-desc':
        sort = { 'variants.price': -1 };
        break;
      case 'relevance':
        // If keyword exists, relevance is automatic in some setups, 
        // but for simpleregex, we might just fallback to createdAt or name
        sort = { createdAt: -1 };
        break;
      case 'newest':
      default:
        sort = { createdAt: -1 };
    }
  }

  const count = await Product.countDocuments(query);
  const products = await Product.find(query)
    .sort(sort)
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

// @desc    Apply discount to product variants
// @route   PUT /api/products/:id/discount
// @access  Private/Admin
exports.applyDiscount = asyncHandler(async (req, res) => {
  const { discountPercentage } = req.body;
  const product = await Product.findById(req.params.id);

  if (product) {
    const discount = Number(discountPercentage);

    if (isNaN(discount) || discount < 0 || discount > 100) {
      res.status(400);
      throw new Error('Invalid discount percentage');
    }

    product.variants = product.variants.map((variant) => {
      // Ensure originalPrice is set
      if (!variant.originalPrice || variant.originalPrice === variant.price) {
        variant.originalPrice = variant.price;
      }

      if (discount === 0) {
        // Remove discount: restore price to original
        variant.price = variant.originalPrice;
      } else {
        // Apply discount
        variant.price = Math.round(variant.originalPrice * (1 - discount / 100));
      }
      return variant;
    });

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

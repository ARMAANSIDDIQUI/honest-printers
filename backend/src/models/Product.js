const mongoose = require('mongoose');

const variantSchema = new mongoose.Schema({
  softwareId: {
    type: String,
    required: true,
    enum: ['photoshop', 'illustrator', 'coreldraw', 'indesign']
  },
  colorVariantId: {
    type: String,
    required: true,
    enum: ['cmyk', 'rgb', 'grayscale', 'spot']
  },
  price: {
    type: Number,
    required: true
  },
  originalPrice: {
    type: Number,
    required: true
  },
  fileSize: {
    type: String,
    required: true
  },
  downloadUrl: {
    type: String,
    required: true,
    select: false // Hide from public API, only exposed on purchase
  },
  available: {
    type: Boolean,
    default: true
  }
});

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a product name'],
    trim: true
  },
  slug: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: [true, 'Please add a description']
  },
  categoryId: {
    type: String,
    required: true
  },
  thumbnail: {
    type: String,
    required: true
  },
  previewImages: [String],
  featured: {
    type: Boolean,
    default: false
  },
  variants: [variantSchema],
  tags: [String],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Product', productSchema);

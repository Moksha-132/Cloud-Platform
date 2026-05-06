const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    enum: ['file', 'folder'],
    required: true
  },
  mimeType: {
    type: String,
    default: ''
  },
  size: {
    type: Number,
    default: 0
  },
  url: {
    type: String,
    default: ''
  },
  cloudinaryId: {
    type: String,
    default: ''
  },
  parentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'File',
    default: null
  },
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  isStarred: {
    type: Boolean,
    default: false
  },
  isDeleted: {
    type: Boolean,
    default: false
  },
  sharedWith: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    permission: {
      type: String,
      enum: ['view', 'edit'],
      default: 'view'
    }
  }],
  shareToken: {
    type: String,
    default: ''
  },
  sharePermission: {
    type: String,
    enum: ['view', 'edit'],
    default: 'view'
  }
}, { timestamps: true });
schema.index({ name: 'text' });
module.exports = mongoose.model('File', schema);
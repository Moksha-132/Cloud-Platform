const File = require('../models/File');
const User = require('../models/User');

exports.uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'File required' });
    }
    const { parentId } = req.body;
    const file = await File.create({
      name: req.file.originalname,
      type: 'file',
      mimeType: req.file.mimetype,
      size: req.file.size,
      url: req.file.path,
      cloudinaryId: req.file.filename,
      parentId: parentId || null,
      ownerId: req.user.id
    });
    await User.findByIdAndUpdate(req.user.id, {
      $inc: { storageUsed: req.file.size }
    });

    res.status(201).json(file);
  } catch (e) {
    res.status(500).json({ message: 'Upload failed' });
  }
};

exports.getFiles = async (req, res) => {
  try {
    const { parentId, tab } = req.query;
    let query = { ownerId: req.user.id };

    if (tab === 'trash') {
      query.isDeleted = true;
    } else if (tab === 'starred') {
      query.isStarred = true;
      query.isDeleted = false;
    } else if (tab === 'shared') {
      query = { 
        $or: [
          { 'sharedWith.user': req.user.id },
          { shareToken: { $ne: '' } }
        ],
        isDeleted: false
      };
    } else if (tab === 'recent') {
      query.isDeleted = false;
      const files = await File.find(query).sort({ updatedAt: -1 }).limit(10);
      return res.json(files);
    } else {
      query.parentId = parentId || null;
      query.isDeleted = false;
    }

    const files = await File.find(query).sort({ type: 1, name: 1 });
    res.json(files);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

exports.createFolder = async (req, res) => {
  try {
    const { name, parentId } = req.body;
    const folder = await File.create({
      name,
      type: 'folder',
      ownerId: req.user.id,
      parentId: parentId || null
    });
    res.status(201).json(folder);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

exports.rename = async (req, res) => {
  try {
    const { id, name } = req.body;
    const file = await File.findOneAndUpdate(
      { _id: id, ownerId: req.user.id },
      { name },
      { new: true }
    );
    res.json(file);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const { id } = req.params;
    await File.findOneAndUpdate(
      { _id: id, ownerId: req.user.id },
      { isDeleted: true }
    );
    res.json({ message: 'done' });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

exports.removeForever = async (req, res) => {
  try {
    const { id } = req.params;
    await File.findOneAndDelete({ _id: id, ownerId: req.user.id });
    res.json({ message: 'permanently deleted' });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

exports.move = async (req, res) => {
  try {
    const { id, parentId } = req.body;
    const file = await File.findOneAndUpdate(
      { _id: id, ownerId: req.user.id },
      { parentId: parentId || null },
      { new: true }
    );
    res.json(file);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

exports.share = async (req, res) => {
  try {
    const { id, permission } = req.body;
    const token = require('crypto').randomBytes(16).toString('hex');
    const file = await File.findOneAndUpdate(
      { _id: id, ownerId: req.user.id },
      { shareToken: token, sharePermission: permission || 'view' },
      { new: true }
    );
    res.json({ url: `${process.env.CLIENT_URL || 'http://localhost:5173'}/share/${token}` });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

exports.getFileByToken = async (req, res) => {
  try {
    const { token } = req.params;
    const item = await File.findOne({ shareToken: token, isDeleted: false });
    if (!item) return res.status(404).json({ message: 'Link invalid' });
    
    let result = { ...item.toObject() };
    
    if (item.type === 'folder') {
      const children = await File.find({ parentId: item._id, isDeleted: false });
      result.children = children;
    }
    
    res.json(result);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

exports.renameByToken = async (req, res) => {
  try {
    const { token, name } = req.body;
    const item = await File.findOne({ shareToken: token, isDeleted: false });
    
    if (!item) return res.status(404).json({ message: 'Item not found' });
    if (item.sharePermission !== 'edit') return res.status(403).json({ message: 'Permission denied' });

    item.name = name;
    await item.save();

    const io = req.app.get('socketio');
    if (io) {
      io.emit('shared_item_modified', { 
        type: 'rename', 
        name: item.name, 
        ownerId: item.ownerId,
        itemType: item.type 
      });
    }

    res.json(item);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

exports.toggleStar = async (req, res) => {
  try {
    const { id } = req.params;
    const file = await File.findOne({ _id: id, ownerId: req.user.id });
    if (!file) return res.status(404).json({ message: 'File not found' });
    
    file.isStarred = !file.isStarred;
    await file.save();
    res.json(file);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

exports.restoreFile = async (req, res) => {
  try {
    const { id } = req.params;
    const file = await File.findOneAndUpdate(
      { _id: id, ownerId: req.user.id },
      { isDeleted: false },
      { new: true }
    );
    res.json(file);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

exports.getFileById = async (req, res) => {
  try {
    const file = await File.findOne({ _id: req.params.id, ownerId: req.user.id });
    if (!file) return res.status(404).json({ message: 'File not found' });
    res.json(file);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

exports.updateContent = async (req, res) => {
  try {
    const { id, content } = req.body;
    const file = await File.findOne({ _id: id, ownerId: req.user.id });
    if (!file) return res.status(404).json({ message: 'File not found' });
    const cloudinary = require('../config/cloudinary').cloudinary;
    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { resource_type: 'raw', public_id: file.cloudinaryId, overwrite: true },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      uploadStream.end(Buffer.from(content));
    });

    file.size = Buffer.from(content).length;
    file.url = result.secure_url;
    await file.save();

    const io = req.app.get('socketio');
    if (io) {
      io.emit('shared_item_modified', { 
        type: 'edit', 
        name: file.name, 
        ownerId: file.ownerId,
        itemType: file.type 
      });
    }

    res.json(file);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

exports.updateContentByToken = async (req, res) => {
  try {
    const { token, content } = req.body;
    const file = await File.findOne({ shareToken: token, isDeleted: false });
    
    if (!file) return res.status(404).json({ message: 'File not found' });
    if (file.sharePermission !== 'edit') return res.status(403).json({ message: 'Permission denied' });
    const cloudinary = require('../config/cloudinary').cloudinary;
    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { resource_type: 'raw', public_id: file.cloudinaryId, overwrite: true },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      uploadStream.end(Buffer.from(content));
    });

    file.size = Buffer.from(content).length;
    file.url = result.secure_url;
    await file.save();

    const io = req.app.get('socketio');
    if (io) {
      io.emit('shared_item_modified', { 
        type: 'edit', 
        name: file.name, 
        ownerId: file.ownerId,
        itemType: file.type 
      });
    }

    res.json(file);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};
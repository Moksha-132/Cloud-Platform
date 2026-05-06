const File = require('../models/File');
const archiver = require('archiver');
const axios = require('axios');

const fetchFolderContents = async (folderId, ownerId) => {
  const items = await File.find({ parentId: folderId, ownerId, isDeleted: false });
  let results = [];

  for (const item of items) {
    if (item.type === 'folder') {
      const nested = await fetchFolderContents(item._id, ownerId);
      results = results.concat(nested.map(f => ({ ...f, path: `${item.name}/${f.path}` })));
    } else {
      results.push({ url: item.url, name: item.name, path: item.name });
    }
  }
  return results;
};

const streamFile = async (url, name, mimeType, res) => {
  const response = await axios({ url, method: 'GET', responseType: 'stream' });
  res.setHeader('Content-Disposition', `attachment; filename="${encodeURIComponent(name)}"`);
  res.setHeader('Content-Type', mimeType || 'application/octet-stream');
  response.data.pipe(res);
};

const streamZip = async (name, assets, res) => {
  const archive = archiver('zip', { zlib: { level: 5 } });
  res.setHeader('Content-Disposition', `attachment; filename="${encodeURIComponent(name)}.zip"`);
  res.setHeader('Content-Type', 'application/zip');
  archive.pipe(res);

  for (const asset of assets) {
    try {
      const resp = await axios({ url: asset.url, method: 'GET', responseType: 'stream' });
      archive.append(resp.data, { name: asset.path });
    } catch (e) { console.error(`Failed to add ${asset.name} to zip`); }
  }
  await archive.finalize();
};

exports.downloadFile = async (req, res) => {
  try {
    const file = await File.findOne({ _id: req.params.id, ownerId: req.user.id, type: 'file' });
    if (!file) return res.status(404).json({ message: 'File not found' });
    await streamFile(file.url, file.name, file.mimeType, res);
  } catch (e) { res.status(500).json({ message: 'Download failed' }); }
};

exports.downloadFolder = async (req, res) => {
  try {
    const folder = await File.findOne({ _id: req.params.id, ownerId: req.user.id, type: 'folder' });
    if (!folder) return res.status(404).json({ message: 'Folder not found' });
    const assets = await fetchFolderContents(folder._id, req.user.id);
    await streamZip(folder.name, assets, res);
  } catch (e) { res.status(500).json({ message: 'Zipping failed' }); }
};

exports.downloadShared = async (req, res) => {
  try {
    const item = await File.findOne({ shareToken: req.params.token, isDeleted: false });
    if (!item) return res.status(404).json({ message: 'Link invalid' });

    if (item.type === 'file') {
      await streamFile(item.url, item.name, item.mimeType, res);
    } else {
      const assets = await fetchFolderContents(item._id, item.ownerId);
      await streamZip(item.name, assets, res);
    }
  } catch (e) { res.status(500).json({ message: 'Download failed' }); }
};
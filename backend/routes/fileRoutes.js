const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { upload } = require('../config/cloudinary');
const { uploadFile, getFiles, createFolder, rename, remove, removeForever, move, share, getFileByToken, renameByToken, toggleStar, restoreFile, updateContent, updateContentByToken, getFileById } = require('../controllers/fileController');
const { downloadFile, downloadFolder, downloadShared } = require('../controllers/downloadController');

router.get('/share/:token', getFileByToken);
router.get('/share/download/:token', downloadShared);
router.put('/share/rename', renameByToken);
router.put('/share/content', updateContentByToken);

router.use(auth);

router.get('/download/file/:id', downloadFile);
router.get('/download/folder/:id', downloadFolder);

router.get('/:id', getFileById);
router.put('/star/:id', toggleStar);
router.put('/restore/:id', restoreFile);
router.delete('/forever/:id', removeForever);
router.put('/content/:id', updateContent);

router.post('/upload', upload.single('file'), uploadFile);
router.get('/', getFiles);
router.post('/folder', createFolder);
router.put('/rename', rename);
router.delete('/remove/:id', remove);
router.put('/move', move);
router.post('/share', share);

module.exports = router;
const express = require('express');
const router = express.Router();
const sheetController = require('../controllers/SheetController');

router.get('/', sheetController.getAllSheets.bind(sheetController));

router.get('/user/:userId', sheetController.getSheetsByUserId.bind(sheetController));

router.get('/:id', sheetController.getSheetById.bind(sheetController));

router.get('/:id/songs', sheetController.getSheetSongs.bind(sheetController));

router.post('/', sheetController.createSheet.bind(sheetController));

router.put('/:id', sheetController.updateSheet.bind(sheetController));

router.delete('/:id', sheetController.deleteSheet.bind(sheetController));

router.post('/:id/songs', sheetController.addSongToSheet.bind(sheetController));

router.delete('/:id/songs/:songId', sheetController.removeSongFromSheet.bind(sheetController));

router.post('/:id/click', sheetController.clickSheet.bind(sheetController));

router.post('/:id/collect', sheetController.collectSheet.bind(sheetController));

module.exports = router;

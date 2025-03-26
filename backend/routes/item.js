const express = require('express');

const adminController = require('../controller/items');
const authenticate=require('../middleware/auth')

const router = express.Router();

router.post('/add-item',authenticate.author,adminController.addData)
router.delete('/remove-item',authenticate.author,adminController.deleteData)
router.get('/getAll-item',authenticate.author,adminController.getData)
router.put('/update-item/:id',authenticate.author,adminController.updateData)
// router.get('/chat/get/:id/:msgId',authenticate.author,adminController.getData)

module.exports=router;
const express = require('express')

const router = express.Router()

// Controller
// import controller here
const { auth } = require("../middlewares/auth")
const { uploadFile } = require('../middlewares/upload-files')
const { addUsers, getUsers,updateUser,deleteUser, Login } = require('../controllers/user')
const { addLists, getLists,updateLists,deleteLists,getlistsOne  } = require('../controllers/list')
const { addFlow, getFlows,updateFlow,deleteFlow,getFlow  } = require('../controllers/flow')
const { addSuplier, getSupliers,updateSuplier,deleteSuplier,getSuplier  } = require('../controllers/suplier')
const { addCategory, getCategorys,updateCategory,deleteCategory,getCategory  } = require('../controllers/category')

// Route
// add route here
router.post('/add', auth,addUsers)
router.post('/Login', Login)
router.get('/get', getUsers)
router.patch('/update/:id', updateUser)
router.delete('/delete/:id', deleteUser)

router.post('/addList', auth, uploadFile("image"), addLists)
router.get('/getList', auth, getLists)
router.get('/getList/:id', auth, getlistsOne )
router.patch('/updateList/:id', auth, updateLists)
router.delete('/deleteList/:id', auth, deleteLists)

router.post('/addFlow', auth, addFlow)
router.get('/getFlows', auth, getFlows)
router.get('/getFlow/:id', auth, getFlow )
router.patch('/updateFlow/:id', auth, updateFlow)
router.delete('/deleteFlow/:id', auth, deleteFlow)

router.post('/addSuplier', auth, addSuplier)
router.get('/getSupliers', auth, getSupliers)
router.get('/getSuplier/:id', auth, getSuplier )
router.patch('/updateSuplier/:id', auth, updateSuplier)
router.delete('/deleteSuplier/:id', auth, deleteSuplier)


router.post('/addCategory', auth, addCategory)
router.get('/getCategorys', auth, getCategorys)
router.get('/getCategory/:id', auth, getCategory )
router.patch('/updateCategory/:id', auth, updateCategory)
router.delete('/deleteCategory/:id', auth, deleteCategory)


module.exports = router
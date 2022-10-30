const express = require("express");

const router = express.Router();
const app = express();

// Controller
// require controller start
const {
  addUsers,
  getUsers,
  updateUser,
  deleteUser,
  Login,
  checkAuth,
  getUser,
} = require("../controllers/user");
const {
  addLists,
  getLists,
  updateLists,
  deleteLists,
  getlistsOne,
  getlistsOnes,
  getLength,
} = require("../controllers/list");
const {
  addFlow,
  getFlows,
  updateFlow,
  deleteFlow,
  getFlow,
  getFlowsOne,
} = require("../controllers/flow");
const {
  addSuplier,
  getSupliers,
  updateSuplier,
  deleteSuplier,
  getSuplier,
} = require("../controllers/suplier");
const {
  addCategory,
  getCategorys,
  updateCategory,
  deleteCategory,
  getCategory,
} = require("../controllers/category");
const {
  addProfile,
  getProfiles,
  updateProfile,
  deleteProfile,
  getProfile,
} = require("../controllers/profile");
const { Alldata } = require("../controllers/categoriSupplierList.js");
const { getLog } = require("../controllers/loggger");
const { addQty, updateQty } = require("../controllers/qty");

// require controller start
// reuire middleware start
const { morganMiddleware } = require("../middlewares/logger");
const { auth } = require("../middlewares/auth");
const { uploadFile } = require("../middlewares/upload-files");
// reuire middleware end

// Route

// Get routes to the variabel

// add route here
//router get user, Login, add User, delete user, update user
router.post("/addUser", addUsers);
router.post("/Login", Login);
router.get("/getUser", auth, morganMiddleware, getUsers);
router.get("/getUser/:id", auth, morganMiddleware, getUser);
router.get("/check-auth", auth, morganMiddleware, checkAuth);
router.patch("/update/:id", auth, morganMiddleware, updateUser);
router.delete("/delete/:id", auth, morganMiddleware, deleteUser);

//router add,get,delete,update data barang
router.post("/addList", auth, morganMiddleware, uploadFile("image"), addLists);
router.get("/getList", auth, morganMiddleware, getLists);
router.get("/getLength", auth, morganMiddleware, getLength);
router.get("/getAlldata", auth, morganMiddleware, Alldata);
router.get("/getList/:id", auth, morganMiddleware, getlistsOne);
router.get("/getLists/:name", auth, morganMiddleware, getlistsOnes);
router.patch(
  "/updateList/:id",
  auth,
  morganMiddleware,
  uploadFile("image"),
  updateLists
);
router.delete("/deleteList/:id", auth, morganMiddleware, deleteLists);

//router CRUD Flow start
router.post("/addFlow", auth, morganMiddleware, addFlow);
router.get("/getFlows", auth, morganMiddleware, getFlows);
router.get("/getFlow/:id", auth, morganMiddleware, getFlow);
router.get("/getFlows/:id", auth, morganMiddleware, getFlowsOne);
router.patch("/updateFlow/:id", auth, morganMiddleware, updateFlow);
router.delete("/deleteFlow/:id", auth, morganMiddleware, deleteFlow);

//router CRUD Flow end

//router CRUD Suploer start
router.post("/addSuplier", auth, morganMiddleware, addSuplier);
router.get("/getSupliers", auth, morganMiddleware, getSupliers);
router.get("/getSuplier/:id", auth, morganMiddleware, getSuplier);
router.patch("/updateSuplier/:id", auth, morganMiddleware, updateSuplier);
router.delete("/deleteSuplier/:id", auth, morganMiddleware, deleteSuplier);

//router CRUD Suplier end

//router CRUD Category start
router.post("/addCategory", auth, morganMiddleware, addCategory);
router.get("/getCategorys", auth, morganMiddleware, getCategorys);
router.get("/getCategory/:id", auth, morganMiddleware, getCategory);
router.patch("/updateCategory/:id", auth, morganMiddleware, updateCategory);
router.delete("/deleteCategory/:id", auth, morganMiddleware, deleteCategory);

//router CRUD Category End

//router CRUD Profile start
router.post(
  "/addProfile",
  auth,
  morganMiddleware,
  uploadFile("image"),
  addProfile
);
router.get("/getProfiles", auth, morganMiddleware, getProfiles);
router.get("/getProfile/:id", auth, morganMiddleware, getProfile);
router.patch(
  "/updateProfile/:id",
  auth,
  morganMiddleware,
  uploadFile("image"),
  updateProfile
);
router.delete("/deleteProfile/:id", auth, morganMiddleware, deleteProfile);

//router CRUD end start

//router get logger start
router.get("/getLog", auth, morganMiddleware, getLog);

//router get logger end

//router post & patch Qty start
router.post("/addQty", auth, morganMiddleware, addQty);
router.patch("/updateQty/:id", auth, morganMiddleware, updateQty);

//router post & patch Qty end

module.exports = router;

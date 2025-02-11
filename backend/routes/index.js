var express = require('express');
const { signup, login, createProj, saveProject, getProjects, getProject, deleteProject, editProject, sendOtp, verifyOtp } = require('../controllers/userController');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post("/signup", signup); 
router.post("/login", login); 
router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);
router.post("/createProj", createProj); 
router.post("/saveProject", saveProject); 
router.post("/getProjects", getProjects); 
router.post("/getProject", getProject); 
router.post("/deleteProject", deleteProject); 
router.post("/editProject", editProject); 

module.exports = router;

const userModel = require("../models/userModel");
const projectModel = require("../models/projectModel")
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");
require('dotenv').config();

const otpStore = new Map(); 

const { JWT_SECRET,EMAIL_USER,EMAIL_PASS } = process.env;


const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465, 
  secure: true, 
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
});


exports.sendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, msg: "Email is already registered" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    otpStore.set(email, { otp, expiresAt: Date.now() + 5 * 60 * 1000 });

    await transporter.sendMail({
      from: EMAIL_USER,
      to: email,
      subject: "Email Verification OTP",
      text: `Your OTP is ${otp}. It is valid for 5 minutes.`,
    });

    res.status(200).json({ success: true, msg: "OTP sent to email" });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};


exports.verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    console.log('1. Received request with:', { email, otp });

    const storedOtp = otpStore.get(email);
    console.log('2. Retrieved from otpStore:', storedOtp);

    if (!storedOtp) {
      console.log('3a. No stored OTP found');
      return res.status(400).json({ success: false, msg: "No OTP found for this email" });
    }

    console.log('3b. Comparing OTPs:', {
      stored: storedOtp.otp,
      received: otp,
      isMatch: String(storedOtp.otp) === String(otp)
    });

    if (String(storedOtp.otp) !== String(otp)) {
      console.log('4a. OTP mismatch');
      return res.status(400).json({ success: false, msg: "Invalid OTP" });
    }

    console.log('4b. OTP matched, checking expiration');
    if (Date.now() > storedOtp.expiresAt) {
      console.log('5a. OTP expired');
      return res.status(400).json({ success: false, msg: "OTP expired" });
    }

    console.log('5b. OTP valid, updating user');
    await userModel.updateOne({ email }, { $set: { isVerified: true } });

    console.log('6. Setting verification status in otpStore');
    otpStore.set(email, { verified: true });

    console.log('7. Sending success response');
    res.status(200).json({ success: true, msg: "Email verified successfully" });
  } catch (error) {
    console.error('Error in verification:', error);
    res.status(500).json({ success: false, msg: error.message });
  }
};

exports.signup = async (req, res) => {
  try {
    let { email, pwd, fullName } = req.body;

    // Check if the email already exists
    let existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, msg: "Email already exists" });
    }

    // ✅ Check verification status in both `otpStore` and database
    const dbUser = await userModel.findOne({ email });
    const isVerified = otpStore.get(email)?.verified || (dbUser && dbUser.isVerified);

    if (!isVerified) {
      return res.status(400).json({ success: false, msg: "Email not verified" });
    }

    // ✅ Proceed with signup
    bcrypt.genSalt(12, function (err, salt) {
      bcrypt.hash(pwd, salt, async function (err, hash) {
        let user = await userModel.create({ email, password: hash, fullName, isVerified: true });
        return res.status(200).json({ success: true, msg: "User created successfully" });
      });
    });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};


exports.login = async (req, res) => {
  try {
    let { email, pwd } = req.body;

    let user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, msg: "User not found" });
    }
    if (!user.isVerified) {
      return res.status(400).json({ success: false, msg: "Email not verified" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(pwd, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, msg: "Invalid password" });
    }

    // Generate JWT token
    let token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "7d" });

    res.status(200).json({ success: true, msg: "User logged in successfully", token, fullName: user.fullName });
  } catch (error) {
    return res.status(500).json({ success: false, msg: error.message });
  }
};


function getStartupCode(language) {
  if (language.toLowerCase() === "python") {
    return 'print("Hello World")';
  } else if (language.toLowerCase() === "java") {
    return 'public class Main { public static void main(String[] args) { System.out.println("Hello World"); } }';
  } else if (language.toLowerCase() === "javascript") {
    return 'console.log("Hello World");';
  } else if (language.toLowerCase() === "cpp") {
    return '#include <iostream>\n\nint main() {\n    std::cout << "Hello World" << std::endl;\n    return 0;\n}';
  } else if (language.toLowerCase() === "c") {
    return '#include <stdio.h>\n\nint main() {\n    printf("Hello World\\n");\n    return 0;\n}';
  } else if (language.toLowerCase() === "go") {
    return 'package main\n\nimport "fmt"\n\nfunc main() {\n    fmt.Println("Hello World")\n}';
  } else if (language.toLowerCase() === "bash") {
    return 'echo "Hello World"';
  } else {
    return 'Language not supported';
  }
}


exports.createProj = async (req, res) => {
  try {

    let { name, projLanguage, token, version } = req.body;
    let decoded = jwt.verify(token, JWT_SECRET);
    let user = await userModel.findOne({ _id: decoded.userId });

    if (!user) {
      return res.status(404).json({
        success: false,
        msg: "User not found"
      });
    };

    let project = await projectModel.create({
      name: name,
      projLanguage: projLanguage,
      createdBy: user._id,
      code: getStartupCode(projLanguage),
      version: version
    });


    return res.status(200).json({
      success: true,
      msg: "Project created successfully",
      projectId: project._id
    });


  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: error.message
    })
  }
};


exports.saveProject = async (req, res) => {
  try {

    let { token, projectId, code } = req.body;
    console.log("DATA: ",token, projectId, code)
    let decoded = jwt.verify(token, JWT_SECRET);
    let user = await userModel.findOne({ _id: decoded.userId });

    if (!user) {
      return res.status(404).json({
        success: false,
        msg: "User not found"
      });
    };

    let project = await projectModel.findOneAndUpdate({ _id: projectId }, {code: code});

    return res.status(200).json({
      success: true,
      msg: "Project saved successfully"
    });

  } catch (error) {
    console.log(error)
    return res.status(500).json({
      success: false,
      msg: error.message
    })
  }
};


exports.getProjects = async (req, res) => {
  try {

    let { token } = req.body;
    let decoded = jwt.verify(token, JWT_SECRET);
    let user = await userModel.findOne({ _id: decoded.userId });

    if (!user) {
      return res.status(404).json({
        success: false,
        msg: "User not found"
      });
    }

    let projects = await projectModel.find({ createdBy: user._id });

    return res.status(200).json({
      success: true,
      msg: "Projects fetched successfully",
      projects: projects
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: error.message
    })
  }
};


exports.getProject = async (req, res) => {
  try {

    let { token, projectId } = req.body;
    let decoded = jwt.verify(token, JWT_SECRET);
    let user = await userModel.findOne({ _id: decoded.userId });

    if (!user) {
      return res.status(404).json({
        success: false,
        msg: "User not found"
      });
    }

    let project = await projectModel.findOne({ _id: projectId });

    if (project) {
      return res.status(200).json({
        success: true,
        msg: "Project fetched successfully",
        project: project
      });
    }
    else {
      return res.status(404).json({
        success: false,
        msg: "Project not found"
      });
    }

  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: error.message
    })
  }
};


exports.deleteProject = async (req, res) => {
  try {

    let { token, projectId } = req.body;
    let decoded = jwt.verify(token, JWT_SECRET);
    let user = await userModel.findOne({ _id: decoded.userId });

    if (!user) {
      return res.status(404).json({
        success: false,
        msg: "User not found"
      });
    }

    let project = await projectModel.findOneAndDelete({ _id: projectId });

    return res.status(200).json({
      success: true,
      msg: "Project deleted successfully"
    })

  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: error.message
    })
  }
};


exports.editProject = async (req, res) => {
  try {

    let {token, projectId, name} = req.body;
    let decoded = jwt.verify(token, JWT_SECRET);
    let user = await userModel.findOne({ _id: decoded.userId });

    if (!user) {
      return res.status(404).json({
        success: false,
        msg: "User not found"
      });
    };

    let project = await projectModel.findOne({ _id: projectId });
    if(project){
      project.name = name;
      await project.save();
      return res.status(200).json({
        success: true,
        msg: "Project edited successfully"
      })
    }
    else{
      return res.status(404).json({
        success: false,
        msg: "Project not found"
      })
    }

  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: error.message
    })
  }
};
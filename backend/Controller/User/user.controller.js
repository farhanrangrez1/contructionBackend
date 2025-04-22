// controllers/userController.js
const User  = require('../../Model/user.model');
const multer = require('multer');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, '../public/img/users');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer storage
const multerStorage = multer.memoryStorage();

// Filter to ensure only images are uploaded
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new Error('Not an image! Please upload only images.'), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter
});

exports.uploadUserPhoto = upload.single('profileImage');

exports.resizeUserPhoto = async (req, res, next) => {
  try {
    if (!req.file) return next();
    
    req.file.filename = `user-${Date.now()}.jpeg`;
    
    await sharp(req.file.buffer)
      .resize(500, 500)
      .toFormat('jpeg')
      .jpeg({ quality: 90 })
      .toFile(`public/img/users/${req.file.filename}`);
    
    next();
  } catch (err) {
    return res.status(400).json({
      status: 'fail',
      message: 'Error processing image'
    });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    
    res.status(200).json({
      status: 'success',
      results: users.length,
      data: {
        users
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};

exports.createUser = async (req, res) => {
  try {
    // Check if passwords match
    if (req.body.password !== req.body.passwordConfirm) {
      return res.status(400).json({
        status: 'fail',
        message: 'Passwords do not match'
      });
    }
    
    // Set profile image if uploaded
    if (req.file) {
      req.body.profileImage = req.file.filename;
    }
    
    // Set permissions
    const permissions = {
      viewProjectDetails: !!req.body.viewProjectDetails,
      editProjectInformation: !!req.body.editProjectInformation,
      manageTeamMembers: !!req.body.manageTeamMembers,
      accessFinancialData: !!req.body.accessFinancialData
    };
    
    req.body.permissions = permissions;
    
    const newUser = await User.create(req.body);
    
    // Remove password from response
    newUser.password = undefined;
    
    res.status(201).json({
      status: 'success',
      data: {
        user: newUser
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({
        status: 'fail',
        message: 'No user found with that ID'
      });
    }
    
    res.status(200).json({
      status: 'success',
      data: {
        user
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    // Remove password fields from update
    if (req.body.password || req.body.passwordConfirm) {
      return res.status(400).json({
        status: 'fail',
        message: 'This route is not for password updates. Please use /updatePassword.'
      });
    }
    
    // Set profile image if uploaded
    if (req.file) {
      req.body.profileImage = req.file.filename;
    }
    
    // Update permissions if provided
    if (req.body.viewProjectDetails !== undefined || 
        req.body.editProjectInformation !== undefined ||
        req.body.manageTeamMembers !== undefined ||
        req.body.accessFinancialData !== undefined) {
      
      req.body.permissions = {
        viewProjectDetails: !!req.body.viewProjectDetails,
        editProjectInformation: !!req.body.editProjectInformation,
        manageTeamMembers: !!req.body.manageTeamMembers,
        accessFinancialData: !!req.body.accessFinancialData
      };
    }
    
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    
    if (!user) {
      return res.status(404).json({
        status: 'fail',
        message: 'No user found with that ID'
      });
    }
    
    res.status(200).json({
      status: 'success',
      data: {
        user
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    
    if (!user) {
      return res.status(404).json({
        status: 'fail',
        message: 'No user found with that ID'
      });
    }
    
    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};
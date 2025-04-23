const User  = require('../Model/user.model');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
//const { cloudinary } = require('../Config/cloudinary_config');

const uploadsDir = path.join(__dirname, '../public/img/users');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}


const multerStorage = multer.memoryStorage();

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
    if (req.body.password !== req.body.passwordConfirm) {
      return res.status(400).json({
        status: 'fail',
        message: 'Passwords do not match'
      });
    }
    
    let profileImage = null;
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.buffer.toString('base64'), {
        folder: 'user_profiles',
        resource_type: 'auto'
      });
      profileImage = result.secure_url;
    } else if (req.body.profileImage) {
      profileImage = req.body.profileImage;
    }
    
    const permissions = req.body.permissions || {
      viewProjectDetails: false,
      editProjectInformation: false,
      manageTeamMembers: false,
      accessFinancialData: false
    };
    
    const userData = {
      ...req.body,
      permissions,
      profileImage
    };
    
    const newUser = await User.create(userData);
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
    if (req.body.password || req.body.passwordConfirm) {
      return res.status(400).json({
        status: 'fail',
        message: 'This route is not for password updates. Please use /updatePassword.'
      });
    }
    if (req.file) {
      req.body.profileImage = req.file.filename;
    }
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
      message: 'User deleted successfully',
      data: null
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};
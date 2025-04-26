const BuildingCategory = require("../Model/buildingCategoryModel");
const asyncHandler = require("express-async-handler");


// Create Building Category (POST)
const addBuildingCategory = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({
      success: false,
      message: 'Category name is required'
    });
  }

  try {
    const newBuildingCategory = new BuildingCategory({ name });
    await newBuildingCategory.save();

    res.status(201).json({
      success: true,
      message: 'Building category added successfully',
      data: newBuildingCategory
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Get All Building Categories (GET)
const getAllBuildingCategories = async (req, res) => {
  try {
    const categories = await BuildingCategory.find();
    if (categories.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No categories found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Building categories fetched successfully',
      data: categories
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Get Building Category by ID (GET)
const getBuildingCategoryById = async (req, res) => {
  const { categoryId } = req.params;

  try {
    const category = await BuildingCategory.findById(categoryId);
    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Building category not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Building category fetched successfully',
      data: category
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Update Building Category (PUT)
const updateBuildingCategory = async (req, res) => {
  const { categoryId } = req.params;
  const { name } = req.body;

  try {
    const category = await BuildingCategory.findByIdAndUpdate(categoryId, { name }, { new: true });
    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Building category not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Building category updated successfully',
      data: category
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Delete Building Category (DELETE)
const deleteBuildingCategory = async (req, res) => {
  const { categoryId } = req.params;

  try {
    const category = await BuildingCategory.findByIdAndDelete(categoryId);
    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Building category not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Building category deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

module.exports = {
  addBuildingCategory,
  getAllBuildingCategories,
  getBuildingCategoryById,
  updateBuildingCategory,
  deleteBuildingCategory
};
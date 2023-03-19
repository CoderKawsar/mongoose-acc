const {
  getCategoriesService,
  createCategoryService,
  updateACategoryService,
  deleteACategoryService,
  getACategoryService,
} = require("../services/category.service");

module.exports.getCategories = async (req, res, next) => {
  try {
    const categories = await getCategoriesService();

    res.status(200).json({
      status: "success",
      data: categories,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "Failed to get data",
      error: error.message,
    });
  }
};

exports.getACategory = async (req, res) => {
  try {
    const category = await getACategoryService(req.params.id);

    if (!category) {
      return res.status(400).json({
        status: "fail",
        message: "Couldn't find any category",
      });
    }

    res.status(200).json({
      status: "success",
      data: category,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error: error.message,
      message: "Couldn't get the category",
    });
  }
};

module.exports.createCategory = async (req, res) => {
  try {
    // using save
    const result = await createCategoryService(req.body);

    res.status(200).json({
      status: "success",
      message: "Category saved successfully!",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "Category not saved",
      error: error.message,
    });
  }
};

module.exports.updateCategory = async (req, res) => {
  try {
    const result = await updateACategoryService(req.params.id, req.body);
    res.status(200).json({
      status: "success",
      message: "Category updated successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "Couldn't update category",
      error: error.message,
    });
  }
};

module.exports.deleteCategory = async (req, res) => {
  try {
    const result = await deleteACategoryService(req.params.id);

    if (result.deletedCount) {
      res.status(200).json({
        status: "success",
        message: "Category deleted successfully",
        data: result,
      });
    } else {
      res.status(400).json({
        status: "failed",
        message: "Couldn't delete Category",
      });
    }
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "Couldn't delete Category",
      error: error.message,
    });
  }
};

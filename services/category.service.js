const Category = require("../models/Category");

exports.getCategoriesService = async () => {
  const categories = await Category.find({});

  return { categories };
};

exports.getACategoryService = async (id) => {
  const category = await Category.findOne({ _id: id });

  return { category };
};

exports.createCategoryService = async (data) => {
  const category = await Category.create(data);

  return { category };
};

exports.updateACategoryService = async (id, data) => {
  const category = await Category.updateOne({ _id: id }, data, {
    runValidators: true,
  });

  return category;
};

exports.deleteACategoryService = async (id) => {
  const category = await Category.deleteOne({ _id: id });
  return category;
};

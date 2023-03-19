const Brand = require("../models/Brand");

exports.getBrandsService = async () => {
  // const brands = await Brand.find({}).select("-products -suppliers");
  const brands = await Brand.find({}).populate("products");

  return { brands };
};

exports.getABrandService = async (id) => {
  const brand = await Brand.findOne({ _id: id }).select("-products -suppliers");

  return { brand };
};

exports.createBrandService = async (data) => {
  const brand = await Brand.create(data);

  return { brand };
};

exports.updateABrandService = async (id, data) => {
  const brand = await Brand.updateOne({ _id: id }, data, {
    runValidators: true,
  });

  return brand;
};

exports.deleteABrandService = async (id) => {
  const brand = await Brand.deleteOne({ _id: id });
  return brand;
};

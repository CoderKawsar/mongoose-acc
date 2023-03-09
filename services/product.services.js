const Product = require("../models/Product");

exports.getProductService = async () => {
  // const products = await Product.find({ _id: "6408a34606391a7010b228d7" });

  // const products = await Product.find({
  //   $or: [{ _id: "6408a446e6172526c287bc67" }, { name: "Hammer" }],
  // });

  // const products = await Product.find({
  //   status: { $ne: "out-of-stock" },
  // });

  // const products = await Product.find({
  //   quantity: { $gte: 20 },
  // });

  // const products = await Product.find({
  //   name: { $in: ["chal", "dal"] },
  // });

  // only name and quantity fields are served
  // const products = await Product.find({}, "name quantity");

  // all fields shown except name and quantity
  // const products = await Product.find({}, "-name -quantity");

  // only limited(2) products should be shown
  // const products = await Product.find({}, "-name -quantity").limit(2);

  // sort data by quantity in descending order
  // const products = await Product.find({}).sort({
  //   quantity: -1,
  // });

  // projection - only name field to be shown
  // const products = await Product.find({}).select({
  //   name: 1,
  // });

  // const products = await Product.find({}).where("name").equals("Hammer");
  // const products = await Product.find({})
  //   .where("name")
  //   .equals("Hammer")
  //   .where("quantity")
  //   .gte(10);

  // const products = await Product.find({})
  //   .where("name")
  //   .equals(/\w/)
  //   .where("quantity")
  //   .gt(10)
  //   .limit(3);

  // finding single product
  // const products = await Product.findById("6408a446e6172526c287bc67");
  // const products = await Product.findById(undefined);
  // const products = await Product.find({ _id: undefined });
  const products = await Product.find({});
  return products;
};

exports.createProductService = async (data) => {
  const product = new Product(data);
  const result = await product.save();

  // using create
  // const result = await Product.create(req.body);

  // const product = new Product(req.body);
  // if (product.quantity == 0) {
  //   product.status = "out-of-stock";
  // }
  // const result = await product.save();

  return result;
};

const Product = require("../models/Product");
const { faker } = require("@faker-js/faker");

exports.getProductService = async (filters, queries) => {
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
  // const products = await Product.find(query).sort("name quantity price");
  // const products = await Product.find(query);
  // const products = await Product.find({filters})
  //   .select(queries.fields)
  //   .sort(queries.sortBy);
  const products = await Product.find(filters)
    .select(queries.fields)
    .sort(queries.sortBy)
    .skip((queries.page - 1) * queries.limit)
    .limit(queries.limit);
  const totalProducts = await Product.countDocuments(filters);
  const pageCount = Math.ceil(totalProducts / queries.limit);
  return { totalProducts, pageCount, products };
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

exports.updateProductService = async (productId, data) => {
  //   const result = await Product.updateOne(
  //     { _id: productId },
  //     { $set: data },
  //     { runValidators: true }
  //   );

  //   const result = await Product.updateOne(
  //     { _id: productId },
  //     { $inc: 3 },
  //     { runValidators: true }
  //   );

  const product = await Product.findById(productId);
  const result = await product.set(data).save();
  return result;
};

exports.bulkUpdateProductService = async (data) => {
  // const result = await Product.updateMany({ _id: data.ids }, data.data, {
  //   runValidators: true,
  // });

  const products = [];
  data.products.forEach((product) => {
    products.push(Product.updateOne({ _id: product.id }, product.data));
  });

  const result = await Promise.all(products);
  return result;
};

exports.deleteProductService = async (id) => {
  const result = await Product.deleteOne({ _id: id });
  return result;
};

exports.bulkDeleteProductService = async (ids) => {
  // const result = await Product.deleteMany({ _id: { $in: ids } });

  // this'll delete every product in the db
  const result = await Product.deleteMany({});

  // const result = await Product.deleteMany({ _id: ids });
  return result;
};

exports.seedProductsService = async (productNo) => {
  const statuses = ["in-stock", "out-of-stock", "discontinued"];
  const units = ["kg", "litre", "pcs"];
  for (let i = 0; i < productNo; i++) {
    let generatedProductName = faker.commerce.product();
    let foundProduct = await Product.findOne({
      name: generatedProductName,
    });

    if (foundProduct) {
      generatedProductName = generatedProductName + " " + i;
    }
    await Product.create({
      name: generatedProductName,
      description: faker.lorem.paragraph(),
      price: faker.commerce.price(),
      quantity: Math.floor(Math.random() * 121),
      unit: units[Math.floor(Math.random() * 3)],
      status: statuses[Math.floor(Math.random() * 3)],
    });
  }
};

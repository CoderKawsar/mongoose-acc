const { ObjectId } = require("mongodb");
const Stock = require("../models/Stock");

exports.getStocksService = async (filters, queries) => {
  console.log("filters", filters, "queries", queries);
  const stocks = await Stock.find({ filters })
    .select(queries.fields)
    .skip(queries.skip)
    .limit(queries.limit)
    .sort(queries.sortBy);

  const totalStocks = await Stock.countDocuments(filters);
  const totalPages = Math.ceil(totalStocks / queries.limit);
  return { totalStocks, totalPages, stocks };
};

exports.getAStockByIdService = async (id) => {
  // const stock = await Stock.findOne({ _id: id })
  //   .populate("store.id")
  //   .populate("brand.id")
  //   .populate("supplier.id");

  const stock = await Stock.aggregate([
    {
      $match: { _id: ObjectId(id) },
    },
    {
      $project: {
        category: 1,
        quantity: 1,
        price: 1,
        productId: 1,
        name: 1,
        "brand.name": { $toLower: "$brand.name" },
      },
    },
    {
      $lookup: {
        from: "brands",
        localField: "brand.name",
        foreignField: "name",
        as: "brandDetails",
      },
    },
  ]);

  // const stocks = await Stock.aggregate([
  //   {
  //     $match: { "store.name": "dhaka" },
  //   },
  // ]);
  // const stocks = await Stock.aggregate([
  //   {
  //     $match: {},
  //   },
  // ]);
  const stocks = await Stock.aggregate([
    {
      $match: {},
    },
    {
      $project: {
        store: 1,
        price: { $convert: { input: "$price", to: "int" } },
        quantity: 1,
      },
    },
    {
      $group: {
        _id: "$store.name",
        totalProductPrice: {
          $sum: { $multiply: ["$price", "$quantity"] },
        },
      },
    },
  ]);

  return { stock };
};

exports.createAStockService = async (data) => {
  const stock = await Stock.create(data);

  return { stock };
};

exports.updateAStockService = async (id, data) => {
  const stock = await Stock.updateOne({ _id: id }, data, {
    runValidators: true,
  });

  return stock;
};

exports.deleteAStockService = async (id) => {
  const stock = await Stock.deleteOne({ _id: id });
  return stock;
};

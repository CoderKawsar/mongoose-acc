const Store = require("../models/Store");

exports.getStoresService = async () => {
  const stores = await Store.find({});

  return { stores };
};

exports.getAStoreService = async (id) => {
  const store = await Store.findOne({ _id: id });

  return { brand: store };
};

exports.createStoreService = async (data) => {
  const store = await Store.create(data);

  return { brand: store };
};

exports.updateAStoreService = async (id, data) => {
  const store = await Store.updateOne({ _id: id }, data, {
    runValidators: true,
  });

  return store;
};

exports.deleteAStoreService = async (id) => {
  const store = await Store.deleteOne({ _id: id });
  return store;
};

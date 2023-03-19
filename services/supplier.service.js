const Store = require("../models/Store");
const Supplier = require("../models/Supplier");

exports.getSuppliersService = async () => {
  const suppliers = await Supplier.find({});

  return { suppliers };
};

exports.getASupplierByIdService = async (id) => {
  const supplier = await Supplier.findOne({ _id: id });

  return { supplier };
};

exports.createSupplierService = async (data) => {
  const supplier = await Supplier.create(data);

  return { supplier };
};

exports.updateASupplierService = async (id, data) => {
  const supplier = await Supplier.updateOne({ _id: id }, data, {
    runValidators: true,
  });

  return supplier;
};

exports.deleteASupplierService = async (id) => {
  const supplier = await Supplier.deleteOne({ _id: id });
  return supplier;
};

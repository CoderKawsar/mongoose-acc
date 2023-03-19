const {
  getStoresService,
  createStoreService,
  getAStoreService,
  updateAStoreService,
  deleteAStoreService,
} = require("../services/store.service");

exports.getStores = async (req, res) => {
  try {
    const result = await getStoresService();
    res.status(200).json({
      status: "success",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error: error.message,
      message: "Couldn't get the Stores",
    });
  }
};

exports.getAStore = async (req, res) => {
  try {
    const result = await getAStoreService(req.params.id);

    if (!result) {
      return res.status(400).json({
        status: "fail",
        message: "Couldn't find any store",
      });
    }

    res.status(200).json({
      status: "success",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error: error.message,
      message: "Couldn't get the store",
    });
  }
};

exports.createStore = async (req, res) => {
  try {
    const result = await createStoreService(req.body);
    res.status(200).json({
      status: "success",
      message: "Successfully created the store",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error: error.message,
      message: "Couldn't create a store",
    });
  }
};

exports.updateStore = async (req, res) => {
  try {
    const result = await updateAStoreService(req.params.id, req.body);
    if (result.modifiedCount) {
      res.status(200).json({
        status: "success",
        message: "Successfully updated the store",
        data: result,
      });
    } else {
      res.status(400).json({
        status: "fail",
        message: "Couldn't update the store",
      });
    }
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error: error.message,
      message: "Couldn't update the store",
    });
  }
};

exports.deleteAStore = async (req, res) => {
  try {
    const result = await deleteAStoreService(req.params.id);
    if (result.deletedCount) {
      res.status(200).json({
        status: "success",
        message: "Successfully deleted the store",
        data: result,
      });
    } else {
      res.status(400).json({
        status: "fail",
        message: "Couldn't delete the store",
      });
    }
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error: error.message,
      message: "Couldn't delete the store",
    });
  }
};

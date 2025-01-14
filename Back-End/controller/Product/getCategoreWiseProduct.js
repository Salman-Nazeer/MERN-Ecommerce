import productModel from "../../models/productModel.js";

const getCategoreWiseProduct = async (req, res) => {
  try {
    const { category } = req?.body || req?.query;
    const products = await productModel.find({ category });

    res.status(200).json({
      message: "Product",
      data: products,
      success: true,
      error: false,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};

export default getCategoreWiseProduct;

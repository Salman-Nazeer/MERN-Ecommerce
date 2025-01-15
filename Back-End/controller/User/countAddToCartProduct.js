import addToCartModel from "../../models/cartProductModel.js";
const countAddToCartProduct = async (req, res) => {
  try {
    const userId = req.userId;

    const count = await addToCartModel.countDocuments({ userId: userId });

    res.status(200).json({
      message: "OK",
      data: { count: count },
      error: false,
      succes: true,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      succes: false,
    });
  }
};
export default countAddToCartProduct;

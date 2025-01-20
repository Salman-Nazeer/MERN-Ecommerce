import addToCartModel from "../../models/cartProductModel.js";

const deleteAddToCart = async (req, res) => {
  try {
    const currentUserId = req.userId;

    const addToCartProductId = req?.body?._id;

    const deleteProduct = await addToCartModel.deleteOne({
      _id: addToCartProductId,
    });

    res.status(200).json({
      data: deleteProduct,
      message: "Product Deleted",
      error: false,
      success: true,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      succes: false,
    });
  }
};

export default deleteAddToCart;

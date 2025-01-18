import addToCartModel from "../../models/cartProductModel.js";

const updateAddToCartProduct = async (req, res) => {
  try {
    const currentUserId = req.userId;
    const addToCartProductId = req?.body?._id;

    const qty = req.body.quantity;

    const updateProduct = await addToCartModel.updateOne(
      { _id: addToCartProductId },
      {
        ...(qty && { quantity: qty }),
      }
    );

    res.status(200).json({
      data: updateProduct,
      message: "Product Updated",
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

export default updateAddToCartProduct;

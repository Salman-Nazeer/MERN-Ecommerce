import addToCartModel from "../../models/cartProductModel.js";

async function addTocartViewProduct(req, res) {
  try {
    const currentUser = req.userId;
    // console.log("currentUser", currentUser);

    const allProducts = await addToCartModel
      .find({
        userId: currentUser,
      })
      .populate("productId");

    // console.log("allProducts", allProducts);
    res.status(200).json({
      message: "All Products",
      data: allProducts,
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
}

export default addTocartViewProduct;

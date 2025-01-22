import productModel from "../../models/productModel.js";

const searchProduct = async (req, res) => {
  try {
    const query = req.query.query;

    const regex = RegExp(query, "i", "g");

    const product = await productModel.find({
      $or: [
        {
          productName: regex,
        },
        {
          category: regex,
        },
      ],
    });

    res.status(200).json({
      message: "Search Product List",
      data: product,
      success: true,
      error: false,
    });
    console.log("query", query);
  } catch (err) {
    res.status(400).json({
      message: err?.message || err,
      error: true,
      success: false,
    });
  }
};

export default searchProduct;

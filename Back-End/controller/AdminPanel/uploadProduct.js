import uploadProductPermission from "../../helpers/permission.js";
import productModel from "../../models/productModel.js";

async function UploadProductController(req, res) {
  try {
      const sessionUserId = req.userId;
      if (!uploadProductPermission(sessionUserId)) {
        throw new Error("Permission denied")
      }

    const uploadProduct = new productModel(req.body);
    const saveProduct = await uploadProduct.save();

    res.status(200).json({
      data: saveProduct,
      message: "Product Uploded Successfully",
      error: false,
      success: true,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}

export default UploadProductController;

import ProductModel from "../../models/productModel.js";
import cloudinary from "cloudinary";

// Configure Cloudinary
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const deleteProduct = async (req, res) => {
  try {
    const { productId } = req.body;

    // Find the product to get the image public IDs
    const product = await ProductModel.findById(productId);
    console.log("product Id", product);
    if (!product) {
      return res.status(404).json({
        message: "Product not found",
        success: false,
        error: true,
      });
    }

    // Extract the productImage array
    const productImages = product.productImage;
    console.log("productImages", productImages);

    // Delete images from Cloudinary one by one
    const imageDeletionPromises = productImages.map((imageUrl) => {
      // Extract public ID from URL
      const publicId = imageUrl.split("/").slice(-3).join("/").split(".")[0];
      console.log("Extracted publicId:", publicId);
      return cloudinary.v2.uploader
        .destroy(publicId)
        .then((result) => {
          console.log(`Deleted ${publicId}:`, result);
          return result;
        })
        .catch((error) => {
          console.error(`Error deleting ${publicId}:`, error);
          throw error;
        });
    });

    await Promise.all(imageDeletionPromises);

    // Delete the product from the database
    const deleteResult = await ProductModel.deleteOne({ _id: productId });

    if (deleteResult.deletedCount === 0) {
      return res.status(404).json({
        message: "Product not found",
        success: false,
        error: true,
      });
    }

    res.status(200).json({
      message: "Product and images deleted successfully",
      success: true,
      error: false,
    });
  } catch (err) {
    console.error("Error deleting product:", err);
    res.status(500).json({
      message: err.message || "Internal server error",
      success: false,
      error: true,
    });
  }
};

export default deleteProduct;

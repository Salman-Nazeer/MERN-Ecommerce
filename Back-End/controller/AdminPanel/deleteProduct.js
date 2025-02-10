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
    console.log("Received request to delete product with ID:", productId);

    // Find the product to get the image URLs
    const product = await ProductModel.findById(productId);
    if (!product) {
      console.log("Product not found for ID:", productId);
      return res.status(404).json({
        message: "Product not found",
        success: false,
        error: true,
      });
    }

    // Extract the productImages array
    const productImages = product.productImage;
    console.log("Product images to delete:", productImages);

    // Extract public IDs from image URLs
    const publicIds = productImages.map((imageUrl) => {
      // Split the URL by '/' and get the last segment
      const lastSegment = imageUrl.split("/").pop();

      // Remove the file extension to get the public ID
      const publicId = lastSegment.split(".").slice(0, -1).join(".");

      console.log(publicId);
      return publicId;
    });

    // Delete images from Cloudinary
    const deleteResponse = await cloudinary.v2.api.delete_resources(publicIds);
    console.log("Cloudinary delete response:", deleteResponse);

    // Delete the product from the database
    const deleteResult = await ProductModel.deleteOne({ _id: productId });
    console.log("Database delete result:", deleteResult);

    if (deleteResult.deletedCount === 0) {
      console.log("Failed to delete product from database for ID:", productId);
      return res.status(404).json({
        message: "Product not found",
        success: false,
        error: true,
      });
    }

    console.log(
      "Product and associated images deleted successfully for ID:",
      productId
    );
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

import {
  imageUpload,
  deleteUploadedImage,
} from "../../cloudinary services/index.js";
import productModel from "../../models/Product.js";

export async function handleImageUpload(req, res) {
  try {
    const base64 = req.files.my_file.data.toString("base64");
    const uri = `data:${req.files.my_file.mimetype};base64,${base64}`;
    const result = await imageUpload(uri);

    res.json({
      success: true,
      message: "File Uploaded Successfully",
      result,
    });
  } catch (error) {
    console.log("Product-Controller : ", error);
    res.json({
      success: false,
      message: "handleImageUpload error",
    });
  }
}

export async function handleImageDelete(req, res) {
  const { url } = req.query;
  try {
    const response = await deleteUploadedImage(url);
    res.status(200).json({
      success: true,
      message: "Image Deleted Successfully",
      response,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error,
    });
  }
}

// add new product

export async function addProduct(req, res) {
  const {
    availability,
    brand,
    category,
    description,
    discount,
    image,
    price,
    name,
    stock,
    userId,
  } = req.body;

  try {
    const newProduct = new productModel({
      availability,
      brand,
      category,
      description,
      discount: Number(discount),
      image,
      price: Number(price),
      name,
      stock: Number(stock),
      userId,
    });

    await newProduct.save();
    res.status(200).json({
      success: true,
      message: "New Product Added To Database",
    });
  } catch (error) {
    res.status(402).json({
      success: false,
      message: error,
    });
  }
}

// list all products of user related

export async function listAllProducts(req, res) {
  const userId = req.query.id;
  try {
    const listOfProducts = await productModel.find({ userId: userId });
    res.status(200).json({
      success: true,
      message: "Successfully retrieve products list",
      listOfProducts,
    });
  } catch (error) {
    res.status(402).json({
      success: false,
      message: `Products Listing Error :- ${error}`,
    });
  }
}

// edit a product

export async function editProduct(req, res) {
  try {
    
    const { id } = req.params;
    const {
      availability,
      brand,
      category,
      description,
      discount,
      image,
      price,
      name,
      stock,
      userId,
    } = req.body;
    const data = req.body;
    console.log("id", id);
    console.log("body", data);
    
    const findProduct = await productModel.findByIdAndUpdate(
      id,
      {
        availability,
        brand,
        category,
        description,
        discount: typeof discount === "string" ? Number(discount) : discount,
        image,
        price: typeof price === "string" ? Number(price) : price,
        name,
        stock: typeof stock === "string" ? Number(stock) : stock,
        userId,
      },
      { new: true }
    );
    if (!findProduct)
      return res.status(404).json({
        success: false,
        message: "No such product exists",
      });
    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      findProduct,
      data
    });
  } catch (error) {
    res.status(402).json({
      success: false,
      message: `Edit A Product Error :- ${error}`,
    });
  }
}

// delete a product

export async function deleteProduct(req, res) {
  try {
    const { id } = req.params;
    const product = await productModel.findByIdAndUpdate(id);
    if (!product)
      return res.status(404).json({
        success: false,
        message: "No such product exists",
      });
    await productModel.deleteOne({ _id: id });
    res.status(200).json({
      success: true,
      message: "Product removed successfully",
    });
  } catch (error) {
    res.status(402).json({
      success: false,
      message: `Error in deleting a product :- ${error}`,
    });
  }
}

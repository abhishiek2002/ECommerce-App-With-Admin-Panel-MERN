import Router from "express";
import {
  handleImageUpload,
  addProduct,
  listAllProducts,
  editProduct,
  deleteProduct,
  handleImageDelete,
} from "../../controllers/admin/products-controller.js";
import fileUpload from "express-fileupload";

const router = Router();

router.post("/upload-image", fileUpload(), handleImageUpload);
router.post("/add-product", addProduct);
router.get("/products-list", listAllProducts);
router.put("/edit-Product/:id", editProduct);
router.delete("/delete-product/:id", deleteProduct);
router.delete("/delete-image", handleImageDelete);

export default router;

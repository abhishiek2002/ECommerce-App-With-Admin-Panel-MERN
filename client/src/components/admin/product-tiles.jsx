import React, { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "../ui/button";
import axios from "axios";
import { useDispatch } from "react-redux";
import { removeProduct } from "@/store/admin/productSlice";
import { toast } from "sonner";

const AdminProductTile = ({
  product,
  setCurrentEditedId,
  setOpenCreateProductsDialog,
  setFormData,
  setUploadedImageUrl,
  setImageFile,
  setDisable
}) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const currentEditProduct = () => {
    setCurrentEditedId(product._id);
    setOpenCreateProductsDialog(true);
    setFormData(product);
    setUploadedImageUrl(product.image)
    setImageFile({name: product.name})
    setDisable(false)
  };

  const deleteCurrentProduct = async () => {
    setLoading(true);
    // deleting product from database
    await axios.delete(
      `http://localhost:3000/api/admin/products/delete-product/${product._id}`
    );

    // deleting product image from storage
    await axios.delete(
      `http://localhost:3000/api/admin/products/delete-image?url=${product.image}`
    );

    // updating product list in store
    dispatch(removeProduct(product._id));
    toast.success("Product deleted successfully");
    setLoading(false);
  };

  return (
    <div className="relative h-full">
      <Card className="max-w-sm pt-0 mx-auto h-full w-full relative flex flex-col justify-between">
        {loading ? (
          <div className="absolute w-full h-full bg-gray-500/90 rounded-lg flex justify-center items-center z-10">
            <div className="rounded-full w-12 h-12 border-t-black border-2 animate-spin"></div>
          </div>
        ) : null}

        <div className="relative">
          <img
            src={product?.image}
            alt={product?.name}
            className="w-full h-[300px] object-cover rounded-t-lg"
          />
        </div>
        <CardContent>
          <h2 className="text-xl font-bold mb-2">{product?.name}</h2>
          <div className="flex justify-between items-center mb-2">
            <div className="flex gap-2 items-center">
              <span
                className={` ${
                  product?.discount > 0 ? "line-through" : ""
                } text-lg font-semibold text-primary`}
              >
                ${product?.price}
              </span>
              <span className={`text-red-600 text-sm border p-1`}>
                {" "}
                {product?.discount}% discount{" "}
              </span>
            </div>
            <span>=</span>
            <span className={`text-lg font-bold`}>
              ${(product?.price * (100 - product?.discount)) / 100}
            </span>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          <Button onClick={() => currentEditProduct()}>Edit</Button>
          <Button
            onClick={() => deleteCurrentProduct()}
            className="bg-red-600 text-black"
          >
            Delete
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AdminProductTile;

import CommonForm from "@/components/common/form";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { productFormFields } from "@/config";
import React, { useEffect, useState } from "react";
import { ProductImageUpload } from "@/components/admin/image-upload";
import { useDispatch, useSelector } from "react-redux";
import { addNewProduct, listAllProducts } from "@/store/admin/productSlice";
import { toast } from "sonner";
import AdminProductTile from "@/components/admin/product-tiles";
import axios from "axios";

export default function AdminProduct() {
  const [openCreateProductsDialog, setOpenCreateProductsDialog] =
    useState(false);
  const [formData, setFormData] = useState({});
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [currentEditedId, setCurrentEditedId] = useState(null);
  const [disable, setDisable] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);
  const productList = useSelector((state) => state.adminProducts.productList);

  async function uploadImageToCloudinary() {
    const data = new FormData();
    data.append("my_file", imageFile);
    const response = await axios.post(
      "http://localhost:3000/api/admin/products/upload-image",
      data
    );
    if (response) {
      setUploadedImageUrl(response?.data?.result?.url);
      return response?.data?.result?.url;
    }
    return false;
  }

  async function editProduct(id, formData) {
    const result = await axios.put(
      `http://localhost:3000/api/admin/products/edit-product/${id}`,
      formData,
      { headers: { "Content-Type": "application/json" } }
    );
    return result?.data;
  }

  const onSubmit = async (event) => {
    setLoading(true);
    event.preventDefault();
    if (currentEditedId) {
      // if imageFile size is 0 then it means new image file is not selected  and currentEditedId is availabel that means this form is for editing product
      if (imageFile.size === undefined) {
        // if new imageFile is not selected then no need to update image section in formData
        const response = await editProduct(currentEditedId, formData);
        if (response) {
          setOpenCreateProductsDialog(false);
          setFormData({});
          dispatch(listAllProducts(user.id));
          toast.success("Product has been edited");
        }
      } else {
        // if new imageFile is selected then we have to delete previous image from cloudinary and upload new image to cloudinary and update url in database

        // deleting previous image
        const response = await axios.delete(
          `http://localhost:3000/api/admin/products/delete-image?url=${uploadedImageUrl}`
        );
        // console.log(response.data);

        // uploading new image
        const url = await uploadImageToCloudinary();

        // when new image uploaded then updating database
        if (url) {
          const response = await editProduct(currentEditedId, {
            ...formData,
            image: url,
          });
          if (response) {
            setOpenCreateProductsDialog(false);
            setFormData({});
            dispatch(listAllProducts(user.id));
            toast.success("Product has been edited");
          }
        }
      }
    } else {
      const url = await uploadImageToCloudinary();
      if (url) {
        const response = await dispatch(
          addNewProduct({ image: url, userId: user.id, ...formData })
        );
        if (response) {
          setOpenCreateProductsDialog(false);
          setFormData({});
          setImageFile(null);
          dispatch(listAllProducts(user.id));
          toast.success("Product has been created");
        }
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    dispatch(listAllProducts(user.id));
  }, [dispatch]);

  useEffect(() => {
    if (openCreateProductsDialog === false) {
      setCurrentEditedId(null);
      setFormData({});
      setImageFile(null);
      setUploadedImageUrl("");
    }
  }, [openCreateProductsDialog]);

  return (
    <div>
      <div className="mb-5 w-full flex justify-end z-10 sticky">
        <Button onClick={() => setOpenCreateProductsDialog(true)}>
          Add New Product
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 sm:grid-cols-1">
        {productList && productList.length > 0
          ? productList.map((product) => (
              <div key={product._id}>
                <AdminProductTile
                  product={product}
                  setCurrentEditedId={setCurrentEditedId}
                  setOpenCreateProductsDialog={setOpenCreateProductsDialog}
                  setFormData={setFormData}
                  setUploadedImageUrl={setUploadedImageUrl}
                  setImageFile={setImageFile}
                  setDisable={setDisable}
                />
              </div>
            ))
          : null}
      </div>
      <Sheet
        open={openCreateProductsDialog}
        onOpenChange={() => setOpenCreateProductsDialog(false)}
      >
        <SheetContent side="right" className="overflow-auto">
          <SheetHeader>
            <SheetTitle className="text-2xl font-extrabold">
              {currentEditedId === null ? "Add New Product" : "Edit Product"}
            </SheetTitle>
          </SheetHeader>

          <ProductImageUpload
            imageFile={imageFile}
            setImageFile={setImageFile}
            setDisable={setDisable}
            uploadedImageUrl={uploadedImageUrl}
            setUploadedImageUrl={setUploadedImageUrl}
            currentEditedId={currentEditedId}
          />

          <div className="py-6 px-4">
            <CommonForm
              onSubmit={onSubmit}
              formControls={productFormFields}
              buttonText={
                currentEditedId === null ? "Add Product" : "Edit Product"
              }
              formData={formData}
              setFormData={setFormData}
              disable={disable}
              loading={loading}
            />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

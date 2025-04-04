import { useEffect, useRef, useState } from "react";
import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export function ProductImageUpload({
  imageFile,
  setImageFile,
  uploadedImageUrl,
  setUploadedImageUrl,
  currentEditedId,
  setDisable,
}) {
  const inputRef = useRef(null);

  const [imagePreviewUrl, setImagePreviewUrl] = useState("");

  const handleImageFileChange = (event) => {
    // console.log(event.target.files);
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setImageFile(selectedFile);

      // creating url for selected file for preview to user
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreviewUrl(e.target.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files?.[0];
    if (droppedFile) setImageFile(droppedFile);
  };

  const handleRemoveImage = async (event) => {
    setImageFile(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  //   console.log(imageFile);

  useEffect(() => {
    if (imageFile !== null) {
      setDisable(false);
    } else setDisable(true);
  }, [imageFile]);

  return (
    <div className="w-full max-w-md mx-auto">
      <Label className="text-xl text-center block">Upload Image</Label>
      <div onDragOver={handleDragOver} onDrop={handleDrop}>
        <Input
          type="file"
          id="image-upload"
          className="hidden"
          onChange={handleImageFileChange}
          ref={inputRef}
        />
        {!imageFile ? (
          <Label
            htmlFor="image-upload"
            className=" flex flex-col justify-center items-center w-9/10 border h-32 mx-auto my-2"
          >
            <UploadCloudIcon className="w-10 h-10 text-muted-foreground" />
            <span>Drag & drop or click to upload image</span>
          </Label>
        ) : (
          <div className="flex flex-col items-center justify-between w-9/10 border h-32 mx-auto my-2 px-2 py-2">
            <div className="w-full flex items-center justify-between">
              <div className="flex items-center">
                <FileIcon className="w-8 h-8" />
                <p className="text-md">{imageFile.name}</p>
              </div>
              <Button
                className="cursor-pointer text-muted-foreground"
                variant="ghost"
                onClick={handleRemoveImage}
              >
                <XIcon />
                <span className="sr-only">Remove imageFile</span>
              </Button>
            </div>

            <div className="w-full relative">
              <img
                src={
                  imagePreviewUrl !== "" ? imagePreviewUrl : uploadedImageUrl
                }
                alt="loading..."
                className="w-full object-cover object-center h-[80px]"
              />
              <p className="absolute bottom-0 bg-gray-300/70 text-white px-4 w-full">
                Image preview
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

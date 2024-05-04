import React, { ChangeEvent, useRef, useState, useTransition } from "react";
import ReuseableBackground from "./ReuseableBackground";
import { MdCancel } from "react-icons/md";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { FaCamera } from "react-icons/fa6";
import Image from "next/image";
import { Controller, useForm } from "react-hook-form";
import { useAccount } from "../context/AccountContext";
import { useRouter } from "next/navigation";
import { BsDownload } from "react-icons/bs";
import { useToast } from "~/components/ui/use-toast";
import axios from "axios";

const ProductForm = () => {
  const [tags, setTags] = useState<string[]>([]);
  const [inputValuee, setInputValuee] = useState("");
  const { account, accountData, isLoggedIn } = useAccount();
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const { toast } = useToast();

  const handleSuccessful = () => {
    toast({
      description: "Prosuct submitted successfully.",
    });
  };

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInputValuee(e.target.value);
  }

  const handleAddTag = () => {
    if (inputValuee.trim() !== "") {
      setTags([...tags, inputValuee.trim()]);
      setInputValuee("");
    }
  };

  const handleDeleteTag = (tagIndex: any) => {
    // Create a copy of the tags array
    const newTags = [...tags];
    // Remove the tag at the specified index
    newTags.splice(tagIndex, 1);
    // Update the state with the new tags array
    setTags(newTags);
  };

  // for image handling
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [images, setImages] = useState<string[]>([]); // Store image data

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const files = Array.from(event.target.files); // Convert FileList to Array
      const imageURLs = files.map((file) => URL.createObjectURL(file)); // Create URLs for display
      setImages((prev: string[]) => [...prev, ...imageURLs]); // Update state with new images
    }
  };

  const removeImage = (indexToRemove: number) => {
    setImages((prev: string[]) =>
      prev.filter((_, index) => index !== indexToRemove)
    ); // Remove image by index
  };

  // adding product

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  // const hasDecimalDigits = /\.\d+$/.test(
  //   data.price.toString() && data.discount.toString()
  // );

  // if (!hasDecimalDigits) {
  //   data.price = parseFloat(data.price).toFixed(2);
  //   data.discount = parseFloat(data.discount).toFixed(2);
  // }
  const onSubmit = async (data: any) => {
    setIsLoading(true);

    data.price = Number(data.price);
    data.discount = Number(data.discount);
    data.quantity = Number(data.quantity);

    data.categories = [data.categories];
    data.tags = [tags]

    console.log(data);
    const apiUrl = "https://mintyplex-api.onrender.com/api/v1/product";
    try {
      const formData = new FormData();
      for (const key in data) {
        formData.append(key, data[key]);
      }

      const response = await axios.postForm(
        `${apiUrl}/${accountData}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Set content type for FormData
          },
        }
      );
      setIsLoading(false);
      reset();
      handleSuccessful();
      return response.data;
    } catch (error) {
      console.error("Error posting data:", error);
      throw error; // Re-throw the error for handling in the component
    }
  };

  return (
    <div>
      <div className="relative my-8">
        <ReuseableBackground>
          <h1 className="px-4 text-base">
            Image <span className="text-red-600">*</span>
          </h1>
          <div className="w-full my-4">
            <div onClick={triggerFileInput} className="cursor-pointer">
              <div className="bg-[#1C1E1E]/[0.5] h-[180px] p-8 flex flex-col items-center opacity-90 justify-center">
                <FaCamera size={24} />
                <p className="font-light">Upload an image or drag and drop</p>
                <p className="font-light">PNG or JPEG upto 5MB</p>
              </div>
            </div>
            <input
              type="file"
              id="image-upload"
              accept="image/*"
              multiple // Allow multiple files
              onChange={handleImageChange}
              className="hidden"
              ref={fileInputRef}
            />
          </div>
          {/* Images collage */}
          <div className="relative flex flex-wrap justify-center w-full mt-4 gap-4">
            {images.map((image, index) => (
              <div key={index} className="relative">
                <Image
                  src={image}
                  alt={`Upload ${index}`}
                  width={140}
                  height={140}
                  style={{
                    width: "140px",
                    height: "140px",
                    objectFit: "cover",
                    objectPosition: "top",
                  }}
                />
                <button
                  onClick={() => removeImage(index)}
                  className="absolute top-0 right-0 bg-red-500 text-white mt-2 mr-2 px-2 py-1 text-[10px] rounded-full"
                >
                  X
                </button>
              </div>
            ))}
          </div>
          {/* Counter at the corner */}
          <div className="absolute top-0 right-0 mt-2 mr-2 text-[10px] px-3 py-2 bg-mintyplex-dark rounded-full">
            {images.length}
          </div>
        </ReuseableBackground>
      </div>
      <div className="py-4 md:py-7 bg-[rgb(28,30,30)]">
        <p className="text-2xl font-semibold">Product Details</p>
      </div>
      <ReuseableBackground>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col py-5 gap-6"
        >
          <div className="form">
            <input
              type="text"
              className="p-4 border-2 border-[rgb(99,99,99)] placeholder:text-[14px] "
              placeholder="Enter your Product Name"
              required
              {...register("name", { required: true })}
            />
            <label htmlFor="" className="px-4 text-sm">
              Product Name <span className="text-red-600">*</span>
            </label>
            <p className="px-4 py-2 text-xs italic font-light">
              Use a unique Product Name.
            </p>
          </div>

          <div className="form">
            <input
              type="number"
              className="p-4 border-2 border-[rgb(99,99,99)] placeholder:text-[14px] "
              placeholder="0.00"
              required
              {...register("price", { required: true })}
            />
            <label htmlFor="" className="px-4 text-sm">
              Product Price ($) <span className="text-red-600">*</span>
            </label>
          </div>

          <div className="form">
            <input
              type="number"
              className="p-4 border-2 border-[rgb(99,99,99)] placeholder:text-[14px] "
              placeholder="0.00"
              required
              {...register("discount", { required: true })}
            />
            <label htmlFor="" className="px-4 text-sm">
              Discount (%)
            </label>
          </div>
          <div className="form">
            <textarea
              placeholder="Provide a well detailed description of the item."
              className="p-4 rounded-lg border-2 border-[rgb(99,99,99)] placeholder:text-[14px] outline-none bg-[rgb(44,45,46)] w-full "
              id=""
              rows={6}
              {...register("description", { required: true })}
            ></textarea>
            <label htmlFor="" className="px-4 text-sm">
              Description<span className="text-red-600">*</span>
            </label>
          </div>

          <div className="form">
            <div className="relative">
              <Controller
                name="categories" // Register the category field
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="p-4 border-2 border-[rgb(99,99,99)] placeholder:text-[14px] ">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent className="bg-[rgb(99,99,99)]">
                      <SelectGroup>
                        <SelectLabel>Category</SelectLabel>
                        <SelectItem value="ebook">E-book</SelectItem>
                        <SelectItem value="art">Art</SelectItem>
                        <SelectItem value="photography">Photography</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
            <label htmlFor="" className="px-4 text-sm">
              Categories <span className="text-red-600">*</span>
            </label>
            <p className="py-2 text-xs italic font-light">
              This categories is where your products will be showcased. This
              will also help with SEO (Search Engine Optimization), and will
              also help Affiliate Marketer find your product easily.
            </p>
          </div>
        </form>
      </ReuseableBackground>
      <div className="md:py-7 py-5 bg-[rgb(28,30,30)]">
        <p className="text-2xl font-semibold">More Details</p>
      </div>
      <ReuseableBackground>
        <form className="flex flex-col py-5 gap-6">
          <div className="w='full">
            <h1 className=" text-base">Add file</h1>
            <div className="w-full my-2">
              <div onClick={triggerFileInput} className="cursor-pointer">
                <div className="bg-[#1C1E1E]/[0.5] h-[120px] p-8 flex flex-col items-center opacity-90 justify-center">
                  <BsDownload size={24} />
                  <p className="font-light">Upload a file or drag and drop</p>
                  {/* <p className="font-light">PNG or JPEG upto 5MB</p> */}
                </div>
              </div>
              <input
                type="file"
                id="image-upload"
                accept="image/*"
                multiple // Allow multiple files
                onChange={handleImageChange}
                className="hidden"
                ref={fileInputRef}
              />
            </div>
          </div>
          <div className="my-3 form">
            <input
              type="number"
              className="p-4 border-2 border-[rgb(99,99,99)] placeholder:text-[14px] "
              placeholder="0"
              required
              {...register("quantity", { required: true })}
            />
            <label htmlFor="" className="px-4 text-sm">
              Quantity Available <span className="text-red-600">*</span>
            </label>
            <p className="px-4 py-2 text-xs italic font-light">
              Set Quantity to <span className="text-[#2063F2]">0</span> for
              unlimited
            </p>
          </div>

          <div className="form">
            <input
              type="text"
              value={inputValuee}
              onChange={handleInputChange}
              className="p-4 border-2 text-sm border-[rgb(99,99,99)] placeholder:text-[14px] "
              placeholder="Type a tag"
              required
            />
            <label htmlFor="" className="px-4 text-sm">
              Add tags <span className="text-red-600">*</span>
            </label>
          </div>

          <div className="flex items-end md:w-full justify-end flex-wrap gap-4">
            {tags.map((tag, index) => (
              <div key={index} className="">
                <button className="px-2 md:px-4 py-2 rounded-md font-normal text-[14px] leading-[27px] text-black bg-[rgb(231,241,244)] border-brand10 border flex gap-2 items-center">
                  <div onClick={handleDeleteTag}>
                    <MdCancel />
                  </div>
                  {tag}
                </button>
              </div>
            ))}
            <div
              className="px-2 md:px-4 py-2 rounded-md font-normal text-[14px] leading-[27px]  bg-[rgba(13,110,253,1)] border-brand10 border flex gap-4 justify-end items-center"
              onClick={handleAddTag}
            >
              Add tags
            </div>
          </div>
        </form>
      </ReuseableBackground>

      <div className="flex w-full justify-end">
        <button
          onClick={handleSubmit(onSubmit)}
          className="block bg-mintyplex-primary w-fit text-center py-4 px-10 rounded-md my-6"
        >
          {isLoading ? (
            <>
              <div className="loader"></div>
            </>
          ) : (
            "Create Product"
          )}
        </button>
      </div>
    </div>
  );
};

export default ProductForm;
function setSelectedImage(arg0: {
  name: any;
  size: any;
  type: any;
  url: string | ArrayBuffer | null;
}) {
  throw new Error("Function not implemented.");
}
function setOptions(arg0: string[]) {
  throw new Error("Function not implemented.");
}

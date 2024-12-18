import React, { useState, useEffect, memo } from "react";
import {
  Modal,
  Form,
  Input,
  InputNumber,
  Button,
  Upload,
  message,
  Select,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useUploadFile } from "../../../hooks/useUploadFile";
import { useUploadMultifile } from "../../../hooks/useUploadMultifile";
import { UpdateProductRequest } from "../../../types/backend";
import { ProductStatus } from "../../../types/backend.enum";
import useUpdateProduct from "../hooks/product/useUpdateProduct";
import { LazyLoadImage } from "react-lazy-load-image-component";

const { Option } = Select;

interface ProductEditModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  actionProduct: any;
  setActionProduct: (product: any) => void;
  refetch: () => void;
}

const ProductEditModal: React.FC<ProductEditModalProps> = ({
  isModalOpen,
  setIsModalOpen,
  actionProduct,
  setActionProduct,
  refetch,
}) => {
  const [form] = Form.useForm();
  const [thumbnail, setThumbnail] = useState<string | File | null>(null);
  const [fileList, setFileList] = useState<any[]>([]);
  const [deletedImages, setDeletedImages] = useState<string[]>([]);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const { updateProduct, isPending: isUploadProductPending } =
    useUpdateProduct();
  const { mutate: uploadThumbnail, isPending: isUploadFilePending } =
    useUploadFile();
  const { mutate: uploadImages, isPending: isUploadMultiFilePending } =
    useUploadMultifile();

  useEffect(() => {
    if (actionProduct) {
      form.setFieldsValue({
        name: actionProduct.name,
        price: actionProduct.price,
        quantity: actionProduct.quantity,
        category: actionProduct.category,
        tags: actionProduct.tags,
        description: actionProduct.description,
        discount: actionProduct.discount,
        status: actionProduct.status,
      });

      setThumbnail(actionProduct.thumbnail);
      setThumbnailPreview(actionProduct.thumbnail);
      setFileList(
        actionProduct.images.map((image: string) => ({
          uid: image,
          name: image,
          status: "done",
          url: image,
        }))
      );
    }
  }, [actionProduct, form]);

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
    setThumbnail(null);
    setFileList([]);
    setDeletedImages([]);
    setThumbnailPreview(null);
    setActionProduct(null);
  };

  const handleDeleteImage = (file: any) => {
    setFileList(fileList.filter((item) => item.uid !== file.uid));
    setDeletedImages([...deletedImages, file.uid]);
  };

  const handleSubmit = async (values: any) => {
    const newFiles = fileList.filter((file) => file.originFileObj); // New images
    const existingImages = fileList
      .filter((file) => !file.originFileObj)
      .map((file) => file.url); // Existing URLs

    // Upload thumbnail if it's a new file
    if (thumbnail && thumbnail instanceof File) {
      uploadThumbnail(
        { file: thumbnail, folder: "product-thumbnails" },
        {
          onSuccess: (thumbnailUrl) => {
            handleImagesUpload(values, thumbnailUrl, newFiles, existingImages);
          },
          onError: (error) => {
            message.error(`Failed to upload thumbnail: ${error.message}`);
          },
        }
      );
    } else {
      // Use existing thumbnail
      handleImagesUpload(values, thumbnail as string, newFiles, existingImages);
    }
  };

  const handleImagesUpload = (
    values: any,
    thumbnailUrl: string,
    newFiles: any[],
    existingImages: string[]
  ) => {
    if (newFiles.length > 0) {
      uploadImages(
        {
          files: newFiles.map((file) => file.originFileObj),
          folder: "product-images",
        },
        {
          onSuccess: (uploadedUrls) => {
            const updatedImages = [...uploadedUrls, ...existingImages];
            submitProductUpdate(values, thumbnailUrl, updatedImages);
          },
          onError: (error) => {
            message.error(`Failed to upload images: ${error.message}`);
          },
        }
      );
    } else {
      submitProductUpdate(values, thumbnailUrl, existingImages);
    }
  };

  const submitProductUpdate = async (
    values: any,
    thumbnailUrl: string,
    images: string[]
  ) => {
    try {
      const updateRequest: UpdateProductRequest = {
        name: values.name,
        price: parseFloat(values.price),
        quantity: parseInt(values.quantity),
        category: values.category,
        description: values.description,
        discount: parseFloat(values.discount),
        status: values.status as ProductStatus,
        thumbnail: thumbnailUrl,
        images,
        tags: values.tags,
        deletedImages,
      };

      await updateProduct({
        productId: actionProduct.id,
        updates: updateRequest,
      });

      message.success("Product updated successfully!");
      handleCancel();
      refetch();
    } catch (error: any) {
      message.error(`Failed to update product: ${error.message}`);
    }
  };

  const handleChange = (info: any) => {
    setFileList(info.fileList);
  };

  const uploadThumbnailProps = {
    beforeUpload: (file: File) => {
      setThumbnail(file);
      setThumbnailPreview(URL.createObjectURL(file));
      return false;
    },
  };

  return (
    <Modal
      title="Edit Product"
      open={isModalOpen}
      onCancel={handleCancel}
      footer={null}
      maskClosable={false}
      width={900}
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          label="Name"
          name="name"
          rules={[
            { required: true, message: "Please input the product name!" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Price"
          name="price"
          rules={[
            { required: true, message: "Please input the product price!" },
          ]}
        >
          <InputNumber style={{ width: "100%" }} min={0} />
        </Form.Item>
        <Form.Item
          label="Quantity"
          name="quantity"
          rules={[{ required: true, message: "Please input the quantity!" }]}
        >
          <InputNumber style={{ width: "100%" }} min={0} />
        </Form.Item>
        <Form.Item
          label="Category"
          name="category"
          rules={[{ required: true, message: "Please input the category!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Tags"
          name="tags"
          rules={[{ required: true, message: "Please input the tags!" }]}
        >
          <Select
            mode="tags"
            style={{ width: "100%" }}
            placeholder="Add tags"
            options={[
              { label: "BLACK FRIDAY", value: "BLACK FRIDAY" },
              { label: "PHONE", value: "PHONE" },
            ]}
          />
        </Form.Item>
        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: "Please input the description!" }]}
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item label="Discount" name="discount">
          <InputNumber style={{ width: "100%" }} min={0} />
        </Form.Item>
        <Form.Item label="Status" name="status">
          <Select>
            <Option value={ProductStatus.AVAILABLE}>AVAILABLE</Option>
            <Option value={ProductStatus.OUT_OF_STOCK}>OUT_OF_STOCK</Option>
            <Option value={ProductStatus.UNAVAILABLE}>UNAVAILABLE</Option>
          </Select>
        </Form.Item>
        <Form.Item label="Thumbnail">
          <Upload
            {...uploadThumbnailProps}
            listType="picture-card"
            showUploadList={false}
          >
            {thumbnailPreview ? (
              <LazyLoadImage
                src={thumbnailPreview}
                alt="thumbnail"
                style={{ width: "80%" }}
              />
            ) : (
              <div>
                <UploadOutlined />
                <div>Upload</div>
              </div>
            )}
          </Upload>
        </Form.Item>
        <Form.Item label="Images">
          <Upload
            listType="picture-card"
            fileList={fileList}
            beforeUpload={() => false} // Prevent automatic upload
            onChange={handleChange}
            onRemove={handleDeleteImage}
          >
            <div>
              <UploadOutlined />
              <div>Upload</div>
            </div>
          </Upload>
        </Form.Item>
        <Form.Item>
          <Button
            loading={
              isUploadProductPending ||
              isUploadFilePending ||
              isUploadMultiFilePending
            }
            type="primary"
            htmlType="submit"
            block
          >
            Save Changes
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default memo(ProductEditModal);

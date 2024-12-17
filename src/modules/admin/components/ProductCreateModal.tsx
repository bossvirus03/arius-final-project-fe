import React, { memo, useState } from "react";
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
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { RcFile } from "antd/es/upload";
import type { UploadProps } from "antd";
import { useUploadFile } from "../../../hooks/useUploadFile";
import { useUploadMultifile } from "../../../hooks/useUploadMultifile";
import useCreateProduct from "../hooks/product/useCreateProduct";

interface ProductCreateModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  refetch: () => void;
}

const ProductCreateModal: React.FC<ProductCreateModalProps> = ({
  isModalOpen,
  setIsModalOpen,
  refetch,
}) => {
  console.log("rerender");
  const [form] = Form.useForm();
  const [thumbnail, setThumbnail] = useState<RcFile | null>(null);
  const [fileList, setFileList] = useState<any[]>([]);
  const [tags, setTags] = useState<string[]>([]);

  const { createProduct, isPending: isCreateProductPending } =
    useCreateProduct();
  const { mutateAsync: uploadThumbnail, isPending: isUploadThumbnailPending } =
    useUploadFile();
  const { mutateAsync: uploadImages, isPending: isUploadImagesPending } =
    useUploadMultifile();

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
    setThumbnail(null);
    setFileList([]);
    setTags([]);
  };

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) =>
    setFileList(newFileList);

  const handleSubmit = async (values: any) => {
    try {
      // Upload thumbnail
      let thumbnailUrl = "";
      if (thumbnail) {
        thumbnailUrl = await uploadThumbnail({
          file: thumbnail,
          folder: "thumbnails",
        });
      }

      // Upload multiple images
      let imageUrls: string[] = [];
      const files = fileList.map((file) => file.originFileObj as RcFile);
      if (files.length > 0) {
        const response = await uploadImages({
          files,
          folder: "products",
        });
        imageUrls = response;
      }

      // Prepare data for submission
      const payload = {
        name: values.name,
        price: values.price,
        discount: values.discount,
        quantity: values.quantity,
        category: values.category,
        tags,
        description: values.description,
        thumbnail: thumbnailUrl,
        images: imageUrls,
      };

      await createProduct(
        { body: payload },
        {
          onSuccess: () => {
            message.success("Product created successfully!");
            handleCancel();
            refetch();
          },
        }
      );
    } catch (error: any) {
      message.error(`Failed to create product: ${error.message}`);
    }
  };

  const uploadProps = {
    beforeUpload: (file: RcFile) => {
      setThumbnail(file);
      return false; // Prevent default upload behavior
    },
  };

  return (
    <Modal
      title="Create Product"
      open={isModalOpen}
      onCancel={handleCancel}
      footer={null}
      maskClosable={false}
      width={900}
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <div className="flex gap-5">
          <Form.Item
            className="flex-1"
            label="Name"
            name="name"
            rules={[
              { required: true, message: "Please input the product name!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            className="flex-1"
            label="Price"
            name="price"
            rules={[
              { required: true, message: "Please input the product price!" },
            ]}
          >
            <InputNumber style={{ width: "100%" }} min={0} />
          </Form.Item>
        </div>
        <Form.Item
          label="Description"
          name="description"
          rules={[
            {
              required: true,
              message: "Please input the product description!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Discount"
          name="discount"
          rules={[{ required: true, message: "Please input the discount!" }]}
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
          rules={[
            { required: true, message: "Please select at least one tag!" },
          ]}
        >
          <Select
            mode="tags"
            placeholder="Add tags"
            onChange={(value) => setTags(value)}
          />
        </Form.Item>
        <Form.Item label="Thumbnail">
          <Upload {...uploadProps} accept="image/*" maxCount={1}>
            <Button icon={<UploadOutlined />}>Upload Thumbnail</Button>
          </Upload>
        </Form.Item>

        <Form.Item
          label="Images"
          name="files"
          rules={[
            { required: true, message: "Please upload at least 1 image!" },
          ]}
        >
          <Upload
            listType="picture-card"
            beforeUpload={() => false}
            fileList={fileList}
            onChange={handleChange}
          >
            {fileList.length >= 8 ? null : uploadButton}
          </Upload>
        </Form.Item>
        <Button
          loading={
            isCreateProductPending ||
            isUploadImagesPending ||
            isUploadThumbnailPending
          }
          type="primary"
          htmlType="submit"
          block
        >
          Create Product
        </Button>
      </Form>
    </Modal>
  );
};

export default memo(ProductCreateModal);

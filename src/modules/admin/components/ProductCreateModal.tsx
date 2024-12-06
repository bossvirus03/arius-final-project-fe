import React, { useState } from "react";
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
import { RcFile } from "antd/es/upload";

interface ProductCreateModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  refetch: () => void;
  createProduct: any; // Hook or function to handle product creation
}
const { Option } = Select;
const ProductCreateModal: React.FC<ProductCreateModalProps> = ({
  isModalOpen,
  setIsModalOpen,
  refetch,
  createProduct,
}) => {
  const [form] = Form.useForm();
  const [thumbnail, setThumbnail] = useState<RcFile | null>(null);

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
    setThumbnail(null);
  };

  const handleSubmit = async (values: any) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("price", values.price);
    formData.append("discount", values.discount);
    formData.append("quantity", values.quantity);
    formData.append("category", values.category);
    formData.append("tags", values.tags);
    formData.append("description", values.description);
    if (thumbnail) {
      formData.append("thumbnail", thumbnail); // Append file for upload
    }

    try {
      await createProduct(formData);
      message.success("Product created successfully!");
      handleCancel();
      refetch();
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
          label="Description"
          name="description"
          rules={[
            {
              required: true,
              message: "Please input the product description!",
            },
          ]}
        >
          <InputNumber style={{ width: "100%" }} min={0} />
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
        <Form.Item label="Thumbnail">
          <Upload {...uploadProps} accept="image/*" maxCount={1}>
            <Button icon={<UploadOutlined />}>Upload Thumbnail</Button>
          </Upload>
        </Form.Item>

        <Form.Item
          label="Roles"
          name="roles"
          rules={[
            { required: true, type: "array", message: "Please select roles" },
          ]}
        >
          <Select mode="tags" placeholder="Add roles" style={{ width: "100%" }}>
            <Option value="BLACK PRIDAY">BLACK PRIDAY</Option>
            <Option value="SALE">SALE</Option>
          </Select>
        </Form.Item>
        <Button type="primary" htmlType="submit" block>
          Create Product
        </Button>
      </Form>
    </Modal>
  );
};

export default ProductCreateModal;

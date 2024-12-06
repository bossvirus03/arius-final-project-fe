import React, { useState, useEffect } from "react";
import { Modal, Form, Input, InputNumber, Button, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { RcFile } from "antd/es/upload";

interface ProductEditModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  actionProduct: any; // The product being edited
  setActionProduct: (product: any) => void;
  refetch: () => void;
  updateProduct: any; // Hook or function to handle product update
}

const ProductEditModal: React.FC<ProductEditModalProps> = ({
  isModalOpen,
  setIsModalOpen,
  actionProduct,
  setActionProduct,
  refetch,
  updateProduct,
}) => {
  const [form] = Form.useForm();
  const [thumbnail, setThumbnail] = useState<RcFile | null>(null);

  useEffect(() => {
    if (actionProduct) {
      form.setFieldsValue({
        name: actionProduct.name,
        price: actionProduct.price,
        stock: actionProduct.stock,
        category: actionProduct.category,
      });
    }
  }, [actionProduct, form]);

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
    setThumbnail(null);
    setActionProduct(null);
  };

  const handleSubmit = async (values: any) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("price", values.price);
    formData.append("stock", values.stock);
    formData.append("category", values.category);
    if (thumbnail) {
      formData.append("thumbnail", thumbnail);
    }

    try {
      await updateProduct(actionProduct.id, formData);
      message.success("Product updated successfully!");
      handleCancel();
      refetch();
    } catch (error: any) {
      message.error(`Failed to update product: ${error.message}`);
    }
  };

  const uploadProps = {
    beforeUpload: (file: RcFile) => {
      setThumbnail(file);
      return false;
    },
  };

  return (
    <Modal
      title="Edit Product"
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
          label="Stock"
          name="stock"
          rules={[{ required: true, message: "Please input the stock!" }]}
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
        <Button type="primary" htmlType="submit" block>
          Update Product
        </Button>
      </Form>
    </Modal>
  );
};

export default ProductEditModal;

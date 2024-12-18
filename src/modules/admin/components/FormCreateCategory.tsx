import React from "react";
import { Modal, Form, Input, Button, message } from "antd";

function FormCreateCategory({ form, onSubmit }: any) {
  return (
    <div>
      <Form form={form} layout="vertical" onFinish={onSubmit}>
        <Form.Item
          label="Name"
          name="name"
          rules={[
            { required: true, message: "Please enter the category name" },
          ]}
        >
          <Input placeholder="Enter category name" />
        </Form.Item>
        <Form.Item label="Description" name="description">
          <Input.TextArea placeholder="Enter category description" />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default FormCreateCategory;

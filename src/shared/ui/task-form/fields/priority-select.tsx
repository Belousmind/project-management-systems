import { Select, Form } from "antd";

const PrioritySelect = () => {
  return (
    <Form.Item name="priority" label="Приоритет" rules={[{ required: true }]}>
      <Select>
        <Select.Option value="Low">Low</Select.Option>
        <Select.Option value="Medium">Medium</Select.Option>
        <Select.Option value="High">High</Select.Option>
      </Select>
    </Form.Item>
  );
};

export default PrioritySelect;

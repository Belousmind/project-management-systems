import { Select, Form } from "antd";

const StatusSelect = () => {
  return (
    <Form.Item name="status" label="Статус">
      <Select>
        <Select.Option value="Backlog">Backlog</Select.Option>
        <Select.Option value="InProgress">In Progress</Select.Option>
        <Select.Option value="Done">Done</Select.Option>
      </Select>
    </Form.Item>
  );
};

export default StatusSelect;

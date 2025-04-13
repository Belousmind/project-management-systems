import { Select } from "antd";

const { Option } = Select;

type Props = {
  value?: string;
  onChange: (value: string | undefined) => void;
};

const TaskStatusFilter = ({ value, onChange }: Props) => (
  <Select
    placeholder="Статус"
    allowClear
    value={value}
    onChange={onChange}
    className="select-filter"
  >
    <Option value="Backlog">Backlog</Option>
    <Option value="InProgress">In Progress</Option>
    <Option value="Done">Done</Option>
  </Select>
);

export default TaskStatusFilter;

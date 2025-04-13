import { Input } from "antd";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

const TaskAssigneeFilter = ({ value, onChange }: Props) => (
  <Input
    placeholder="Поиск по исполнителю"
    value={value}
    onChange={(e) => onChange(e.target.value)}
  />
);

export default TaskAssigneeFilter;

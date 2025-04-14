import { Input } from "antd";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

const TaskTitleFilter = ({ value, onChange }: Props) => (
  <Input
    placeholder="Поиск по названию"
    value={value}
    onChange={(e) => onChange(e.target.value)}
    className="input-filter"
  />
);

export default TaskTitleFilter;

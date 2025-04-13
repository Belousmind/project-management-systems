import { Select } from "antd";
import { BoardLite } from "@api";

const { Option } = Select;

type Props = {
  value?: string;
  onChange: (value: string | undefined) => void;
  boards?: BoardLite[];
  loading?: boolean;
};

const TaskBoardFilter = ({ value, onChange, boards, loading }: Props) => (
  <Select
    placeholder="Проект"
    allowClear
    value={value}
    loading={loading}
    onChange={onChange}
  >
    {boards?.map((board) => (
      <Option key={board.id} value={board.name}>
        {board.name}
      </Option>
    ))}
  </Select>
);

export default TaskBoardFilter;

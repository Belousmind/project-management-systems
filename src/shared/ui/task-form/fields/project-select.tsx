import { useQuery } from "@tanstack/react-query";
import { Select, Form } from "antd";
import { getBoards, BoardLite } from "@api";
import { useParams } from "react-router-dom";

const { Option } = Select;

const ProjectSelect = () => {
  const { id: boardIdFromRoute } = useParams();

  const { data: boards, isLoading } = useQuery<BoardLite[]>({
    queryKey: ["boards"],
    queryFn: getBoards,
  });

  const isInsideBoardPage = Boolean(boardIdFromRoute);

  return (
    <Form.Item
      name="boardId"
      label="Проект"
      rules={[{ required: true }]}
      initialValue={isInsideBoardPage ? Number(boardIdFromRoute) : undefined}
    >
      <Select
        placeholder="Выберите проект"
        loading={isLoading}
        showSearch
        optionFilterProp="children"
        disabled={isInsideBoardPage}
      >
        {boards?.map((board) => (
          <Option key={board.id} value={board.id}>
            {board.name}
          </Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export default ProjectSelect;

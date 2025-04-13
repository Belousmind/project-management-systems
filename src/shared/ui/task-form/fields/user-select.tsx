import { useQuery } from "@tanstack/react-query";
import { Select, Form } from "antd";
import { getUsers, User } from "@api";

const { Option } = Select;

const UserSelect = () => {
  const { data: users, isLoading } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  return (
    <Form.Item name="assigneeId" label="Исполнитель" rules={[{ required: true }]}>
      <Select
        placeholder="Выберите пользователя"
        loading={isLoading}
        showSearch
        optionFilterProp="children"
      >
        {users?.map((user) => (
          <Option key={user.id} value={user.id}>
            {user.fullName}
          </Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export default UserSelect;
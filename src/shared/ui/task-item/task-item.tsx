import "./task-item.css";

type TaskItemProps = {
  id: number;
  title: string;
};

const TaskItem = ({ id, title }: TaskItemProps) => {
  return (
    <div className="issue-item">
      <span>
        {title} {id}
      </span>
    </div>
  );
};

export default TaskItem;

import './issue-item.css'

type IssueItemProps = {
  "title": string
}

const IssueItem = ({title}: IssueItemProps) => {
  return (
    <div className="issue-item">
      <span>{title}</span>
    </div>
  );
};

export default IssueItem;

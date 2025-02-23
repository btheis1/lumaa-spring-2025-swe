import { useState } from 'react';
import Dialog from './Dialog';

interface Task {
    id: string;
    title: string;
    description: string;
    iscomplete: boolean;
    userid: string;
}

interface TaskListItemProps {
  task: Task;
  getData: () => void;
}

const ListItem: React.FC<TaskListItemProps> = ({ task, getData }) => {
  const [showDialog, setShowDialog] = useState(false);

  const deleteItem = async () => {
    try {
      const response = await fetch(`http://localhost:8000/tasks/${task.id}`, {
        method: 'DELETE',
      });
      if (response.status === 200) {
        getData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <li className="list-item">
      <div>
        <h4>{task.title}</h4>
        {task.description && (
            <div>{task.description}</div>
        )}
        {task.iscomplete && (
          <strong className="complete">COMPLETE!</strong>
        )}
        {!task.iscomplete && (
          <div className="incomplete">Incomplete</div>
        )}
      </div>

      <div>
        <button onClick={() => setShowDialog(true)}>Edit Task</button>
        <button className="delete" onClick={deleteItem}>Delete Task</button>
      </div>

      {showDialog && (
        <Dialog mode={'Edit'} setShowDialog={setShowDialog} getData={getData} task={task} />
      )}
    </li>
  );
};

export default ListItem;

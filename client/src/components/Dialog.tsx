import { ChangeEvent, useState } from 'react';
import { useCookies } from 'react-cookie';

interface Task {
  id: string;
  title: string;
  description: string;
  iscomplete: boolean;
  userid: string;
}

interface DialogProps {
  mode: string;
  setShowDialog: (show: boolean) => void;
  getData: () => void;
  task: Task;
}

const Dialog: React.FC<DialogProps> = ({ mode, setShowDialog, getData, task }) => {
  const [cookies, setCookie, removeCookie] = useCookies(undefined);
  const editMode = mode === 'Edit';

  const [data, setData] = useState<Task>({
    id: editMode ? task.id : '',
    title: editMode ? task.title : '',
    description: editMode ? task.description : '',
    iscomplete: editMode ? task.iscomplete : false,
    userid: editMode ? task.userid : cookies.Id,
  });

  const postData = async (event: React.MouseEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await fetch(`http://localhost:8000/tasks`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (response.status === 200) {
        setShowDialog(false);
        getData();
      }
    } catch (err) {
      console.error(err);
    }
  }

  const editData = async (event: React.MouseEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('data in edit method', data)

    try {
      const response = await fetch(`http://localhost:8000/tasks/${task.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (response.status === 200) {
        setShowDialog(false);
        getData();
      }
    } catch (err) {
      console.error(err);
    }
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = event.target;

    setData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));

    console.log('data', data)
  }

  return (
    <div className="dialog-container">
      <div className="dialog-header">
        <h3>{mode} Task</h3>
        <a onClick={() => setShowDialog(false)}>Quit {mode}</a>
      </div>

      <form onSubmit={editMode ? editData : postData}>
        <div className="input-field">
          <label htmlFor="title">Title</label>
          <input
            required
            maxLength={30}
            placeholder="Ex: Add CRUD methods"
            name="title"
            value={data.title}
            onChange={handleChange}
          />
        </div>
        <div className="input-field">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            id="description"
            name="description"
            value={data.description}
            onChange={handleChange}
          />
        </div>
        <div className="input-field">
          <label>
            <input 
              type="checkbox"
              name="iscomplete"
              checked={data.iscomplete}
              onChange={handleChange}
            />
            Is Complete
          </label>
        </div>
        
        <input type="submit" value={mode === 'Edit' ? 'Edit' : 'Create'} />
      </form>

    </div>
  );
}

export default Dialog;

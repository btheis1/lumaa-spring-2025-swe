
import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import Auth from './components/Auth';
import TaskListItem from './components/TaskListItem';
import Dialog from './components/Dialog';
import ListHeader from './components/ListHeader';

interface Task {
  id: string;
  title: string;
  description: string;
  iscomplete: boolean;
  userid: string;
}

const App: React.FC = () => {
  const [cookies, setCookie, removeCookie] = useCookies(undefined);
  const userId = cookies.Id;
  const authToken = cookies.AuthToken;
  const username = cookies.Username;
  const [tasks, setTasks] = useState<Task[] | null>(null);
  const [showDialog, setShowDialog] = useState(false);

  const getData = async () => {
    try {
      const response = await fetch(`http://localhost:8000/tasks/${userId}`, {
        method: "GET",
        headers: { 'Content-Type': 'application/json', 'token': cookies.AuthToken },
      });
      const json: Task[] = await response.json();
      setTasks(json);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    if (authToken) {
      getData();
    }
  }, [authToken]);

  console.log("tasks", tasks);

  return (
    <div className="app">
      {!authToken && <Auth />}
      {authToken && 
        <>
          <h1>Task Manager</h1>
          <ListHeader listName={`Here are your tasks, ${username}:`} getData={getData} />
          {tasks?.map((task) => <TaskListItem key={task.id} task={task} getData={getData}/>)}
        </>
      }
    </div>
  );
}

export default App;

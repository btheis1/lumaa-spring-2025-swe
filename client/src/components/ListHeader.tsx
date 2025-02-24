import { useState } from 'react';
import { useCookies } from 'react-cookie';
import Dialog from './Dialog';

interface Task {
    id: string;
    title: string;
    description: string;
    iscomplete: boolean;
    userid: string;
}

interface ListHeaderProps {
    listName: string;
    getData: () => void;
}

const ListHeader: React.FC<ListHeaderProps> = ({ listName, getData }) => {
  const [cookies, setCookie, removeCookie] = useCookies(undefined);
  const [showDialog, setShowDialog] = useState(false);
  const newTask = {
    id: '',
    title: '',
    description: '',
    iscomplete: false,
    userid: ''
  };
 
  const signOut = () => {
    removeCookie('Id');
    removeCookie('Username');
    removeCookie('AuthToken');
    window.location.reload();
  }
 
  return (
    <div className="list-header">
      <h1>{listName}</h1>
      <div className="button-container">
        <button className="create" onClick={() => setShowDialog(true)}>Add Task</button>
        <button className="signout" onClick={signOut}>Sign Out</button>
      </div>
      {showDialog && <Dialog mode={'Add'} setShowDialog={setShowDialog} getData={getData} task={newTask}/>}
    </div>
  );
}

export default ListHeader;

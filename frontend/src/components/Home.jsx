import { useEffect, useState } from 'react';
import ViewUsers from './agent/user/ViewUsers';
import SignIn from './agent/user/SignIn';
import SignUp from './agent/user/SignUp';


const Home = () => {
  const [users, setUsers] = useState([]);
  const [registered, setRegistered] = useState(true);

  async function fetchUsers() {
    const res = await fetch('http://0.0.0.0:3001/user');
    const users = await res.json();
    setUsers(users)
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  return (

    <div className='bgColor' style={{ display: 'flex', width: '70%', padding: '10px', margin: '0 auto' }}>

      <div style={{ width: '50%' }}>
        <h2>View Users</h2>
        <button onClick={fetchUsers} style={{ marginTop: '10px', marginBottom: '10px' }}>Refresh</button>
        <ViewUsers users={users} />
      </div>


      <div style={{ width: '50%'}}>

        <h2>Welcome to Branch</h2>
        {
          registered? <SignIn setRegistered={setRegistered} /> : <SignUp setRegistered={setRegistered} />
        }
      </div>

    </div>

  )
};

export default Home;
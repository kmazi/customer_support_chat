import '../App.css';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useState } from 'react';
import ViewUsers from './agent/user/ViewUsers';
import { Link } from 'react-router-dom';


const Home = () => {
  const [res, setRes] = useState("");
  const [users, setUsers] = useState([]);

  async function fetchUsers() {
    const res = await fetch('http://0.0.0.0:3001/user');
    const users = await res.json();
    console.log(users)
    setUsers(users)
  }

  async function handleSubmit(values, { setSubmitting }) {
    values.roleId = Number(values.roleId)

    const resp = await fetch('http://0.0.0.0:3001/user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values, null, 2)
    });

    setSubmitting(false);
    const resVal = await resp.json();
    if (resp.status === 400) {
      setRes(`User creation failed: ${resVal.message[0]}`)
    } else setRes('User created successfully.');
  }

  return (

    <div>

      <div>

        <h2>Create Users</h2>

        <Formik
          initialValues={{ name: '', phone: '', roleId: 1 }}

          validate={values => {
            const errors = {};
            return errors;
          }}

          onSubmit={handleSubmit}
        >

          {({ isSubmitting }) => (
            <div>
              <Form>
                <div>
                  <label htmlFor='name' style={{ width: '80px', display: 'inline-block', margin: '10px' }}>Name</label>
                  <Field type="text" name="name" />
                  <ErrorMessage name="name" component="div" />
                </div>

                <div>
                  <label htmlFor='name' style={{ width: '80px', display: 'inline-block', margin: '10px' }}>Phone</label>
                  <Field type="text" name="phone" />
                  <ErrorMessage name="phone" component="div" />
                </div>

                <div>
                  <label htmlFor='name' style={{ width: '80px', display: 'inline-block', margin: '10px' }}>Role</label>
                  {/* <Field type="number" name="roleId" /> */}
                  <Field as='select' name='roleId'>
                    <Field as='option' value={''}>Please select a role</Field>
                    <Field as='option' value={1}>Customer</Field>
                    <Field as='option' value={2}>Agent</Field>
                  </Field>
                  <ErrorMessage name="roleId" component="div" />
                </div>

                <button type="submit" disabled={isSubmitting}>

                  Submit

                </button>

              </Form>

              <div>{res}</div>
            </div>
          )}

        </Formik>
      </div>

      <div>
        <div style={{ minHeight: '360px' }}>
          <h2>View Users</h2>
          <ViewUsers users={users} />
        </div>
        <button onClick={fetchUsers} style={{ marginTop: '10px', marginBottom: '10px' }}>Fetch users</button>
      </div>

      <div>
        <Link to={'/user/chats'}>Go to chat room</Link>
        <Link to={'/conversations/incoming'} style={{ padding: '10px' }}>Incoming complaints</Link>
      </div>

    </div>

  )
};

export default Home;
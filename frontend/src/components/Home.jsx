import '../App.css';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useState } from 'react';


const Home = () => {
  const [res, setRes] = useState("");

  async function handleSubmit (values, { setSubmitting }) {
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

      <h1>Create Users</h1>

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

  )
};

export default Home;
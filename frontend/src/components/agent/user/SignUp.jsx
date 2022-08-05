import { ErrorMessage, Field, Form, Formik } from "formik";
import { useState } from "react";


const SignUp = (props) => {
    const [res, setRes] = useState("");

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
                            <label htmlFor='name' style={{ width: '80px', display: 'inline-block', margin: '5px' }}>Name</label>
                            <Field type="text" name="name" />
                            <ErrorMessage name="name" component="div" />
                        </div>

                        <div>
                            <label htmlFor='name' style={{ width: '80px', display: 'inline-block', margin: '5px' }}>Phone</label>
                            <Field type="text" name="phone" />
                            <ErrorMessage name="phone" component="div" />
                        </div>

                        <div>
                            <label htmlFor='name' style={{ width: '80px', display: 'inline-block', margin: '5px' }}>Role</label>
                            {/* <Field type="number" name="roleId" /> */}
                            <Field as='select' name='roleId'>
                                <Field as='option' value={''}>Please select a role</Field>
                                <Field as='option' value={1}>Customer</Field>
                                <Field as='option' value={2}>Agent</Field>
                            </Field>
                            <ErrorMessage name="roleId" component="div" />
                        </div>

                        {/*
                        * Show appropriate button
                        */}
                        <div style={{ paddingTop: '10px' }}>
                            <button style={{ display: 'inline-block', marginRight: '15px' }} type="submit" disabled={isSubmitting}>Sign Up</button>
                            <div style={{ display: props.registered? 'none': 'inline-block'}}>
                                <label htmlFor="signin">Have an account?</label>
                                <button onClick={(e) => {
                                    e.preventDefault()
                                    props.setRegistered(true);
                                }} style={{ marginLeft: '15px' }} name="signin" type="submit" disabled={isSubmitting}>Sign in</button>
                            </div>
                        </div>

                    </Form>

                    <div style={{ padding: '10px 0' }}>{res}</div>
                </div>
            )}

        </Formik>
    );
};

export default SignUp;
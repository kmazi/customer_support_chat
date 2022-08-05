import { ErrorMessage, Field, Form, Formik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignIn = (props) => {
    const navigate = useNavigate();
    const [error, setError] = useState("");

    const storeUserDetails = async (values, { setSubmitting }) => {
        const res = await fetch('http://0.0.0.0:3001/user/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(values, null, 2)
        });

        setSubmitting(false);

        if (res.status === 200) {
            const user = await res.json();
            localStorage.setItem('chatUserId', JSON.stringify(user.id));
            localStorage.setItem('chatUserRole', user.role.name);
            navigate('/user/chats');
        } else {
            setError("An error occurred while signing you in. Try again with correct credentials.");
        }
    };

    return (
        <Formik initialValues={{ name: '', phone: '' }}
            validate={values => {
                const errors = {};
                return errors;
            }
            }
            onSubmit={storeUserDetails}>
            {
                ({ isSubmitting }) => (
                    <Form>
                        <div>
                            <div>
                                <label htmlFor='name' style={{ width: '80px', display: 'inline-block', margin: '5px' }}>Name</label>
                                <Field type="text" name="name" />
                                <ErrorMessage name="name" component="div" />
                            </div>
                            <div>
                                <label htmlFor='phone' style={{ width: '80px', display: 'inline-block', margin: '5px' }}>Phone</label>
                                <Field type="text" style={{ display: 'inline-block', marginRight: '5px' }} name="phone" />
                                <ErrorMessage name="phone" component="div" />
                            </div>
                        </div>
                        <div style={{ paddingTop: '10px' }}>
                            <button style={{ display: 'inline-block', marginRight: '30px' }} type="submit" disabled={isSubmitting}>Sign In</button>
                            <div style={{ display: props.registered? 'none': 'inline-block'}}>
                                <label htmlFor="signup">No account?</label>
                                <button onClick={(e) => {
                                    e.preventDefault()
                                    props.setRegistered(false);
                                }} style={{ marginLeft: '15px' }} name="signup" type="submit" disabled={isSubmitting}>Sign up</button>
                            </div>
                        </div>
                        <div style={{ padding: '10px 0' }}>{error}</div>
                    </Form>
                )
            }
        </Formik>
    );
};

export default SignIn;
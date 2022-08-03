import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import { useState } from "react";
import ChatMessages from "../../common/ChatMessages";

const UserChatRoom = () => {
    const [newMessage, setNewMessage] = useState('');

    const [userId, setUserId] = useState(null);
    const [roleId, setAgentId] = useState(null);
    const [detailUpdate, setDetailUpdate] = useState('');

    const [convId, setConvId] = useState(0);
    const [convStatus, setConvStatus] = useState('');

    async function sendMessage(values, { setSubmitting }) {
        const resp = await fetch('http://0.0.0.0:3001/message', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(values, null, 2)
        });

        setSubmitting(false);
        const resVal = await resp.json();
        if (resp.status === 400) {

        } else {

        }
    }

    function storeUserDetails(values, { setSubmitting }) {
        setUserId(values.userId);
        setAgentId(values.agentId);
        setDetailUpdate(`Your information has been saved`);
        setSubmitting(false);
    }

    async function createConversation(values, { setSubmitting }) {
        values.customerId = userId;
        const resp = await fetch('http://0.0.0.0:3001/conversation', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(values, null, 2)
        });

        setSubmitting(false);
        if (resp.status === 400) {
            setConvStatus('Please set the subject for discussion. Maybe you have not specified your user id.')
            return {}
        } else {
            setConvStatus('You have successfully stared a conversation.')
        }
        const resVal = await resp.json();
        return resVal
    }

    return (
        <div>
            <h2>Welcome to your chat room!</h2>
            <div>
                <h4 style={{margin: '5px', }}>Login details</h4>
                <Formik initialValues={{ userId: '', agentId: ''}}
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
                                    <div style={{ display: 'inline-block' }}>
                                        <label htmlFor='userId' style={{ width: '80px', display: 'inline-block', margin: '5px' }}>userId</label>
                                        <Field type="number" name="userId" />
                                        <ErrorMessage name="userId" component="div" />
                                    </div>
                                    <div style={{ display: 'inline-block' }}>
                                        <label htmlFor='agentId' style={{ width: '80px', display: 'inline-block', margin: '5px' }}>agentId</label>
                                        <Field type="number" style={{display: 'inline-block', marginRight: '5px'}} name="agentId" />
                                        <ErrorMessage name="agentId" component="div" />
                                    </div>
                                    <button type="submit" disabled={isSubmitting}>Save</button>
                                </div>
                                
                            </Form>
                        )
                    }
                </Formik>

                <p>{detailUpdate}</p>

                <h4 style={{margin: '5px', }}>Start a conversation</h4>
                <Formik initialValues={{ subject: '' }}
                    validate={values => {
                        const errors = {};
                        return errors;
                    }
                    }
                    onSubmit={createConversation}>
                        {
                            ({ isSubmitting }) => (
                                <div>
                                    <Form>
                                        <div style={{ display: 'inline-block' }}>
                                            <label htmlFor='subject' style={{ width: '80px', display: 'inline-block', margin: '5px' }}>subject</label>
                                            <Field type="text" style={{display: 'inline-block', marginRight: '5px'}} name="subject" />
                                            <ErrorMessage name="subject" component="div" />
                                        </div>
                                        <button type="submit" disabled={isSubmitting}>Start</button>
                                    </Form>
                                    {convStatus}
                                </div>
                            )
                        }
                </Formik>
            </div>
            <ChatMessages />
            <div>
                <Formik
                    initialValues={{ body: '' }}
                    validate={values => {
                        const errors = {};
                        return errors;
                    }
                    }
                    onSubmit={sendMessage}>

                </Formik>
            </div>
        </div>
    );
};

export default UserChatRoom;
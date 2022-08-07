import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import { useState, useEffect } from "react";
import ChatMessages from "../../common/ChatMessages";

const UserChatRoom = () => {
    const [newMessage, setNewMessage] = useState({});
    const [errorMessage, setErrorMessage] = useState('');

    
    let convId = JSON.parse(localStorage.getItem('chatConvId'));
    const [hideConvForm, setHideConvForm] = useState(true);
    const [convStatus, setConvStatus] = useState('');
    
    const userId = JSON.parse(localStorage.getItem('chatUserId'));
    const agentId = JSON.parse(localStorage.getItem('chatAgentId'));

    useEffect(() => {
        if (JSON.parse(localStorage.getItem('chatConvId'))) {
            setHideConvForm(true);
        } else setHideConvForm(false);
    });

    async function sendMessage(values, { setSubmitting, resetForm }) {
        // Append customer detail value from state
        values.customerId = userId;
        if (agentId) {
            values.agentId = agentId;
        }
        values.conversationId = JSON.parse(localStorage.getItem('chatConvId'));

        // Make api call to send message
        const resp = await fetch('http://0.0.0.0:3001/message', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(values, null, 2)
        });

        setSubmitting(false);
        const resVal = await resp.json();
        if (resp.status === 400) {
            setErrorMessage("Your message was not sent: You have to state the subject of your conversation before sending messages.");
        } else {
            setNewMessage(resVal);
            resetForm();
        }
    }

    async function createConversation(values, { setSubmitting }) {
        values.customerId = userId;
        const resp = await fetch('http://0.0.0.0:3001/conversation', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(values, null, 2)
        });

        setSubmitting(false);
        if (resp.status === 201) {
            setConvStatus('You have successfully started a conversation.')
            const resVal = await resp.json();
            localStorage.setItem('chatConvId', JSON.stringify(resVal.id));            
        } else {
            setConvStatus('Please set the subject for discussion.')
            return {}
        }
    }

    return (
        <div className='bgColor' style={{ display: 'flex', flexDirection: 'column', width: '70%', padding: '10px', margin: '0 auto' }}>
            <h2>Welcome to your chat room!</h2>
            <div style={{ display: hideConvForm ? 'none': 'block' }}>
                <h4 style={{ margin: '5px', }}>Start a conversation</h4>
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
                                        <Field type="text" style={{ display: 'inline-block', marginRight: '5px' }} name="subject" />
                                        <ErrorMessage name="subject" component="div" />
                                    </div>
                                    <button type="submit" disabled={isSubmitting}>Start</button>
                                </Form>

                            </div>
                        )
                    }
                </Formik>
                {convStatus}
            </div>

            <div>
                <div>
                <button onClick={() => {
                    // Clear local storage
                    localStorage.removeItem('chatConvId');
                    localStorage.removeItem('chatUserId');
                    localStorage.removeItem('chatAgentId');
                    localStorage.removeItem('chatUserRole');
                }} style={{ float: 'right' }}>Log out</button>
                    <h4>Messages</h4>
                </div>
                <div style={{ border: 'solid 1px', width: '50%', paddingBottom: '10px' }}>

                    <ChatMessages agentId={agentId} />
                    <Formik
                        initialValues={{ body: '' }}
                        validate={values => {
                            const errors = {};
                            return errors;
                        }
                        }
                        onSubmit={sendMessage}>
                        {
                            ({ isSubmitting }) => (
                                <Form>
                                    <div style={{ display: 'inline-block', width: '100%' }}>
                                        <Field type="text" as='textarea' style={{ display: 'inline-block', margin: '5px', width: '90%'}} name="body" />
                                        <ErrorMessage name="body" component="div" />
                                        <button type="submit" disabled={isSubmitting} style={{ margin: '5px' }}>Send</button>
                                    </div>
                                </Form>
                            )
                        }
                    </Formik>
                    
                    <div>{errorMessage}</div>
                </div>
            </div>
        </div>
    );
};

export default UserChatRoom;
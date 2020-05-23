
import styles from './chat-thread.module.css'

import ThreadGetter1 from '../../../../../../react-context/ThreadGetter1'

import React, { useEffect } from 'react'

export default function ChatThread() {

    var messagesEnd; // variable to which a dummy div is assigned to, to allow me to use function scrollToBottom();


    // const rawdata = React.useContext(ThreadGetter1).messageThreads; // Consume context from (great?) grand-parent component
    // const threadData = JSON.parse(rawdata);
    // threadData is now an object containing all convo threads that the user has with other people

    // TODO: move thread getting to modularized file
    // const relevantThread = threadData.conversations.friend1.conversation_thread;
    const relevantThread = React.useContext(ThreadGetter1).currentFriendThread;
    // const currentUID = React.useContext(ThreadGetter1).currentFriendUID;
    // console.log(relevantThread)

    const scrollToBottom = () => {
        messagesEnd.scrollIntoView({behavior: 'smooth'});
        // console.log(messagesEnd);
    }

    // useEffect is similar to combining componentDidMount and componentDidUpdate
    useEffect(() => {
        scrollToBottom();

        // console.log('test UID: '+currentUID);

    })

    // scrollToBottom();

    // console.log('rendering: chat-thread.js');

    return(

        <div className={styles.base_container}>
        
            {relevantThread.map((messageObject, index) => {
                {/* console.log(baseContainerRef); */}
                
                if (messageObject.sender === 'self') {
                    return(
                        <div className={styles.chat_row} key={messageObject.timestamp}>
                            <div className={styles.chat_bubble_self}> 
                                <p>{messageObject.text}</p> 
                            </div>
                        </div>
                    )
                } else {
                    return(
                        <div className={styles.chat_row}  key={messageObject.timestamp}>
                            <div className={styles.chat_bubble_friend}> 
                                <p>{messageObject.text}</p> 
                            </div>
                        </div>
                    )
                }
            })}

            <div className={styles.dummy_Div} ref={(el) => {messagesEnd = el; }}>
                {/* This div is a dummy div that I add to the end of the list of chat messages. I use this dummy div in a function called scrollToBottom that lets me automatically scroll to the bottom of the messages every time the function is called.*/}
            </div>


        </div>
    )
}

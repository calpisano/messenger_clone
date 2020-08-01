
import styles from './chat-thread.module.css'

import ThreadGetter1 from '../../../../../../react-context/ThreadGetter1'

import React, { useEffect } from 'react'

export default function ChatThread() {

    var messagesEnd; // variable to which a dummy div is assigned to, to allow me to use function scrollToBottom();


    const relevantThread = React.useContext(ThreadGetter1).currentFriendThread; // array of objects containing messages, assumed to be in chronological order
    const relevantFriend = React.useContext(ThreadGetter1).currentFriendUID; // user_uid string of selected friend
    const hostUserID = React.useContext(ThreadGetter1).hostUserID;
    

    const scrollToBottomSmooth = () => {
        messagesEnd.scrollIntoView({behavior: 'smooth'});
    }

    // useEffect is similar to combining componentDidMount and componentDidUpdate
    useEffect(() => {
        scrollToBottomSmooth();

    })

    console.log(relevantFriend);


    return(

        <div className={styles.base_container}>

        
            {relevantThread.map((messageObject, index) => {
                
                if (messageObject.created_by_user_uid === hostUserID) { // message sent by host user
                    return(
                        <div className={styles.chat_row} key={messageObject.line_uid}>
                            <div className={styles.chat_bubble_self}> 
                                <p>{messageObject.line_text}</p> 
                            </div>
                        </div>
                    )
                } else if (messageObject.created_by_user_uid === relevantFriend) { // message sent by friend
                    return(
                        <div className={styles.chat_row}  key={messageObject.line_uid}>
                            <div className={styles.chat_bubble_friend}> 
                                <p>{messageObject.line_text}</p> 
                            </div>
                        </div>
                    )
                }
                else{
                    console.error('Invalid chat_line user id in /chat-thread.js');
                    return(
                        <div key={index}>
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


import styles from './new-message.module.css'

import React from 'react'

import ThreadGetter1 from '../../../../../../react-context/ThreadGetter1'


export default function NewMessage() {


    const textInputRef = React.useRef();

    const sendNewMessage = React.useContext(ThreadGetter1).sendNewMessage;


    const handleSubmit = (event) => {
        event.preventDefault() // prevent page from reloading, effectively.

        // get current value of text input
        let textInputValue = textInputRef.current.value;


        if(textInputValue.length != 0) {
            // send the message
            executeSend(textInputValue);

            // reset text input value
            textInputRef.current.value = null;
        } else {
            // if the text input is empty, do nothing
        }
    }

    const executeSend = (message) => {

        // passes a message string as a parameter to the function held by this.updateThreads
        sendNewMessage(message);
    }

    return (
        <div className={styles.base_container}>
            <div className={styles.new_message_wrapper}> 
                <form onSubmit={handleSubmit}>
                    <input
                    type="text"
                    placeholder="Type your message..."
                    ref={textInputRef}
                    className={styles.text_input}>
                    </input>
                    <button type="submit" value="Submit" className={styles.text_submit_button}>
                        Send
                    </button>
                </form>
            </div>
        </div>
    )


}
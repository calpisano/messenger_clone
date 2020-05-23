
import styles from './new-message.module.css'

import React, {useState, useRef} from 'react'

import ThreadGetter1 from '../../../../../../react-context/ThreadGetter1'



// class NewMessage extends React.Component {
    
//     static contextType = ThreadGetter1; // subscribe this component to be a consumer of ThreadGetter Context

//     constructor(props){
//         super(props);

//         this.textInput = React.createRef(); // create basic React ref to text input DOM element. I use this to reference the text input's present value (e.g. whatever the user has typed so far)

//         this.sendNewMessage = null; // to be assigned a function in componentDidMount()
//         this.testUID = null;
//         // this.currentFriendUID = null; // to be assigned a value in componentDidMount()

//     }

//     componentDidMount() {
//         // updateThreads is a function used to update a message thread data by executing code in ancestor /pages/messenger
//         this.sendNewMessage = this.context.sendNewMessage;
//         this.testUID = this.context.currentFriendUID;
//         // this.currentFriendUID = this.context.currentFriendUID;

//     }

    
//     handleSubmit = (event) => {
//         event.preventDefault() // prevent page from reloading, effectively.


//         let textInputValue = this.textInput.current.value;

//         console.log(this.testUID);

//         if(textInputValue.length != 0) {
//             // send the message
//             this.executeSend(textInputValue);

//             // reset text input value
//             this.textInput.current.value = null;
//         } else {
//             // if the text input is empty, do nothing
//         }
//     }


//     executeSend = (message) => {
//         // console.log("sending message to UID: "+this.currentFriendUID);

//         // passes a message string as a parameter to the function held by this.updateThreads
//         // this.sendNewMessage(message, this.currentFriendUID);
//         this.sendNewMessage(message);
//     }

//     render(){

//         // console.log('target friend: '+this.currentFriendUID);


//         // console.log('update threads' +this.updateThreads)

//         return(
//         <div className={styles.base_container}>
//             <div className={styles.new_message_wrapper}> 
//                 <form onSubmit={this.handleSubmit}>
//                     <input
//                     type="text"
//                     placeholder="Type your message..."
//                     ref={this.textInput}
//                     className={styles.text_input}>
//                     </input>
//                     <button onClick={this.handleSubmit} className={styles.text_submit_button}>
//                         Send
//                     </button>
//                 </form>

//             </div>

//         </div>
//         )}
// }

// export default NewMessage

export default function NewMessage() {

    // const [textInput, setText] = useState('');

    const textInputRef = React.useRef();

    const sendNewMessage = React.useContext(ThreadGetter1).sendNewMessage;
    // const testUID = React.useContext(ThreadGetter1).currentFriendUID;

    // const textInput = React.useRef();

    const handleSubmit = (event) => {
        event.preventDefault() // prevent page from reloading, effectively.

        // get current value of text input
        let textInputValue = textInputRef.current.value;

        // console.log('testUID: '+testUID);

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
                    // value={textInput}
                    // onChange={e => setText(e.target.value)}
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
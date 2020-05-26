
import MessengerMain from '../scenes/messenger-main/messenger-main'

import fetch from 'node-fetch'


// Use React Context to pass variables all the way from parent component to any child
import ThreadGetter1 from '../react-context/ThreadGetter1'
import { useState } from 'react'


function currentThreadBuilder(thread_uid = '', messagesDB = []) {
    // this function builds an array of messages from filtering the repository of all messages using a given thread_uid
    // Assumptions: messagesDB message entries, for a given thread_uid, are already stored in chronological

    let messageArray = [];
    for (let message of messagesDB) {
        if(message.thread_uid === thread_uid) {
            messageArray.push(message);
        }
    }
    return messageArray;
};



export default function MessengerLanding({ allThreadsDB, allUsersDB, allMessagesDB, initialFriendSelect, initialThreadSelect, hostUserUID }) {
    // props: allThreadsDB, allUsersDB are JS objects containing objects
    // props: allMessagesDB is array of objects
    // props: initialFriendSelect is String represenging a friend's user_uid

    // changes in state cause re-rendering. In this case, will also pass a prop to child subscribers of data which also re-render

    const [ currentThreadUID, updateCurrentThreadUID ] = useState(initialThreadSelect);
    const [ currentFriendUID , updateCurrentFriendUID ] = useState(initialFriendSelect); // type String, selected friend uid string
    const [ threadDataDB, updateThreadDataDB ] = useState( allThreadsDB ); // type Object, contains all thread_uid's belonging to host user, keys are thread_uid, value is object where keys are user_uid (of host) and participant_user_uid;
    const [ chatLinesDB, updateChatLinesDB ] = useState( allMessagesDB ); // type Array of Objects, contains all messages of every thread in threadDataDB, each entry is unique chat message with fields: line_uid, thread_uid, created_by_user_uid, line_text, created_at_timestamp
    const [ userDataDB , updateFriendDataDB ] = useState( allUsersDB ); // type Object, contains all user data
    const [ hostUserID , updateHostUserID ] = useState( hostUserUID ); //type String, representing host user's uid

    console.log('rendering...: ' + chatLinesDB.length)
    
    var currentFriendThread = currentThreadBuilder(currentThreadUID, chatLinesDB);


    const selectConversationFunc = (friend_uid = '', thread_uid = '') => {

        updateCurrentFriendUID(friend_uid);

        updateCurrentThreadUID(thread_uid);

    };


    
    const sendMessageFunc = (message) => {
        // sendMessageFunc is passed into the React Context ThreadGetter1, and is invoked by child component new-message.js . When called, it uses http to post the most recent chat message to the server, and receives the most recent chat data in the form of a stringified JSON

        let newMessageDB = {
            line_text: message,
            created_by_user_uid: hostUserID,
            thread_uid: currentThreadUID
        };

        (async () => {

            // first, post new message to database for corresponding thread_uid
            const threadResponse = await fetch(`http://127.0.0.1:9090/post_new_message_to_thread`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newMessageDB)
            })
            .then( async (response) => {
                try {
                    const chatLineResponse = await fetch(`http://127.0.0.1:9090/get_initial_chat_lines`);
                    updateChatLinesDB(await chatLineResponse.json()); // type JS Object
                } catch(error) {
                    console.error('Cannot get chat line response...', error);
                }
            })
            .catch(err => console.error('Problem sending new chat messages...', err))

        })();

    }


    return(
        // React Context value is an object with a stringified JSON, and a function
        // React Context, when updated, triggers a rerender of the component using useContext
        <ThreadGetter1.Provider value={{
                                        // ThreadGetter1 can now be accessed by any child of messenger.js

                                        currentFriendUID: currentFriendUID, // currently selected friend to view
                                        currentFriendThread: currentFriendThread, //array of objects containing message thread for currently selected friend 
                                        // conversations: masterData.conversations, //object of objects representing friends list
                                        
                                        conversations: threadDataDB, // object containing thread_uid as keys. Values are corresponding user_uid and participant_user_uid
                                        allUserData: userDataDB, // object containing user_uid as keys. Values are corresponding name, email, etc...
                                        hostUserID: hostUserID,
                                        selectConversation: selectConversationFunc, // function to switch friends
                                        sendNewMessage: sendMessageFunc // function to send message to current friend
                                        
                                        }}>
            <MessengerMain>
                {/* <div>
                    <button
                        onClick={() => sendMessageFunc('manual update of chat')}>
                        Manually update thread data
                    </button>
                </div>
                <div>
                    Icons by <a target="_blank" href="https://icons8.com">Icons8</a> <br />
                </div> */}

                
            </MessengerMain>
        </ThreadGetter1.Provider>
        
    )

}

export async function getServerSideProps() {
    // getting props can only be called on Page file, not component files
    // Get external data from the file system, API, DB, etc.
    // https://nextjs.org/blog/next-9-3 <-- next.js docs on getServerSideProps()

    // const resTest2 = await fetch(`http://127.0.0.1:9090/`);
    // const testMessage2 = await resTest2.text();
    // console.log(testMessage2);

    try {
        const resThreadsDB = await fetch(`http://127.0.0.1:9090/get_initial_chat_thread`);
        const allThreadsDB = await resThreadsDB.json() // type JS Object of Objects

        const resUsersDB = await fetch(`http://127.0.0.1:9090/get_initial_chat_user`);
        const allUsersDB = await resUsersDB.json(); // type JS Object of Objects
        

        const resAllMessagesDB = await fetch(`http://127.0.0.1:9090/get_initial_chat_lines`);
        const allMessagesDB = await resAllMessagesDB.json(); // type Array of Objects


        const hostUserUID = "d856c932-9291-4e71-bf4c-3131b2b6e535";
        const initialFriendSelect = "91e20e0e-9d3e-4d21-8ecc-218f1def8572"; // when this web page is first open, initially open convo of this friend by default
        const initialThreadSelect = "79910454-1d26-41d2-8263-c0780440926b";

    
        // The value of the `props` key will be passed to the `Home` component
        return {
            props: {
                allThreadsDB,
                allUsersDB,
                allMessagesDB,
                initialFriendSelect,
                initialThreadSelect,
                hostUserUID
            }
        }


    } catch(error){

        console.log('error getServerSideProps ' + error);
        const allThreadsDB = {};
        const allUsersDB = {};
        const allMessagesDB = [{}];
        const hostUserUID = "d856c932-9291-4e71-bf4c-3131b2b6e535";
        const initialFriendSelect = "91e20e0e-9d3e-4d21-8ecc-218f1def8572"; // when this web page is first open, initially go to this default friend
        const initialThreadSelect = "79910454-1d26-41d2-8263-c0780440926b";


        return {
            props: {
                allThreadsDB,
                allUsersDB,
                allMessagesDB,
                initialFriendSelect,
                initialThreadSelect,
                hostUserUID
            }
        }
        


    }
  }
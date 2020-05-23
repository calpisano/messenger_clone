
import MessengerMain from '../scenes/messenger-main/messenger-main'

import fetch from 'node-fetch'


// Use React Context to pass variables all the way from parent component to any child
import ThreadGetter1 from '../react-context/ThreadGetter1'
import { useState } from 'react'


var initialFriendUID;

(function initialConversationSelection() {
    initialFriendUID = "1001";
})();



export default function MessengerLanding({ allDataChunk, initialFriendSelect }) {
    // prop: allDataChunk is a JS object

    // changes in state cause re-rendering. In this case, will also pass a prop to child subscribers of data which also re-render
    const [ masterData, updateMasterData ] = useState( allDataChunk ); //this is only executed one time, no matter how many
    const [ currentFriendUID , updateCurrentFriendUID ] = useState(initialFriendSelect);


    // console.log("currentFriendUID: "+ currentFriendUID);
    
    var currentFriendThread = masterData.conversations[currentFriendUID].conversation_thread;

    const selectConversationFunc = (friendUID) => {
        // currentFriendUID = String(friendUID);
        updateCurrentFriendUID(String(friendUID));
        // console.log('select new conversation of UID: '+ currentFriendUID);

        currentFriendThread = masterData.conversations[friendUID].conversation_thread;

        // console.log('currentFriendThread: ', currentFriendThread);

    };

    // const [ threadDataStr, updateThread ] = useState( JSON.stringify(allDataChunk) );


    // selectConversationFunc(initialFriendUID);



    // If I define my method with 2 fat arrows, then in html template, instead of calling it in render as: {() => sendMessageFunc(param)}, I can simply call it as {sendMessageFunc(param)}
    //https://stackoverflow.com/questions/51863058/what-is-the-difference-between-both-button-click-in-the-given-react-component/51863128#51863128
    
    const sendMessageFunc = (message) => {
        // sendMessageFunc is passed into the React Context ThreadGetter1, and is invoked by child component new-message.js . When called, it uses http to post the most recent chat message to the server, and receives the most recent chat data in the form of a stringified JSON

        // console.log('sending message to friendUID: '+friendUID);

        // build a string displaying the current time of message send
        let now = new Date();
        let timestamp = now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds() + ':' + now.getMilliseconds();

        // build the chat message entry object, to be appended to an array of objects
        let newMessage = {
            text: message,
            timestamp: timestamp,
            sender: 'self',
            currentFriendUID: currentFriendUID
        };
        // console.log(newMessage);

        (async () => {
            const rawResponse = await fetch(`http://127.0.0.1:8080/post_new_message`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newMessage)
            });
            const content = await rawResponse.json();
            // content (response) is all message data for all friends

            // updateThreadRender(content);
            updateMasterDataRender(content);

            // console.log(content);
        })();

    }

    const updateMasterDataRender = (data) => {
        console.log('fire');
        updateMasterData(data); 
    }


    return(
        // React Context value is an object with a stringified JSON, and a function
        // React Context, when updated, triggers a rerender of the component using useContext
        <ThreadGetter1.Provider value={{
                                        // ThreadGetter1 can now be accessed by any child of messenger.js
                                        // messageThreads: threadDataStr, // if I update the local value of messageThreads, then the prop will be passed to children observing this value and they will rerender accordingly

                                        masterData: masterData, // entire repo of data
                                        currentFriendUID: currentFriendUID, // currently selected friend to view
                                        currentFriendThread: currentFriendThread, //array of objects containing message thread for currently selected friend 
                                        conversations: masterData.conversations, //object of objects representing friends list
                                        selectConversation: selectConversationFunc, // function to switch friends

                                        sendNewMessage: sendMessageFunc // function to send message to current friend
                                        
                                        }}>
            <MessengerMain>
                <div>
                    <button
                        onClick={() => sendMessageFunc('manual update of chat')}>
                        Manually update thread data
                    </button>
                </div>

                
            </MessengerMain>
        </ThreadGetter1.Provider>
        
    )

}

export async function getServerSideProps() {
    // getting props can only be called on Page file, not component files
    // Get external data from the file system, API, DB, etc.
    // https://nextjs.org/blog/next-9-3 <-- next.js docs on getServerSideProps()
    
    // dev test getting text data from server
    const resTest = await fetch(`http://127.0.0.1:8080/`);
    const testMessage = await resTest.text();
    console.log(testMessage);

    const resAllData = await fetch(`http://127.0.0.1:8080/get_initial_thread`);
    const allDataChunk = await resAllData.json(); //res.body is received in json string and subsequently PARSED, devTest2 is now an object



    const initialFriendSelect = "1001"; // when this web page is first open, initially go to this default friend

  
    // The value of the `props` key will be
    //  passed to the `Home` component
    return {
      props: {
        testMessage,
        allDataChunk,
        initialFriendSelect
      }
    }
  }
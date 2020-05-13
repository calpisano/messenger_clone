
import MessengerMain from '../scenes/messenger-main/messenger-main'

import fetch from 'node-fetch'

const httpFetch = require('node-fetch')

// Use React Context to pass variables all the way from parent component to any child
import ThreadGetter1 from '../react-context/ThreadGetter1'
import { useState } from 'react'

export default function MessengerLanding({ devTest2 }) {

    // const devTest2_string = JSON.stringify(devTest2) //stringify the message data

    const [ threadDataStr, updateThread ] = useState( JSON.stringify(devTest2) )
    // set state: first variable is initially set to stringified devTest2 data. Second variable is function to change the state variable

    // If I define my method with 2 fat arrows, then in html template, instead of calling it in render as: {() => sendMessageFunc(param)}, I can simply call it as {sendMessageFunc(param)}
    //https://stackoverflow.com/questions/51863058/what-is-the-difference-between-both-button-click-in-the-given-react-component/51863128#51863128
    const sendMessageFunc = (message) => {
        // sendMessageFunc is passed into the React Context ThreadGetter1, and is invoked by child component new-message.js . When called, it uses http to post the most recent chat message to the server, and receives the most recent chat data in the form of a stringified JSON

        // build a string displaying the current time of message send
        let now = new Date();
        let timestamp = now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds() + ':' + now.getMilliseconds();

        // build the chat message entry object, to be appended to an array of objects
        let newMessage = {
            text: message,
            timestamp: timestamp,
            sender: 'self'
        };
        // console.log(newMessage);

        (async () => {
            const rawResponse = await fetch(`http://127.0.0.1:8080/post_new_message`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newMessage)
            });
            const content = await rawResponse.json();
            // console.log(typeof content);

            updateThreadRender(content);

            console.log(content);
        })();

    }

    // updateThreads is a function that receives the latest modified friend convo data and overwrites the current state variable 'updateThread'
    const updateThreadRender = (data) => {

        console.log('fire')

        // httpFetch(`http://127.0.0.1:8080/get_modified_thread`)
        //     .then(res => res.json()) //interpret response as Javascript object
        //     .then(data => {
        //         updateThread(JSON.stringify(data)); //call state updating function 'updateThread' to update the state of THIS
        //     })
   

        updateThread(JSON.stringify(data)) //call the state changing function 'updateThread' to change the state variable threadDataStr

    }

    // the following function works to change the conversation-thread.js render
    // const updateThreadFunc = () => {
    //     console.log('hi')
    //     let testObject = { "threads": {
    //                     "friend1" : [
    //                         {"text": "hi",
    //                         "sender" : "frriend",
    //                         "timestamp": "timestamp"
    //                         },
    //                         {"text": "hi2",
    //                         "sender" : "frriend",
    //                         "timestamp": "timestamp"
    //                         },
    //                         {"text": "hi2",
    //                         "sender" : "frriend",
    //                         "timestamp": "timestamp"
    //                         },

    //                     ]
    //                     }
    //                 }
    //     updateThread(JSON.stringify(testObject))
    // }

    return(
        // React Context value is an object with a stringified JSON, and a function
        // React Context, when updated, triggers a rerender of the component using useContext
        <ThreadGetter1.Provider value={{
                                        // ThreadGetter1 can now be accessed by any child of messenger.js
                                        // messageThreads: devTest2_string,
                                        messageThreads: threadDataStr, // if I update the local value of messageThreads, then the prop will be passed to children observing this value and they will rerender accordingly
                                        updateThreads : sendMessageFunc
                                        
                                        }}>
            <MessengerMain>
                <div>
                    <button
                        onClick={() => sendMessageFunc('manual update of chat')}>
                        Manually update thread data
                    </button>
                    {/* <button
                        onClick={() => sendMessageFunc('hello2')}>
                        Send Message Btn
                    </button> */}
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
    const res = await fetch(`http://127.0.0.1:8080/`)
    const allPostsData2 = await res.text()

    const res2 = await fetch(`http://127.0.0.1:8080/get_initial_thread`)
    const devTest2 = await res2.json(); //res.body is received in json string and subsequently PARSED, devTest2 is now an object


    console.log(allPostsData2 + " hi")

  
    // The value of the `props` key will be
    //  passed to the `Home` component
    return {
      props: {
        allPostsData2,
        devTest2
      }
    }
  }
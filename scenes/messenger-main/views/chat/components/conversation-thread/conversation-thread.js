
import styles from './conversation-thread.module.css'

import ThreadGetter1 from '../../../../../../react-context/ThreadGetter1'

import React from 'react'

export default function ConversationThread() {

    var baseContainerRef = React.createRef();
    // console.log(baseContainerRef);
    // console.log(baseContainerDOM);
    // baseContainerDOM.scrollTop = 0;

    const rawdata = React.useContext(ThreadGetter1).messageThreads // Consume context from (great?) grand-parent component
    const threadData = JSON.parse(rawdata)
    // threadData is now an object containing all convo threads that the user has with other people

    const relevantThread = threadData.threads.friend1
    // console.log(relevantThread)


    // const autoScroll = (elem) => {
    //     if(elem) { //check if arguments contains anything at all.. This prevents error where args are NULL in between renders
    //         console.log('scrollTop'+elem.scrollTop)

    //     }
    // }

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
        </div>
    )
}



// import React from 'react'

// import styles from './conversation-thread.module.css'

// import ThreadGetter1 from '../../../../../../react-context/ThreadGetter1'


// function ThreadList(props) {
//     //props is JSON string of full convo thread of all friends

//     let messageList = [];
//     // let data = JSON.parse(props.data);
//     console.log('data', props.data);

//     return(
//         <div> <br /><br /><br /><br /><br />
//             hi
//         </div>
//     )
// }

// // export default function ConversationThread() {
// class ConversationThread extends React.Component {

//     static contextType = ThreadGetter1; //subscribe to context provider

//     constructor(props){
//         super(props);

//         this.rawdata = ''; //to be assigned in componentDidMount()
//         this.threadData = null;
//         this.relevantThread = null;
//     }

//     componentDidMount() {
//         console.log(this.context.messageThreads);
//         this.rawdata = this.context.messageThreads; //subscribe local variable to context information
//     }

//     // var rawdata = React.useContext(ThreadGetter1).messageThreads; // Consume context from (great?) grand-parent component
//     // threadData = JSON.parse(this.rawdata);
//     // // threadData is now an object containing all convo threads that the user has with other people

//     // relevantThread = threadData.threads.friend1;
//     // console.log(relevantThread)

//     updateScroll = () => {
//         var chatElement = document.getElementById('baseContainer');
//         console.log(chatElement);
//     }

//     generateThread = (thread) => {
//         let listElement = thread.map((messageObject, index) => {
//             <div key={messageObject.timestamp}> 
//                 <p>{messageObject.text}</p> 
//             </div>
//         })

//         return listElement;
//     }



//     render(){

//         // console.log(this.rawdata);
//         // this.threadData = JSON.parse(this.rawdata);

//         // this.relevantThread = this.threadData.threads.friend1;
//         // this.updateScroll();
//         // const listItems = this.generateThread(this.relevantThread);

//         console.log(this.rawdata);

//         return(
//             <div className={styles.base_container} id="baseContainer">

//                 <ThreadList data={this.rawdata}/>
            
//                 {/* {relevantThread.map((messageObject, index) => {

//                     return(
//                         <div key={messageObject.timestamp}> 
//                             <p>{messageObject.text}</p> 
//                         </div>
//                     )
//                 })} */}
//             </div>
//         )
//     }
// }

// export default ConversationThread
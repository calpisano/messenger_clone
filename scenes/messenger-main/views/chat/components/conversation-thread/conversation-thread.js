
import styles from './conversation-thread.module.css'

import ThreadGetter1 from '../../../../../../react-context/ThreadGetter1'


export default function ConversationThread() {

    const rawdata = React.useContext(ThreadGetter1) // Consume context from (great?) grand-parent component
    const threadData = JSON.parse(rawdata)
    // threadData is now an object containing all convo threads that the user has with other people

    const relevantThread = threadData.threads.friend1
    // console.log(relevantThread)

    return(
        <div className={styles.base_container}>
        
            {relevantThread.map((messageObject, index) => {

                return(
                    <div key={messageObject.timestamp}> 
                        <p>{messageObject.text}</p> 
                    </div>
                )
            })}
        </div>
    )
}
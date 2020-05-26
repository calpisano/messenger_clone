import styles from './chat.module.css'

import ChatBanner from './components/banner/chat-banner'
import ChatThread from './components/conversation-thread/chat-thread'
import NewMessage from './components/new-message/new-message'



// Chat is the component holding things related to the conversation, including the Friend's profile data (in the banner) and ChatBox, the component displaying all the messages 
export default function Chat() {

    return(
        <div className={styles.base_container}>

            <ChatBanner />
            
            <div className={styles.chat_box_container}>
                
                <ChatThread />
                <NewMessage />
  

            </div>
        </div>
    )
}

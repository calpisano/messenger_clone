import styles from './chat.module.css'

import ConversationThread from './components/conversation-thread/conversation-thread'
import NewMessage from './components/new-message/new-message'



// Chat is the component holding things related to the conversation, including the Friend's profile data (in the banner) and ChatBox, the component displaying all the messages 
export default function Chat() {

    return(
        <div className={styles.base_container}>
            <div className={styles.banner}>
                <div className={styles.banner_box}>
                    <img className={styles.banner_img} src='/default-profile-pic.png' alt="friend's name"/>
                    <div className={styles.banner_name}>
                        <h5>Friend's Name</h5>
                        <p className="text-muted">Active 20m ago</p>
                    </div>
                </div>
            </div>
            <div className={styles.chat_box_container}>
                
                <ConversationThread />
                <NewMessage />
  

            </div>
        </div>
    )
}

import styles from './chat.module.css'
import ChatBox from './components/chat-box/chat-box'

import ThemeContext from '../../../../react-context/ThemeContext'



// Chat is the component holding things related to the conversation, including the Friend's profile data (in the banner) and ChatBox, the component displaying all the messages 
export default function Chat() {
    const color = React.useContext(ThemeContext) // Consume context from (great?) grand-parent component
    console.log(color)

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
            <div className={styles.chat_box}>
                {/* <p>{color}</p> */}
                
                <ChatBox />

                

                

            </div>
        </div>
    )
}

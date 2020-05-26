import styles from './conversations.module.css'

import React from 'react'

import ConversationsBanner from './components/banner/conversations-banner'
import ConversationList from './components/conversation-list/conversation-list'

// Conversations() is the 'left-side column' of the screen containing the user's profile banner and friends list.
export default function Conversations() {
    

    return (
        <div className={styles.base_container}>

            <ConversationsBanner />

            <div className={styles.conversations_container}>
                <ConversationList />    

            </div>
            
        </div>
    )
}
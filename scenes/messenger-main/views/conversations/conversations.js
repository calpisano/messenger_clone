import styles from './conversations.module.css'

import React, { useState } from 'react'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'

import ConversationList from './components/conversation-list'

// Conversations() is the 'left-side column' of the screen containing the user's profile banner and friends list.
export default function Conversations() {

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle = () => setDropdownOpen(prevState => !prevState);  
    
    // const { height, width } = UseWindowDimensions();

    const header_dropdown = {
        position: "absolute",
        right: "0",
        marginRight: "1.5rem",
        color: "white",
    }
    

    return (
        <div className={styles.base_container}>
            <div className={styles.banner}>
                <img className={styles.banner_img} src="/dog-profile-pic.jpg" alt="profile pic"/>
                <h2 className={styles.banner_header}><b>Chats</b></h2>

                <Dropdown style={ header_dropdown } isOpen={dropdownOpen} toggle={toggle}>
                    <DropdownToggle color="transparent" caret>
                        {/* dropdownToggle color property uses Bootstrap built in color themes */}
                        <img src="/icons8-settings-50.png" alt="settings" />
                    </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem header>Header</DropdownItem>
                        <DropdownItem>Some Action</DropdownItem>
                        <DropdownItem disabled>Action (disabled)</DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem>Foo Action</DropdownItem>
                        <DropdownItem>Bar Action</DropdownItem>
                    </DropdownMenu>

                </Dropdown>
            </div>
            <div className={styles.conversations_container}>
                <ConversationList friendCount={25}></ConversationList>     

            </div>
            
        </div>
    )
}
import styles from './conversations-banner.module.css'

import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import { useState } from 'react'

export default function ConversationsBanner() {

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle = () => setDropdownOpen(prevState => !prevState);  
    
    const header_dropdown = {
        position: "absolute",
        right: "0",
        marginRight: "1.5rem",
        color: "white",
    }



    return(
        <div className={styles.banner}>
            <img className={styles.banner_img} src="/myra-selfie.jpg" alt="profile pic"/>
            <h2 className={styles.banner_header}><b>Chats</b></h2>

            {/* <Dropdown style={ header_dropdown } isOpen={dropdownOpen} toggle={toggle}>
                <DropdownToggle color="transparent" caret>
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
            </Dropdown> */}
            
        </div>
    )
}
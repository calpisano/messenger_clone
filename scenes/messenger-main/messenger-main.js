import LayoutMessenger from './layout-messenger/layout-messenger'

import styles from './messenger-main.module.css'


export default function MessengerMain(props) {

    return(
        <div className={styles.messenger_main}>
            <LayoutMessenger>

                <div>
                    {props.children}
                </div>
                
            </LayoutMessenger>
        </div>

    )
}
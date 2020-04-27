import Link from 'next/link'
import LayoutMessenger from './layout-messenger/layout-messenger'

import styles from './messenger-main.module.css'

export default function MessengerMain() {
    return(
        <div className={styles.messenger_main}>
            <LayoutMessenger>
                <div>
                    <Link href="/"><a>home</a></Link>
                    Icons by <a target="_blank" href="https://icons8.com">Icons8</a>
                </div>

            </LayoutMessenger>
        </div>

    )
}
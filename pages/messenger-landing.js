
import styles from '../components/messenger-landing/messenger-landing.module.css'
import Layout from '../components/messenger-landing/components/layout/layout'
import Footer from '../components/messenger-landing/components/footer/footer'
import Link from 'next/link'

export default function MessengerLanding() {
    return(
        <div>
            <Layout>
                <Link href="/"><a>home</a></Link>
                <p className={styles.parag}>hello world!</p>

            </Layout>
            <Footer>

            </Footer>


        </div>
        
    )

}
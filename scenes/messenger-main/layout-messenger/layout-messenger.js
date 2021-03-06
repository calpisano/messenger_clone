// this file organizes the sub-views of messenger-main
import styles from './layout-messenger.module.css'

import Conversations from '../views/conversations/conversations'
import Chat from '../views/chat/chat'

import { Row, Col } from 'reactstrap';

const rowStyle = {
    height: "100%",
    margin: "0",
    padding: "0",
    border: "0",
}

const columnStyle = {
    height: "100%",
    margin: "0",
    padding: "0",
    border: "0",
}

export default function LayoutMessenger(props) {
    return(
        <div className={styles.content}>
            <Row style={ rowStyle }>
                <Col md="3" style={ columnStyle }>
                    <Conversations />
                </Col>
                
                <Col md="9" style={ columnStyle }>
                    <Chat />
                </Col>
            </Row>
            {/* To remove scroll-bars, comment out props.children */}
            {props.children} 
        </div>
    )

}
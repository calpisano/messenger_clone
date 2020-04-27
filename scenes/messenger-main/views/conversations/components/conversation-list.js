import { Container, Card, Row, Col } from 'reactstrap';

import styles from './conversation-list.module.css'


function objGenerator(num) {
    let arrayOfObjs = [];

    for (let i = 0; i < num; i++) {
        arrayOfObjs.push(
            {
                id: i.toString(),
                name: "Friend " + i.toString(),
                imgURL: "/default-profile-pic.png",
                lastMessage: "previous message"
            }
        )
    }

    return arrayOfObjs;
}

function ListGenerator(props) {


    const array = props.array.slice()
    console.log(array)

    const mapArray = array.map( (friend) => {
        return (
            <li key={ friend.id } className={ styles.friendly_li }>

                <img className={styles.friendly_face} src='/default-profile-pic.png' alt="friend's portrait" />
                
                <div className={styles.friendly_text_holder}>
                    
                    <h4 className={styles.friendly_name}>{friend.name}</h4>
                    <p className={styles.friendly_message}>{friend.lastMessage}</p>
                
                </div>
            </li>
        )
    })

    return mapArray

        // <li className={styles.friendly_li}>
        //     <img className={styles.friendly_face} src='/default-profile-pic.png' alt="profile pic" />
        //     hello
        // </li>
}






export default function ConversationList(props) {

    let objArray = objGenerator(props.friendCount);

    return(
        
        <Container>
            <ul className={styles.friendly_ul}>
                <ListGenerator array={ objArray }/>

            </ul>


        </Container>

    )
}
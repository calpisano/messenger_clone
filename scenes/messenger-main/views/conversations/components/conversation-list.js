import { Container } from 'reactstrap';

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
    // console.log(array)

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
}






export default function ConversationList(props) {
    // ConversationList returns a container enlosing a <ul> where each <li> is generated in ListGenerator()

    let objArray = objGenerator(props.friendCount);

    return(
        
        <Container>
            <ul className={styles.friendly_ul}>
                <ListGenerator array={ objArray }/>

            </ul>


        </Container>

    )
}
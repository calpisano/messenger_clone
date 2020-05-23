import { Container } from 'reactstrap';

import styles from './conversation-list.module.css';

import ThreadGetter1 from '../../../../../react-context/ThreadGetter1';


// function objGenerator(num) {
//     let arrayOfObjs = [];

//     for (let i = 0; i < num; i++) {
//         arrayOfObjs.push(
//             {
//                 id: i.toString(),
//                 name: "Friend " + i.toString(),
//                 imgURL: "/default-profile-pic.png",
//                 lastMessage: "previous message"
//             }
//         )
//     }

//     return arrayOfObjs;
// }

function friendDataFormatter(friendsObject = {}) {
    // generate an array of objects, each object containing relevant information to generate the <li> items in the DOM


    const friendEntries = Object.entries(friendsObject);
    // Object.entries generates an array of arrays in the following format:
    // [ key, {value} ] Where for every key in the object, an array is generated where the first element is the key name, and the second element is the value to that key, in whatever form it may be (another object, array, or literal, etc.)

    let arrayOfObjects = [];

    for ( let [name, data] of friendEntries) {
        // console.log(`name: ${name}, and data: ${data.uid}`);

        arrayOfObjects.push(
            {
                uid: data.uid,
                name: data.name,
                imgURL: data.profile_pic_url,
                lastMessage: 'previous message',
                lastMessageTimestamp: data.last_message_timestamp
            }
        )

    }

    // console.log(arrayOfObjects);

    return arrayOfObjects;


}

function ListGenerator(props) {


    const array = props.array.slice();
    const highlightedFriend = props.highlightedFriend;
    // console.log(array)

    const mapArray = array.map( (friend) => {

        if (friend.uid == highlightedFriend){
            //  highlight the friend whose chat thread the user is currently viewing 
            
            return (
                // list item element with function and data binding
                // data value is set to be the uid of the friend
                <li key={ friend.uid } className={ `${styles.friendly_li} ${styles.friendly_selected}`} onClick={ handleClickOnFriend.bind(this, friend.uid) }>

                    {/* profile picture element */}
                    <img className={styles.friendly_face} src={friend.imgURL} alt="friend's portrait" />
                    
                    {/* holder for friend's name and last received message */}
                    <div className={styles.friendly_text_holder}>
                        
                        <h4 className={styles.friendly_name}>{friend.name}</h4>
                        <p className={styles.friendly_message}>{friend.lastMessage}</p>
                    
                    </div>
                </li>
            )
        }
        else {
            return (
                // list item element with function and data binding
                // data value is set to be the uid of the friend
                <li key={ friend.uid } className={ `${styles.friendly_li}`} onClick={ handleClickOnFriend.bind(this, friend.uid) }>

                    {/* profile picture element */}
                    <img className={styles.friendly_face} src={friend.imgURL} alt="friend's portrait" />
                    
                    {/* holder for friend's name and last received message */}
                    <div className={styles.friendly_text_holder}>
                        
                        <h4 className={styles.friendly_name}>{friend.name}</h4>
                        <p className={styles.friendly_message}>{friend.lastMessage}</p>
                    
                    </div>
                </li>
            )
        }
    })

    return mapArray
}

function handleClickOnFriend(val) {

    selectConversation(val); // callback the function selectConversationFunc in pages/messenger.js

}

var selectConversation; // to be assigned value in default function ConversationList





// ConversationList() is the <ul> containing the user's friend list
export default function ConversationList(props) {
    // ConversationList returns a container enlosing a <ul> where each <li> is generated in ListGenerator()

    // let objArray = objGenerator(props.friendCount);

    const currentConversations = React.useContext(ThreadGetter1).conversations; //object of objects
    const currentFriendUID = React.useContext(ThreadGetter1).currentFriendUID; //currently selected friend (by uid)

    selectConversation = React.useContext(ThreadGetter1).selectConversation;

    const friendsListArray = friendDataFormatter(currentConversations);

    return(
        
        <Container>
            <ul className={styles.friendly_ul}>
                <ListGenerator array={ friendsListArray } highlightedFriend={ currentFriendUID }/>

            </ul>


        </Container>

    )
}
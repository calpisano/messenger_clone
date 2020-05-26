import { Container } from 'reactstrap';

import styles from './conversation-list.module.css';

import ThreadGetter1 from '../../../../../../react-context/ThreadGetter1';


function friendDataFormatter(threadsObj = {}, usersObj = {}) {
    // generate an array of objects, each object containing relevant information to generate the <li> items in the DOM
    let threads = threadsObj;
    let users = usersObj;

    let arrayOfObjects = [];

    for (let key in threads){
        let entry = threads[key]; //object containing keys: user_uid and participant_user_uid
        let guestID = entry.participant_user_uid;
        let guestName = users[guestID].first_name + ' ' + users[guestID].last_name;
        let profilePic = users[guestID].profile_pic;
        
        arrayOfObjects.push(
            {
                user_uid: guestID,
                thread_uid: key,
                name: guestName,
                imgURL: profilePic,
                lastMessage: 'previous message',
                lastTimestamp: '2020-05-22 00:10:56.587309-07'
            }
            
        )
    }

    return arrayOfObjects;


}

function ListGenerator(props) {


    const array = props.array.slice();
    const highlightedFriend = props.highlightedFriend;

    const mapArray = array.map( (friend) => {

        if (friend.user_uid == highlightedFriend){
            //  highlight the friend whose chat thread the user is currently viewing 
            
            return (
                // list item element with function and data binding
                // data value is set to be the uid of the friend
                <li key={ friend.user_uid } className={ `${styles.friendly_li} ${styles.friendly_selected}`} onClick={ handleClickOnFriend.bind(this, friend.user_uid, friend.thread_uid) }>

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
                <li key={ friend.user_uid } className={ `${styles.friendly_li}`} onClick={ handleClickOnFriend.bind(this, friend.user_uid, friend.thread_uid) }>

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

function handleClickOnFriend(friend_uid = '', thread_uid = '') {

    selectConversationFunc(friend_uid, thread_uid); // callback the function selectConversationFunc in pages/messenger.js

}

var selectConversationFunc; // to be assigned value in default function ConversationList





// ConversationList() is the <ul> containing the user's friend list
export default function ConversationList(props) {
    // ConversationList returns a container enlosing a <ul> where each <li> is generated in ListGenerator()

    // let objArray = objGenerator(props.friendCount);

    const currentConversations = React.useContext(ThreadGetter1).conversations; // object of objects
    const currentFriendUID = React.useContext(ThreadGetter1).currentFriendUID; // currently selected friend (by uid)
    const userData = React.useContext(ThreadGetter1).allUserData;
    selectConversationFunc = React.useContext(ThreadGetter1).selectConversation; // function to select new friend's conversation

    const friendsListArray = friendDataFormatter(currentConversations, userData);

    return(
        
        <Container>
            <ul className={styles.friendly_ul}>
                <ListGenerator array={ friendsListArray } highlightedFriend={ currentFriendUID }/>

            </ul>


        </Container>

    )
}
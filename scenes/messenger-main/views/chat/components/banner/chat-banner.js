import styles from './chat-banner.module.css';

import ThreadGetter1 from '../../../../../../react-context/ThreadGetter1'


export default function ChatBanner() {

    const allUserData = React.useContext(ThreadGetter1).allUserData; // object containing user_uid as keys. Values are corresponding name, email, etc...
    const currentFriendUID = React.useContext(ThreadGetter1).currentFriendUID; // currently selected friend to view

    let friendName = '';
    let picURL = '';
    try{
        const friendData = allUserData[currentFriendUID];

        friendName = friendData.first_name + ' ' + friendData.last_name;
        picURL = friendData.profile_pic;
        // picURL = '/default-profile-pic.png';
    } catch(error) {
        console.error('Error displaying user data in chat banner...');

        friendName = "Friend's Name";
        picURL = '/default-profile-pic.png';
    }


    return(
        <div className={styles.banner}>
            <div className={styles.banner_box}>
                <img className={styles.banner_img} src={picURL} alt="profile picture"/>
                <div className={styles.banner_name}>
                    <h5>{friendName}</h5>
                    <p className="text-muted">Active 20m ago</p>
                </div>
            </div>
        </div>
    )
}

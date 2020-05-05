
import styles from './new-message.module.css'

import React from 'react'

// import fetch from 'node-fetch'
const fetch = require('node-fetch');

// handleSubmit = event => {
//     console.log("handleSubmit()")
//     // this.sendMessage()
// }

var someData


class NewMessage extends React.Component {

    constructor(props){
        super(props);
        this.state ={
            newMessageText: '',
        }
        this.textInput = React.createRef() // create basic React ref to text input DOM element
    }

    sendMessage = (message) => {
        console.log("sendMessage()")
        // create timestamp
        let now = new Date()
        let timestamp = now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds()

        let newMessage = {
            text: message,
            timestamp: timestamp,
            sender: 'self'

        }
        // console.log(newMessage)

        // fetch(`http://127.0.0.1:8080/post_obj`, { method: 'POST', body: 'a=1' })

        fetch(`http://127.0.0.1:8080/post_obj`, {
            method: 'POST',
            body: JSON.stringify(newMessage),
            headers: { 'Content-Type': 'application/json' }
            })
            .then(res => res.json()) // expecting textjson response, data is then interpreted as an object
            .then(data => {
                console.log("test " + data)
                someData = data.threads.friend1
                console.log(someData)
            }) // should be [ object Object ] if res => res.json()

        //reset state
        this.setState({
            newMessageText: null
        })

        // TODO: error handling
    }
    
    handleChange = (event) => {
        console.log("handleChange()")
        // console.log(event.target.value)
        this.setState({
            newMessageText: event.target.value
        })
    }
    
    handleSubmit = (event) => {
        event.preventDefault() // prevent page from reloading, effectively.
        console.log("handleSubmit()" + this.state.newMessageText)

        // send the message
        this.sendMessage(this.textInput.current.value)

        // reset text input value
        this.textInput.current.value = null
    }

    render(){
        return(
        <div className={styles.base_container}>
            {/* the new_message_wrapper is a div b/c having it as form was making whole page refresh, even if I was overriding onSubmit */}
            <div className={styles.new_message_wrapper}> 
                <form onSubmit={this.handleSubmit}>
                    <input
                    type="text"
                    placeholder="Type your message..."
                    onChange={this.handleChange}
                    ref={this.textInput}>
                    </input>
                    <button onClick={this.handleSubmit}>
                        Send Message
                    </button>
                </form>

            </div>

        </div>
        )}
}

export default NewMessage
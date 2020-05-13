
import styles from './new-message.module.css'

import React from 'react'

import ThreadGetter1 from '../../../../../../react-context/ThreadGetter1'

// import fetch from 'node-fetch'
// const fetch = require('node-fetch');

// handleSubmit = event => {
//     console.log("handleSubmit()")
//     // this.sendMessage()
// }

var someData //test variable


class NewMessage extends React.Component {
    
    static contextType = ThreadGetter1 // subscribe this component to be a consumer of ThreadGetter Context

    constructor(props){
        super(props);

        // this.state ={
            // currently I don't need to set this state value
        //     newMessageText: '',
        // }
        this.textInput = React.createRef() // create basic React ref to text input DOM element. I use this to reference the text input's present value (e.g. whatever the user has typed so far)

        this.updateThreads = null // to be assigned a function in componentDidMount()

    }

    componentDidMount() {
        // updateThreads is a function used to update a message thread data by executing code in ancestor /pages/messenger
        this.updateThreads = this.context.updateThreads
        // console.log(this.updateThreads)

    }


    sendMessage = (message) => {


        // passes a message string as a parameter to the function held by this.updateThreads
        this.updateThreads(message)

        // clear the text input box
        // this.setState({
        //     newMessageText: null
        // })

        // TODO: error handling
    }
    
    handleChange = (event) => {
        // console.log("handleChange()")
        // console.log(event.target.value)
        // this.setState({
        //     newMessageText: event.target.value
        // })
    }
    
    handleSubmit = (event) => {
        event.preventDefault() // prevent page from reloading, effectively.
        // console.log("handleSubmit()" + this.state.newMessageText)

        // send the message
        this.sendMessage(this.textInput.current.value)

        // reset text input value
        this.textInput.current.value = null
    }

    render(){

        // console.log('update threads' +this.updateThreads)

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
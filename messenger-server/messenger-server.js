// enable all CORS requests
// const cors = require('cors')

// Initialize fs module
const fs = require('fs')


// ~~~~~~ Reading/writing from single message file: messages.json, and write to 
// sync read/write
// Get data from messages JSON file
var friends
let rawdata = fs.readFileSync('./messages.json')
friends = JSON.parse(rawdata)

// add a time field to the friends object with current time
var today = new Date()
var time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds()
friends.time = time

// dev test - overwrite JSON object in the messages.json file
var newData
newData = JSON.stringify(friends, null, 2)
fs.writeFileSync('./messages.json', newData) //overwrite current messgaes.json file
console.log(friends)

// ~~~~~~~~~~~~~~~~~~~~~

// async read/write: DON'T USE BOTH SYNC AND ASYNC AT THE SAME TIME
// fs.readFile('./messages.json', (err, data) => {
//     if (err) throw err
//     friends = JSON.parse(data)
//     friends.time = time
//     console.log(friends)
//     newData = JSON.stringify(friends, null, 2)
// })
// fs.writeFile('./messages.json', newData, (err) => {
//     if (err) throw err
//     console.log('Data written to file')
// })

// get JSON data of various friend's convo threads.
const testThread = fs.readFileSync('./message-threads-v1.json', 'utf8')

const http = require('http')
const hostName = '127.0.0.1' // 127.0.0.1 means "this computer"
const port = process.env.port || 8080 // port 8080 by default
const server = http.createServer((req, res) => {

    req.on('error', (err) => {
        // log error if 'error'
        console.error(err)
    })

    if (req.url === '/') {
        // if request is for base URL ( `localhost:8080/` ), respond with a simple text response
        let serverToday = new Date()
        let serverTime = serverToday.getHours() + ':' + serverToday.getMinutes() + ':' + serverToday.getSeconds()
        // return successful status
        res.statusCode = 200

        res.setHeader('Content-Type', 'text/plain') //plain text content

        // res.end() writes data to response body and ends the response
        // btw, res.send(...) is a combination(?) of res.setHeader(), res.write() and res.send() all at once
        res.end(`Hello World!\n${friends.message} at ${serverTime}`)
    }

    // url for requesting message thread data
    if (req.url === '/test_obj') {
        // if URL = localhost:8080/test_obj
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json') //respond with all friend convo threads
        res.end(testThread)
    }

    // url for client posting new message data
    if (req.url === '/post_obj') {

        req.on('data', chunk => {
            // data chunk should be stringified JSON file of a SPECIFIC friend's convo thread.
            console.log(`Data chunk: ${chunk}`)
            let newTestThread = (JSON.parse(testThread)).threads.friend1
            newTestThread.push(JSON.parse(chunk))
            // console.log(JSON.stringify(newTestThread))
            fs.writeFileSync('./threads-copy.json', JSON.stringify(newTestThread, null, 2))
        })
        req.on('end', () => {
            // end of data, do something, if I want 
        })

        // * explicitly * set my headers, while returning a status code of 200 (initial argument)
        res.writeHead(200, {
            "Access-Control-Allow-Origin" : "*",
            "Access-Control-Allow-Headers" : "Content-Type",
            "Access-Control-Allow-Methods" : "POST, GET, OPTIONS",
            "Content-Type": 'text/plain' // This is assuming server's response will be a simple text response
        })
        res.end("testing!!!!")

    }
})

server.on('connection', (socket) => {
    // whenever a connection to server is made, console log the current time
    let today2 = new Date()
    let time2 = today2.getHours() + ':' + today2.getMinutes() + ':' + today2.getSeconds()
    console.log(`new connection at ${time2}`)
})

server.listen(port, hostName, () => {
    // establish the local server port
    console.log(`server running at http://${hostName}:${port}/`)
})

// gracefully exit programatically. Use: process.kill(process.pid, 'SIGTERM')
process.on('SIGTERM', () => {
    server.close(() => {
      console.log('Process terminated')
    })
  })


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
// console.log(friends)

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
const testThread = fs.readFileSync('./message-threads-v1.json', 'utf8') // testThread is a string

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
        // let body = '' //initialize empty string to accept incoming data chunk
        let parsedBody //initialize empty object into which body is parsed

        req.on('data', chunk => {
            // IMPORTANT: req.on('data'...) executes AFTER req.on('end') for some reason
            // chunk should be JSON buffer object. Req sent by client should be Content-type: 'application/json'
            // console.log(chunk+'ji')

            try {
            parsedBody = JSON.parse(chunk)   // I need to parse body into a variable HERE, not in req.on('end'...) For some reason it won't work there
            // parsedBody is now a traditional JS OBJECT, as opposed to buffer(?) object
            // console.log('parsedBody: ' + parsedBody) <-- [ object Object ]

            // let testObj = {a:4, b:4}
            // console.log(JSON.parse(JSON.stringify(testObj)) + "what")

            // console.log(`Data chunk append: ${JSON.stringify(parsedBody)}`) //print the string version of object
            // // console.log(typeof JSON.stringify(parsedBody))
            // // printing objects only results in [ object Object ]

            // // console.log('data type ' + (typeof chunk))
            // // console.log('data ' + chunk)
            // // console.log(typeof parsedBody + "parsedbody type")
            // // console.log("parsedBody.threads: "+parsedBody.threads)

            // //continuing where I left off...
            // let modifiedFile = JSON.parse(testThread) //testThread is a string, modifiedFile is now a JS object
            // // console.log("modified File type: " + (typeof modifiedFile))
            // // console.log("modifiedFile: " +modifiedFile)
            // // console.log("modifiedFile Str: " + JSON.stringify(modifiedFile))

            // let modifiedThread = (JSON.parse(testThread)).threads.friend1 // modifiedThread is an array of objects
            // modifiedThread.push(parsedBody) // modifiedThread is now an array of N+1 objects
            // // console.log('modifiedThread: '+ modifiedThread)
            // // console.log('modifiedThread Str' + JSON.stringify(modifiedThread))
            // // console.log('modifiedThread type: '+ (typeof modifiedThread))

            // modifiedFile.threads.friend1 = modifiedThread // replace old convo thread
            // // modifiedfile is still a JS object
            // // console.log("new modified File type: " + (typeof modifiedFile))
            // // console.log("new modifiedFile: " +modifiedFile)
            // // console.log("new modifiedFile Str: " + JSON.stringify(modifiedFile))
            


            // console.log('before writeFileSync')
            // fs.writeFileSync('./threads-copy.json', JSON.stringify(modifiedFile, null, 2)) // overwrite new data, but to new file to keep original data used

            // ~~~~~~~ ANY CODE WRITTEN AFTER FS.WRITE IS NOT EXECUTED ~~~~~~~


            // cannot write responses here...
            // res.writeHead(200, {
            //     "Access-Control-Allow-Origin" : "*",
            //     "Access-Control-Allow-Headers" : "Content-Type",
            //     "Access-Control-Allow-Methods" : "POST, GET, OPTIONS",
            //     "Content-Type": 'text/plain' // This is assuming server's response will be a simple text response
            // })

            // res.end('test2')
            
            }
            catch(error) {
                console.error(error)
            }
            
            
        })
        req.on('end', () => {
            // this code gets executed BEFORE req.on('data') for some reason
            // but ALSO, for some reason, responses generated here using file data have the most up to date data, despite any other code bein executed first.
            // console.log('end' + body)
            try {

                console.log(`Data chunk append: ${JSON.stringify(parsedBody)}`) //print the string version of object
                // console.log(typeof JSON.stringify(parsedBody))
                // printing objects only results in [ object Object ]

                // console.log('data type ' + (typeof chunk))
                // console.log('data ' + chunk)
                // console.log(typeof parsedBody + "parsedbody type")
                // console.log("parsedBody.threads: "+parsedBody.threads)

                //continuing where I left off...
                let modifiedFile = JSON.parse(testThread) //testThread is a string, modifiedFile is now a JS object
                // console.log("modified File type: " + (typeof modifiedFile))
                // console.log("modifiedFile: " +modifiedFile)
                // console.log("modifiedFile Str: " + JSON.stringify(modifiedFile))

                let modifiedThread = (JSON.parse(testThread)).threads.friend1 // modifiedThread is an array of objects
                modifiedThread.push(parsedBody) // modifiedThread is now an array of N+1 objects
                // console.log('modifiedThread: '+ modifiedThread)
                // console.log('modifiedThread Str' + JSON.stringify(modifiedThread))
                // console.log('modifiedThread type: '+ (typeof modifiedThread))

                modifiedFile.threads.friend1 = modifiedThread // replace old convo thread
                // modifiedfile is still a JS object
                // console.log("new modified File type: " + (typeof modifiedFile))
                // console.log("new modifiedFile: " +modifiedFile)
                // console.log("new modifiedFile Str: " + JSON.stringify(modifiedFile))
                


                
                
                    

                // const responseFile = fs.readFileSync('./threads-copy.json', 'utf8')
                const responseFile = JSON.stringify(modifiedFile, null, 2)
                // responseFile is a string as-is, send simply as res.end(responseFile) and 'application/json'


                console.log('response sent')
                res.writeHead(200, {
                    "Access-Control-Allow-Origin" : "*",
                    "Access-Control-Allow-Headers" : "Content-Type",
                    "Access-Control-Allow-Methods" : "POST, GET, OPTIONS",
                    "Content-Type": 'application/json'
                })
                res.end(responseFile)

                // console.log('before writeFileSync')
                let dataInsert = JSON.stringify(modifiedFile, null, 2)
                fs.writeFile('./threads-copy.json', dataInsert, (err) => {
                    if (err) return console.error(err);
                    console.log('writeFile success')
                }) // overwrite new data, but to new file to keep original data used

                // ANY CODE AFTER WRITEFILE IS NOT EXECUTED
            }
            catch (error) {
                res.statusCode = 400
                console.error(error)
                return res.end(`error: ${error.message}`)
            }
        })
        // res.writeHead(200, {
        //     "Access-Control-Allow-Origin" : "*",
        //     "Access-Control-Allow-Headers" : "Content-Type",
        //     "Access-Control-Allow-Methods" : "POST, GET, OPTIONS",
        //     "Content-Type": 'text/plain' // This is assuming server's response will be a simple text response
        // })
        // res.end('end response!')
/*         req.on('end', () => {
            // end of data, do something, if I want 
            try {
                let newTestThread = (JSON.parse(testThread)).threads.friend1
                newTestThread.push(JSON.parse(body))

                fs.writeFileSync('./threads-copy.json', JSON.stringify(newTestThread, null, 2))

                // after receiving data chunk and writing to JSON file, respond with updated chat file
                // * explicitly * set my headers, while returning a status code of 200 (initial argument). Here I enable CORS for http

                res.writeHead(200, {
                    "Access-Control-Allow-Origin" : "*",
                    "Access-Control-Allow-Headers" : "Content-Type",
                    "Access-Control-Allow-Methods" : "POST, GET, OPTIONS",
                    "Content-Type": 'text/plain' // This is assuming server's response will be a simple text response
                })
                let responseThread  = fs.readFileSync('./threads-copy.json', 'utf8')
                res.end("responseThread")


            } catch (err) {
                res.statusCode = 400
                console.error(err)
                return res.end(`error: ${err.message}`)
            }
        }) */

        // console.log('tick2')
        // res.writeHead(200, {
        //     "Access-Control-Allow-Origin" : "*",
        //     "Access-Control-Allow-Headers" : "Content-Type",
        //     "Access-Control-Allow-Methods" : "POST, GET, OPTIONS",
        //     "Content-Type": 'text/plain' // This is assuming server's response will be a simple text response
        // })

        // res.end('test2')

        // console.log('last line of code')

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


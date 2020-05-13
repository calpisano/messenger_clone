// enable all CORS requests
// const cors = require('cors')

// Initialize fs module
const fs = require('fs'); // old fs predates promises
const fsPromise = require('fs').promises; // handles promises automatically when using readfile, writefile


// ~~~~~~ Reading/writing from single message file: messages.json, and write to 
// sync read/write
// Get data from messages JSON file
var friends
let rawdata = fs.readFileSync('./practice-files/messages.json')
friends = JSON.parse(rawdata)

// add a time field to the friends object with current time
var today = new Date()
var time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds()
friends.time = time

// dev test - overwrite JSON object in the messages.json file
var newData
newData = JSON.stringify(friends, null, 4)
fs.writeFileSync('./practice-files/messages.json', newData) //overwrite current messgaes.json file
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
const testThread = fs.readFileSync('./threads-v1.json', 'utf8') // testThread is a string
let threadCopyRefresh = JSON.stringify(JSON.parse(testThread), null, 4);
fs.writeFileSync('./threads-v1-copy.json', threadCopyRefresh); //overwrite mutating thread data with original data
// 

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

    // url for requesting message initial thread data. This function is only called when the client refreshes web page
    // if this URL is called, then response is JSON string of initial template convo threads.  It also overwrites the threads-v1-copy.json file to return it to initial state
    if (req.url === '/get_initial_thread') {
        console.log('client refreshed webpage')
        let dataRefresh = JSON.stringify(JSON.parse(testThread), null, 4);
        //overwrite the mutating data file with the original data
        (async function() {
            await fsPromise.writeFile('./threads-v1-copy.json', dataRefresh, (err) => {
                if (err) throw err;
            }) 
        })();

        res.writeHead(200, {
            "Access-Control-Allow-Origin" : "*",
            "Access-Control-Allow-Headers" : "Content-Type",
            "Access-Control-Allow-Methods" : "POST, GET, OPTIONS",
            "Content-Type": 'application/json'
        })
        res.end(testThread)
    }

    //this URL currently unused
    if (req.url == '/get_modified_thread') {
        // this code is designed to send the latest modified chat thread data back to the client

        // const testThreadCopy = fs.readFile('./threads-v1-copy.json', 'utf8', (err) => {
        //     if (err) return console.error(err);
        //     console.log('readFile success');
        // })
        // const testThreadCopy = async function() {
        //     return await fsPromise.readFile('./threads-v1-copy.json', 'utf8');
        // }();

        testThreadCopy = fs.readFileSync('./threads-v1-copy.json', 'utf8');
        // const testThreadCopy = await fsPromise.readFile('./threads-v1-copy.json', 'utf8')

        res.writeHead(200, {
            "Access-Control-Allow-Origin" : "*",
            "Access-Control-Allow-Headers" : "Content-Type",
            "Access-Control-Allow-Methods" : "POST, GET, OPTIONS",
            "Content-Type": 'application/json'
        })
        res.end(testThreadCopy)
    }




    // url for client posting new message data
    if (req.url === '/post_new_message') {
        // let body = '' //initialize empty string to accept incoming data chunk
        // let parsedBody = JSON.parse(testThread); //initialize empty object into which body is parsed
        var parsedBody;

        req.on('data', chunk => {
            // chunk should be JSON buffer object. Req sent by client should be Content-type: 'application/json'
            // console.log(chunk+'ji')
            // console.log("chunk");

            try {
            // parsedBody = JSON.parse(chunk)
            // console.log('parsedBody: ' + JSON.stringify(parsedBody));

            (async function() {
                // console.log('async');
                parsedBody = await JSON.parse(chunk);
                console.log('parsedBody: ' + JSON.stringify(parsedBody));

                //for the momoent, I have to do readFileSync cause otherwise the response sent to the client is the old version of the file, not the newest one
                let copyData = fs.readFileSync('./threads-v1-copy.json', 'utf8');
                // let copyData = await fsPromise.readFile('./threads-v1-copy.json', 'utf8',(err, data) => {
                //     if(err) throw err;
                //     return data;
                // });
                // console.log(copyData);
                let modifiedFile = JSON.parse(copyData);
                let modifiedThread = modifiedFile.threads.friend1; // modifiedThread is an array of objects
                modifiedThread.push(parsedBody); // modifiedThread is now an array of N+1 objects
                // console.log('modifiedThread: '+ modifiedThread)
                // console.log('modifiedThread Str' + JSON.stringify(modifiedThread))
                // console.log('modifiedThread type: '+ (typeof modifiedThread))

                modifiedFile.threads.friend1 = modifiedThread; // replace old convo thread
                // modifiedfile is still a JS object
                // console.log("new modified File type: " + (typeof modifiedFile))
                // console.log("new modifiedFile: " +modifiedFile)
                // console.log("new modifiedFile Str: " + JSON.stringify(modifiedFile))

                // const responseFile = fs.readFileSync('./threads-v1-copy.json', 'utf8')
                const responseFile = JSON.stringify(modifiedFile, null, 4);
                // console.log('NEW RESPONSE '+ responseFile)

                // fs.writeFileSync('./threads-v1-copy.json', responseFile);
                // I can successfully do writeFile asynchronously though
                await fsPromise.writeFile('./threads-v1-copy.json', responseFile);
                
            })();


            
            }
            catch(error) {
                console.error(error)
            }
            
            
        })
        req.on('end', () => {

            try {
                // (async function() {
                //     // console.log('async');
                //     let str = await JSON.stringify(parsedBody);
                //     // console.log('parsedBody: ' + JSON.stringify(parsedBody));
                    
                // })();
                

                // console.log('parsedBody Insert: ' + JSON.stringify(parsedBody));
                // let copyData = fs.readFileSync('./threads-v1-copy.json', 'utf8');
                // // console.log(copyData);
                // let modifiedFile = JSON.parse(copyData);
                // let modifiedThread = modifiedFile.threads.friend1; // modifiedThread is an array of objects
                // modifiedThread.push(parsedBody); // modifiedThread is now an array of N+1 objects
                // // console.log('modifiedThread: '+ modifiedThread)
                // // console.log('modifiedThread Str' + JSON.stringify(modifiedThread))
                // // console.log('modifiedThread type: '+ (typeof modifiedThread))

                // modifiedFile.threads.friend1 = modifiedThread; // replace old convo thread
                // // modifiedfile is still a JS object
                // // console.log("new modified File type: " + (typeof modifiedFile))
                // // console.log("new modifiedFile: " +modifiedFile)
                // // console.log("new modifiedFile Str: " + JSON.stringify(modifiedFile))

                // // const responseFile = fs.readFileSync('./threads-v1-copy.json', 'utf8')
                // const responseFile = JSON.stringify(modifiedFile, null, 4);
                // console.log('responseFile '+responseFile);
                // responseFile is a string as-is, send simply as res.end(responseFile) and 'application/json'

                (async function() {
                    const responseFile2 = await fsPromise.readFile('./threads-v1-copy.json', 'utf8',(err, data) => {
                        if(err) throw err;
                        return data;
                    });

                    
                    const responseData = JSON.parse(responseFile2);

                    // console.log('newest response! '+JSON.stringify(responseData));

                    res.writeHead(200, {
                        "Access-Control-Allow-Origin" : "*",
                        "Access-Control-Allow-Headers" : "Content-Type",
                        "Access-Control-Allow-Methods" : "POST, GET, OPTIONS",
                        "Content-Type": 'application/json'
                    })
                    res.end(JSON.stringify(responseData));
                    console.log('response sent');
                })();

                    
            }
            catch (error) {
                res.statusCode = 400
                console.error(error)
                return res.end(`error: ${error.message}`)
            }
        })
        

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


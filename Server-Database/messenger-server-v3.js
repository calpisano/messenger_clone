
const fs = require('fs'); // old fs predates promises
const fsPromise = require('fs').promises; // handles promises automatically when using readfile, writefile

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool, Client } = require('pg');

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // allows for req.body in JSON string to be visible and parsed by express

const connectionString = 'postgres://postgres:postgres@localhost:5432/chat_pg_v1';

const pool = new Pool({
    connectionString: connectionString
});
pool.on('error', (err, client) => {
    // handling idle client, client will be terminated/removed from pool
    console.error('Unexpected error on idle client', err);
    process.exit(-1);
})



const hostName = '127.0.0.1'; // 127.0.0.1 = "this computer"
const port = process.env.port || 9090; // port 9090 by default

app.set('port', port);

app.get('/', (req, res, next) => {
    // when requesting '/', simply respond with 'Hello World'

    let serverToday = new Date();
    let serverTime = serverToday.getHours() + ':' + serverToday.getMinutes() + ':' + serverToday.getSeconds();

    res.status(200).type('html').send(`Hello PostgreSQL World! at ${serverTime}`);

})

app.get('/get_initial_chat_thread', async (req, res, next) => {
    // this request returns object containing the UID's of all the conversations threads the user is hosting.

    try {
        const threadObject = await ( function() {
            return new Promise((resolve, reject) => {
                pool.query(`SELECT * FROM messenger.chat_thread`, (err, result) => {
                    if(err){
                        console.log('Error on "get_initial_chat_thread": '+ err);
                        reject(new Error('Error on "get_initial_chat_thread": '+ err));
                    }
                    else {
                        let records = result.rows;
                        let output = {}; // final output will be object. Object keys are thread_uid. Values are another object containing key/values of user_uid and participant_user_uid
                        for (let i = 0; i<records.length; i++){
                            let entry = records[i];
                            output[entry.thread_uid] = {
                                user_uid: entry.user_uid,
                                participant_user_uid: entry.participant_user_uid
                            };
                        };

                        resolve(output);
                    }
                })
            })
        })();

        res.status(200).type('html').send(threadObject);


    } catch(error) {
        // TODO Handle client getting 400 code error
        res.status(400).send(error.message);

    };
})

app.get('/get_initial_chat_lines', async (req, res, next) => {
    // this request returns all chat_line records belonging to chat_thread records owned by host user
    console.log('client refreshed webpage');

    try{
    
        // threadArray is array of strings representing thread_uid values belonging to User
        const threadArray =  await ( function() {
            return new Promise((resolve, reject) => {
                // query database for every thread owned by host user "Myra Selfie"
                pool.query(`SELECT * FROM messenger.chat_thread WHERE user_uid = 'd856c932-9291-4e71-bf4c-3131b2b6e535'`, (err, result) => {
                    if(err){
                        console.log('Error on "get_initial_chat_lines": '+ err);
                        reject(new Error('Error on "get_initial_chat_lines": '+ err));
                    }
                    else {
                        let records = result.rows; //array of objects
            
                        let arrayOfThreadID = [];
                
                        for (let i = 0; i< records.length; i++ ) {
                            arrayOfThreadID.push(records[i].thread_uid);
                        }
                
                        resolve (arrayOfThreadID);
                    }
                })
            })
        })();

        // build an array of strings, dynamic length, to be used in dynamic pool.query, to allow for referencing of all array variables in query
        let params = [];
        for(var i = 1; i <= threadArray.length; i++) {
            params.push('$' + i);
        }

        let queryText = `SELECT * FROM messenger.chat_line WHERE thread_uid IN (`+params.join(',')+`)`;

        // returns promise of every message in every thread owned by host user: 'Myra Selfie'
        const allMessagesArray = await ( function() {
            return new Promise((resolve, reject) => {
                pool.query( queryText, threadArray, (err, result) => {
                // pool.query( queryText, (err, result) => { // test with test queries
                    if(err){
                        console.log('Error on "get_initial_chat_lines": '+ err);
                        reject(new Error('Error on "get_initial_chat_lines": '+ err));
                    }
                    else {
                        resolve(result.rows);
                    }

                })



            })
        })();

        res.status(200).type('html').send(allMessagesArray);

    } catch(error) {
        res.status(400).send(error.message);
    }
    
})

app.get('/get_initial_chat_user', async (req, res, next) => {
    // this http request returns all user data in the form of an object where keys are user_uid, and values are another object with data fields

    console.log('friends requested');
    try {
        const userObject = await ( function() {
            return new Promise((resolve,reject) => {
                pool.query(`SELECT * FROM messenger.chat_user`, (err, result) => {
                    if(err){
                        console.log('Error on "get_initial_chat_user": '+ err);
                        reject(new Error('Error on "get_initial_chat_user": '+ err));
                    }
                    else {
                        let records = result.rows;
                        let output = {};
                        for(let i = 0; i<records.length; i++){
                            let entry = records[i];
                            output[entry.user_uid] = {
                                first_name: entry.first_name,
                                last_name: entry.last_name,
                                email: entry.email,
                                gender: entry.gender,
                                date_of_birth: entry.date_of_birth,
                                profile_pic: entry.profile_pic
                            }
                        }
                        resolve(output);
                    }
                })
            })
        }
        )();
        res.status(200).type('html').send(userObject);

    } catch(error) {
        res.status(400).send(error.message);
    }

})

app.post(`/post_new_message_to_thread`, async (req, res, next) => {


    try {
        let reqBody = req.body;
        console.log('new message post received');

        const postMessage = await( function() {
            return new Promise((resolve, reject) => {

                //for inserting into test database, use database `messenger.chat_line_test
                let insertText = `INSERT INTO messenger.chat_line (line_uid, thread_uid, created_by_user_uid, line_text, created_at_timestamp) VALUES (uuid_generate_v4(), ` + `'`+String(reqBody.thread_uid)+`'` + `, ` + `'`+String(reqBody.created_by_user_uid)+`'` + `, ` + `'`+String(reqBody.line_text)+`'` + `, NOW() );`;

                pool.query(insertText, (err, result) => {
                    if(err){
                        console.log('Error on "post_new_message_to_thread": '+ err);
                        reject(new Error('Error on "post_new_message_to_thread": '+ err));
                    }
                    else {
                        resolve();
                    }

                })

            })
        })();

        res.status(200).send();

    } catch(error) {
        res.status(400).send(error.message);
    }
})


app.listen(port, () => {
    console.log(`PostgreSQL server is running at http://${hostName}:${port}/`);
});

// gracefully exit programatically. Use: process.kill(process.pid, 'SIGTERM')
process.on('SIGTERM', () => {
    server.close(() => {
      console.log('Process terminated')
    })
  })


// const https = require('https')

// // let body = 'test'

// // https.get(`https://jsonmock.hackerrank.com/api/transactions/search?txnType=debit`, res => {
// //     res.on('data', chunk => {
// //         body += chunk
// //     })
// //     res.on('end', () => {
// //         console.log(body)
// //     })
// // }).on('error', error => console.error(error.message))


// // const req = https.request(`https://jsonmock.hackerrank.com/api/transactions/search?txnType=debit`, res => {
// //     res.on('data', chunk => {
// //         body+= chunk
// //         // console.log(body)
// //         // console.log(req)
// //     })

// // })
// // req.end()

// // console.log(req)
// // console.log(body)

// // function getToken(callback) {

// //     https.get(`https://jsonmock.hackerrank.com/api/transactions/search?txnType=debit`, res => {
// //         res.on('data', chunk => {
// //             body += chunk
// //         })
// //         res.on('end', () => {
// //             console.log(body)
// //         })
// //         }).on('error', error => console.error(error.message))
// //         console.log('1')
// //     callback(2);
// // }

// // getToken(
// //     function(sum) {
// //         console.log(sum)
// //     }
// // )

// var body = 'what '

// async function test() {
//     let newBody = 'new'
//     const userInfo = https.get(`https://jsonmock.hackerrank.com/api/transactions/search?txnType=debit`, res => {
//         res.on('data', chunk => {
//             newBody+= chunk
//         })
//         res.on('end', () => {
//             return newBody
//             console.log('test.end')
//         })
//     })

// }

// const asyncTest = async function() {
//     try{
//         const tesFunc = await test();
//         console.log(testFunc)
//         // return testFunc
//     } catch(e) {

//     }
// }

// const verifyUser = async function() {
//     let v;
//     let vstr;
    
//     try {
//         v = await https.get(`https://jsonmock.hackerrank.com/api/transactions/search?txnType=debit`, res => {
//             res.on('data', chunk => {
//                 body+= chunk
//             })
//             res.on('end', () => {
//                 vstr = body
//                 // console.log(v)
//             })
//         })

//         console.log(vstr)
//         return vstr

//     } catch(e) {
//         console.error(e);
//     }

// }

// // console.log(verifyUser())
// // console.log(verifyUser)
// // console.log(verifyUser())
// // console.log(verifyUser().then())
// // console.log(verifyUser().then( v => console.log(v)))

// console.log(asyncTest())

const https = require('https')
const fetch = require('node-fetch')

function createPromise() {
    return new Promise((resolve, reject) => {
        https.get(`https://jsonmock.hackerrank.com/api/transactions/search?txnType=debit`, (res) => {
            var body = '';
            res.on('data', function(chunk) {
                body+=chunk;
            });
            // on bad status, reject
            // on response data, cumulate it
            // on end, parse and resolve
            res.on('end', () => {
                resolve(body)
            })
        });
        // on request error, reject
        // if there's post data, write it to the request
        // important: end the request req.end()
    })
}


async function fetchUsers(message = 'hey') {
    // const response = await fetch(`https://jsonmock.hackerrank.com/api/transactions/search?txnType=debit`)
    // const response = await https.get(`https://jsonmock.hackerrank.com/api/transactions/search?txnType=debit`)
    const response = await createPromise()
    haha = JSON.parse(response)
    
    console.log(message)
    console.log('hi')
    // console.log(haha)
}

fetchUsers()
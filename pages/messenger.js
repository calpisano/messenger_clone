
import MessengerMain from '../scenes/messenger-main/messenger-main'

import fetch from 'node-fetch'

// Use React Context to pass variables all the way from parent component to any child
import ThreadGetter1 from '../react-context/ThreadGetter1'

export default function MessengerLanding({ devTest2 }) {

    // console.log(devTest2)
    // console.log(JSON.stringify(devTest2))
    // console.log( typeof JSON.stringify(devTest2))

    const devTest2_string = JSON.stringify(devTest2)

    return(
        <ThreadGetter1.Provider value={ devTest2_string }>
        {/* The Reac-Context can be consumed by any child now... */}
            <MessengerMain>
                <div>
                    {/* <p>{devTest2}</p> */}
                </div>

                
            </MessengerMain>
        </ThreadGetter1.Provider>
        
    )

}

export async function getServerSideProps() {
    // getting props can only be called on Page file, not component files
    // Get external data from the file system, API, DB, etc.
    // https://nextjs.org/blog/next-9-3 <-- next.js docs on getServerSideProps()
    
    // dev test getting text data from server
    const res = await fetch(`http://127.0.0.1:8080/`)
    const allPostsData2 = await res.text()

    const res2 = await fetch(`http://127.0.0.1:8080/test_obj`)
    const devTest2 = await res2.json(); //res.body is received in json string and subsequently PARSED, devTest2 is now an object


    console.log(allPostsData2 + "hi")

  
    // The value of the `props` key will be
    //  passed to the `Home` component
    return {
      props: {
        allPostsData2,
        devTest2
      }
    }
  }
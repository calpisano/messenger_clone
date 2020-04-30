
import MessengerMain from '../scenes/messenger-main/messenger-main'

import fetch from 'node-fetch'

// Use React Context to pass variables all the way from parent component to any child
import ThemeContext from '../react-context/ThemeContext'

export default function MessengerLanding({ allPostsData2, test }) {
    return(
        <ThemeContext.Provider value={allPostsData2}>
        {/* The Context can be consumed by any child now... */}
            <MessengerMain>

                <div>
                    {allPostsData2}
                    {test}
                </div>
                
            </MessengerMain>
        </ThemeContext.Provider>
        
    )

}

export async function getServerSideProps() {
    // getting props can only be called on Page file, not component files
    // Get external data from the file system, API, DB, etc.
    // https://nextjs.org/blog/next-9-3 <-- next.js docs on getServerSideProps()
    var allPostsData = "text"
    
    const res = await fetch(`http://127.0.0.1:8080/`)
    const allPostsData2 = await res.text()

    console.log(allPostsData)
    console.log(allPostsData2)
    const test = [1,3]

  
    // The value of the `props` key will be
    //  passed to the `Home` component
    return {
      props: {
        allPostsData2,
        test
      }
    }
  }
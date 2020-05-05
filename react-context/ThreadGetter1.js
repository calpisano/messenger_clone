import React from 'react';
 
// ThreadGetter is a React Context object(?) that allows me to tunnel props directly from one of the pages (in /pages) to any of its child components, even down multiple levels
const ThreadGetter1 = React.createContext(null);
 
export default ThreadGetter1;
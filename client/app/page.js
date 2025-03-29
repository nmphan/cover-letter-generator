// import React from 'react'
// import Main from './Home Page/page'


// export default function page() {
//   return (
//     <div>
//       <Main />
//     </div>
//   )
// }

import 'dotenv/config'

import React from 'react';
import '../src/apiInterceptor'; // Import the interceptor
import Main from './Home Page/page';

function App() {
  return (
    <div className="app">
      <Main />
    </div>
  );
}

export default App;
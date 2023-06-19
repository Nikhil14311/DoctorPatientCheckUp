// import { onAuthStateChanged } from 'firebase/auth'
// import React, { useEffect, useState } from 'react'
// import { auth } from './firebase'
// import PostLogin from './navigation/PostLogin'
// import Prelogin from './navigation/Prelogin'

// const App = () => {

//   const[user,setUser] = useState(true);
//   const[loading, setLoading] = useState(true);
//   useEffect(()=>{
//     if(user){
//       onAuthStateChanged(auth,(user)=>{
//         if(user){
//           console.log('user in app',user)
//           setUser(user);
//           setLoading(false);
//         }else{
//           console.log("No user")
//           setUser(false)
//           setLoading(false)
//         }
//       })
//     }
//   },[user,loading])
//   return (
//     <div>
//       {loading ?
//       <div style={{display:'flex',alignItems:'center',justifyContent:'center',width:'100%',height:'100vh'}}>
//         <h4>Loading...</h4>
//       </div>:
//       <div>
//         {user ? <PostLogin /> : <Prelogin />}
//       </div>}
//     </div>
//   )
// }

// export default App


import React, { useState } from 'react'


const App = () => {

  const[selectedOption, setSelectedOption] = useState("")

  const onHandleChange = (e) => {
    console.log(e.target)
    setSelectedOption(e.target.value)
  }

  const options = [
    {
      id:0,
      value:"option1"
    },
    {
      id:1,
      value:"option2"
    },
    {
      id:2,
      value:"option3"
    }
  ]

  return (
    <form>

      {options.map((item,index)=>{
        return(
        <div className="radio" key={index}>
          <label>
            <input type="radio" value={item.value} checked={selectedOption == item.value} onChange={onHandleChange} />
            {item.value}
          </label>
        </div>
        )
      })}
      
    </form>
  )
}

export default App
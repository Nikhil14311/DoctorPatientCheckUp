import React, {useState} from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';


const Login = () => {

  const navigate = useNavigate();
  
  const [data, setData] = useState({
    email:'',
    password:''
  })


  //console.log("data",data);

  const {email, password} = data;

  const handleChange = (e) =>{
      setData({...data,[e.target.name]:e.target.value}) 
  }
  
  const userLogin = async() => {
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredtionals)=>{
      console.log("userCredtionals",userCredtionals);
    })
    .catch((error) => {
      // const errorCode = error.code;
      const errorMessage = error.message;
      // console.log("errorCode",errorCode)
      console.log("errorMessage",errorMessage)
      switch(error.code) {
        case 'auth/wrong-password':
            alert('Please check password')

          case 'auth/invalid-email':
            alert('Please check email')
        // case 'auth/invalid-email':
        //     alert("Email format is wrong")
        // case 'auth/weak-password':
        //     alert("Password should be atleast 6 characters")
        
        break;
     }
    });
  }

  const gotoRegisterPage = () => {
      navigate('/register')
  }

  return (
    <div style={{width:'100%',height:'100vh',display:'flex',alignItems:'center',justifyContent:'center', flexDirection:'column'}}>
      <div>
        <h2>Cloud based environment for patient health care monitoring system</h2>
      </div>
      <div class="container-md border rounded p-3 m-2">
          <div style={{alignItems:'center',justifyContent:'center',width:'100%',display:'flex'}}>
            <label style={{fontWeight:'bold',fontSize:20,fontFamily:'Bruno Ace SC',color:'red'}}>Login</label>
          </div>
          <div class="mb-3 mt-3">
            <label for="email" class="form-label">Email:</label>
            <input type="email" class="form-control" id="email" placeholder="Enter email" name="email" value={email} onChange={handleChange} />
          </div>
          <div class="mb-3">
            <label for="pwd" class="form-label">Password:</label>
            <input type="password" class="form-control" id="pwd" placeholder="Enter password" name="password" value={password} onChange={handleChange} />
          </div>
          <div class="form-check mb-3">
            <label class="form-check-label">
              <input class="form-check-input" type="checkbox" name="remember"/> Remember me
            </label>
          </div>
          <div style={{display:'flex',alignItems:'center',justifyContent:'center', flexDirection:'row'}}>
            <button type="submit" class="btn btn-outline-danger align center" onClick={()=>userLogin()}>Login</button>
            <button type="register" class="btn btn-outline-primary align center" onClick={()=>gotoRegisterPage()} style={{marginLeft:10}} >Register</button>
          </div>
      </div>
    </div>

  )
}

export default Login
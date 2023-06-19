import React, {  useState } from 'react'
import { auth } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
//import { db } from '../firebase';
//import { collection, addDoc, getDocs } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom';
import { set,ref } from 'firebase/database';
import { database } from '../firebase';

const Register = () => {

    const navigate = useNavigate();

    const [data, setData] = useState({
        email:'',
        password:''
    })

    const [hospitalChecked, setHospital] = useState(false);


    //console.log("data",hospitalChecked);

    const {email, password} = data;

    const handleChange = (e) =>{
        setData({...data,[e.target.name]:e.target.value}) 
    }

    const handleChecked = () => {
        setHospital(!hospitalChecked);
    }

    const userRegister = async() =>{
        try {
            const res = await createUserWithEmailAndPassword(auth, email, password);
            const user = res.user;
            const userDetails = user.providerData[0];
            console.log("user",user.providerData[0]);
            navigate('/profile')
            await set(ref(database, 'users/' + user.uid), {
                displayName: "",
                email: userDetails.email,
                phoneNumber: "",
                photoURL: "",
                uid: user.uid,
                hospital: hospitalChecked,
                address : "",
            }) 
            alert("user registered successfully")


        } catch (err) {
            console.error(err);
            //alert(err.message);
            switch(err.code) {
                case 'auth/email-already-in-use':
                    alert('Email already in use !')
                case 'auth/invalid-email':
                    alert("Email format is wrong")
                case 'auth/weak-password':
                    alert("Password should be atleast 6 characters")
                
                break;
             }
        }
    }

    const gotoLoginPage = () => {
        navigate('/')
    }

    return (
        <div style={{width:'100%',height:'100vh',display:'flex',alignItems:'center',justifyContent:'center', flexDirection:'column'}}>
            <div>
                <h2>Cloud based environment for patient health care monitoring system</h2>
            </div>
            <div class="container-md border rounded p-3 m-2">
                <div style={{alignItems:'center',justifyContent:'center',width:'100%',display:'flex'}}>
                    <label style={{fontWeight:'bold',fontSize:20,fontFamily:'Bruno Ace SC',color:'red'}}>Register</label>
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
                        <input class="form-check-input" type="checkbox" name="hospitalchecked" checked={hospitalChecked} onChange={handleChecked} /> Are you running hospital ?
                    </label>
                </div>
                <div style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
                    <button type="submit" class="btn btn-outline-danger align center" onClick={()=>userRegister()}>Register</button>
                    <button type="submit" class="btn btn-outline-primary align center" onClick={()=>gotoLoginPage()} style={{marginLeft:10}}  >Login</button>
                </div>
            </div>
        </div>
    )
}

export default Register
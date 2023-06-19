import React, { useEffect, useState } from 'react'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth, database } from '../firebase'
import {  ref, child, get, update } from "firebase/database";
import DoctorInfo from './DoctorInfo';
import PatientInfo from './PatientInfo';

const Dashboard = () => {

  const[user, setUser] = useState('');
  const[dbData, setDbData] = useState('');

  useEffect(()=>{
    initalCall();
  },[])

  const dbRef = ref(database);
  const initalCall = async() => {
    onAuthStateChanged(auth, (user) => {
        if(user){
            console.log("user",user.uid);
            setUser(user);
        
            get(child(dbRef, `users/${user.uid}`)).then((snapshot) => {
            if (snapshot.exists()) {
                console.log(snapshot.val());
                setDbData(snapshot.val());
            } else {
                console.log("No data available");
            }
            }).catch((error) => {
                console.error(error);
            });
        }else{
            console.log("No user");
        }
    })
}

  const loggedOut = () => {
    signOut(auth).then(() => {
      // Sign-out successful.
      alert("signedout successfully")
    }).catch((error) => {
      // An error happened.
      console.log("error sign out",error)
    });
  }
  console.log("db data for dashboard",dbData)
  return (
    <div>
      {/* Dashboard
      <button onClick={()=>loggedOut()}>Sign Out</button> */}
      {
        dbData !== '' ? 
        dbData.hospital ? 
        <DoctorInfo /> : <PatientInfo /> : null
      }
    </div>
  )
}

export default Dashboard
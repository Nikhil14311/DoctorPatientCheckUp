import React, { useEffect, useState } from 'react'
import { ref, set, onValue, get, child } from 'firebase/database'
import { database } from '../firebase'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from '../firebase'

const DoctorInfo = () => {

    const[user,setUser] = useState('')

    useEffect(()=>{
        onAuthStateChanged(auth,(user)=>{
            console.log("doctor info",user);
            setUser(user)
        })
    },[])

    const [data, setData] = useState({
        patientname:'',
        patientaddress:'',
        disease:'',
        patientmobilenumber:'',
        seviour:'',
        hospitalname:'',
        hospitalnumber:'',
        hospitaladdress:'',
        doctorName:''
    })

    const {patientname, patientaddress, disease, patientmobilenumber, seviour, hospitalname, hospitalnumber, hospitaladdress, doctorName} = data;

    const handleChange = (e) => {
        setData({...data,[e.target.name] : e.target.value})
    }


    const addPatientDetail = () => {
        set(ref(database, 'patientInfo/' + patientmobilenumber + "/" + user.uid ), {
            patientname:patientname,
            patientaddress:patientaddress,
            disease:disease,
            patientmobilenumber:patientmobilenumber,
            seviour:seviour,
            hospitalname:hospitalname,
            hospitalnumber:hospitalnumber,
            hospitaladdress:hospitaladdress,
            doctorName:doctorName
        });
        alert("Data added Successfully.")
        setData({
            patientname:'',
            patientaddress:'',
            disease:'',
            patientmobilenumber:'',
            seviour:'',
            hospitalname:'',
            hospitalnumber:'',
            hospitaladdress:'',
            doctorName:''
        })
    }

    const loggedOut = () => {
        signOut(auth).then(() => {
          // Sign-out successful.
          alert("logged out successfully")
        }).catch((error) => {
          // An error happened.
          console.log("error sign out",error)
        });
    }
    
    const dbRef = ref(database);
    const searchPatientDetails = () => {
        onAuthStateChanged(auth,(user)=>{
            if(user){
                console.log("current user",user);
                get(child(dbRef, `patientInfo/${'7396676216'}`)).then((snapshot) => {
                    if (snapshot.exists()) {
                      console.log(snapshot.val());
                    } else {
                      console.log("No data available");
                    }
                  }).catch((error) => {
                    console.error(error);
                });
            }
        })
    }

    return (
        <div style={styles.mainContainer}>
            <div style={{paddingTop:10,paddingBottom:10}}>
                <h4 style={{color:'red'}}>Please add the patient details below</h4>
            </div>

            <div style={styles.boxContainer}>
                <div class="alert alert-warning">
                    <strong>Note : </strong> Only doctors should be fill this form.
                </div>
                <div>
                    <h6>Patient Name</h6>
                    <input 
                        style={styles.inputBox}
                        value={patientname}
                        name={"patientname"}
                        onChange={handleChange}
                    />
                </div>
                <div style={styles.inputBoxContainer}>
                    <h6>Doctor Name</h6>
                    <input 
                        style={styles.inputBox}
                        value={doctorName}
                        name={"doctorName"}
                        onChange={handleChange}
                    />
                </div>
                <div style={styles.inputBoxContainer}>
                    <h6>Patient Address</h6>
                    <input 
                        style={styles.inputBox}
                        value={patientaddress}
                        name={"patientaddress"}
                        onChange={handleChange}
                    />
                </div>
                <div style={styles.inputBoxContainer}>
                    <h6>Disease</h6>
                    <input 
                        style={styles.inputBox}
                        value={disease}
                        name={"disease"}
                        onChange={handleChange}
                    />
                </div>
                <div style={styles.inputBoxContainer}>
                    <h6>Patient Mobile Number</h6>
                    <input 
                        style={styles.inputBox}
                        value={patientmobilenumber}
                        name={"patientmobilenumber"}
                        onChange={handleChange}
                    />
                </div>
                <div style={styles.inputBoxContainer}>
                    <h6>Hospital Name</h6>
                    <input 
                        style={styles.inputBox}
                        value={hospitalname}
                        name={"hospitalname"}
                        onChange={handleChange}
                    />
                </div>
                <div style={styles.inputBoxContainer}>
                    <h6>Hospital Address</h6>
                    <input 
                        style={styles.inputBox}
                        value={hospitaladdress}
                        name={"hospitaladdress"}
                        onChange={handleChange}
                    />
                </div>
                <div style={styles.inputBoxContainer}>
                    <h6>Hospital Number</h6>
                    <input 
                        style={styles.inputBox}
                        value={hospitalnumber}
                        name={"hospitalnumber"}
                        onChange={handleChange}
                    />
                </div>
                <div style={styles.inputBoxContainer}>
                    <h6>Seviour Status</h6>
                    <input 
                        style={styles.inputBox}
                        value={seviour}
                        name={"seviour"}
                        onChange={handleChange}
                    />
                </div>

                <div style={{display:'flex',alignItems:'center',justifyContent:'center',marginTop:20}}>
                    <button type="button" class="btn btn-outline-dark" onClick={()=>addPatientDetail()}>Add Patient Data</button>
                </div>
                <div style={{display:'flex',alignItems:'center',justifyContent:'center',marginTop:20}}>
                    <button type="button" class="btn btn-outline-dark" onClick={()=>searchPatientDetails()}>Search Patient Details</button>
                </div>
                <div style={{display:'flex',alignItems:'center',justifyContent:'center',marginTop:20}}>
                    <button type="button" class="btn btn-outline-danger" onClick={()=>loggedOut()}>Sign Out</button>
                </div>
            </div>
        </div>
    )
}

export default DoctorInfo

const styles = {
    mainContainer:{
        display:'flex',
        width:'100%',
        //height:'100vh',
        flexDirection:'column',
        alignItems:'center'
    },
    boxContainer:{
        //width:'90%',
        border:'1px solid lightgrey',
        padding:20,
        borderRadius:5,
        marginBottom:20
    },
    inputBoxContainer:{
        marginTop:20
    },
    inputBox:{
        width:350,
        height:30,
        borderRadius:2,
        border:'1px solid lightgrey'
    }
}
import React, { useEffect, useState } from 'react'
import { ref, set, onValue, get, child } from 'firebase/database'
import { auth, database } from '../firebase'
import { onAuthStateChanged, signOut } from 'firebase/auth'


const PatientInfo = () => {

    useEffect(()=>{
        initialCall();
    },[])

    const [userData, setUserData] = useState('')
    const [patientDetails, setPatientDetails] = useState([])
    const [noData, setNoData] = useState('')

    const dbRef = ref(database);

    const initialCall = async() => {

        onAuthStateChanged(auth,(user)=>{
            if(user){
                console.log("current user",user);
                get(child(dbRef, `users/${user.uid}`)).then((snapshot) => {
                    if (snapshot.exists()) {
                      //console.log(snapshot.val());
                      setUserData(snapshot.val());
                    } else {
                      console.log("No data available");
                      setNoData("No Data Available")
                    }
                  }).catch((error) => {
                    console.error(error);
                });
            }
        })



        
    }

    console.log("userData",userData);

    useEffect(()=>{

        if(userData){
            let dbRef = ref(database,`patientInfo/${userData.phoneNumber}`)
            

            onValue(dbRef, (snapshot)=>{
                let records = [];
                snapshot.forEach(childSnapshot => {
                    const messageData = childSnapshot.val();
                    records.push(messageData);
                })
                setPatientDetails(records)
            })
        }
    },[userData])

    console.log("patient details",patientDetails)
    

    const loggedOut = () => {
        signOut(auth).then(() => {
          // Sign-out successful.
          alert("logged out successfully")
        }).catch((error) => {
          // An error happened.
          alert("Some error occured while logged out")
          console.log("error sign out",error)
        });
      }

    return (

        <div>
            {patientDetails == '' ?
            <div style={{display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column',width:'100%',height:'100vh'}}>
                <h4>No Data Found</h4>
                <div class="alert alert-warning" role="alert">
                   If you already taken checkup? Please consult with doctor and add the report
                </div>
                <div style={{display:'flex',alignItems:'center',justifyContent:'center',marginTop:20}}>
                    <button type="button" class="btn btn-outline-danger" onClick={()=>loggedOut()}>Sign Out</button>
                </div>    
            </div> :

            <div style={styles.mainContainer}>
                {patientDetails.map((item,index)=>{
                    return(
                        <div style={styles.patientDetailContainer} key={index} >
                            <div>
                                <text>Patient Details</text>
                            </div>
                            <div style={{borderBottom:'1px solid lightgrey',marginTop:5}}>
                            </div>
                            <div style={{display:'flex',marginTop:5,width:'100%'}}>
                                <div style={{flexDirection:'row',display:'flex',justifyContent:'space-between', width:'100%'}}>
                                    <text style={styles.normalTxt}>{item.patientname}</text>
                                    <div style={{
                                        border:'1px solid lightgrey',
                                        width:100,
                                        height:20,
                                        display:'flex',
                                        alignItems:'center',
                                        justifyContent:'center',
                                        borderRadius:5
                                    }}>
                                        <text style={{fontSize:10}}>{item.seviour}</text>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <div>
                                    <text style={styles.normalTxt}>{"Disease"}</text>
                                </div>
                                <div>
                                    <p style={{fontSize:10}}>{item.disease}</p>
                                </div>
                            </div>

                            <div style={{marginTop:10}}>
                                <text>{"Hospital & Doctor Details"}</text>
                            </div>
                            <div style={{borderBottom:'1px solid lightgrey',marginTop:5}}>
                            </div>
                            
                            <div style={{display:'flex',flexDirection:'column',marginTop:5}}>
                                <text style={styles.normalTxt}>{item.doctorName}</text>
                                <text style={styles.normalTxt}>{item.hospitalname}</text>
                                <text style={styles.normalTxt}>{item.hospitaladdress} {","}{" "}{item.hospitalnumber}</text>
                            </div>

                        </div>
                    )
                })}
                <div style={{display:'flex',alignItems:'center',justifyContent:'center',marginTop:20}}>
                    <button type="button" class="btn btn-outline-danger" onClick={()=>loggedOut()}>Sign Out</button>
                </div>
            </div>}
        </div>
    )
}

export default PatientInfo

const styles = {
    mainContainer:{
        display:'flex',
        width:'100%',
        //height:'100vh',
        flexDirection:'column',
        alignItems:'center',
        paddingBottom:20
    },
    patientDetailContainer:{
        display:'flex',
        width:'90%',        
        padding:20,
        //paddingBottom:20,
        //paddingLeft:40,
        //paddingRight:40,
        border:'1px solid lightgrey',
        //height:'20vh',
        borderRadius:5,
        boxShadow:'1px 1px 1px lightgrey',
        //alignItems:'center',
        flexDirection:'column',
        marginTop:20,
    },
    // patientDetailTxtContainer:{
    //     display:'flex',
    //     flexDirection:'row'
    // },
    normalTxt:{
        fontSize:12,
        fontFamily:'sans',
    }
}
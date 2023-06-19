import { onAuthStateChanged } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { auth, database } from '../firebase'
//import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
//import { storage } from '../firebase'
import { getDatabase, ref, child, get, update } from "firebase/database";
import { useNavigate } from 'react-router-dom';

const Profile = () => {

    const[image, setImage] = useState('')
    const[files, setFiles] = useState('')
    const[user, setUser] = useState('');
    const[dbData, setDbData] = useState('');
    const[data, setData] = useState({
        username:'',
        address:'',
        phonenumber:''
    })

    const navigate = useNavigate();

    const onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            let img = event.target.files[0];
            setFiles(img)
            setImage(URL.createObjectURL(img))
        }
    }

    useEffect(()=>{
        initialAPI();
    },[])
    const dbRef = ref(database);
    const initialAPI = async() => {
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


    const {username,address,phonenumber} = data;

    // const handleChange = (e) =>{
    //     setData({...data,[e.target.name]:e.target.value}) 
    // }

    const handleChange = (e) => {
        setData({...data,[e.target.name] : e.target.value})
    }

    //console.log("db data",dbData)
    console.log("data",data)

    const userProfileAdd = async() => {
    //     const storageRef = ref(storage, `/files/${image}`)
    //     const uploadTask = await uploadBytesResumable(storageRef, files);

    //     await uploadTask.on(
    //         "state_changed",
    //         (snapshot) => {
    //         const percent = Math.round(
    //             (snapshot.bytesTransferred / snapshot.totalBytes) * 100
    //         );
        
    //         // update progress
    //         console.log("percentage",percent)
    //         //setPercent(percent);
    //      },
    //      (err) => console.log(err),
    //        () => {
    //        // download url
    //       getDownloadURL(uploadTask.snapshot.ref).then((url) => {
    //         console.log(url);
    //      });
    //     }
    //    ); 
        const updateData = {
            displayName: username,
            email: dbData.email,
            phoneNumber: phonenumber,
            photoURL: "something",
            uid: user.uid,
            hospital: dbData.hospital,
            address : address,
        }

        const updates = {};
        updates['/users/' + user.uid] = updateData;
        update(ref(database), updates)
        navigate('/',{replace:true})

    }


    return (
        <div style={styles.mainContainer}>
            <div style={styles.boxContainer}>
                {/* inner box */}
                <div style={styles.innerBoxContainer}>
                    {/* image box */}
                    <div style={styles.imgContainer}>
                        <img src={image ? image : "https://assets.stickpng.com/images/585e4bf3cb11b227491c339a.png"} style={styles.image} alt="userimg" />
                        <h5 style={{marginTop:10}}>Select Image</h5>
                        <input type="file" name="myImage" alt="userimg" onChange={onImageChange} />
                    </div>

                    <div style={styles.inputFieldContainer}>
                        <div style={styles.innerInputContainer}>
                            <h6>Username</h6>
                            <input style={styles.inputBox} type="text" name="username" value={username} onChange={handleChange} />
                        </div>
                        <div style={styles.innerInputContainer}>
                            <h6>Address</h6>
                            <input style={styles.inputBox} type="text" name="address" value={address} onChange={handleChange} />
                        </div>
                        <div style={styles.innerInputContainer}>
                            <h6>Phone Number</h6>
                            <input style={styles.inputBox} type="text" name="phonenumber" value={phonenumber} onChange={handleChange} />
                        </div>
                    </div>
                    <div style={{marginTop:10}}>
                        <button type="submit" class="btn btn-outline-primary align center" onClick={()=> userProfileAdd()} >Submit</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile

const styles = {
    mainContainer : {
        display : 'flex',
        width : '100%',
        //height : '100vh',
        alignItems : 'center',
        justifyContent : 'center'
    },
    boxContainer:{
        display:'container',
        border : '1px solid lightgrey',
        width : '80%',
        paddingBottom : 50,
        //height : '70vh',
        boxShadow : '0.5px 0.5px 1px lightgrey',
        marginTop:40,
        marginBottom:40,
        borderRadius:5
    },
    innerBoxContainer:{
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center',
        width:'100%'
    },
    imgContainer:{
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center',
        marginTop:40
    },
    image:{
        width:'200px',
        height:'200px',
        borderRadius:'50%'
    },
    inputFieldContainer:{
        display:'flex',
        width:'100%',
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center',
        marginTop:10
        //marginLeft:200
    },
    innerInputContainer:{
        marginTop:20
    },
    inputBox:{
        width:'300px',
        height:'40px'
    }
}
import React from 'react'
import { ref, set, onValue, get, child } from 'firebase/database'
import { database } from '../firebase'
const TestingDB = () => {

    const uploadContent = () => {

        // To upload the data

        set(ref(database, 'users/' + "8555808729"), {
            username: "Priya Royal",
            email: "priya@gmail.com"
        });


        //To retrieve the data

        // const starCountRef = ref(database, 'users/');
        // onValue(starCountRef, (snapshot) => {
        //     const data = snapshot.val();
        //     console.log("data",data);
        // });


        //To get child data

        const dbRef = ref(database);
        get(child(dbRef, `users/${userId}`)).then((snapshot) => {
            if (snapshot.exists()) {
              console.log(snapshot.val());
            } else {
              console.log("No data available");
            }
          }).catch((error) => {
            console.error(error);
        });
    }

    return (
        <div>
            <button onClick={()=>uploadContent()}>Search</button>
        </div>
    )
}

export default TestingDB

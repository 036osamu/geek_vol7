import logo from "./logo.svg";
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from "./App";
import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";

function Battle() {
    export const app = firebase.initializeApp({
        apiKey: process.env.REACT_APP_FIREBASE_KEY,
        authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
        projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
        storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
        appId: process.env.REACT_APP_FIREBASE_APP_ID,
        measurementId:process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
    });
    let db = firebase.firestore();
    let docRef = db.collection("data").doc("90TwVL13wTuPpmCgw24C")
        .onSnapshot((doc) => {
            console.log("Current data: ", doc.data());
            let hp = doc.data();
        });

    return (
        <div className="Battle">
            <Button variant="primary">{hp}</Button>{/* ? */}
        </div>
    );
}
export default Battle;
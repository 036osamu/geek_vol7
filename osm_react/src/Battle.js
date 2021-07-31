import logo from "./logo.svg";
import {Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from "./App";
import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage"
import {useState} from "react";
import {makeStyles, createStyles, Theme} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Image from './158e35945dfb441ed15105ed7c0e7849.png'
import monster from './pose_reiwa_man.png'
import {Container} from "@material-ui/core";
import LinearProgress from '@material-ui/core/LinearProgress';
import TopLoadingBar from "./CustomizedProgressBars";
import CustomizedProgressBars from "./CustomizedProgressBars";
import MediaCard from "./MediaCard";


let hp = 0;
let hp_max = 0;
let hp_diff = 0;
let hp_before = 0;
let img_shape;
var image_url;

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};
if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
}
let db = firebase.firestore();
let storage = firebase.storage();
let storageRef = storage.ref();

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        height: '100%'
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        height: '100%'
    },
}));

const styles = {
    paperContainer: {
        backgroundImage: `url(${Image})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        minHeight: '100%'

    },
    container3: {
        height: '100%'
    },
    image_center: {
        textAlign: 'center'
    },
    log_card: {
        backgroundColor: 'rgba(0,0,0,0.39)',
        width: '80%',
        height: '50%',
        marginLeft: 'auto',
        marginRight: 'auto'
    }
};


function Battle() {
    const [hp_value, setHp] = useState(hp)
    const [Url_url, setUrl] = useState('')
    let docRef = db.collection("data").doc("90TwVL13wTuPpmCgw24C")
        .onSnapshot((doc) => {
            console.log("Current data: ", doc.data());
            console.log("Hp max: ", hp_max);
            hp = doc.data();
            setHp(hp.amount);
            hp_max = hp_max <= hp ? hp_max : hp.amount;
            hp_diff = hp_before - hp <= 0 ? 0 : hp_before - hp.amount;
            console.log("diff: ", hp_diff);
            hp_before = hp.amount;
            console.log("BEFORE: ", hp_before);

        });
    storageRef.child('img_gomi.png').getDownloadURL().then(function (url) {
        // `url` is the download URL for 'images/stars.jpg'

        // This can be downloaded directly:
        var xhr = new XMLHttpRequest();
        xhr.responseType = 'blob';
        xhr.onload = function (event) {
            var blob = xhr.response;
        };
        xhr.open('GET', url);

        xhr.send();

        // Or inserted into an <img> element:
        img_shape = document.getElementById('myimg');
        image_url = url;
        setUrl(url);
        console.log('img', url)
    }).catch(function (error) {
        // Handle any errors
    });
    const classes = useStyles();
    return (
        <div style={styles.paperContainer}>
            <div className={classes.root}>
                <Grid container alignItems="center" justify="center" direction={"row"} spacing={1}
                      style={styles.container3}>
                    <Grid item alignItems="center" direction={"column"} xs={4}>
                        <Paper className={classes.paper}>xsr-test</Paper>
                        <Paper className={classes.paper}>{image_url}###</Paper>
                        <Paper className={classes.paper}>{hp_value}</Paper>
                    </Grid>
                    <Grid item alignItems="center" justify={"center"} direction={"column"} xs={4}>
                        <CustomizedProgressBars progress={hp_value} max={hp_max}/>
                        <div style={styles.image_center}>
                            <img src={monster} style={styles.image_center}/>
                        </div>

                    </Grid>
                    <Grid item alignItems="center" direction={"column"} xs={4}>
                        <div style={styles.log_card}>
                            <MediaCard
                                image={Url_url}
                                progress={hp_diff} max={hp_max}/>
                        </div>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}

export default Battle;
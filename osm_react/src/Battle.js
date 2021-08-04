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

import monster1 from './data/100.png'
import monster2 from './data/101.png'
import monster3 from './data/102.png'

import {Container} from "@material-ui/core";
import LinearProgress from '@material-ui/core/LinearProgress';
import TopLoadingBar from "./CustomizedProgressBars";
import CustomizedProgressBars from "./CustomizedProgressBars";
import MediaCard from "./MediaCard";
import Animate from 'animate.css-react'
import {Animated} from "react-animated-css";
import 'animate.css/animate.css'
import TransitionsModal from "./TransitionModal";


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
        textAlign: 'center',
        width: '90%',
        marginLeft: 'auto',
        marginRight: 'auto',
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
    const [monster_file, setMonsterFile] = useState(monster1)
    const [monster_level, setMonsterLevel] = useState(1)
    const [monster_name, setMonsterName] = useState('gozilla')
    const [Url_url, setUrl] = useState('')
    const [animate_flag, setAnimate_flag] = useState(false)
    const [modal_flag, setModalFlag] = useState(false)
    let docRef = db.collection("data").doc("90TwVL13wTuPpmCgw24C")
        .onSnapshot((doc) => {

            // console.log("Current data: ", doc.data());
            // console.log("Hp max: ", hp_max);
            hp = doc.data();
            setHp(hp.amount);
            hp_max = hp.hp_max;
            hp_diff = hp.hp_diff;
            // console.log("diff: ", hp_diff);
            // console.log("AMOUNT: ", hp_value);
            if (hp_before != hp_value && hp_diff <= 0) {
                console.log('Animated');
                change_flag();
                if (hp_value == 0) {
                    console.log('modal flagged')
                    setModalFlag(true)
                }
            }
            if (hp_before != hp_value && hp_diff >= 0) {
                if (hp_value > 50000 && hp_value < 100000) {
                    setMonsterFile(monster2)
                    setMonsterName('python')
                    setMonsterLevel(2)
                } else if (hp_value > 100000) {
                    setMonsterFile(monster3)
                    setMonsterName('irohasu')
                    setMonsterLevel(3)
                } else {
                    setMonsterFile(monster1)
                    setMonsterName('gozilla')
                    setMonsterLevel(1)
                }
                console.log(monster_file)
            }
            hp_before = hp_value

        });
    storageRef.child('img_gomi.png').getDownloadURL().then(function (url) {
        // `url` is the download URL for 'images/stars.jpg'

        // This can be downloaded directly:

        // Or inserted into an <img> element:
        image_url = url;
        setUrl(url);
        // console.log('img', url)
    }).catch(function (error) {
        // Handle any errors
    });

    function change_flag() {
        setAnimate_flag(!animate_flag)
    }

    const classes = useStyles();
    return (
        <div style={styles.paperContainer}>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css"/>
            <div className={classes.root}>
                <Grid container alignItems="center" justify="center" direction={"row"} spacing={1}
                      style={styles.container3}>
                    <Grid item alignItems="center" direction={"column"} xs={4}>
                        <Paper className={classes.paper}>名前 {monster_name}</Paper>
                        <Paper className={classes.paper}>LEVEL {monster_level}/3</Paper>
                        <Paper className={classes.paper}>体力 {hp_max}</Paper>
                    </Grid>
                    <Grid item alignItems="center" justify={"center"} direction={"column"} xs={4}>
                        <CustomizedProgressBars progress={hp_value} max={hp_max}/>
                        <div className={animate_flag ? "animate__animated animate__tada" : ""}
                             onClick={change_flag} style={styles.image_center} onAnimationEnd={change_flag}>
                            <img src={monster_file} style={styles.image_center}/>
                        </div>
                        <TransitionsModal flag={modal_flag}/>

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
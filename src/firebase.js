import Firebase from 'firebase';  
let config = {  
    apiKey: "AIzaSyCEwsnw51LHiL2entmVNcsZ95UQApv7BQ0",
    authDomain: "ips-app-ce85b.firebaseapp.com",
    databaseURL: "https://ips-app-ce85b.firebaseio.com",
    projectId: "ips-app-ce85b",
    storageBucket: "ips-app-ce85b.appspot.com",
    messagingSenderId: "131590502729"
};
let app = Firebase.initializeApp(config);  
export const db = app.database();
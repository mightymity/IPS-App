import Firebase from 'firebase';

let secondaryAppConfig = {
    authDomain: "testbright-f19de.firebaseapp.com",
    databaseURL: "https://testbright-f19de.firebaseio.com",
    projectId: "testbright-f19de",
    storageBucket: "testbright-f19de.appspot.com",
};

// Initialize another app with a different config
const secondary = Firebase.initializeApp(secondaryAppConfig, "secondary");

// Retrieve the database.
export const db2 = secondary.database();
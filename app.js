// Initialize Firebase
var config = {
    apiKey: "AIzaSyCxFsEsZ7RGiwPlM56nj10F1WyFSXH2FfA",
    authDomain: "devfest2017-9088d.firebaseapp.com",
    databaseURL: "https://devfest2017-9088d.firebaseio.com",
    storageBucket: "devfest2017-9088d.appspot.com",
    messagingSenderId: "780181838988"
};
firebase.initializeApp(config);

var header = document.getElementById('header');


var dbRef = firebase.database().ref().child('header');

var signInButton = document.getElementById('signInButton');
var signOutButton = document.getElementById('signOutButton');
var provider = new firebase.auth.GoogleAuthProvider();

signInButton.addEventListener('click', function () {
    firebase.auth().signInWithPopup(provider).then(function (user) {
        if (user) {
            dbRef.on('value', function (snap) {
                header.innerText = snap.val();
            });
            playgroundRef.on('value', function (snap) {
                playground.value = snap.val();
            });
        }
    });
});

signOutButton.addEventListener('click', function(){
    firebase.auth().signOut().then(function(){
        header.innerText = 'Sign in with google to see the magic!!';
        playground.value = 'You need to sign in to play here!';
    });
});

var playground = document.getElementById('playground');
var playgroundRef = firebase.database().ref().child('playground');

playground.addEventListener('keyup', function(){
    playgroundRef.set(playground.value);
})
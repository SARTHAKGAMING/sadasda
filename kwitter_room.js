// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
  apiKey: "AIzaSyAin4_fq4cBt_8pNDemSNhAbEad7pnvAM4",
  authDomain: "kwitter-5b8fe.firebaseapp.com",
  databaseURL: "https://kwitter-5b8fe-default-rtdb.firebaseio.com",
  projectId: "kwitter-5b8fe",
  storageBucket: "kwitter-5b8fe.appspot.com",
  messagingSenderId: "717160914674",
  appId: "1:717160914674:web:d082649c61f0fa37137a6b",
  measurementId: "G-64M47HP9D4"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

username = localStorage.getItem("user_name");
document.getElementById("user_name_display").innerHTML = "Welcome" + username + "!";

function add_roomname() {
  roomname = document.getElementById("room_name").value;
  firebase.database().ref("/").child(roomname).update({
    purpuse: "addingroomname"
  });
  localStorage.setItem("roomname", roomname);
  window.location = "kwitter_page.html";
}

function getData() {
  firebase.database().ref("/").on('value', function (snapshot) {
    document.getElementById("output").innerHTML = "";
    snapshot.forEach(function (childSnapshot) {
      childKey = childSnapshot.key;
      Room_names = childKey;
      console.log("Room Name - " + Room_names);
      row = "<div class='room_name' id=" + Room_names + " onclick='redirectToRoomName(this.id)' >#" + Room_names + "</div><hr>";
      document.getElementById("output").innerHTML += row;
    });
  });
}
getData();

function redirectToRoomName(name) {
  console.log(name);
  localStorage.setItem("room_name", name);
  window.location = "kwitter_page.html";
}

function logout() {
  localStorage.removeItem("user_name");
  localStorage.removeItem("room_name");
  window.location = "index.html";
}
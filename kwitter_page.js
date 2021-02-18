//YOUR FIREBASE LINKS
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
user_name = localStorage.getItem("user_name");
room_name = localStorage.getItem("room_name");

function send() {
      msg = document.getElementById("msg").value;
      firebase.database().ref(room_name).push({
            name: user_name,
            message: msg,
            like: 0
      });
      document.getElementById("msg").value = "";
}

function getData() {
      firebase.database().ref("/" + room_name).on('value', function (snapshot) {
            document.getElementById("output").innerHTML = "";
            snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key;
                  childData = childSnapshot.val();
                  if (childKey != "purpose") {
                        firebase_message_id = childKey;
                        message_data = childData;
                        console.log(firebase_message_id);
                        console.log(message_data);
                        var name = message_data['name'];
                        var message = message_data['message'];
                        var likes = message_data['like'];
                        var namewithtag = "<h4>" + name + "<img src='tick.png' class='user_tick'></h4>";
                        var messagewithtag = "<h4 class='message_h4'>" + message + "</h4>";
                        likebutton = "<button class='btn btn-warning' id=" + firebase_message_id + " value=" + likes + " onclick='updatelike(this.id)'>";
                        span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'>Like: " + likes + "</span></button><hr>";
                        row = namewithtag + messagewithtag + likebutton + span_with_tag;
                        document.getElementById("output").innerHTML += row;
                  }
            });
      });
}
getData();

function updatelike(message_id) {
      console.log("clicked on like button - " + message_id);
      button_id = message_id;
      likes = document.getElementById(button_id).value;
      updated_likes = Number(likes) + 1;
      console.log(updated_likes);
      firebase.database().ref(room_name).child(message_id).update({
            like: updated_likes
      });
}

function logout() {
      localStorage.removeItem("user_name");
      localStorage.removeItem("room_name");
      window.location.replace("index.html");
}
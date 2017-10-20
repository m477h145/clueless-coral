// Initialize Firebase
var config = {
  apiKey: "AIzaSyAg2mFqVr8Jafrwl_eZqlXle64IlQtUTyw",
  authDomain: "school-edbd6.firebaseapp.com",
  databaseURL: "https://school-edbd6.firebaseio.com",
  projectId: "school-edbd6",
  storageBucket: "",
  messagingSenderId: "1007380280855"
};
firebase.initializeApp(config);

// Functions
/// Write a post, returns an ID.
function write_post(teacher, title, text, club, picture) {
  key = firebase.database().ref().child('posts').push().key;
  firebase.database().ref('posts/' + key).set({
    teacher: teacher,
    title: title,
    text: text,
    club: club || "School",
    picture: picture || null
  });
  return key;
}

/// Read a post, returns a JSON object.
function read_post(key) {
  var post;
  firebase.database().ref('posts/' + key).once('value').then(function(snapshot) {
    posts = snapshot.val()
  });
  return post;
}

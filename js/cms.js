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
/// write_post:  Write a post, returns an ID (string).
/// read_post:   Read a post, returns a JSON object (teacher, title, text, club, picture)
/// update_post: Update a post, returns a boolean, whether it was successful or not.
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

function read_post(key) {
  var post;
  firebase.database().ref('posts/' + key).once('value').then(function(snapshot) {
    post = snapshot.val()
  });
  return post;
}

function update_post(key, teacher, title, text, club, picture) {
  reference = read_post(key);
  if (reference == null) {
    return false;
  } else {
    firebase.database().ref('posts/' + key).update({
      teacher: teacher || reference.teacher,
      title: title || reference.title,
      text: text || reference.text,
      club: club || reference.club,
      picture: picture || reference.picture,
    })
    return true;
  }
}

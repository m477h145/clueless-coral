// Functions
/// write_post:   Write a post, returns an ID (string).
/// read_post:    Read a post, returns a JSON object (teacher, title, text, club, picture)
/// update_post:  Update a post, returns a boolean, whether it was successful or not.
/// display_post: Display a post in the HTML element given by the second argument, returns null.
function write_post(title, text, club, picture) {
  key = firebase.database().ref().child('posts').push().key;
  var name;
  firebase.database().ref('users/' + firebase.auth().currentUser.uid).once('value').then(function(snapshot) {
    name = snapshot.val().display
  });
  firebase.database().ref('posts/' + key).set({
    teacher: name || 'Anonymous',
    title: title,
    text: text,
    club: club || 'School',
    picture: picture || null
  });
  return key;
}

function read_post(key) {
  var post;
  firebase.database().ref('posts/' + key).once('value').then(function(snapshot) {
    post = snapshot.val();
    //console.log(post);
  });
  //console.log(post);
  return post;
}

function update_post(key, title, text, club, picture) {
  reference = read_post(key);
  if (reference == null) {
    return false;
  } else {
    var name;
    firebase.database().ref('users/' + firebase.auth().currentUser.uid).once('value').then(function(snapshot) {
      name = snapshot.val().display
    });
    firebase.database().ref('posts/' + key).update({
      teacher: name || reference.teacher,
      title: title || reference.title,
      text: text || reference.text,
      club: club || reference.club,
      picture: picture || reference.picture,
    })
    return true;
  }
}

function display_post(key, parent) {
  post = read_post(key);
  div = document.createElement('div');
  div.innerHTML = '<div class="card text-white bg-primary mb-3" style="max-width: 33.333333%;">' +
  '<div class="card-header">' + post.club + ' / ' + post.teacher + '</div>';
  if (post.picture !== null) {
    div.innerHTML += '<img class="card-img-top" src="' + post.picture + '" alt=""' + post.title + ' / Image"">';
  }
  div.innerHTML += '<div class="card-body">' +
  '<h4 class="card-title">' + post.title + '</h4>' +
  '<p class="card-text">' + post.text + '</p>' +
  '</div>' +
  '</div>';
  parent.appendChild(div);
  return null;
}

function remove_post(key) {
  firebase.database().ref('posts/' + key).update(null);
}

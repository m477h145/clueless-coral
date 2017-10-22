// Functions
/// user_user:  Log in to a user, returns a boolean, whether it was successful or not.
/// leave_user: Logs out of the user, returns a boolean, whether it was successful or not.

function use_user(email, password) {
  var err = false;
  firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    err = true;
  });
  if (err) {
    alert('There was an error signing in, code: ' + errorCode.toString() + ', message: ' + errorMessage);
    console.error('Recieved a ' + errorCode.toString() + ' "' + errorMessage + '" while logging into ' + email + '.');
    return false;
  } else {
    console.log('Successfully logged into ' + email + ' without any apparent errors.');
    return true;
  }
}

function leave_user() {
  var err = false;
  firebase.auth().signOut().then(function() {}).catch(function(error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    err = true;
  });
  if (err) {
    alert('There was an error signing in, code: ' + errorCode.toString() + ', message: ' + errorMessage);
    console.error('Recieved a ' + errorCode.toString() + ' "' + errorMessage + '" while logging out.');
    return false;
  } else {
    console.log('Successfully logged into ' + email + ' without any apparent errors.');
    return true;
  }
}

// Functions
/// user_user:   Log in to a user, returns a boolean, whether it was successful or not.
/// leave_user:  Logs out of the user, returns a boolean, whether it was successful or not.
/// create_user: Creates a user and logs into it, returns a boolean, whether it was successful or not.

var err;

function use_user(email, password) {
  err = false;
  firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
    errorCode = error.code;
    errorMessage = error.message;
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
  err = false;
  firebase.auth().signOut().then(function() {}).catch(function(error) {
    errorCode = error.code;
    errorMessage = error.message;
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

function create_user(email, password) {
  err = false;
  firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
    errorCode = error.code;
    errorMessage = error.message;
    err = true;
  });
  if (err) {
    alert('There was an error creating the user ' + email + ', code: ' + errorCode.toString() + ', message: ' + errorMessage);
    console.error('Recieved a ' + errorCode.toString() + ' "' + errorMessage + '" while logging out.');
    return false;
  } else {
    console.log('Successfully created user ' + email + ' without any apparent errors.');
    return true;
  }
}

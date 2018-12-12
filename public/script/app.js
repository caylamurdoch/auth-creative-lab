var config = {
    apiKey: "AIzaSyC2KoCqcR_kHuiSUqV49lea8rStyqhSVNQ",
    authDomain: "classauth-45727.firebaseapp.com",
    databaseURL: "https://classauth-45727.firebaseio.com",
    projectId: "classauth-45727",
    storageBucket: "classauth-45727.appspot.com",
    messagingSenderId: "485291357837"
};
firebase.initializeApp(config);


angular.module('myapp', [])
    .controller('MainCtrl', [
        '$scope', '$http',
        function($scope, $http) {

            $scope.user_data = []
            $scope.token

            console.log("boot")
            document.getElementById('quickstart-sign-in').disabled = false;


            // [START getidptoken]
            firebase.auth().getRedirectResult().then(function(result) {
                console.log("redirect")
                if (result.credential) {
                    // This gives you a GitHub Access Token. You can use it to access the GitHub API.
                    $scope.token = result.credential.accessToken;
                    $scope.quickstart_oauthtoken = $scope.token;
                }
                else {
                    // document.getElementById('quickstart-oauthtoken').textContent = 'null';
                    $scope.quickstart_oauthtoken = "null"
                    // [END_EXCLUDE]
                }
                // The signed-in user info.
                var user = result.user;
            }).catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // The email of the user's account used.
                var email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                var credential = error.credential;
                // [START_EXCLUDE]
                if (errorCode === 'auth/account-exists-with-different-credential') {
                    alert('You have already signed up with a different auth provider for that email.');
                    // If you are using multiple auth providers on your app you should handle linking
                    // the user's accounts here.
                }
                else {
                    console.error(error);
                }
                // [END_EXCLUDE]
            });

            // [END getidptoken]
            // Listening for auth state changes.
            // [START authstatelistener]
            firebase.auth().onAuthStateChanged(function(user) {
                console.log("state changed")

                if (user) {
                    console.log("user exists")
                    // User is signed in.
                    var displayName = user.displayName;
                    var email = user.email;
                    var emailVerified = user.emailVerified;
                    var photoURL = user.photoURL;
                    var isAnonymous = user.isAnonymous;
                    var uid = user.uid;
                    var providerData = user.providerData;

                    console.log(providerData)
                    // [START_EXCLUDE]

                    $scope.profilePicture = providerData[0]["photoURL"]
                    $scope.quickstart_sign_in_status = 'Signed in'
                    $scope.quickstart_account_details = JSON.stringify(user, null, '  ');

                    // [END_EXCLUDE]
                }
                else {
                    // User is signed out.
                    // [START_EXCLUDE]
                    $scope.profilePicture = ""
                    $scope.quickstart_sign_in_status = 'null'
                    $scope.quickstart_account_details = 'null'
                    // [END_EXCLUDE]
                }
                // [START_EXCLUDE]
                document.getElementById('quickstart-sign-in').disabled = false;
                // [END_EXCLUDE]
            });


            $scope.toggleSignIn = function() {

                if (!firebase.auth().currentUser) {
                    console.log("sign in")
                    // [START createprovider]
                    var provider = new firebase.auth.GithubAuthProvider();
                    // [END createprovider]
                    // [START addscopes]
                    provider.addScope('repo');
                    // [END addscopes]
                    // [START signin]
                    firebase.auth().signInWithRedirect(provider);

                }
                else {
                    console.log("sign out")
                    // [START signout]
                    firebase.auth().signOut();
                    // [END signout]
                }
                // [START_EXCLUDE]
                document.getElementById('quickstart-sign-in').disabled = true;
                // [END_EXCLUDE]

            }

        }
    ]);

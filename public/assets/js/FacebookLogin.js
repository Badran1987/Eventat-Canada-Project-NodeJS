document.addEventListener("DOMContentLoaded", function () {

    let facebook = () => {
        const facebook = document.getElementById("facebook");
        var provider = new firebase.auth.FacebookAuthProvider();
        provider.addScope('user_birthday');
        
        firebase.auth().languageCode = 'it';
        // To apply the default browser preference instead of explicitly setting it.
        // firebase.auth().useDeviceLanguage
        
        
        provider.setCustomParameters({
            'display': 'popup'
          });
        facebook.addEventListener("click", function (e) {
               e.preventDefault();
        alert("facebook Function")
        firebase.auth().languageCode = 'en';
        firebase
        .auth()
        .signInWithPopup(provider)
        .then((result) => {
 
        var credential = result.credential;

        // The signed-in user info.
        var user = result.user;

        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        var accessToken = credential.accessToken;

        // ...
        }).catch((error) => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;

            // ...
            });
        });
    }
    facebook();
});



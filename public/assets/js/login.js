document.addEventListener("DOMContentLoaded", function () {


   let Login = () => {
    const username = document.getElementById("username");
    const password = document.getElementById("password");
    const loginbtn = document.getElementById("loginbtn");
    const formID = document.getElementById("formID");
    formID.addEventListener("submit", function (e) {
      e.preventDefault();
        alert("Login Function")
        firebase
          .auth()
          .signInWithEmailAndPassword(username.value, password.value)
          .then(function () {
            const user = firebase.auth().currentUser;
            console.log("user", user);
          })
          .catch((err) => console.log("err", err));
      });
  
      firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          window.location = "/";
        }
      });
   
   } 
   Login();
});


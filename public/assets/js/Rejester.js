document.addEventListener("DOMContentLoaded", function () {

    const username = document.getElementById("username");
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const fName = document.getElementById("fName");
    const lName = document.getElementById("lName");
    const Country = document.getElementById("Country");
    const register = document.getElementById("register");
    const db = firebase.firestore();
    register.addEventListener("submit", function (e) {
     
      e.preventDefault();
      alert(email.value);
      alert(password.value);
      

          firebase
            .auth()
            .createUserWithEmailAndPassword(email.value, password.value)
            .then(function (data) {
              const user = firebase.auth().currentUser;
              addUser(user.uid, fName.value, lName.value);
            })
            .catch((err) => console.log("err", err));
        });

        function addUser(uid, first, last) {
          db.collection("Users")
            .doc(uid)
            .set({
              firstname: first,
              lastname: last,
              user: uid,
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            })
            .then(function () {
              window.location = "index.html";
            })
            .catch((err) => console.log("err", err));
        }

       
   } );


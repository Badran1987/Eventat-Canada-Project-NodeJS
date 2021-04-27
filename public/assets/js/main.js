
document.addEventListener("DOMContentLoaded", function () {


    let Account  = () => {
     const adminName = document.getElementById("adminName");
     const adminNameUp = document.getElementById("adminNameUp");
     const db = firebase.firestore();
     let userRef = null;

     function getUser(uid) {
        console.log("UID arrived");
        db.collection("Users")
          .doc(uid)
          .get()
          .then(function (doc) {
            if (doc.exists) {
                console.log(doc.data().firstname);
                adminName.textContent = doc.data().firstname + " " +doc.data().lastname ;
                adminNameUp.textContent = doc.data().firstname + " " +doc.data().lastname ;
              
            } else {
              console.log("No such document");
            }
          });
      }
      firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          console.log("user", user);
          userRef = user;
          getUser(user.uid);
        } else {
        }
      });
    
    }
    Account();
 });
 
 
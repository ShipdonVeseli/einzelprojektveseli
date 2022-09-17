let button = document.getElementById("login");
let email = document.getElementById("email");
let password = document.getElementById("pass");
let age = document.getElementById("age");
button.onclick = validate;
function validate(){
    let checker = 0;
    if(email.value != "office@shipdon.at"){
      alert("Falsche Mail");
      checker = 1;
    } else if(password.value != "secret123!"){
      alert("Falsches Passwort");
      checker = 1;
    } else if(age.value < 18){
      alert("Zu Jung");
      checker = 1;
    }
    if(counter == 0){
      //show navigation bar and hide login
    }
}
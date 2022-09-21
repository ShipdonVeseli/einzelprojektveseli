import 'bootstrap';
import './style_custom.scss';


let button = document.getElementById("login");
let buttonlogout = document.getElementById("logout");
let email = document.getElementById("email");
let password = document.getElementById("pass");
let age = document.getElementById("age");
let navbar = document.getElementById("navbar");
let loginform = document.getElementById("app")

if(sessionStorage.getItem("login") == "true"){
  navbar.style.display = "block";
  loginform.style.display = "none";
}

buttonlogout.onclick = logout;
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
    if(checker == 0){
      //show navigation bar and hide login
      alert("Login Sucess.")
      navbar.style.display = "block";
      loginform.style.display = "none";
      sessionStorage.setItem("login", "true");
    }
}

//logout
function logout(){
  navbar.style.display = "none";
  loginform.style.display = "block";
  sessionStorage.setItem("login", "false");
  location.href = 'index.html';
}

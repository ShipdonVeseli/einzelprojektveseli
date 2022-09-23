import { start } from '@popperjs/core';
import 'bootstrap';
import { get } from 'jquery';
import './style_custom.scss';


function remFromFav(id){
    sessionStorage.removeItem(id);
    location.reload();
}

let navbar = document.getElementById("navbar");
let favbreeds = [];
window.remFromFav = remFromFav;
let buttonlogout = document.getElementById("logout");
let dogbreedlistpictures = JSON.parse(sessionStorage.getItem("pictures"));
let dogbreedlist = JSON.parse(sessionStorage.getItem("breedlist"));
navbar.style.display = "block";
buttonlogout.onclick = logout;
createFavTable();
//getAllFav();
function logout(){
    navbar.style.display = "none";
    sessionStorage.setItem("login", "false");
    location.href = 'index.html';
}

function getAllFav(){
    let sessionkeys = Object.keys(sessionStorage);
    for(let i = 0; i < sessionkeys.length; i++){
        if(sessionkeys[i] != "pictures" && sessionkeys[i] != "login" && sessionkeys[i] != "breedlist"){
            favbreeds.push(sessionkeys[i]);
        }        
    }
}

function createFavTable(){
    getAllFav();
    let favtable = document.getElementById("favtable");
    let counter = 0;
    for(let j=0; j<Math.ceil((favbreeds.length/3)); j++){
        let row = favtable.insertRow(0);
        let limiter = 3;
        if(favbreeds.length - counter < 3){
            limiter = favbreeds.length - counter;
        }
        for(let k=0; k<limiter; k++){
            let cell1 = row.insertCell(0);
            cell1.innerHTML = "<img src='"+dogbreedlistpictures[favbreeds[counter]]+"' width='200' height='200' title='"+dogbreedlist[favbreeds[counter]]+"' role='button' id='"+favbreeds[counter]+"' onclick='remFromFav("+favbreeds[counter]+")'>";
            counter++;
        }
    }
}



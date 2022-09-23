import 'bootstrap';
import './style_custom.scss';

function addToFav(id){
  //console.log(id);
  // if(sessionStorage.getItem("favorite") == null){
  //   var arrayinit = [id]
  //   sessionStorage.setItem("favorite", JSON.stringify(arrayinit))  
  // }
  // else{
  //   console.log(JSON.parse(sessionStorage.getItem("favorite")).push(id))
  // }
  sessionStorage.setItem(id,id);
}
window.addToFav = addToFav;
let navbar = document.getElementById("navbar");
let buttonlogout = document.getElementById("logout");
let dogbreedlist = [];
let dogbreedlistpictures = [];
navbar.style.display = "block";
buttonlogout.onclick = logout;

function logout(){
  navbar.style.display = "none";
  sessionStorage.setItem("login", "false");
  location.href = 'index.html';
}
fetch();
function fetch(){
    $.ajax({
          url: "https://dog.ceo/api/breeds/list/all",
          type: "GET",
          dataType: 'json',
          data:{
          },
          success: function(data){
            var jsonData = data.message;
            //console.log(data.message)
            for(var i in jsonData){
                var key = i;
                var val = jsonData[i];
                if(val.length == 0){
                  dogbreedlist.push(key+"");
                  //console.log(key);
                }
                for(var j in val){
                    var sub_val = val[j];
                    dogbreedlist.push(key+"/"+sub_val);
                    //console.log(sub_val +"/"+key);
                }
            }
            loadimages();
          },
          error: function(error){
            console.log(error);
          }
      })
  
}
    


function loadimages(){
  for(let i=0; i < 50; i++){
    $.ajax({
      url: "https://dog.ceo/api/breed/"+dogbreedlist[i]+"/images/random",
      type: "GET",
      dataType: 'json',
      data:{
      },
      success: function(data){
        dogbreedlistpictures[i]= data.message+"";
        if(i==49){
          for(let o=0; o<50; o++){
            if(dogbreedlistpictures[o] == undefined){
              dogbreedlistpictures.splice(o,1);
              dogbreedlist.splice(o,1);
            }
          }
          createTable();
        }
      },
      error: function(error){
        console.log(error);
      }
    })
  }
  
}

function createTable(){
  let dogtable = document.getElementById("dogtable");
  let counter = 0;
  for(let j=0; j<4; j++){
    let row = dogtable.insertRow(0);
    for(let k=0; k<4; k++){
      let cell1 = row.insertCell(0);
      cell1.innerHTML = "<img src='"+dogbreedlistpictures[counter]+"' width='200' height='200' role='button' id='"+counter+"' onclick='addToFav("+counter+")'>";
      //cell1.innerHTML = "<button onclick='addToFav()' />";
      //console.log(dogbreedlist[counter]);
      //console.log(dogbreedlistpictures[counter]);
      counter++;
    }
  }
  sessionStorage.setItem("pictures", JSON.stringify(dogbreedlistpictures));
  sessionStorage.setItem("breedlist", JSON.stringify(dogbreedlist));
}

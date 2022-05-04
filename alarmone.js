var audio = new Audio("file_example_MP3_1MG.mp3");
var audio2= new Audio("audio1.mp3");
var audio3= new Audio("audio2.mp3");
var audio4= new Audio("audio3.mp3");
var audio5= new Audio("audio4.mp3");
var audio6= new Audio("audio5.mp3");


// var audio3= new Audio('audio2.mp3');
// var audio4= new Audio('audio3.mp3');
// var audio5= new Audio('audio4.mp3');
// function ringBell1(){
//   audio2.load();
//   audio2.play();
// }

let interval = null;
// let withAlarm= document.getElementById('withAlarm')
// withAlarm.classList.add('d-none')
// let h= document.getElementById('h')
// h.classList.add('d-none')

var IsClicked= false;
var song2isclicked = false;
var song3isclicked = false;
var song4isclicked = false;
var song5isclicked = false;


let song1= document.getElementById('song1');
song1.addEventListener('click',()=>{
   song2isclicked = false;
 song3isclicked = false;
 song4isclicked = false;
 song5isclicked = false;
  IsClicked = true;
  console.log('ok')
  })

let song2=document.getElementById('song2');
song2.addEventListener('click',()=>{
   IsClicked= false;

 song3isclicked = false;
 song4isclicked = false;
 song5isclicked = false;
  song2isclicked=true;
})
let song3=document.getElementById('song3');
song3.addEventListener('click',()=>{
   IsClicked= false;
 song2isclicked = false;

 song4isclicked = false;
 song5isclicked = false;
  song3isclicked=true;
})
let song4=document.getElementById('song4');
song4.addEventListener('click',()=>{
   IsClicked= false;
 song2isclicked = false;
 song3isclicked = false;
 song5isclicked = false;
  song4isclicked=true;

})
let song5=document.getElementById('song5');
song5.addEventListener('click',()=>{
   IsClicked= false;
 song2isclicked = false;
 song3isclicked = false;
 song4isclicked = false;

  song5isclicked=true;
})


 function ringBell1(){
  audio2.load();
   audio2.play();
}



setInterval(() => {

  (() => {
    let array1 = JSON.parse(localStorage.getItem("time"));
    if (array1) {
      array1.forEach((element) => {
        if (new Date(element.alarminput) > new Date()) {
          
            element.timeToAlarm = new Date(element.alarminput) - new Date(); 
            
          
          setNewAlarm(element.timeToAlarm);
          
        }
      });
  
      localStorage.setItem("time", JSON.stringify(array1));
      updateTable(array1);
    }
  })();



  
}, 1000);


function ringBell() {
  audio.load();
  audio.play();
}


function enabled() {
  document.getElementById("setalarm").disabled = false;
}

let setAlarm = document.getElementById("setalarm");
let pauseAlarm = document.getElementById("pausealarm");
pauseAlarm.classList.add("d-none");
let snoozer = document.getElementById("snoozalarm");
snoozer.classList.add("d-none");
let digital = document.getElementById("digital");
let screenTime = document.getElementById("screenTime");

function deleteFromTable(btn) {
  let alarms = JSON.parse(localStorage.getItem("time"));
  let index = alarms.findIndex((x) => x.timeToAlarm == btn.id);
  alarms.splice(index, 1);
  localStorage.setItem("time", JSON.stringify(alarms));
  updateTable(alarms);
}

///........................Alarm Function......................../.
function alarmset() {
  // digital.classList.add('d-none')
  let alarminput = document.getElementById("alarm").value;
  let date = new Date(alarminput);
  let now = new Date();
  let timeToAlarm = date - now;
  let alarmName= document.getElementById('alarmName').value
  let obj = { alarminput, timeToAlarm , alarmName };
  if (localStorage.getItem("time") && timeToAlarm >= 0) {
    let previousentry = JSON.parse(localStorage.getItem("time"));
    previousentry.push(obj);
    localStorage.setItem("time", JSON.stringify(previousentry));
    updateTable(previousentry);
    setNewAlarm(timeToAlarm);
  } else {
    localStorage.setItem("time", JSON.stringify([obj]));
    updateTable([obj]);
    setNewAlarm(timeToAlarm);
  }
}

////.............................ms to Time Function................................./
function msToTime(s) {
  // Pad to 2 or 3 digits, default is 2
  function pad(n, z) {
    z = z || 2;
    return ("00" + n).slice(-z);
  }

  var ms = s % 1000;
  s = (s - ms) / 1000;
  var secs = s % 60;
  s = (s - secs) / 60;
  var mins = s % 60;
  var hrs = (s - mins) / 60;

  return pad(hrs) + ":" + pad(mins) + ":" + pad(secs);
}

//..........................................snoooooz function..................................

function snoozAlarm() {
  
  let previousentry = JSON.parse(localStorage.getItem("time"));  
  console.log(previousentry[0].alarminput)
  
  let model = document.getElementById('model');
  model.innerHTML= `<div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLongTitle">Modal title</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
      <h1> ${previousentry.find(
        (x) => x.alarminput === document.getElementById("alarm").value).alarmName}</h1>
      <h1> ${previousentry.find(
        (x) => x.alarminput === document.getElementById("alarm").value).alarminput}</h1>
        <label for="exampleInputEmail1">please enter snooz time</label>
          <input type="text" class="form-control" id="snoozPop" aria-describedby="emailHelp" onchange="" placeholder="snooz  time">
       
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" id='snoozSetter' onclick="snoozUpdate();" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>`


   
   }
   function snoozUpdate(){
    let snoozInputTime = document.getElementById('snoozPop').value
    // let convert= msToTime(snoozInputTime)
    // console.log(convert)
    // clearInterval(interval)
    audio.pause();
    snoozInputTime= snoozInputTime * 1000;
   interval = setInterval(() => {
     ringBell()
     console.log('snooz bell is ringing')
    }, snoozInputTime);

    
    
  }

   

  document.getElementById("imgclock").classList.add("d-none");

  audio.pause();
  pauseAlarm.classList.add("d-none");
  snoozer.classList.add("d-none");

  //clearInterval(interval);
  // interval = setInterval(() => {
  //   ringBell();
  //   //   let digital = document.getElementById("digital");
  //   // digital.innerHTML = localStorage.getItem("time");
  //   document.getElementById("imgclock").classList.remove("d-none");
  //   pauseAlarm.classList.remove("d-none");
  //   snoozer.classList.remove("d-none");
  //   setAlarm.classList.remove("d-none");
  // }, 10000);

/////////////////////......................stop function..............................
pauseAlarm.addEventListener("click", stopAlarm);
function stopAlarm() {
  // snoozUpdate()
  
  clearInterval(interval);
  audio.pause();
  audio2.pause();
  audio3.pause();
  audio4.pause();
  audio5.pause();
  audio6.pause();
  location.reload();
  console.log("alarm paused");
  document.getElementById("imgclock").classList.add("d-none");
  updateTable(JSON.parse(localStorage.getItem("time")));
  digital.classList.add('d-none')
}

function updateTable(array) {
  // console.log(array)
  let str = ``;
  array.forEach(function (objects, index) {


    str += `
   <tr>
     <th scope="row"> ${index + 1}</th>
     <td>${objects.alarmName}</td>
     <td>${objects.alarminput}</td>
     <td>${msToTime(objects.timeToAlarm)}</td>
     <td> ${
       new Date(objects.alarminput) > new Date() ? "Pending" : "Expired"
     } </td>
     <td><button type="button" id=${
       objects.timeToAlarm
     } onClick="deleteFromTable(this)" class="btn btn-primary">Delete</button> </td>
   </tr> 
  `;
  });
  let table = document.getElementById("table");
  table.innerHTML = str;
}


function setNewAlarm(newTime) {
  
  // console.log(previousentry.alarminput)
  setTimeout(() => {
    let previousentry = JSON.parse(localStorage.getItem("time"));  
    if( IsClicked === true){
      audio2.load();
      audio2.play();
      console.log('wow')
    } else if(song2isclicked){
                 audio3.load();
                 audio3.play();
    } else if(song3isclicked===true){
               audio4.load();
               audio4.play();
    } else if(song4isclicked===true){
      audio5.load();
      audio5.play();
}   else if(song4isclicked===true){
  audio5.load();
  audio5.play();
} else if(song5isclicked===true){
  audio6.load();
  audio6.play();
}
    else{
      ringBell();
    }
    
    
    $('head').append('<link rel="stylesheet" type="text/css" href="alarm.css">');
    
    digital.innerHTML = previousentry.find(
      (x) => x.timeToAlarm === newTime).alarminput;
      // console.log(    digital.innerHTML = previousentry.find(
      //   (x) => x.timeToAlarm === newTime).alarminput)
    pauseAlarm.classList.remove("d-none");
    snoozer.classList.remove("d-none");
    document.getElementById("imgclock").classList.remove("d-none");
  }, newTime);
}


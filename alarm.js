var audio = new Audio("file_example_MP3_1MG.mp3");
var audio1 = new Audio("Alarm-Fast-A1.mp3");
let interval = null;

console.log(audio);

function ringBell() {
  audio1.pause();
  audio.load();
  audio.play();
}
function ringBell1() {
  audio1.load();
  audio1.play();
}

function enabled() {
  document.getElementById("setalarm").disabled = false;
}

let setAlarm = document.getElementById("setalarm");
let pauseAlarm = document.getElementById("pausealarm");
pauseAlarm.classList.add("d-none");
let snoozer = document.getElementById("snoozalarm");
snoozer.classList.add("d-none");
let alarminput = "";





///........................Alarm Function......................../.
function alarmset() {
  //setAlarm.classList.add('d-none')
  /////////////////////////....................initiating vars.........................
  alarminput = document.getElementById("alarm").value;
  let date = new Date(alarminput);
  console.log(date);
  now = new Date();
  console.log(now);
  let timeToAlarm = date - now;
  ////..........................................count down clock........................../
  let digital = document.getElementById("digital");
  digital.innerHTML = msToTime(timeToAlarm);

  //clearInterval(interval)
  interval = setInterval(() => {
    timeToAlarm = timeToAlarm - 1000;
    digital.innerHTML = msToTime(timeToAlarm);
  }, 1000);
  let table = document.getElementById("table");

  let obj = { alarminput, timeToAlarm };

  ////.......................if condition in alarm function............/////////
  if (localStorage.getItem("time")) {
    let previousentry = JSON.parse(localStorage.getItem("time"));
    previousentry.push(obj);
    localStorage.setItem("time", JSON.stringify(previousentry));
    let str = ``;
     previousentry.forEach(function (objects, index) {
     
      console.log(objects.timeToAlarm)
      str += `  
   
     <tr>
       <th scope="row"> ${index+1}</th>
       <td>${objects.alarminput}</td>
       <td>${objects.timeToAlarm}</td>
       <td>@mdo</td>
     </tr>
     
    `;
      table.innerHTML = str;
    });
  } else {
    localStorage.setItem("time", JSON.stringify([obj]));
    let FirstEntry =  JSON.parse(localStorage.getItem("time"));
    let str1=``
    FirstEntry.forEach(function (objects, index) {
     
      console.log(objects.timeToAlarm)
      str1 += `  
   
     <tr>
       <th scope="row"> ${index+1}</th>
       <td>${objects.alarminput}</td>
       <td>${objects.timeToAlarm}</td>
       <td>@mdo</td>
     </tr>
     
    `;
      table.innerHTML = str1;
    });
    
    
    // let FirstEntry=  localStorage.getItem('time')
    // table.innerHTML=FirstEntry;



  }

  // let loop = previousentry.forEach(objects => {
  //       console.log(objects) ;

  //     });

  //console.log(msToTime(timeToAlarm), msToTime(timeToAlarm - 1000));
 
  if (timeToAlarm >= 0) {
    setTimeout(() => {
      console.log("ring1 is ringing");
      ringBell1();
    }, timeToAlarm - 5000);

    setTimeout(() => {
      console.log("ringing");
      ringBell();
      let digital = document.getElementById("digital");
  digital.innerHTML = localStorage.getItem("time");
      pauseAlarm.classList.remove("d-none");
      snoozer.classList.remove("d-none");
      document.getElementById("imgclock").classList.remove("d-none");
    }, timeToAlarm);
  }
  //      if(timeToAlarm= timeToAlarm+40000){
  //         setInterval(() => {
  //             ringBell1();
  //         },  40000);
  //  }
  //   if(timeToAlarm<5000){

  //   }
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


  //......................................snoooooz function................................................
function snoozAlarm() {
  document.getElementById("imgclock").classList.add("d-none");
  
  audio.pause();
  pauseAlarm.classList.add("d-none");
  snoozer.classList.add("d-none");

  clearInterval(interval);
  interval = setInterval(() => {
    ringBell();
    let digital = document.getElementById("digital");
  digital.innerHTML = localStorage.getItem("time");
    document.getElementById("imgclock").classList.remove("d-none");
    pauseAlarm.classList.remove("d-none");
    snoozer.classList.remove("d-none");
    setAlarm.classList.remove("d-none");
  }, 10000);
}
/////////////////////......................stop function..............................
pauseAlarm.addEventListener("click", stopAlarm);
function stopAlarm() {
  clearInterval(interval);
  audio.pause();
  console.log("alarm paused");
  document.getElementById("imgclock").classList.add("d-none");
}

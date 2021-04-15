// Copyright (c) 2019 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
Real time Object Detection using objectDetector
=== */

let objectDetector;
let status;
let objects = [];
let canvas, ctx;
const width = 640;
const height = 420;
var link;
let result;


function imageUpload(files) {
    img = new Image();
    img.src = URL.createObjectURL(files[0]);
    link = img.src
    img.width =width;
    img.height = height;
    let prevImg = document.createElement("IMG");
    prevImg.src = link;
    prevImg.style.display = "block";
    document.querySelector('.menu').append(prevImg);
    make();
}
// async function make() 
async function make() {
    objectDetector = await ml5.objectDetector('cocossd', startDetecting)

  }

// when the dom is loaded, call make();
window.addEventListener('DOMContentLoaded', function () {
    if(files=true){
    }else{
        imageUpload(files);
    }
    
});

function startDetecting() {
  detect();
}

function detect() {
  objectDetector.detect(img, function (err, results) {
    if (err) {
      alert("can't identify the image :(")
      return
    }
    objects = results;

    if (objects) {
      //returns result
      result=objects[0].label;
      let keyword=result.charAt(0).toUpperCase() + result.slice(1);
      let keyw = document.createElement("div");
      keyw.id ="keyword";
      keyw.innerHTML =keyword;
      document.querySelector('.menu').append(keyw);
      // document.getElementById("keyword").innerHTML = keyword;
      met();
    }
  });
}



function met(){
  console.log(result)
     const URL = "https://collectionapi.metmuseum.org/public/collection/v1/search?medium=Paintings&q="+result;
     let artworkURL;
     fetch(URL).then((response) => {
       return response.json();
     }).then((data) => {
       let artwork=data.objectIDs[Math.floor(Math.random() * data.objectIDs.length)]; 
       artworkURL = "https://collectionapi.metmuseum.org/public/collection/v1/objects/" + artwork;
       //fetch api for artwork
       fetch(artworkURL).then((response) => {
        return response.json();
      }).then((artworkData) => {
        let imgLink = artworkData.primaryImageSmall;
        let period =artworkData.period;
        let medium=artworkData.medium;

        // document.getElementById("metResult").src = imgLink ;

        let metResult = document.createElement("IMG");
        metResult.src = imgLink ;
        document.querySelector('.menu').append(metResult);

        let metInfo= document.createElement("div");
        metInfo.id ="title";
        metInfo.innerHTML =artworkData.title + ", "+ artworkData.artistDisplayName+ "<br>"+period+" "+ medium+ "<a style='font-style: italic;color:#CECECE;' href='"+artworkData.objectURL+"'> Learn More</a>"  ;
        document.querySelector('.menu').append(metInfo);
      });

     });
}

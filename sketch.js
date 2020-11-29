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
    document.getElementById("preview").src = link;
    document.getElementById("preview").style.display = "block";
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
      document.getElementById("keyword").innerHTML = "Unidentified";
      return
    }
    objects = results;

    if (objects) {
      //returns result
      result=objects[0].label;
      let keyword=result.charAt(0).toUpperCase() + result.slice(1);
      document.getElementById("keyword").innerHTML = keyword;
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
       console.log(artworkURL)
       //fetch api for artwork
       fetch(artworkURL).then((response) => {
        return response.json();
      }).then((artworkData) => {
        let imgLink = artworkData.primaryImageSmall;
        document.getElementById("metResult").src = imgLink;
        document.getElementById("title").innerHTML =artworkData.title;
        document.getElementById("artist").innerHTML =artworkData.artistDisplayName;
        let period =artworkData.period;
        let medium=artworkData.medium;
        document.getElementById("info").innerHTML = period+"<br>"+medium;
        document.getElementById("metLink").href = artworkData.objectURL;
        document.getElementById("metLink").innerHTML = "Learn More";

      });

     });
}

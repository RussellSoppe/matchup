'use strict';

import { shapesthemearray } from './themes/shapes/shapes.js';
import { birdsthemearray } from './themes/birds/birds.js';
import { starwarsarray } from './themes/starwars/starwars.js';
import { disneyprincessarray } from './themes/disneyprincess/disneyprincess.js';

const numbersthemearray = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16];


// used in onSpin
let player = document.getElementById("currentplayer");
let p1score = document.getElementById("playeronescore");
let p2score = document.getElementById("playertwoscore");
let tracker1 = undefined;
let value1 = "";
let value2 = "";
let count = 1;
let player1score = 0;
let player2score = 0;

// used to set a default theme
let theme = numbersthemearray;



// Action for when player clicks a card
const onSpin = (id1, id2)=>{
  let current = document.getElementById(id1);
  // current.className = "flipper";
  // count = count + 1;
  const sayThis = (words)=>{
    let announcement = document.getElementById("announcements");
    announcement.innerHTML = words;     
  };

  switch(count){

    case 1:
      tracker1 = id1;
      value1 = document.getElementById(id2).innerHTML;
      current.className = "flipper";
      count = count + 1;
      break;

    case 2:
      current.className = "flipper";
      count = count + 1;
      //<<<<<<<<Check for Match>>>>>>>>>
      let track = tracker1;
      value2 = document.getElementById(id2).innerHTML;

      const nextPlayer = ()=>{
        document.getElementById(id1).className = "flipback";
        document.getElementById(track).className = "flipback";
        value1 = "";
        value2 = "";
        tracker1 = undefined;
        // Set Next Player
        if(player.innerHTML === "Player 1"){    
          player.innerHTML = "Player 2"
        }else{
          player.innerHTML = "Player 1";
        };
      };

      if (value1 !== value2){
        // console.log("values do not equal");
        setTimeout(nextPlayer, 3500);
        setTimeout(()=> sayThis("No match found, next players turn."), 500);
        setTimeout(()=> sayThis(""), 3500);
      };

    // Set Player 1 Score
      if(value1===value2 && player.innerHTML === "Player 1"){
          // console.log("player 1 scores!");
          player1score  = player1score +1;
          p1score.innerHTML = player1score;
          value1 = "";
          value2 = "";
          tracker1 = undefined;
          setTimeout(()=> sayThis("Player 1 found a Match! Take another turn."), 500);
          setTimeout(()=> sayThis(""), 3500);
      };

    // Set Player 2 Score
      if(value1===value2 && player.innerHTML === "Player 2"){
          // console.log("player 2 scores!");
          player2score  = player2score +1;
          p2score.innerHTML = player2score;
          value1 = "";
          value2 = "";
          tracker1 = undefined;
          setTimeout(()=> sayThis("Player 2 found a Match! Take another turn."), 500);
          setTimeout(()=> sayThis(""), 3500);
      };

    // Reset Turn Counter and delay next click
      const delayClick = ()=>{
        count = 1;
      };

      setTimeout(()=>delayClick(), 3500);

      break;

    case 3:
      sayThis("Please wait :)");
      break;

    default:
      alert("something went wrong");
  };
    
};



// Setting Theme
let numbers = document.getElementById("numbersdiv");
let shapes = document.getElementById("shapesdiv");
let birds = document.getElementById("birdsdiv");
let starwars = document.getElementById("starwarsdiv");
let disneyp = document.getElementById("dispdiv");

const chooseTheme = (themearray)=>{
  theme = themearray;
  document.getElementById("choosetheme").className="none";
  document.getElementById("choosesize").className="chooseboardsizemaindiv";
};

numbers.addEventListener("click", ()=>chooseTheme(numbersthemearray));
shapes.addEventListener("click", ()=>chooseTheme(shapesthemearray));
birds.addEventListener("click", ()=>chooseTheme(birdsthemearray));
starwars.addEventListener("click", ()=>chooseTheme(starwarsarray));
disneyp.addEventListener("click", ()=>chooseTheme(disneyprincessarray));


// Setting Board Size
let eightcards = document.getElementById("choosesize8");
let sixteencards = document.getElementById("choosesize16");
let thirtytwocards = document.getElementById("choosesize32");


const createBoard = (boardsize, array)=>{
  
  let newtheme = [];
  let usetheme = [];

  for(let i = 0; i<=(boardsize/2)- 1; i++){
   newtheme.push(array[i]);
   newtheme.push(array[i]);
   // console.log(newtheme);
  };

  for (let i = boardsize; i>=1; i--){
   let random = Math.floor(Math.random() * i) + 1;
   usetheme.push(newtheme[random-1]);
   newtheme.splice(random-1, 1);
  }

  let container = document.getElementById("match-container");

  for(let i = 1; i<= boardsize; i++){

    let d = document.createElement("div");
    d.className = `match-outer-item${boardsize}`;
    
    let f = document.createElement("div");
    f.id = `f${i}`;
    f.className = "carditem";
    f.addEventListener("click", ()=>onSpin(`f${i}`, `b${i}`));


    let front = document.createElement("div");
    front.className = `front${boardsize}`;

    let back = document.createElement("div");
    back.className = `back${boardsize}`;
    back.id =  `b${i}`;
    // this only prints up to 16, it is not repeating so will need to write a pattern for this to repeat.
    back.innerHTML = usetheme[i-1];
    f.appendChild(front);
    f.appendChild(back);

    d.appendChild(f);

    container.appendChild(d);

    }

  document.getElementById("match-container").id=`match-container${boardsize}`;
  document.getElementById("choosesize").className="none";
  document.getElementById("maingameboarddiv").className="maingameboarddiv";

}

eightcards.addEventListener("click", ()=>createBoard(8, theme));
sixteencards.addEventListener("click", ()=>createBoard(16, theme));
thirtytwocards.addEventListener("click", ()=>createBoard(32, theme));


// Restart
const resetGame = ()=>{
  // resets buttons to choose theme
  // document.getElementById("choosetheme").className="choosethememaindiv";
  // resets board back to empty div ready to be populated
  // document.getElementById("match-container").id="match-container";
  // values to be reset to original values
  // document.getElementById("maingameboarddiv").className="none";
  
  // count = 0;
  // player1score = 0;
  // player2score = 0;
  // theme = numbersthemearray;
  document.location.reload();
};

document.getElementById("resetbutton").addEventListener("click", ()=>resetGame());

// document.getElementById("news").childNodes[0].className = "foo";

// var toAdd = document.createDocumentFragment();
// for(var i=0; i < 11; i++){
//    var newDiv = document.createElement('div');
//    newDiv.id = 'r'+i;
//    newDiv.innerHMTL ="hello";
//    newDiv.className = 'ansbox';
//    toAdd.appendChild(newDiv);
//    console.log("hell");
// }

// document.getElementById('choosesize8').appendChild(toAdd);
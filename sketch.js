var dog,sadDog,happyDog, database;
var foodS,foodStock,feedtimeS;
var addFood,addFood2;
var foodObj;
var feed,lastFed;

//create feed and lastFed variable here


function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();
///////////////////////////////////////////////////////////////////////////////////////
  foodStock=database.ref('Food');//////////////////////
  foodStock.on("value",readStock);///////////////////
  //////////////////////////////////////////////////////////////////////
  /////////////////////
  feedtimeS=database.ref('FeedTime');
  feedtimeS.on("value",readTime);
  ///////////////////////////////////////////////////////////////////////////////
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

  addFood2=createButton("Feed the Dog");
  addFood2.position(700,95);
  addFood2.mousePressed(feedDog);

}

function draw() {
  background("lime");
  foodObj.display();
  stroke("red")
  fill("red")
  textSize(30)

  //write code to read fedtime value from the database 
  FeedTime = database.ref('FeedTime')
  FeedTime.on("value",function(data){
    lastFed = data.val();
  })
 
  if(lastFed >= 12){
    text("Last feed :" + lastFed%12 + "PM",100,30)
  }

  else if(lastFed == 0){
    text("Last feed : 12 AM",100,30)
  }
  else{
    text("Last feed :" + lastFed + "AM",100,30)
  }
  //write code to display text lastFed time here
// text("The dog was last fed at : ",100,100)
//  timer()
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  
  foodObj.updateFoodStock(foodS);
}

function readTime(data){
  feedtimeS=data.val();
  

}

function feedDog(){
  dog.addImage(happyDog);
  var foodStock = foodObj.getFoodStock();
  // feedtimeS ++
  if(foodStock<=0){
    foodObj.updateFoodStock(foodStock*0)
  }
  else{
    foodObj.updateFoodStock(foodStock-1)
  }
// foodS -- ;

database.ref('/').update(
  {
  Food:foodObj.getFoodStock(),

  FeedTime:hour()
})



}






//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}

// async function hourer(){
//   var res = await fetch("https://worldtimeapi.org/api/timezone/Asia/Kolkata")
//   var resJson =await res.json();
//   var datetime=resJson.datetime;
//  var hour =  datetime.slice(11,16)
//  console.log(hour) 
// }

// function timer(){
//   fill("blue");
//   strokeWeight(5)
//   stroke("white");
//   textSize(35);
  
//   // if(lastFed>=12){
//     if(lastFed<=12){
//       text("Last Fed at : 12 PM",100,100)
//     }
//     if(lastFed===13){
//       text("Last Fed at : 1 PM",100,100)
//     }
//     if(lastFed===14){
//       text("Last Fed at : 2 PM",100,100)
//     }
//     if(lastFed===15){
//       text("Last Fed at : 3 PM",100,100)
//     }
//     if(lastFed===16){
//       text("Last Fed at : 4 PM",100,100)
//     }
//     if(lastFed===17){
//       text("Last Fed at : 5 PM",100,100)
//     }
//     if(lastFed===18){
//       text("Last Fed at : 6 PM",100,100)
//     }
//     if(lastFed===19){
//       text("Last Fed at : 7 PM",100,100)
//     }
//     if(lastFed===20){
//       text("Last Fed at : 8 PM",100,100)
//     }
//     if(lastFed===21){
//       text("Last Fed at : 9 PM",100,100)
//     }
//     if(lastFed===22){
//       text("Last Fed at : 10 PM",100,100)
//     }
//     if(lastFed===23){
//       text("Last Fed at : 11 PM",100,100)
//     }
//     if(lastFed===24){
//       text("Last Fed at : 12 AM",100,100)
//     }
//   // }
//     else{
//       text("AM or PM ? " ,50,100)
//     }
//     /////////////////////////////////////////////////


//     //////////////////////AAAAAAAAAAAAAAMMMMMMMMMMMMMMMMMMMMM//////


//     // if(lastFed<12){
//       if(lastFed===11){
//         text("Last Fed at : 11 AM",100,100)
//       }
//       if(lastFed===10){
//         text("Last Fed at : 10 AM",100,100)
//       }
//       if(lastFed===9){
//         text("Last Fed at : 9 AM",100,100)
//       }
//       if(lastFed===8){
//         text("Last Fed at : 8 AM",100,100)
//       }
//       if(lastFed===7){
//         text("Last Fed at : 7 AM",100,100)
//       }
//       if(lastFed===6){
//         text("Last Fed at : 6 AM",100,100)
//       }
//       if(lastFed===5){
//         text("Last Fed at : 5 AM",100,100)
//       }
//       if(lastFed===4){
//         text("Last Fed at : 4 AM",100,100)
//       }
//       if(lastFed===3){
//         text("Last Fed at : 3 AM",100,100)
//       }
//       if(lastFed===2){
//         text("Last Fed at : 2 AM",100,100)
//       }
//       if(lastFed===1){
//         text("Last Fed at : 1 AM",100,100)
//       }     
    
  
//       else{
//        text("AM or PM ?",50,100)
//       }


      // if(lastFed>16 && lastFed<17){
        // text("Last Fed at : 1 AM",100,100)
      // }/
    // }
      //
    //  }
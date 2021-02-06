//Create variables here
var dog, happyDog, database, foodS, foodStock;
var dogImg;

function preload()
{
  dogImg = loadImage("images/dogImg.png");
  happyDog = loadImage("images/dogImg1.png");
	//load images here
}

function setup() 
{
  database = firebase.database();

  foodS = 21;

  createCanvas(500, 500);
  dog = createSprite(width/2, height/2);
  dog.addImage(happyDog);
  dog.addImage(dogImg);

  dog.scale = 0.2;

  foodStock = database.ref('food');
  foodStock.on("value", readStock, showError);

}


function draw() {  
  background(46,139,87);

//  foodS = 21;

    if (keyWentDown(UP_ARROW)) 
    {
      writeStock(foodS);
      dog.addImage(happyDog);
    }
    if (keyWentUp(UP_ARROW)) {
      dog.addImage(dogImg);
    }

  drawSprites();
  fill("white");
  textSize(20);
  text("Use Up Arrow to feed Pillu", 100, 100);
  text("Milk remaining : " + foodS, 100, height-35);

  //add styles here

}

function readStock(data) 
{
  foodS = data.val();
}
function writeStock(x) 
{
  if (x <= 0)
  {
    x = 0;
  }
  else {
    x = x-1;
  }

  database.ref('/').set({
    food : x
  })
}

function showError() 
{
  console.log("Error in the code");
}


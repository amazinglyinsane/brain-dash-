var PLAY = 1;
var END = 0;
var gameState = PLAY;

var dracula, dracula_riding;
var invisibleGround;

var farmersGroup, farmer, farmer2;
var foodImage;

var score=0;

var gameOver, restart;
var foodCollection =0;

function preload(){

    dracula_riding= loadAnimation("dracula.png", "dracula-2.png");

    foodImage = loadImage("brains .png");

    farmer = loadImage("farmer-1.png");
    farmer2 = loadImage("farmer-2.png")

    gameOverImg = loadImage("gameover.png");
    restartImg = loadImage("restart.png");

    bgImg = loadImage("castle .png");
}

function setup() {
    createCanvas(windowWidth, windowHeight);

    dracula = createSprite(90,height-100,20,50);
    dracula.addAnimation("running", dracula_riding);
    dracula.scale = 0.3;

    gameOver = createSprite(width/2,height/2-100);
    gameOver.addImage(gameOverImg);
    
    restart = createSprite(width/2,height/2);
    restart.addImage(restartImg);
    
    gameOver.scale = 0.5;
    restart.scale = 0.5;

  gameOver.visible = false;
 restart.visible = false;

 invisibleGround = createSprite(200,height-35,400,10);
  invisibleGround.visible = false;

 foodGroup = new Group();
  farmersGroup = new Group();
  
  score = 0;

}

function draw() {
 
    //dracula.debug = true;
    background(bgImg);
    background.velocityX = -(6 + 3*score/100);
    
    textSize(20);
    fill("red");
   text("Score: "+ score, width-370,50);

    textSize(40);
    fill("pink");
    text("Brain Dash!!!", width - 1350, 50)
    
    textSize(20);
    fill("red");
   text("Food Count: "+ foodCollection,width-700,50);

  dracula.collide(invisibleGround);

  if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);
  
    if(keyDown("space") && dracula.y >= 159) {
      dracula.velocityY = -12;
    }
    
    if (farmersGroup.isTouching(dracula)) {
      farmersGroup.destroyEach();
    }

  dracula.velocityY = dracula.velocityY + 0.8;

  if(farmersGroup.isTouching(dracula)){
    gameState = END;
}

  if (foodGroup.isTouching(dracula)) {
    food.destroy();
    foodCollection=foodCollection + 5;
  }
  
else if (gameState === END) {

  gameOver.visible = true;
  restart.visible = true;
  
  background.velocityX = 0;
  trex.velocityY = 0;
  farmersGroup.setVelocityXEach(0);
  foodGroup.setVelocityXEach(0);
 
  farmersGroup.setLifetimeEach(-1);
  foodGroup.setLifetimeEach(-1);
  
  if(mousePressedOver(restart)) {
    reset();
  }
}
    drawSprites();
    spawnFarmers();
    createFood();

  }
  
  function spawnFarmers() {
    if(frameCount % 100 === 0) {
      var farmers = createSprite(width,height-100,10,40);
      //farmers.debug = true;
      farmers.velocityX = -(6 + 3*score/100);
      
    
      var rand = Math.round(random(1,2));
      switch(rand) {
        case 1: farmers.addImage(farmer);
        farmers.scale = 0.5;
                break;
        case 2: farmers.addImage(farmer2);
        farmers.scale = 0.07;
                break;
        default: break;
      }

      farmers.lifetime = 300;
    
      farmersGroup.add(farmers);

    }
  }

  function createFood() {
    if (World.frameCount % 200 == 0) {
    var food = createSprite(width,Math.round(random(height-200, height-350)), 10, 10);
    food.addImage(foodImage);
    food.scale=0.15;
    food.velocityX = -(6 + 3*score/100);
    food.lifetime = 200;
    foodGroup.add(food);
    }
  }
    
  function reset(){ 
    gameState = PLAY;
    gameOver.visible = false;
    restart.visible = false;
    
    foodGroup.destroyEach()
    farmersGroup.destroyEach()
        
    score = 0;
}

}

    

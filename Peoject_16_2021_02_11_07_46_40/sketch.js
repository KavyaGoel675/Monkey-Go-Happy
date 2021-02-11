var monkey , monkey_running, banana ,bananaImage;
var obstacle,obstacleImage;
var foodGroup, obstacleGroup
var score,survivalTime;
var PLAY=1;
var END=0;
var gameState=PLAY;

function preload() {
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  monkeycollide=loadImage("sprite_1.png");
 
}



function setup() {
  
  foodGroup=createGroup();
  obstacleGroup=createGroup();
  TimeGroup=createGroup();
  
  monkey=createSprite(80,315,20,20);
  monkey.addAnimation('moving',monkey_running);
  monkey.scale=0.15;
  
  ground=createSprite(400,350,900,10);
  ground.velocityX=-4;
  ground.X=ground.width/2;  
  
  score=0;
  survivalTime=0;
  
}


function draw() {
  background(255);
  
  stroke("black");
  fill("black");
  textSize(20);
  text("Survival Time:"+ survivalTime, 100,50);
  

  stroke("black");
  fill("black");
  textSize(20);
  text("Score:"+score,30,100);
  
  
  monkey.collide(ground);
  
  if(gameState===PLAY){
    monkey.changeAnimation("running",monkey_running);
    survivalTime=0;
    survivalTime=Math.ceil(frameCount/frameRate());
    
    monkey.setCollider("circle",10,150,120);
    
    if(ground.x<0){
    ground.x=ground.width/2;
    }
    
    if(keyDown("SPACE")){
    monkey.velocityY=-10;
    }
    
    if(foodGroup.isTouching(monkey)){
      foodGroup.destroyEach();
      score=score+1
    }
    
    monkey.velocityY=monkey.velocityY+0.9;
    
    obstacleGroup.lifeTime=-1;
    
    food();
    obstacles();
    
    if(obstacleGroup.isTouching(monkey)){
      gameState=END;
    }
  }
  
  if(gameState===END){
    obstacleGroup.destroyEach();
    foodGroup.destroyEach();
    
    monkey.velocityX=0;
    ground.velocityX=0;
    monkey.changeAnimation(stop,monkeycollide)
    
    stroke("red");
    fill("red");
    textSize(30);
    text("Game Over",100,150);

    stroke("black");
    fill("black");
    textSize(25);
    text("Press the r key to restart ",50,200);
    
    if(keyDown("r")){
      reset();
    }
  }
  drawSprites();
}

function food() {
  if(World.frameCount%80 === 0){
    banana=createSprite(400,200,20,20);
    banana.scale=0.1;
    banana.addImage(bananaImage);
    banana.y=Math.round(random(120,200));
    banana.velocityX=-7;
    banana.setLifeTime=-1;
    foodGroup.add(banana);
  }
}

function obstacles() {
  if(frameCount% 150 === 0){
    obstacle=createSprite(350,325,10,10);
    obstacle.addImage(obstacleImage);
    obstacle.velocityX=-3;
    obstacle.setLifeTime=-1
    obstacle.scale=0.1
    obstacleGroup.add(obstacle);
  }
}
function reset(){
  gameState=PLAY;

  
  score=0;
 survivalTime=0;
}
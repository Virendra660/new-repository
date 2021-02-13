var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var bananasGroup, obstaclesGroup
var score;
var survivalTime=0;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(400, 400);
  
  monkey=createSprite(80,315,20,20);
  monkey.addAnimation("running",monkey_running);
  monkey.scale=0.1;

 ground=createSprite(400,350,900,10);
 ground.x=ground.width/2;
  
 obstaclesGroup = createGroup();
 bananasGroup = createGroup(); 
  
 monkey.setCollider("rectangle",0,0,100,monkey.height);
  monkey.debug = false
  
  survivalTime=0;
}


function draw() {
background(255);

  
  
  
 if(gameState===PLAY){
   
   survivalTime = survivalTime + Math.round(getFrameRate()/60);
   survivalTime=Math.ceil(frameCount/frameRate())
    ground.velocityX=-4;
   if (ground.x < 0){
      ground.x = ground.width/2;
    }   
   if(keyDown("space")&& monkey.y>=314) {
        monkey.velocityY = -15;
    }
  
  monkey.velocityY=monkey.velocityY+0.8;
   make_bananas();
 make_obstacles();
   
    if(obstaclesGroup.isTouching(monkey)){
      gameState=END;
    }
   
   
   
 } else if (gameState === END) {
   ground.velocityX = 0;
  monkey.velocityY = 0;
   
  obstaclesGroup.setLifetimeEach(-1);
    bananasGroup.setLifetimeEach(-1);
     
     obstaclesGroup.setVelocityXEach(0);
     bananasGroup.setVelocityXEach(0); 
   
 
 }
    
  
  
  
 
monkey.collide(ground);
   
  //console.log(monkey.y);
drawSprites();
  
stroke("black");
fill("black")
textSize(20);  
text("Survival Time:"+survivalTime,100,50);
 

}

function make_bananas() {
 
  if (frameCount % 60 === 0) {
     banana = createSprite(500,170,40,10);
     banana.addImage( bananaImage);
     banana.scale = 0.1;
     banana.velocityX = -3;
    
     //assign lifetime to the variable
     banana.lifetime = 200;
    
    bananasGroup.add(banana);
    }
}

function make_obstacles(){
if (frameCount % 100 === 0){
  obstacle=createSprite(500,327,20,20);
  obstacle.addAnimation("oImage",obstacleImage);
  obstacle.scale=0.1;
  obstacle.velocityX=-3;
  obstacle.lifetime = 200;
  
  obstaclesGroup.add(obstacle);
 }
}
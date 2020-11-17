var trex,trex_animation,groundimage,invisibleground
function preload(){
  trex_animation=loadAnimation("trex1.png","trex3.png","trex4.png")
  groundimage=loadImage("ground2.png")
  obstacle1=loadImage("obstacle1.png")
  obstacle2=loadImage("obstacle2.png")
  obstacle3=loadImage("obstacle3.png")
  obstacle4=loadImage("obstacle4.png")
  obstacle5=loadImage("obstacle5.png")
  obstacle6=loadImage("obstacle6.png")
  cloudimage=loadImage("cloud.png")
  gameoverimage=loadImage("gameOver.png")
  restartimage=loadImage("restart.png")
}
function setup() {
  createCanvas(500, 400);
  trex=createSprite(60,380,20,20);
  trex.addAnimation("trex",trex_animation);
  trex.scale=0.5;
  
  ground=createSprite(200,380,300,10);
  ground.addImage("ground",groundimage);
  ground.velocityX=-4;
  
  invisibleground=createSprite(60,390,50,10);
  invisibleground.visible=false;
  
  ObstaclesGroup=createGroup()
  CloudsGroup=createGroup()
 gameOver = createSprite(200,300);
 restart = createSprite(200,340);
gameOver.addImage(gameoverimage);
gameOver.scale = 0.5;
restart.addImage(restartimage);
restart.scale = 0.5;

gameOver.visible = false;
restart.visible = false;
}
var count=0;
var PLAY=0
var END=1
var gameState=PLAY

function draw() {
  
   //set background to white
  background("white");
  //display score
  text("Score: "+ count, 250, 100);
  console.log(gameState);
  
  if(gameState === PLAY){
    //move the ground
    ground.velocityX = -(6 + 3*count/100);
    //scoring
    count  += Math.round(World.frameCount/100);
    
    
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
     //jump when the space key is pressed
    if(keyDown("space") && trex.y >= 300){
      trex.velocityY = -12 ;
      
    }
  
    //add gravity
    trex.velocityY = trex.velocityY + 0.8;
    
    //spawn the clouds
    spawnClouds();
  
    //spawn obstacles
    spawnObstacles();
    
    //End the game when trex is touching the obstacle
    if(ObstaclesGroup.isTouching(trex)){
      
      gameState = END;
      
    }
  }
  
  else if(gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    trex.velocityY = 0;
    ObstaclesGroup.setVelocityXEach(0);
    CloudsGroup.setVelocityXEach(0);
    
    //change the trex animation
    
    
    //set lifetime of the game objects so that they are never destroyed
    ObstaclesGroup.setLifetimeEach(-1);
    CloudsGroup.setLifetimeEach(-1);
    
    
  }
  
  if(mousePressedOver(restart)) {
   ObstaclesGroup.destroyEach();
   CloudsGroup.destroyEach();
   
   trex.setAnimation("trex");
   
   gameOver.visible=false;
   restart.visible=false;
   
   gameState=PLAY;
   count=0;
  }
  
  //console.log(trex.y);
  
  //stop trex from falling down
  trex.collide(invisibleground);
  
  drawSprites()
}
function spawnObstacles() {
  if(World.frameCount % 60 === 0) {
    var obstacle = createSprite(400,365,10,40);
    obstacle.velocityX = - 6 ;
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand){
        case 1:
        obstacle.addImage(obstacle1)
        break;
        case 2:
        obstacle.addImage(obstacle2)
        break;
        case 3:
        obstacle.addImage(obstacle3)
        break;
        case 4:
        obstacle.addImage(obstacle4)
        break;
        case 5:
        obstacle.addImage(obstacle5)
        break;
        case 6:
        obstacle.addImage(obstacle6)
        break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 70;
    //add each obstacle to the group
    ObstaclesGroup.add(obstacle);
  }
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (World.frameCount % 60 === 0) {
    var cloud = createSprite(400,320,40,10);
    cloud.y = Math.round(random(10,320));
    cloud.addImage(cloudimage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 134;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    CloudsGroup.add(cloud);
  }
}
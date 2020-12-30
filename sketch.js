
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var foodGroup, obstacleGroup
var survivalTime;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  monkey_collided = loadImage("sprite_1.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  
  foodGroup = new Group();
  obstacleGroup = new Group();

}



function setup() {
  createCanvas(400, 400);
  
 monkey = createSprite(50, 340, 20, 350);
 monkey.addAnimation("running", monkey_running);
 monkey.addAnimation("stop", monkey_collided)
 monkey.scale = 0.1;
  
 ground = createSprite(200, 375, 400, 75);
 ground.shapeColor = (rgb(139, 69, 19));
  
 grass = createSprite(200, 340, 800, 8);
 grass.velocityX = -1;
 grass.shapeColor = ("green");
 
 monkey.setCollider("circle", 0,0, 310);
  
 survivalTime = 0;

}


function draw() {
   
  background("lightblue");
  
  survivalTime = Math.ceil(frameCount/frameRate());
  text("Survival Time: "+survivalTime, 100, 50);
  
  if (keyDown("space") && monkey.y >= 200){
   monkey.velocityY = -15; 
  }
  
  if (grass.x < 0){
      grass.x = grass.width/2;
    }
  
  monkey.velocityY = monkey.velocityY + 0.8;
  
  monkey.collide(grass); 
  
  food();
  obstacle();
  
  if (monkey.isTouching(obstacleGroup)){
   
    monkey.changeAnimation("stop", monkey_collided);
    monkey.velocityY = 0;
    
    grass.velocityX = 0;
    obstacleGroup.setVelocityXEach(0);
    foodGroup.setVelocityXEach(0);
    
    obstacleGroup.setLifetimeEach(-1);
    foodGroup.setLifetimeEach(-1);
 }
  
  drawSprites();
  
}

function food(){
  if (frameCount%80 === 0){
  banana = createSprite(400, 120, 10, 10);
  banana.addImage("banana", bananaImage);
  banana.y = Math.round(random(120, 200));
  banana.scale = 0.05;
  banana.velocityX = -3;
  banana.lifetime = 140;
    
  foodGroup.add(banana);
    
  }
}

function obstacle(){
  if (frameCount%300 === 0){
  stone = createSprite(400, 320, 10, 10);
  stone.addImage("stone", obstacleImage);
  stone.scale = 0.15;
  stone.velocityX = -3;
  stone.lifetime = 140;
    
  obstacleGroup.add(stone);
    
  }
}




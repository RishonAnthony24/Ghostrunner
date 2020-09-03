var ghost,ghostImg;
var tower,towerImg;
var door,doorImg;
var doorsGroup;
var climber,climberImg,climberGroup;
var spookySound;
var invisibleblock,invisibleGroup;
var gameState="play";

function preload(){
  
  towerImg=loadImage("tower.png");
  ghostImg=loadImage("ghost-standing.png");
  doorImg=loadImage("door.png");
  climberImg=loadImage("climber.png");
  spookySound=loadSound("spooky.wav")
  
  
}






function setup(){
createCanvas(600, 600);
 tower=createSprite(300,300) ;
 tower.addImage("tower",towerImg);

 doorsGroup=new Group();
 climberGroup=new Group();
   invisibleGroup=new Group();

 ghost=createSprite(200,200);
 ghost.addImage("ghost",ghostImg);
 ghost.scale=0.5;

 
  
  
  
  
}







function draw(){
spookySound.play();
 
  if(gameState==="play"){
    if(keyDown("enter")){
      ghost.velocityY=-10;
      }
ghost.velocityY=ghost.velocityY+1;
    
    if(keyDown("right")){
         ghost.x=ghost.x+4;
 }

 if(keyDown("left")){
         ghost.x=ghost.x-4;
 }

    tower.velocityY=2;
    
     if(tower.y>600){
        tower.y=300;
    }
  spawnDoor();
  
  if(climberGroup.isTouching(ghost)){
    ghost.velocityY=0;
    
  }


  if(invisibleGroup.isTouching(ghost)||ghost.y>600){
    gameState="end";
    
  }    
    
    
  }
  else if(gameState==="end"){
  tower.destroy();
    spookySound.stop();
    doorsGroup.destroyEach();
    climberGroup.destroyEach();
    invisibleGroup.destroyEach();
    background("black");
    textSize(40);
    fill("yellow");
    stroke("white");
    text("GAMEOVER",250,300);
  }
  

    
   
  
  
  
  
  
 
  drawSprites();
}


function spawnDoor(){
    if(World.frameCount%230===0){
        door=createSprite(200,-50);
        door.addImage("door",doorImg);
        door.x=Math.round(random(100,400));
        door.velocityY=2;
        door.lifetime=600;
        doorsGroup.add(door);

        climber=createSprite(200,10);
        climber.addImage("climber",climberImg);
        climber.x=door.x;
        climber.velocityY=2;
        climber.lifetime=600;
        climberGroup.add(climber);
 ghost.depth = door.depth+1;

        invisibleblock=createSprite(200,15);
      invisibleblock.width=climber.width;
      invisibleblock.height=2;
      invisibleblock.debug=true;
      invisibleblock.x=climber.x;
      invisibleblock.velocityY=2;
      invisibleblock.lifetime=600;
      invisibleGroup.add(invisibleblock);
    }
  
}
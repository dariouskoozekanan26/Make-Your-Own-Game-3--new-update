var spaceship,spaceshipImg;
var bg,bgImg;
var edges;
var bullet,bulletGroup;
var TIE,TIEImg,TIEGroup;
var laser,laserImg,laserGroup;
var blast,blastImg;
var Blast, BlastImg;
var button;
var gameState = 0;
var gameOver,gameOverImg;
var Score=0;

function preload(){
spaceshipImg=loadImage("X-WingFighter.png");
bgImg=loadImage("BG.png");
TIEImg=loadImage("TIEFighter.png");
laserImg=loadImage("laser.png");
blastImg=loadImage("Blast.png");
BlastImg=loadImage("Blast.png");
gameOverImg=loadImage("GameOver.png");
}

function setup() {
createCanvas(1300,650);

bg=createSprite(200,200,10,10);
bg.addImage("bg",bgImg);
bg.scale=5;
  
spaceship=createSprite(675,550,10,10);
spaceship.addImage("spaceship",spaceshipImg);
spaceship.scale=0.4;
spaceship.visible=false;

button=createButton("Play");
button.style('width','10%');
button.style('height','5%');
button.style('fonSize','x-large');
button.position(500,550);

gameOver=createSprite(600,325);
gameOver.addImage("gameOver",gameOverImg);
gameOver.visible=false;

edges=createEdgeSprites();

TIEGroup= new Group();
laserGroup= new Group();
bulletGroup= new Group();

spaceship.setCollider("circle",0,0,70);
//spaceship.debug=true;
}

function draw() {
background("bg");

button.mousePressed(function(){
gameState=1;
})

if (gameState === 1){
button.hide();
spaceship.visible=true;
spaceship.bounceOff(edges);
enemy();
bg.velocityY= 8;

if(bg.y>200){
bg.y=50;
}

if(keyDown("RIGHT_ARROW")){
spaceship.x += 6;
}

if(keyDown("LEFT_ARROW")){
spaceship.x -= 6;
}

if(keyDown("space")){
bullet=createSprite(spaceship.x,spaceship.y-30,5,100);
bullet.velocityY= -10;
bullet.shapeColor="red";
bullet.lifeTime=498;
bulletGroup.add(bullet);
}

if(laserGroup.isTouching(spaceship)){
blast=createSprite(spaceship.x,spaceship.y);
blast.addImage("blast",blastImg);
blast.lifetime=5;
alienGroup.destroyEach();
bulletGroup.destroyEach();
laserGroup.destroyEach();
gameState=2;
}

if(bulletGroup.isTouching(TIEGroup)){
TIEGroup.destroyEach();
Blast=createSprite(TIE.x,TIE.y);
Blast.addImage("Blast",BlastImg);
Blast.lifetime=5;
laser.destroy();
bulletGroup.destroyEach();
Score+=10;
console.log("abc");
}
}

drawSprites();

if(gameState === 0){
fill("white");
textSize(25);
text("SPACE INVADERS",470,20)
text("Press 'SPACE' to shoot",470,50);
text("Use 'RIGHT & LEFT' arrow keys to move right and left",280,80);
text("From a place far far away from your planet Lothal, there are some evils planning to destroy your sweet home… ",20,140);
text("You being the head of a very big space organisation on Lothal, had noticed that there are ",20,170);
text("some unknown ships found at the end of heliosphere",20,200)
text("After doing some research, your team has found out that they are aliens from an other planet Exegol ",20,230);
text("heading towards Lothal to destroy the living life here and then capture the planet",20,260);
text("You and your team have to destroy them so that you can save your planet",20,290);
text("Are you ready for this ??",20,320);
bg.velocityY=0;
}

if(Score === 300){
bg.velocityY=0;
spaceship.destroy();
TIEGroup.destroyEach();
bulletGroup.destroyEach();
laserGroup.destroyEach();
fill("red");
textSize(50);
text("You Win!!",500,325);
}

fill("white");
textSize(25);
text("Score="+ Score,10,20);
text("Reach the Score 300 to 'Win' the game",10,50);
}

function enemy(){
if(gamstate=1 && frameCount %100 === 0){
TIE=createSprite(random(spaceship.x,1000),random(20,spaceship.y-200));
TIE.addImage("TIE",TIEImg);
TIE.depth=bg.depth+1;
TIE.scale=0.5;
TIE.lifeTime=200;
TIEGroup.add(TIE);
laser=createSprite(TIE.x,TIE.y,10,10);
laser.addImage("laser",laserImg);
laser.velocityX=random(-20,-4);
laser.velocityY=18;
laser.scale=1.5;
laser.lifeTime=200;
laserGroup.add(laser);
}
}
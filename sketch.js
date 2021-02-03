var player,playerImage;
var enemy1,enemy1Image;
var enemy2,enemy2Image;
var enemy3,enemy3Image;
var obstaclesGroup;
var backgroundImage;
var bullet,bulletImage;
var gameState = 0;
var score1=0;
var player2,player2Image;
var score2=0;
var bullet2,bullet2Image,bullet2Group;
var form;
var player1name,player2name;
var introBG;
var edges;
var gun1sound,gun2sound;

function preload(){
playerImage=loadImage("Images/boy.png");
player2Image=loadImage("Images/player2.png");
enemy1Image=loadImage("Images/zombie.png");
enemy2Image=loadImage("Images/zombie2.png");
enemy3Image=loadImage("Images/zombie3.png");
backgroundImage=loadImage("Images/forest[71].jpg");
bulletImage=loadImage("Images/bullet.png");
bullet2Image=loadImage("Images/bullet2.png");
introBG=loadImage("Images/intro_bg.jpg");
gun1sound=loadSound("Images/gun1.mp3");
gun2sound=loadSound("Images/gun2.mp3");
}

function setup(){
createCanvas(1200,700);
edges=createEdgeSprites();
bg=createSprite (600,350,50,50);
bg.addImage(backgroundImage);
bg.scale=0.9;
bg.velocityX=-2;

player=createSprite (240,500,50,50);
player.addImage(playerImage);
player.scale=0.5;

player2=createSprite (90,560,50,50);
player2.addImage(player2Image);
player2.scale=0.4;

bulletGroup=new Group();
bullet2Group=new Group();
obstaclesGroup=new Group();
form=new Form();
form2=new Form2();
}

function draw(){
//background("black");

if(gameState===0){
  console.log(gameState)
  //form2.hide();
form.display();

}
if(gameState===1){
  console.log(gameState)
  form2.display();
}


if (gameState === 2){
  
  spawnObstacles();
console.log(gameState)
  if(bg.x<0){
    bg.x=600;
  }
 
  //obstaclesGroup.velocityX = -6;  //(6 + 3*score/100);
  
  if(keyDown("space")) {
    createBullet2();
    gun1sound.play();
    bullet2.velocityX = 20;
  }
  if(keyDown("enter")) {
    createBullet();
    gun2sound.play();
    bullet.velocityX = 20;
  }
  if(keyDown("UP_Arrow")&&player.y>500){
    player.y=player.y-10;
  }

  if(keyDown("DOWN_Arrow")&&player.y>400){
    player.y=player.y+10;
  }
  if(keyDown("w")&&player2.y>500){
    player2.y=player2.y-10;
  }

  if(keyDown("s")&&player2.y>400){
    player2.y=player2.y+10;
  }
  

for(var i=0;i<obstaclesGroup.length;i++){
  if(obstaclesGroup.get(i).isTouching(bulletGroup)){
    obstaclesGroup.get(i).destroy();
    bulletGroup.destroyEach();
    score1=score1+1;
 }
}
for(var i=0;i<obstaclesGroup.length;i++){
  if(obstaclesGroup.get(i).isTouching(bullet2Group)){
    obstaclesGroup.get(i).destroy();
    bullet2Group.destroyEach();
    score2=score2+1;
 }
}

if(score1===10 || score2===10){
  gameState=3;
}
player.collide(edges[3]);
player2.collide(edges[3]);
drawSprites();
textSize(20);
fill("white");
textFont("Comic Sans MS");
text(player1name +"'s Score: "+ score1, 100,50);
text(player2name +"'s Score: "+ score2, 900,50);
}
if(gameState===3){
  background("black");
  if(score1>score2){
    textSize(40);
    textFont("Comic Sans MS");
    fill("white");
    text("Congratulations!",490,300);
    text(player1name+" has won!",500,400);
}
if(score2>score1){
  textSize(40);
  textFont("Comic Sans MS");
  fill("white");
  text("Congratulations!",490,300);
  text(player2name+" has won!",500,400);
}
}
}
function spawnObstacles() {
  if(frameCount % 250 === 0) {
    var obstacle = createSprite(1000,600,10,40);
    //obstacle.debug = true;
    obstacle.velocityX = -5; (5 + 2*score1/100);
    
    //generate random obstacles
    var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: obstacle.addImage(enemy1Image);
              break;
      case 2: obstacle.addImage(enemy2Image);
              break;
      case 3: obstacle.addImage(enemy3Image);
              break;
              
      default: break;
    }


    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.8;
   // obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

function createBullet (){
  bullet=createSprite (205,312,50,50);
  bullet.y=player2.y-60;
  bullet.addImage(bulletImage);
  bullet.scale=0.13;

  bulletGroup.add(bullet);
}
function createBullet2 (){
  bullet2=createSprite (330,312,50,50);
  bullet2.y=player.y-40;
  bullet2.addImage(bullet2Image);
  bullet2.scale=0.1;

  bullet2Group.add(bullet2);
}


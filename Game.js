class Game {
    constructor(){
  
    }
  
    getState(){
      var gameStateRef  = database.ref('gameState');
      gameStateRef.on("value",function(data){
         gameState = data.val();
      })
  
    }
  
    update(state){
      database.ref('/').update({
        gameState: state
      });
    }
  
    async start(){
      if(gameState === 0){
        player = new Player();
        var playerCountRef = await database.ref('playerCount').once("value");
        if(playerCountRef.exists()){
          playerCount = playerCountRef.val();
          player.getCount();
        }
        form = new Form()
        form.display();
      }
      //spawnObstacles();

      player1=createSprite (displayWidth-1350,displayHeight-130,50,50);
      player1.addImage(player1Image);
      player1.scale=0.5;
      player1.visible=false;
      player2=createSprite (displayWidth-1200,displayHeight-190,50,50);
      player2.addImage(player2Image);
      player2.scale=0.35;
      player2.visible=false;
      bullet1=createSprite (displayWidth-1270,displayHeight-170,50,50);
      bullet1.addImage(bulletImage);
      bullet1.scale=0.11;
      bullet1.visible=false;
      bullet2=createSprite (displayWidth-1150,displayHeight-215,50,50);
      bullet2.addImage(bulletImage);
      bullet2.scale=0.11;
      bullet2.visible=false;
      bullet=[bullet1,bullet2];
      obstaclesGroup=new Group();
    }
  
    play(){
      form.hide();
      player1.visible=true;
      player2.visible=true;
      bullet1.visible=true;
      bullet2.visible=true;
      Player.getPlayerInfo();
    //  player.getCarsAtEnd();
      
      if(allPlayers !== undefined){
        background(backgroundImage);
      //  image(backgroundImage, 0,-displayHeight,displayWidth*4, displayHeight);
       
        if(frameCount % 100 === 0) {
            var obstacle = createSprite(displayWidth-100,displayHeight-150,10,40);
            //obstacle.debug = true;
            obstacle.velocityX = -6;//(6 + 3*score/100);
            obstacle.debug=true;
            obstacle.setCollider("rectangle",0,0,200,600);
            //generate random obstacles
            var rand = Math.round(random(1,2));
            switch(rand) {
              case 1: obstacle.addImage(enemy1Image);
                      break;
              case 2: obstacle.addImage(enemy2Image);
                      break;
            
              default: break;
            }
            obstacle.y=Math.round(random(displayHeight-400,displayHeight-50))
            //assign scale and lifetime to the obstacle           
            obstacle.scale = 0.4;
            obstacle.lifetime = 300;
            //add each obstacle to the group
            obstaclesGroup.add(obstacle);
          }
        //var display_position = 100;
        
        //index of the array
        var index = 0;
  
        //x and y position of the cars
      // var x = 175 ;
       // var y;
  
        for(var plr in allPlayers){
          //add 1 to the index for every loop
          index = index + 1 ;
  var x=player.x;
  var y=player.y;
          //position the cars a little away from each other in x direction
         // x = x + 200;
          //use data form the database to display the cars in y direction
         // y = displayHeight - allPlayers[plr].distance;
         // cars[index-1].x = x;
         // cars[index-1].y = y;
         // console.log(index, player.index)
  
         
          if (index === player.index){
            stroke(10);
            fill("red");
            ellipse(x,y,60,60);
            if(keyDown("space")){
                bullet[index-1].velocityX=5
                }
                for(var i=0;i<obstaclesGroup.length;i++){
                  if (obstaclesGroup.get(i).isTouching(bullet[index-1])){
                  
                    obstaclesGroup.get(i).destroy();
                  player.score=player.score+1;
                  console.log(player.score);
                  player.update();
                
            //camera.position.x = displayWidth/2;
           // camera.position.y = player.y;
          
                  }
          //textSize(15);
          //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
        }
      }
      
    }       
       
  } 
  
      if(player.score === 10){
        gameState = 2;
        player.rank +=1;    //rank=3
       // Player.updateCarsAtEnd(player.rank)
      }
     if(keyDown("w")){
       player1.y=player1.y-5;
     }
     if(keyDown("s")){
      player1.y=player1.y+5;
    }
    if(keyDown("UP_ARROW")){
      player2.y=player2.y-5;
    }
    if(keyDown("DOWN_ARROW")){
      player2.y=player2.y+5;
    }
    bullet1.y=player1.y-31;
    bullet2.y=player2.y-20;
      drawSprites();
    }
  
    end(){
      console.log("Game Ended");
     /* for(var i=0;i<1;i++){
      alert("Hurrah! Your rank is: "+ player.rank);
      }*/
      gameState=0;
     }
    
    }

   
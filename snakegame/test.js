


function init() {
	canvas=document.getElementById('mycanvas');
	W=canvas.width=1000
	H=canvas.height=1000
	pen= canvas.getContext('2d')
	 cs=67;
	 food_img= new Image();
	 food_img.src="assets/apple.png"
	food=getrandomfood();
	trophy=new Image();
	trophy.src="assets/trophy.png";
   speed=300;
   i=1;
   score=5;
   game_over=false;
	snake={
		init_len:5,
		color:"red",
		cells:[],
		direction:"right",
		createSnake:function(){
			for(var i=this.init_len;i>0;i--){
				this.cells.push({x:i,y:0});
			}
		},
		drawSnake:function(){
			pen.fillStyle=this.color;
			for(var i=0;i<this.cells.length;i++){
			pen.fillRect(this.cells[i].x*cs,this.cells[i].y*cs,cs-2,cs-2);}
		},

		updateSnake:function(){
			  //lastx=this.cells[this.cells.length-1].x;
			  //lasty=this.cells[this.cells.length-1].y;
              //pen.clearRect(lastx*cs,lasty*cs,cs,cs);
			
			var nextx,nexty;
			var headx=this.cells[0].x;
			var heady=this.cells[0].y;

			if(heady==food.y&& headx==food.x){
				console.log('food is eaten');
				food=getrandomfood();
				score++;
				if(score>10*i){
					speed-=50;
					i++;
				}

			}
			else{
				 this.cells.pop();
			}
          
         

			if(this.direction=='right'){
				nexty=heady;
				nextx=headx+1;
			}
			else if(this.direction=='left'){
				nexty=heady;
				nextx=headx-1;
			}

		else if(this.direction=='down'){
				nexty=heady+1;
				nextx=headx;
			}

		else if(this.direction=='up'){
				nexty=heady-1;
				nextx=headx;
			}

			this.cells.unshift({x:nextx,y:nexty});

		  var lastx=Math.round(W/cs);
		  var lasty=Math.round(H/cs);

		  if(this.cells[0].y<0 ||this.cells[0].x<0 || this.cells[0].x>lastx || this.cells[0].y>lasty ){
		  	game_over=true;
		  }



		}

	}
	snake.createSnake();
function keyPressed(e){
  if(e.key=="ArrowRight"){
  	snake.direction="right";
  }
   else if(e.key=="ArrowLeft"){
  	snake.direction="left";
  }
  else if(e.key=="ArrowDown"){
  	snake.direction="down";
  }
    else if(e.key=="ArrowUp"){
  	snake.direction="up";
  }

  console.log(snake.direction);
}
	document.addEventListener('keydown',keyPressed);
  //document.addEventListener('click',start);
}

function draw() {
 pen.clearRect(0,0,W,H);
  snake.drawSnake();
  pen.fillStyle=food.color;
  pen.drawImage(food_img,food.x*cs,food.y*cs,cs,cs);


pen.drawImage(trophy,20,20,cs,cs);
  pen.fillStyle="black";
  pen.font="20px Roboto";

  pen.fillText(score,50,50);

}

function update() { 
snake.updateSnake();         
}

function getrandomfood(){
	var foodx=Math.round(Math.random()*(W-cs)/cs);
	var foody=Math.round(Math.random()*(H-cs)/cs);

	var food={
		x:foodx,
		y:foody,
		color:"orange",
	}
	return food;
}


function gameloop() {
	if(game_over==true){
		clearInterval(f);
		alert("GAME IS OVER\n Hover over Heading To Restart");
		return;
	}

	draw();
	update();
}

function start() {
	init();
    f=setInterval(gameloop,speed);
}
start();
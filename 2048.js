function $(id) {
	return document.getElementById(id);
}
window.onload=function () {
	$("gameOver").style.display="none";
	StartAction();
}
var cells=[
		[0,0,0,0],
		[0,0,0,0],
		[0,0,0,0],
		[0,0,0,0]
	];
var score=0;
function StartAction() {
	$("gameOver").style.display="none";
	score=0;
	for(var row=0;row<4;row++){
		for(var col=0;col<4;col++){
			cells[row][col]=0
		}
	}
	RandomNum();
	RandomNum();
	UpdateView();
}
function UpdateView() {
	for(var row=0;row<4;row++){
		for(var col=0;col<4;col++){
			$("cell"+row+col).className="cell";
			$("cell"+row+col).innerHTML="";
			if(cells[row][col]>0){
				$("cell"+row+col).innerHTML=cells[row][col];
				$("cell"+row+col).className="cell "+"num"+cells[row][col];
			}
		}
	}
	$("score").innerHTML=score;
	$("finalScore").innerHTML=score;
}
function RandomNum() {
	while(true){
		if(Full()){return}
		var row=parseInt(Math.random()*4);
		var col=parseInt(Math.random()*4);
		if(cells[row][col]==0){
			cells[row][col]=Math.random()<0.5?2:4;
			break;
		}
	}
}
function Full() {
	for(var row=0;row<4;row++){
		for(var col=0;col<4;col++){
			if(cells[row][col]==0){
				return false;
			}
		}
	}
	return true;
}
/**************************************************************上移********************************************/
function UpAction() {
	if(GameOver()){return}
	if(!CanMoveUp()){return}	
	for(var col=0;col<4;col++){
		MoveUp(col);
	}
	RandomNum();
	UpdateView();
}
function CanMoveUp() {
	for(var row=1;row<4;row++){
		for(var col=0;col<4;col++){
			if(cells[row][col]!=0&&cells[row-1][col]==0){
				return true;
			}
			if(cells[row][col]!=0&&cells[row][col]==cells[row-1][col]){

				return true;
			}


			
		}
	} return false;
}
function getRowInCol(col,row,step) {
	while(true){
		if(row<0||row>=4){return -1}
		if(cells[row][col]!=0){
			return row;
		}
		row+=step;
	}
	return -1;
}
function MoveUp(col) {
	for(var row=0;row<3;){
		var nextRow=getRowInCol(col,row+1,1);
		if(nextRow==-1){return}
		var current = cells[row][col];
		var next = cells[nextRow][col];
		if(current==0){
			cells[row][col]=next;
			cells[nextRow][col]=0;
		}
		else if(current==next){
			cells[row][col]=next+current;
			cells[nextRow][col]=0;
			score+=cells[row][col];
			row++;
		}else {
			row++;
		}
	}
}
/***********************************************下移********************************************************************/
function DownAction() {
	if(GameOver()){return}
	if(!CanMoveDown()){return}	
	for(var col=0;col<4;col++){
		MoveDown(col);
	}
	RandomNum();
	UpdateView();
}
function CanMoveDown() {
	for(var row=0;row<3;row++){
		for(var col=0;col<4;col++){
			if(cells[row][col]!=0&&cells[row+1][col]==0){
				return true;
			}
			if(cells[row][col]!=0&&cells[row][col]==cells[row+1][col]){
				return true;
			}
		}
	} return false;
}
// function getRowInCol(col,row,step) {
// 	while(true){
// 		if(row<0||row>3){return -1}
// 		if(cells[row][col]!=0){
// 			return row;
// 		}
// 		row+=step;
// 	}
// 	return -1;
// }
function MoveDown(col) {
	for(var row=3;row>=1;){
		var nextRow=getRowInCol(col,row-1,-1);
		if(nextRow==-1){return}
		var current = cells[row][col];
		var next = cells[nextRow][col];
		if(current==0){
			cells[row][col]=next;
			cells[nextRow][col]=0;
		}
		else if(current==next){
			cells[row][col]=next+current;
			cells[nextRow][col]=0;
			score+=cells[row][col];
			row--;
		}else {
			row--;
		}
	}
}
/**************************************向左移动**************************************************/
function LeftAction() {
	 if(GameOver()){return}
	if(!CanMoveLeft()){return}	
	for(var row=0;row<4;row++){
		MoveLeft(row);
	}
	RandomNum();
	UpdateView();
}
function CanMoveLeft() {
	for(var row=0;row<4;row++){
		for(var col=1;col<4;col++){
			if(cells[row][col]!=0&&cells[row][col-1]==0 ){
				return true;
			}
			if(cells[row][col]!=0&&cells[row][col]==cells[row][col-1]){
				return true;
			}
		}
	} return false;
}


function getColInRow(row,col,step) {
	while(true){
		if(col<0||col>=4){return -1}
		if(cells[row][col]!=0){
			return col;
		}
		col+=step;
	}
	return -1;
}
function MoveLeft(row) {
	for(var col=0;col<3;){
		var nextCol=getColInRow(row,col+1,1);
		if(nextCol==-1){return}
		var current = cells[row][col];
		var next = cells[row][nextCol];
		if(current==0){
			cells[row][col]=next;
			cells[row][nextCol]=0;
		}
		else if(current==next){
			cells[row][col]=next+current;
			cells[row][nextCol]=0;
			score+=cells[row][col];
			col++;
		}else {
			col++;
		}
	}
}
/***************************************************往右********************************************/
function RightAction() {
	if(GameOver()){return}
	if(!CanMoveRight()){return}	
	for(var row=0;row<4;row++){
		MoveRight(row);
	}
	RandomNum();
	UpdateView();
}
function CanMoveRight() {
	for(var row=0;row<4;row++){
		for(var col=0;col<3;col++){
			if(cells[row][col]!=0&&cells[row][col+1]==0){
				return true;
			}
			if(cells[row][col]!=0&&cells[row][col]==cells[row][col+1]){
				return true;
			}
		}
	} return false;
}
// function getColInRow(row,col,step) {
// 	while(true){
// 		if(col<0||col>3){return -1}
// 		if(cells[row][col]!=0){
// 			return col;
// 		}
// 		col+=step;
// 	}
// 	return -1;
// }
function MoveRight(row) {
	for(var col=3;col>=1;){
		var nextCol=getColInRow(row,col-1,-1);
		if(nextCol==-1){return}
		var current = cells[row][col];
		var next = cells[row][nextCol];
		if(current==0){
			cells[row][col]=next;
			cells[row][nextCol]=0;
		}
		else if(current==next){
			cells[row][col]=next+current;
			cells[row][nextCol]=0;
			score+=cells[row][col];
			col--;
		}else {
			col--;
		}
	}
}
/*******************************************GameOver************************************/
function GameOver() {
	if(CanMoveUp()||CanMoveDown()||CanMoveLeft()||CanMoveRight()){return false}
		$("gameOver").style.display="block";

}
		var startx, starty;
    //获得角度
    function getAngle(angx, angy) {
        return Math.atan2(angy, angx) * 180 / Math.PI;
    };
 
    //根据起点终点返回方向 1向上 2向下 3向左 4向右 0未滑动
    function getDirection(startx, starty, endx, endy) {
        var angx = endx - startx;
        var angy = endy - starty;
        var result = 0;
 
        //如果滑动距离太短
        if (Math.abs(angx) < 2 && Math.abs(angy) < 2) {
            return result;
        }
 
        var angle = getAngle(angx, angy);
        if (angle >= -135 && angle <= -45) {
            result = 1;
        } else if (angle > 45 && angle < 135) {
            result = 2;
        } else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
            result = 3;
        } else if (angle >= -45 && angle <= 45) {
            result = 4;
        }
 
        return result;
    }
    //手指接触屏幕
    document.addEventListener("touchstart", function(e) {
        startx = e.touches[0].pageX;
        starty = e.touches[0].pageY;
    }, false);
    //手指离开屏幕
    document.addEventListener("touchend", function(e) {
        var endx, endy;
        endx = e.changedTouches[0].pageX;
        endy = e.changedTouches[0].pageY;
        var direction = getDirection(startx, starty, endx, endy);
        switch (direction) {
            case 0:
                alert("未滑动！")
                break;
            case 1:
                alert("向上！"); UpAction();
                break;
            case 2:
                alert("向下！"); DownAction();
                break;
            case 3:
                alert("向左！") ;LeftAction();
                break;
            case 4:
                alert("向右！") ;RightAction();
                break;
            default:
        }
    }, false);

    document.onkeydown = function(){
    	switch (event.keyCode) {
            case 37:
                LeftAction();
                break;
            case 38:
                UpAction();
                break;
            case 39:
                RightAction();
                break;
            case 40:
                DownAction();
                break;
            default:
            	break;
        }
    }
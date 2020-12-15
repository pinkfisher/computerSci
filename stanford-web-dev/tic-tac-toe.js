const X_IMAGE_URL = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1083533/x.png';
const O_IMAGE_URL = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1083533/circle.png';


const freeBoxes = [];
// Map of box number -> 'x' or 'o'
const takenBoxes = {};

const boxes = document.querySelectorAll('#grid div');
for (const box of boxes) {
  box.addEventListener('click', changeToX);
  freeBoxes.push(box);
}


function assignSpace(space,owner){
	const image = document.createElement("img");
	if (owner === "x"){
		image.src = X_IMAGE_URL;
	}else{
		image.src = O_IMAGE_URL;
	}

	space.appendChild(image);
	takenBoxes[space.id] = owner;
	const indexToRemove = freeBoxes.indexOf(space);
	freeBoxes.splice(indexToRemove,1);
	space.removeEventListener("click",changeToX);
}

function changeToX(event){
    assignSpace(event.currentTarget,"x");

    if(isGameOver()){
    	displayWinner();
    	console.log("displayWinner")
    }else{
    	computerChoose();
    	console.log("computerchoose")
    }

}

function computerChoose(){
	const allBoxes = document.querySelectorAll("#grid div");
	const index = Math.floor(Math.random()*freeBoxes.length);
	const freeSpace = freeBoxes[index];
	
	assignSpace(freeSpace, "o");

	if(isGameOver()){
		displayWinner();
	} 

}

function isGameOver(){
	return freeBoxes.length == 0 || getWinner()!==null;
}

function displayWinner(){
	const winner = getWinner();
	const resultContainer = document.querySelector("#results");
	const header = document.createElement("h1");
	if (winner ==="x"){
		header.textContent = "You win!"
	}else if (winner==="o"){
		header.textContent = "Computer wins";
	} else{
		header.textContent ="Tie";
	}
	resultContainer.appendChild(header);

	for (const box of freeBoxes){
		box.removeEventListener("click", changeToX);
	}
}

function checkBoxes(one,two, three){
	if(takenBoxes[one]!==undefined && 
		takenBoxes[one] === takenBoxes[two]&&
		takenBoxes[two] === takenBoxes[three]){
		return takenBoxes[one];
	}
	return null;

}

function getWinner(){
	let rowResult  = checkBoxes ('one','two','three')
	|| checkBoxes('four','five','six')
	|| checkBoxes('seven','eight','nine');

	let colResult = checkBoxes('one','four','seven')
	|| checkBoxes('two','five','eight')
	|| checkBoxes('three','six','nine');

	let diagonalResult = checkBoxes('one','five','nine')
	|| checkBoxes('three','five','seven')

	return rowResult || colResult || diagonalResult;

}


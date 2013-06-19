var board = (function(){
    var exports={};
    
    var cardsOnBoard=[[],[],[],[],[],[],[]]; //2d 7x4 array of cards on the board
    var availableCards=[]; // list of available cards left in deck
    var takenCards=[]; //list of taken cards (cards in sets you've found)
    
    var numSets=0; //counter of how many sets you've gotten
    
    //keeps track of if there are more than four/five rows in play
    var moreThanFour=false;
    var moreThanFive=false; //if !mourThanFour, then moreThanFive=false;
    
    var nextCards=[]; //coordinates of where the next cards should be put down
    
    var done=false; //true if you've found all sets left, false if not
    
    //generates deck of 81 distinct cards
    var generateDeck=function(){
        var shapes = ["oval","diamond","s"];
        var filling = ["stripe","full","empty"];
        var numbers = [1, 2, 3];
                                
        for (var i=0; i<3; i++){ //number
            for (var j=0; j<3; j++){ //filling
                for (var k=0; k<3; k++){ //shape
                    var fileN="img/"+numbers[i]+shapes[k]+"-"+filling[j]+"-";
					availableCards.push(new card("red", 
                                                 numbers[i], 
                                                 filling[j], 
                                                 shapes[k], 
                                                 fileN+"red.png"));
					availableCards.push(new card("green", 
                                                 numbers[i], 
                                                 filling[j], 
                                                 shapes[k], 
                                                 fileN+"green.png"));
					availableCards.push(new card("purple", 
                                                 numbers[i], 
                                                 filling[j], 
                                                 shapes[k], 
                                                 fileN+"purple.png"));
				}
			}
		}
    }
    
    //puts down first random 3x4 board of cards
    var initializeBoard=function(){
        for (var i=1; i<4; i++){
			for (var j=1; j<5; j++){
				var randomNum = Math.round((Math.random()*availableCards.length));
				cardsOnBoard[j][i]=availableCards[randomNum];
				availableCards.splice(randomNum,1);
			}
		}
		for (var i=1; i<4; i++){
			for (var j=5;j<7;j++){
				cardsOnBoard[j][i]=null;
			}
		}
    }
    
    //checks if 3 cards are a set or not
    //if they are, takes them off board, replaces them with 3 random cards
    //updates all lists of cards accordingly
    //x,y,z are coordinates of the cards
    var guessSet=function(x,y,z){
        var newCards=[];
		var a=cardsOnBoard[x.x][x.y];
		var b=cardsOnBoard[y.x][y.y];
		var c=cardsOnBoard[z.x][z.y];
		if (checkSet(a,b,c)) { //it's a match
			sets++;
			takenCards.push(a);
			takenCards.push(b);
			takenCards.push(c); //add to taken cards
			cardsOnBoard[x.x][x.y]=null;
			cardsOnBoard[y.x][y.y]=null;
			cardsOnBoard[z.x][z.y]=null; //clear set
			if (availableCards.length>2 //enough cards left, refill cards
					&& !moreThanFour){ //only refill if board is smaller than 12 cards

				newCards=putCardsDown();
				
			}
			else if (moreThanFour){ //board too big 
				if (moreThanFive) {
					moreThanFive=false; //just cleared 3 cards
				}
				else {
					moreThanFour=false;
				}
				newCards[0]=new card(null, 0, null, null, null);
			}
			else newCards[0]=new card(null, 0, null, null, null); //not enough cards
			
			if(availableCards.length<3){ //deck gone, check if game is done
				done=checkDone();
			}
			//System.out.println("more than four? "+moreThanFour+" more than five? "+moreThanFive);
			return newCards;
		}
		else return null; //didn't get a set
    }
    
    //checks if three cards are a set PRIVATE
    //a,b,c are the three cards to check
    function checkSet(a,b,c){
        var n=checkMatch(""+a.number, ""+b.number, ""+c.number);
		var s=checkMatch(a.shape,b.shape,c.shape);
		var f=checkMatch(a.filling,b.filling,c.filling);
		var col=checkMatch(a.color,b.color,c.color);
		return (n&&s&&f&&col);
    }
    
    //checks for if a certain characteristic is a set PRIVATE
    //a,b,c are strings of what the characteristic value is
    function checkMatch(a,b,c){
        if (a==b && b==c && a==c){ //all the same
			return true;
		}
		else if (!a==b && !b==c && !a==c){ //all different
			return true;
		}
		else
			return false;
    }
    
    //adds three new cards to board
    //updates moreThanFour and moreThanFive accordingly
    var addCardsToBoard=function(){
        if (moreThanFour) {
			moreThanFive=true; //if it was already more than four and this was clicked
		}
		else moreThanFour=true;
		return putCardsDown();
    }
    
    //puts three random cards down PRIVATE
    //fills cards in three empty spaces closed to top (first row)
    function putCardsDown(){
        var newCards=[];
		var count=0;
		var newCard;
		for (var j=1;j<7;j++){
			for (var i=1;i<4;i++){
				if (cardsOnBoard[j][i]==null && count<3){ //put a card here!!!!!
					newCard=Math.round((Math.random()*availableCards.length));
					cardsOnBoard[j][i]=availableCards[newCard];
					newCards[count]=cardsOnBoard[j][i];
					nextCards[count]=new pair(j,i);
					count++;
					availableCards.splice(newCard,1);
				}
			}
		}
		return newCards;
    }
    
    //checks if there are any sets left on the board
    //if not, sets done as true and returns done
    function checkDone(){
        var done=true;
		var currentCards=[];
		for (var j=1;j<7;j++){
			for (var i=1;i<4;i++){
				if (cardsOnBoard[j][i]!=null){
					currentCards.push(cardsOnBoard[j][i]);
				}
			}
		}
		var numCardsOnBoard=currentCards.length;
		//brute force all possible sets
		for (var i=0; i<numCardsOnBoard; i++){
			for (var j=i; j<numCardsOnBoard-1; j++){
				for (var k=j; k<numCardsOnBoard-2; k++){
					if (i!=j && j!=k && i!=k && checkSet(currentCards[i],currentCards[j],currentCards[k])){
						//if there is a set, you aren't done
						done=false;
					}
				}
			}
		}
		return done;
    }
    
    
    //public things that get passed out
    exports.generateDeck=generateDeck;
    exports.initializeBoard=initializeBoard;
    exports.guessSet=guessSet;
    exports.addCardsToBoard=addCardsToBoard;
    
    exports.numAvailableCards=availableCards.length;
    exports.numTakenCards=takenCards.length;
    exports.cardsOnBoard=cardsOnBoard;
    exports.nextPairs=nextCards;
    exports.numSets=numSets;
    exports.isDone=done;
    
    return exports;
})();

//card object
var card=function(color,number,filling,shape,img){
    var exports={};
    exports.color=color;
    exports.number=number;
    exports.filling=filling;
    exports.shape=shape;
    exports.img=img;
    
    return exports;
}

//pair object
function pair(x,y){
    //var exports={};
    this.x=x;
    this.y=y;
    this.equals=function(b){
        return (x==b.x && y==b.y);
    }
    //return exports;
}
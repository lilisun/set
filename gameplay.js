var set=new function(){
    var exports={};
    
    var template=""+
        +"<table class='game'>"
        +"  <tr class='header'>"
        +"      <td><button id='addRow'>add row</button>"
        +"      </td>"
        +"      <td>"
        +"      </td>"
        +"      <td><label id='numSets'>sets: 0</label>"
        +"      </td>"
        +"  </tr>"
        +"  <tr class='cardRow'>"
        +"      <td data-x='1' data-y='1'><button class='card' data-x='1' data-y='1'></button>"
        +"      </td>"
        +"      <td data-x='2' data-y='1'><button class='card' data-x='2' data-y='1'></button>"
        +"      </td>"
        +"      <td data-x='3' data-y='1'><button class='card' data-x='3' data-y='1'></button>"
        +"      </td>"
        +"  </tr>"
        +"  <tr class='cardRow'>"
        +"      <td data-x='1' data-y='2'><button class='card' data-x='1' data-y='2'></button>"
        +"      </td>"
        +"      <td data-x='2' data-y='2'><button class='card' data-x='2' data-y='2'></button>"
        +"      </td>"
        +"      <td data-x='3' data-y='2'><button class='card' data-x='3' data-y='2'></button>"
        +"      </td>"
        +"  </tr>"
        +"  <tr class='cardRow'>"
        +"      <td data-x='1' data-y='3'><button class='card' data-x='1' data-y='3'></button>"
        +"      </td>"
        +"      <td data-x='2' data-y='3'><button class='card' data-x='2' data-y='3'></button>"
        +"      </td>"
        +"      <td data-x='3' data-y='3'><button class='card' data-x='3' data-y='3'></button>"
        +"      </td>"
        +"  </tr>"
        +"  <tr class='cardRow'>"
        +"      <td data-x='1' data-y='4'><button class='card' data-x='1' data-y='4'></button>"
        +"      </td>"
        +"      <td data-x='2' data-y='4'><button class='card' data-x='2' data-y='4'></button>"
        +"      </td>"
        +"      <td data-x='3' data-y='4'><button class='card' data-x='3' data-y='4'></button>"
        +"      </td>"
        +"  </tr>"
        +"  <tr class='cardRow'>"
        +"      <td data-x='1' data-y='5'><button class='card' data-x='1' data-y='5'></button>"
        +"      </td>"
        +"      <td data-x='2' data-y='5'><button class='card' data-x='2' data-y='5'></button>"
        +"      </td>"
        +"      <td data-x='3' data-y='5'><button class='card' data-x='3' data-y='5'></button>"
        +"      </td>"
        +"  </tr>"
        +"  <tr class='cardRow'>"
        +"      <td data-x='1' data-y='6'><button class='card' data-x='1' data-y='6'></button>"
        +"      </td>"
        +"      <td data-x='2' data-y='6'><button class='card' data-x='2' data-y='6'></button>"
        +"      </td>"
        +"      <td data-x='3' data-y='6'><button class='card' data-x='3' data-y='6'></button>"
        +"      </td>"
        +"  </tr>"
        +"</table>";
    
    //var b=new board(); //board you're playing on
    var cardsSelected=0; //number of cards selected
    var guessSet=[]; //current cards selected
    
    //creates deck, initializes cards, displays them
    
    //displays cards on board
    function setButtons(){
        var cardsOnB=board.cardsOnBoard;
        for (var i=1; i<4; i++){
			for (var j=1; j<5; j++){
                $('.set').find("[data-y='"+j+"'][data-x='"+i+"']").find(".card").html("<img src='"+cardsOnB[j][i].img+"' width=156px height=103px>");
			}
		}
    }
    
    //adds down next three cards onto the board
    //pairs: array of pairs where they go
    //newCards: array of cards where they go
    function putNextThree(pairs, newCards){
        for(var i=0;i<3;i++){
            var x=pairs[i].y;
            var y=pairs[i].x;
            $('.set').find("[data-y='"+y+"'][data-x='"+x+"']").find(".card").html("<img src='"+newCards[i].img+"' width=156px height=103px>");
        }
    }
    
    //function for when a card is selected
    //only changes gui. 
    //also possibly keeps track of which cards are selected 
        //(if so, must be called anytime a card is clicked)
    function cardClicked(card){
    }
    
    //function for when three cards are selected
    //checks if they're a set and then does the necessary gui modifications.
    
    //function for done
    
    //sets up GUI.
    var setup=function(div){
        board.generateDeck();
        board.initializeBoard();
        $(div).append(template);
        $(div).find('#addRow').on("click",function(){
            var newCards=board.addCardsToBoard();
            var pairs=board.nextPairs;
            putNextThree(pairs,newCards);
        });
        $(div).find('.card').on("click",function(event){
            console.log(event.currentTarget);
            cardClicked(event.currentTarget);
        });
        setButtons();
    }
    exports.setup=setup;
    return exports;
}


$(document).ready(function(){
   $('.set').each(function(){
       //var set=new set();
       set.setup(this);
   })
});
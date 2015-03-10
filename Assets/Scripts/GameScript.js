
	var cols:int = 4;
   var rows:int = 4; // the number of rows in the card grid
   var totalCards:int = cols*rows; // I think the answer is 16, but I was
  
   var matchesNeededToWin:int = totalCards * 0.5; // If there are 16
   
   var matchesMade:int = 0; // At the outset, the player has not made any
  
   var cardW:int = 100; // Each card's width and height is 100 pixels
   var cardH:int = 100;

   var aCards:Array; // We'll store all the cards we create in this Array
   var aGrid:Array; // This array will keep track of the shuffled, dealt
   var aCardsFlipped:ArrayList; // This array will store the two cards
  
   var playerCanClick:boolean; // We'll use this flag to prevent the
   
   var playerHasWon:boolean = false; // Store whether or not the player
   class Card extends System.Object
       {
         var isFaceUp:boolean = false;
         var isMatched:boolean = false;
         var img:String;
         var id:int;
        function Card(img:String,id: int)
     {
             this.img = img;
             this.id=id;
     }
}
   function Start()
   {
     playerCanClick = true; // We should let the player play,
          
     // Initialize the arrays as empty lists:
     aCards = new Array();
     aGrid = new Array();
		aCardsFlipped = new ArrayList();
	BuildDeck();
for(i=0; i<rows; i++)
{
       aGrid[i] = new Array(); // Create a new, empty array at index i
      for(j=0; j<cols; j++)
       {
       var someNum:int = Random.Range(0,aCards.length);
            aGrid[i][j] = aCards[someNum];
            aCards.RemoveAt(someNum);
       }
} }

function OnGUI ()
       {
          GUILayout.BeginArea (Rect (0,0,Screen.width,Screen.height));
          GUILayout.BeginHorizontal();
          BuildGrid();
          if(playerHasWon) BuildWinPrompt();
          GUILayout.EndHorizontal();
          GUILayout.EndArea();
}
 function BuildGrid()
   {
    GUILayout.BeginVertical();
     GUILayout.FlexibleSpace();
     for(i=0; i<rows; i++)
     {
       GUILayout.BeginHorizontal();
       GUILayout.FlexibleSpace();
       for(j=0; j<cols; j++)
       {
         var card:Object = aGrid[i][j];
         var img:String;
         if (card.isMatched){
         	img="blank";
         	}
         else
         {if(card.isFaceUp)
          {
             img = card.img;
            }
             else {
                img = "wrench";
             }
         } 
         GUI.enabled = !card.isMatched;
         if(GUILayout.Button(Resources.Load(img),
             GUILayout.Width(cardW)))
             {
             if(playerCanClick)
                  {
                    FlipCardFaceUp(card);
                   }
              Debug.Log(card.img);
            }
            }
            GUI.enabled=true;
                   GUILayout.FlexibleSpace();
                   GUILayout.EndHorizontal();
                      }
     GUILayout.FlexibleSpace();
     GUILayout.EndVertical();
   }
   
   function BuildDeck()       {
              var totalRobots:int = 4;
// we've got four robots to work with
          var card:Object;
            var id:int = 0; // this stores a reference to a card
          for(i=0; i<totalRobots; i++)
       {
          var aRobotParts:Array = ["Head", "Arm", "Leg"];
          for(j=0; j<2; j++)
          {var someNum:int = Random.Range(0, aRobotParts.length);
           var theMissingPart:String = aRobotParts[someNum];
           aRobotParts.RemoveAt(someNum);
           card = new Card("robot" + (i+1) + "Missing" + theMissingPart,id);
           aCards.Add(card);
           card= new Card("robot" + (i+1) + theMissingPart,id);aCards.Add(card);id++;}
}
       }
       function FlipCardFaceUp(card:Object)       {         card.isFaceUp = true;         if(aCardsFlipped.IndexOf(card) < 0)         {           aCardsFlipped.Add(card);           if(aCardsFlipped.Count == 2)           {             playerCanClick = false;             yield WaitForSeconds(1);             if(aCardsFlipped[0].id == aCardsFlipped[1].id)             {              // Match!              aCardsFlipped[0].isMatched = true;              aCardsFlipped[1].isMatched = true;
              matchesMade ++;
              if(matchesMade >=matchesNeededToWin)
              {playerHasWon=true;}
              } else{
		aCardsFlipped[0].isFaceUp = false;		aCardsFlipped[1].isFaceUp = false;
}
 aCardsFlipped = new ArrayList();             playerCanClick = true;           }} }

  function BuildWinPrompt()       {         var winPromptW:int = 100;         var winPromptH:int = 90;         var halfScreenW:float = Screen.width/2;         var halfScreenH:float = Screen.height/2;         var halfPromptW:int = winPromptW/2;         var halfPromptH:int = winPromptH/2;         GUI.BeginGroup(Rect(halfScreenW-halfPromptW,            halfScreenH-halfPromptH, winPromptW, winPromptH));          GUI.Box (Rect (0,0,winPromptW,winPromptH),            "A Winner is You!!");          if(GUI.Button(Rect(10,40,80,20),"Play Again"))          {            Application.LoadLevel("Title");          }          GUI.EndGroup();       }
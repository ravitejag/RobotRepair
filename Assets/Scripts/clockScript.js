var isPaused : boolean = false;
var percent:float;
var clockBG:Texture2D;
 var rightSide:Texture2D;
 function OnGUI()
       	var pieClockX:int = 100;
       	var pieClockY:int = 50;
       	var isPastHalfway:boolean = percent < 50;
       	var clockRect:Rect = Rect(pieClockX, pieClockY, pieClockW, pieClockH);
       	var rot:float = (percent/100) * 360;
       	var centerPoint:Vector2 =Vector2(pieClockX + pieClockHalfW,
       	 GUI.DrawTexture(clockRect, back, ScaleMode.StretchToFill, true,
          if(isPastHalfway)
    	 GUIUtility.RotateAroundPivot(-rot-180, centerPoint);
        GUI.DrawTexture(clockRect, blocker, ScaleMode.StretchToFill,
GUI.DrawTexture(clockRect, leftSide, ScaleMode.StretchToFill,
}          if(percent < 0)
         var gap:int = 20;
           GUI.DrawTexture (Rect (0,0, clockBG.width, clockBG.height),
           GUI.BeginGroup (new Rect (5, 6, newBarWidth, clockFG.height)); 
           GUI.DrawTexture (Rect (0,0, clockFG.width, clockFG.height),
           GUI.EndGroup ();
       	startTime = 120.0;
       	clockFGMaxWidth = clockFG.width;
function Update () {
	if (!isPaused)
}
function DoCountdown() {
	timeRemaining = startTime - Time.time;
	 percent = timeRemaining/startTime * 100;
	if (timeRemaining < 0)
       }
	 var minutes : int;
          minutes = timeRemaining/60;
          timeStr = minutes.ToString() + ":"; 
          timeStr += seconds.ToString("D2");
          guiText.text = timeStr; //display the time to the GUI
	 Debug.Log("Time is up!");
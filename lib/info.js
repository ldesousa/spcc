/**
* @author Luis de Sousa [luis.a.de.sousa@gmail.com]
* Date: 30-07-2013
*
* Information related stuff.
*/

spcc.info = spcc.info || { };

spcc.info.displayRow = function(rowName)
{
	var row = document.getElementById(rowName);
	if (row.style.display == "") row.style.display = "none";
	else row.style.display = "";
}

spcc.info.toggle = function(rowName, button)
{
	var row = document.getElementById(rowName);
	if (row.style.display == "")
	{ 
		row.style.display = "none";
		button.src = "img/info_medium.png";
	}
	else
	{
		row.style.display = "";
		button.src = "img/info_medium_pressed.png";
	}
}

spcc.info.setItalic = function(text)
{
	if(text.style.fontStyle == "")
	{
		text.style.fontStyle = "italic";
		text.style.backgroundColor="#666666";
	}
	else
		text.style.fontStyle = "";
}

spcc.info.toggle2 = function(text, rowName)
{
	var row = document.getElementById(rowName);
	if (row.style.display == "") row.style.display = "none";
	else row.style.display = "";
}

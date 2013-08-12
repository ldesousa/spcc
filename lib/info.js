/**
* @author Luis de Sousa [luis.a.de.sousa@gmail.com]
* Date: 30-07-2013
*
* Information related stuff.
*/

spcc.info = spcc.info || { };

spcc.info.setItalic = function(text, rowName)
{
	if(document.getElementById(rowName).style.display == "") return;

	if(text.style.fontStyle == "")
	{
		text.style.fontStyle = "italic";
		text.style.backgroundColor="#666666";
	}
	else
	{
		text.style.fontStyle = "";
		text.style.backgroundColor="";
	}
}

spcc.info.toggle = function(text, rowName)
{
	var row = document.getElementById(rowName);
	if (row.style.display == "") 
		row.style.display = "none";
	else 
		row.style.display = "";
}

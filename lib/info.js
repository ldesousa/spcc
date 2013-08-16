/**
* Copyright 2013 Luís de Sousa
* 
* Licensed under the EUPL, Version 1.1 or – as soon they will be approved by the 
* European Commission - subsequent versions of the EUPL (the "Licence");
* You may not use this work except in compliance with the Licence.
* You may obtain a copy of the Licence at:
*
* http://ec.europa.eu/idabc/eupl
* 
* Unless required by applicable law or agreed to in writing, software distributed 
* under the Licence is distributed on an "AS IS" basis,  WITHOUT WARRANTIES OR 
* CONDITIONS OF ANY KIND, either express or implied. See the Licence for the 
* specific language governing permissions and limitations under the Licence.
* 
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

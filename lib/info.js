/**
* @author Luis de Sousa [luis.a.de.sousa@gmail.com]
* Date: 30-07-2013
*
* Information related stuff.
*/

var spcc = spcc || { };

spcc.displayRow = function(rowName)
{
	var row = document.getElementById(rowName);
	if (row.style.display == '') row.style.display = 'none';
	else row.style.display = '';
}

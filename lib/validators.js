/**
* @author Luis de Sousa [luis.a.de.sousa@gmail.com]
* Date: 09-07-2013
*
* Validators.
*/

spcc.val = spcc.val || { };

spcc.val.isReady = true;

spcc.val.valColour = "#00FF00";
spcc.val.invColour = "#FF0000";

spcc.val.isNumber = function(n) 
{
  return !isNaN(parseFloat(n)) && isFinite(n);
}

spcc.val.sysCap = function(input)
{
	if((spcc.val.isNumber(input.value)) && (input.value > 0))
		input.style.borderColor = spcc.val.valColour;
	else
		input.style.borderColor = spcc.val.invColour;
} 

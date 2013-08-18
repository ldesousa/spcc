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
* Date: 09-07-2013
*
* Validators.
*/

spcc.val = spcc.val || { };

spcc.val.isReady = true;

spcc.val.valColour = "#00FF00";
spcc.val.invColour = "#FF0000";

spcc.val.sysGenMax = 2500;
spcc.val.sysDecayMax = 5;
spcc.val.sysLifetimeMax = 50;

spcc.val.invPanelsMax = 10000;
spcc.val.invInverterMax = 5000;
spcc.val.invInverterMax = 10000;

spcc.val.maintInverterMax = 50;
spcc.val.maintOtherMax = 1000;

spcc.val.fincPercentMax = 100;
spcc.val.fincTimeMax = 50;
spcc.val.fincInterestMax = 12;

spcc.val.strgCostMax = 2000;
spcc.val.strgLifetimeMax = 50;
spcc.val.strgEffMin = 0;
spcc.val.strgEffMax = 100;
spcc.val.strgShareMax = 100;

spcc.val.isNumber = function(n) 
{
  return !isNaN(parseFloat(n)) && isFinite(n);
}

spcc.val.checkInterval = function(input, min, max)
{
	if((spcc.val.isNumber(input.value)) && (input.value >= min) && (input.value <= max))
		input.style.borderColor = spcc.val.valColour;
	else
		input.style.borderColor = spcc.val.invColour;
}

spcc.val.sysCap = function(input)
{
	if((spcc.val.isNumber(input.value)) && (input.value > 0))
		input.style.borderColor = spcc.val.valColour;
	else
		input.style.borderColor = spcc.val.invColour;
} 

spcc.val.sysGen = function(input)
{
	spcc.val.checkInterval(input, 0, spcc.val.sysGenMax);
}

spcc.val.sysDecay = function(input)
{
	spcc.val.checkInterval(input, 0, spcc.val.sysDecayMax);
}

spcc.val.sysLifetime = function(input)
{
	spcc.val.checkInterval(input, 0, spcc.val.sysLifetimeMax);
}

spcc.val.invPanels = function(input)
{
	spcc.val.checkInterval(input, 0, spcc.val.invPanelsMax);
}

spcc.val.invInverter = function(input)
{
	spcc.val.checkInterval(input, 0, spcc.val.invInverterMax);
}

spcc.val.invInstall = function(input)
{
	spcc.val.checkInterval(input, 0, spcc.val.invInverterMax);
}

spcc.val.maintInverter = function(input)
{
	spcc.val.checkInterval(input, 0, spcc.val.maintInverterMax);
}

spcc.val.maintOther = function(input)
{
	spcc.val.checkInterval(input, 0, spcc.val.maintOtherMax);
}

spcc.val.fincPercent = function(input)
{
	spcc.val.checkInterval(input, 0, spcc.val.fincPercentMax);
}

spcc.val.fincTime = function(input)
{
	spcc.val.checkInterval(input, 0, spcc.val.fincTimeMax);
}

spcc.val.fincInterest = function(input)
{
	spcc.val.checkInterval(input, 0, spcc.val.fincInterestMax);
}

spcc.val.strgCost = function(input)
{
	spcc.val.checkInterval(input, 0, spcc.val.strgCostMax);
}

spcc.val.strgLifetime = function(input)
{
	spcc.val.checkInterval(input, 0, spcc.val.strgLifetimeMax);
}

spcc.val.strgEff = function(input)
{
	spcc.val.checkInterval(input, spcc.val.strgEffMin, spcc.val.strgEffMax);
}

spcc.val.strgShare = function(input)
{
	spcc.val.checkInterval(input, 0, spcc.val.strgShareMax);
}













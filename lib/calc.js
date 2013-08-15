/**
* @author Luis de Sousa [luis.a.de.sousa@gmail.com]
* Date: 11-01-2013
*
* Main calculations.
*/

var spcc = spcc || { };

spcc.energyPerYear;
spcc.energyComul;

spcc.costsComul;
spcc.costsYearly;

spcc.sysCap;
spcc.sysGen;
spcc.sysDecay;
spcc.sysLifetime;

spcc.invPanels;
spcc.invInverter;
spcc.invInstall;

spcc.maintInverter;
spcc.maintOther;
spcc.mainTotal = 0;

spcc.fincPercent;
spcc.fincTime;
spcc.fincInterest;
spcc.fincTotal;

spcc.strgCost;
spcc.strgLifetime;
spcc.strgEff;
spcc.strgShare;

spcc.getSysValues = function() {

	spcc.sysCap 	 = parseFloat(document.getElementById("sysCap").value);
	spcc.sysGen 	 = parseFloat(document.getElementById("sysGen").value);
	spcc.sysDecay 	 = parseFloat(document.getElementById("sysDecay").value) / 100;
	spcc.sysLifetime = parseFloat(document.getElementById("sysLifetime").value);
};

spcc.calcEnergyPerYear = function() {

	spcc.getSysValues();
	spcc.energyPerYear = new Array(spcc.sysLifetime + 1);
	firstYear = spcc.sysCap * 1000 * spcc.sysGen;


	for(i = 1; i <= spcc.sysLifetime; i++)
		spcc.energyPerYear[i] = (firstYear - (firstYear * (i - 1) * spcc.sysDecay));
};

spcc.getInvestValues = function() {

	spcc.invPanels 	 = parseFloat(document.getElementById("invPanels").value);
	spcc.invInverter = parseFloat(document.getElementById("invInverter").value);
	spcc.invInstall  = parseFloat(document.getElementById("invInstall").value);

	if((isNaN(spcc.invPanels))    ||
	   (isNaN(spcc.invInverter))  || 
	   (isNaN(spcc.invInstall))   ||
	   (spcc.invPanels < 0)       ||
	   (spcc.invInverter < 0)     || 
	   (spcc.invInstall < 0))
		return false;

	return true;
};

spcc.getMaintValues = function() {

	spcc.maintInverter = parseFloat(document.getElementById("maintInverter").value);
	spcc.maintOther    = parseFloat(document.getElementById("maintOther").value);

	if((isNaN(spcc.maintInverter)) ||
	   (isNaN(spcc.maintOther))    || 
	   (spcc.maintInverter < 0)   ||
	   (spcc.maintOther < 0))
		return false;

	return true;
};

spcc.calcCosts = function() {
	
	if(!(spcc.getInvestValues())) return;
	if(!(spcc.getMaintValues())) return;

	spcc.costsYearly = new Array(spcc.sysLifetime + 1);
	spcc.costsYearly[0] = (spcc.invPanels + spcc.invInverter + spcc.invInstall) * spcc.sysCap;

	for(i = 1; i <= spcc.sysLifetime; i++)
	{
		spcc.costsYearly[i] = spcc.maintOther;
		spcc.mainTotal += spcc.maintOther;
	}

	for(j = spcc.maintInverter + 1; j <= spcc.sysLifetime; j += spcc.maintInverter)
	{
		spcc.costsYearly[j] += spcc.invInverter;
		spcc.mainTotal += spcc.invInverter; 
	}
	
};

spcc.getFincValues = function() {

	spcc.fincPercent  = parseFloat(document.getElementById("fincPercent").value) / 100;
	spcc.fincTime     = parseFloat(document.getElementById("fincTime").value);
	spcc.fincInterest = parseFloat(document.getElementById("fincInterest").value) / 100;

	if((isNaN(spcc.fincPercent))    ||
	   (isNaN(spcc.fincTime)) 		|| 
	   (isNaN(spcc.fincInterest))   ||
	   (spcc.fincPercent < 0)       ||
	   (spcc.fincTime < 0)   		|| 
	   (spcc.fincInterest < 0))
		return false;

	return true;
};

spcc.calcFincCosts = function() {
	
	if(!(spcc.getFincValues())) return;

	spcc.fincTotal = spcc.fincTime * spcc.costsYearly[0] * spcc.fincPercent * spcc.fincInterest;

	for(i = 1; i <= spcc.fincTime; i++)
		spcc.costsYearly[i] += spcc.costsYearly[0] * spcc.fincPercent * spcc.fincInterest; 
};

spcc.getStrgValues = function() {

	spcc.strgCost 	  = parseFloat(document.getElementById("strgCost").value);
	spcc.strgLifetime = parseFloat(document.getElementById("strgLifetime").value);
	spcc.strgEff      = parseFloat(document.getElementById("strgEff").value) / 100;
	spcc.strgShare    = parseFloat(document.getElementById("strgShare").value) / 100;

	if((isNaN(spcc.strgCost))     ||
	   (isNaN(spcc.strgLifetime)) || 
	   (isNaN(spcc.strgEff))      ||
	   (isNaN(spcc.strgShare))    ||
	   (spcc.strgCost     == 0)   ||
	   (spcc.strgLifetime == 0)   || 
	   (spcc.strgEff      == 0)   ||
	   (spcc.strgShare    == 0))
		return false;

	return true;
};

spcc.calcStrgCosts = function() {

	if(!(spcc.getStrgValues())) return;
	spcc.costsYearly[0] += spcc.strgCost;

	for(j = spcc.strgLifetime + 1; j <= spcc.sysLifetime; j += spcc.strgLifetime)
	{
		spcc.costsYearly[j] += spcc.strgCost;
		spcc.mainTotal += spcc.strgCost;
	}

	for(i = 1; i <= spcc.sysLifetime; i++)
		spcc.energyPerYear[i] -= spcc.energyPerYear[i] * spcc.strgShare * (1 - spcc.strgEff);
};

spcc.calculate = function() {

	spcc.mainTotal = 0;

	spcc.calcEnergyPerYear();
	spcc.calcCosts();
	spcc.calcStrgCosts();
	spcc.calcFincCosts();

	spcc.energyComul = new Array(spcc.sysLifetime + 1);
	spcc.costsComul = new Array(spcc.sysLifetime + 1);
	spcc.energyComul[0] = 0;
	spcc.costsComul[0] = spcc.costsYearly[0];
	for(i = 1; i <= spcc.sysLifetime; i++) {
		spcc.costsComul[i] = spcc.costsComul[i - 1] + spcc.costsYearly[i];
		spcc.energyComul[i] = spcc.energyComul[i - 1] + spcc.energyPerYear[i];
	}
	
	cont = document.getElementById("container");
	temp = "<table border=1><tr><th>Year</th><th>kWh/a</th><th>kWh</th>" + 
					 "<th>&euro;</th><th>&euro;/kWh</th></tr>";

	completeSeries = new Array(spcc.sysLifetime);

	for(i = 1; i <= spcc.sysLifetime; i++) 
	{
		completeSeries[i] = Math.round(spcc.costsComul[i] / (spcc.energyComul[i] / 1000) * 1000) / 1000;
		temp += "<tr><td>" + i + 
			    "</td><td>" + Math.round(spcc.energyPerYear[i] / 1000) + 
				"</td><td>" + Math.round(spcc.energyComul[i] / 1000) +
				"</td><td>" + Math.round(spcc.costsComul[i]) + 
				"</td><td>" + completeSeries[i] +
				"</td></tr>";
	}

	temp += "</table>"

	cont.innerHTML = temp;


	/**
	 * For the charts 
     */

	chartSeries = new Array(spcc.sysLifetime - 10);
	chart = "<br><br>[";
	for(i = 10; i < 30; i++)
	{
		chart += Math.round(spcc.costsComul[i] / (spcc.energyComul[i] / 1000) * 1000) / 1000 + ", ";
		chartSeries[i-10] = completeSeries[i]
	}
	
	chart += Math.round(spcc.costsComul[i] / (spcc.energyComul[30] / 1000) * 1000) / 1000 + "]";
	chartSeries[i-10] = completeSeries[30]

	tot = spcc.invPanels + spcc.invInverter + spcc.strgCost + 
		  spcc.invInstall + spcc.mainTotal + spcc.fincTotal;

	totPanels = Math.round(spcc.invPanels   / tot * 100); 
	totInvert = Math.round(spcc.invInverter / tot * 100);
	totStorag = Math.round(spcc.strgCost    / tot * 100);
	totInstal = Math.round(spcc.invInstall  / tot * 100);
	totMainte = Math.round(spcc.mainTotal   / tot * 100);
	totFinanc = Math.round(spcc.fincTotal   / tot * 100);

	totals = "<br><br>";
	totals += "Panels: " + spcc.invPanels + " €/kWp " + totPanels + " %<br>";
	totals += "Inverter: " + spcc.invInverter + " €/kWp " + totInvert + " %<br>";
	totals += "Storage: " + spcc.strgCost + " €/kWp " + totStorag + " %<br>";
	totals += "Installation: " + spcc.invInstall + " €/kWp " + totInstal + " %<br>";
	totals += "Maintenance: " + spcc.mainTotal + " €/kWp " + totMainte + " %<br>";
	totals += "Financing: " + spcc.fincTotal + " €/kWp " + totFinanc + " %<br>";
	
	cont.innerHTML = temp + chart + totals;

	//alert(chartSeries);

	/*chartSeries = [0.299, 0.360, 0.333, 0.310, 0.290, 0.273, 0.258, 0.245, 0.234, 0.223, 0.214,
         0.251, 0.241, 0.233, 0.225, 0.217, 0.210, 0.204, 0.198, 0.193, 0.187];*/

	spcc.charts.renderCostTime('graph-container', chartSeries);

	spcc.charts.renderPie(
		"pie-container",
		"For a lifetime of " + spcc.sysLifetime + " years",
	 	[{name: 'Panels', 		y: totPanels, sliced: true},
		 {name: 'Inverter', 	y: totInvert, sliced: true},
	  	 {name: 'Installation', y: totInstal, sliced: true},
	     {name: 'Maintenance', 	y: totMainte, sliced: true},
		 {name: 'Financing', 	y: totFinanc, sliced: true},
		 {name: 'Storage', 		y: totStorag, sliced: true}]);
}




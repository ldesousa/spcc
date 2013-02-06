/**
* @author Luis de Sousa [luis.a.de.sousa@gmail.com]
* Date: 11-01-2013
*
* Properties and methods to manage base layers.
*/

var sppc = sppc || { };

sppc.energyPerYear;
sppc.energyComul;

sppc.costsComul;
sppc.costsYearly;

sppc.sysCap;
sppc.sysGen;
sppc.sysDecay;
sppc.sysLifetime;

sppc.invPanels;
sppc.invInverter;
sppc.invInstall;

sppc.maintInverter;
sppc.maintOther;

sppc.fincPercent;
sppc.fincTime;
sppc.fincInterest;

sppc.strgCost;
sppc.strgLifetime;
sppc.strgEff;
sppc.strgShare;

sppc.getSysValues = function() {

	sppc.sysCap 	 = parseFloat(document.getElementById("sysCap").value);
	sppc.sysGen 	 = parseFloat(document.getElementById("sysGen").value);
	sppc.sysDecay 	 = parseFloat(document.getElementById("sysDecay").value) / 100;
	sppc.sysLifetime = parseFloat(document.getElementById("sysLifetime").value);
};

sppc.calcEnergyPerYear = function() {

	sppc.getSysValues();
	sppc.energyPerYear = new Array(sppc.sysLifetime + 1);
	firstYear = sppc.sysCap * 1000 * sppc.sysGen;


	for(i = 1; i <= sppc.sysLifetime; i++)
		sppc.energyPerYear[i] = (firstYear - (firstYear * (i - 1) * sppc.sysDecay));
};

sppc.getInvestValues = function() {

	sppc.invPanels 	 = parseFloat(document.getElementById("invPanels").value);
	sppc.invInverter = parseFloat(document.getElementById("invInverter").value);
	sppc.invInstall  = parseFloat(document.getElementById("invInstall").value);
};

sppc.getMaintValues = function() {

	sppc.maintInverter = parseFloat(document.getElementById("maintInverter").value);
	sppc.maintOther    = parseFloat(document.getElementById("maintOther").value);
};

sppc.calcCosts = function() {
	
	sppc.getInvestValues();
	sppc.getMaintValues();

	sppc.costsYearly = new Array(sppc.sysLifetime + 1);
	sppc.costsYearly[0] = (sppc.invPanels + sppc.invInverter + sppc.invInstall) * sppc.sysCap;

	for(i = 1; i <= sppc.sysLifetime; i++)
		sppc.costsYearly[i] = sppc.maintOther;

	for(j = sppc.maintInverter + 1; j <= sppc.sysLifetime; j += sppc.maintInverter)
		sppc.costsYearly[j] += sppc.invInverter; 
	
};

sppc.getFincValues = function() {

	sppc.fincPercent  = parseFloat(document.getElementById("fincPercent").value) / 100;
	sppc.fincTime     = parseFloat(document.getElementById("fincTime").value);
	sppc.fincInterest = parseFloat(document.getElementById("fincInterest").value) / 100;
};

sppc.calcFincCosts = function() {
	
	sppc.getFincValues();

	for(i = 1; i <= sppc.fincTime; i++)
		sppc.costsYearly[i] += sppc.costsYearly[0] * sppc.fincPercent * sppc.fincInterest; 
	
};

sppc.getStrgValues = function() {

	sppc.strgCost 	  = parseFloat(document.getElementById("strgCost").value);
	sppc.strgLifetime = parseFloat(document.getElementById("strgLifetime").value);
	sppc.strgEff      = parseFloat(document.getElementById("strgEff").value) / 100;
	sppc.strgShare    = parseFloat(document.getElementById("strgShare").value) / 100;
};

sppc.calcStrgCosts = function() {

	sppc.getStrgValues();
	sppc.costsYearly[0] += sppc.strgCost;

	for(j = sppc.strgLifetime + 1; j <= sppc.sysLifetime; j += sppc.strgLifetime)
		sppc.costsYearly[j] += sppc.strgCost;

	for(i = 1; i <= sppc.sysLifetime; i++) {

		sppc.energyPerYear[i] -= sppc.energyPerYear[i] * sppc.strgShare * (1 - sppc.strgEff);
	}

};

sppc.calculate = function() {

	sppc.calcEnergyPerYear();
	sppc.calcCosts();
	sppc.calcFincCosts();
	sppc.calcStrgCosts();

	sppc.energyComul = new Array(sppc.sysLifetime + 1);
	sppc.costsComul = new Array(sppc.sysLifetime + 1);
	sppc.energyComul[0] = 0;
	sppc.costsComul[0] = sppc.costsYearly[0];
	for(i = 1; i <= sppc.sysLifetime; i++) {
		sppc.costsComul[i] = sppc.costsComul[i - 1] + sppc.costsYearly[i];
		sppc.energyComul[i] = sppc.energyComul[i - 1] + sppc.energyPerYear[i];
	}
	
	cont = document.getElementById("container");
	temp = "<table border=1><tr><th>Year</th><th>kWh/a</th><th>kWh</th>" + 
					 "<th>&euro;</th><th>&euro;/kWh</th></tr>";

	for(i = 1; i <= sppc.sysLifetime; i++) 
		temp += "<tr><td>" + i + 
			    "</td><td>" + Math.round(sppc.energyPerYear[i] / 1000) + 
				"</td><td>" + Math.round(sppc.energyComul[i] / 1000) +
				"</td><td>" + Math.round(sppc.costsComul[i]) + 
				"</td><td>" + Math.round(sppc.costsComul[i] / (sppc.energyComul[i] / 1000) * 1000) / 1000 +
				"</td></tr>";

	temp += "</table>"

	cont.innerHTML = temp;


	/**
	 * For the charts 
         */
	chart = "<br><br>[";
	for(i = 1; i < sppc.sysLifetime; i++)
		chart += Math.round(sppc.costsComul[i] / (sppc.energyComul[i] / 1000) * 1000) / 1000 + ", ";
	
	chart += Math.round(sppc.costsComul[i] / (sppc.energyComul[sppc.sysLifetime] / 1000) * 1000) / 1000 + "]";
	
	cont.innerHTML = temp + chart;
}

/* Reference case:
 . By the solstice the system is generating 5 times the nameplate capacity
 . Half of this amount must be stored to be used during less sunny hours 2.5 kWh
 . A 12 V 245 AH batery costs 450 € and stores about 3 kWh 
   http://www.affordable-solar.com/store/deka-mk-batteries
 . Plus controler?
*/


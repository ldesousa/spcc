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
* Date: 22-07-2013
*
* Charting functions.
*/

spcc.charts = spcc.charts || { };

spcc.charts.renderCostTime = function(container, chartSeries, chartCategories) 
{
	chart = new Highcharts.Chart({
            chart: {
                renderTo: container,
                type: 'line',
                marginRight: 25,
                marginBottom: 36
            },
            title: {
                text: 'Solar Power Cost',
                x: -20 //center
            },
            subtitle: {
                text: 'As function of system lifetime',
                x: -20
            },
            xAxis: {
    		title: {
                    text: 'Lifetime (years)'
                },
                categories: chartCategories
            },
            yAxis: {
                title: {
                    text: 'Cost (€/kWh)'
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
            },
            tooltip: {
                formatter: function() {
                        return '<b>'+ this.series.name +'</b><br/>'+
                        this.x +': '+ this.y +' €/kWh';
                }
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'top',
                x: -13,
                y: 43,
                borderWidth: 0
            },
            series: [{
                name: 'Cost',
                data: chartSeries
            }],
			labels: {
			  items: [{
				   html: "Luís de Sousa 2013",
				   style: {
						left: '0px',
						top: '276px',
						font: '5pt'
						}
			   		},{
			   		html: "AtTheEdgeOfTime.blogspot.com",
			   		style: {
						left: '0px',
						top: '290px',
						font: '5pt'
						}
			   		}]
			  }
        });
};

spcc.charts.renderPie = function(renderTo, subTitle, dataItems) 
{
chart = new Highcharts.Chart({
    chart: {
      renderTo: renderTo, //'pie-container',
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false
 },
 title: {
     text: 'Solar System Costs Share',
  x: -20
 },
 subtitle: {
  text: subTitle,
  x: -20
 },
 tooltip: {
  pointFormat: '<b>{point.y} %', //'{series.name}: <b>{point.percentage}%',
  percentageDecimals: 1
 },
 plotOptions: {
     pie: {
         allowPointSelect: true,
         cursor: 'pointer',
         dataLabels: {
             enabled: true,
             color: '#FFFFFF',
             connectorColor: '#FFFFFF',
             formatter: function() {
                 return '<b>'+ this.point.name +'</b>: '+ Math.round(this.percentage) +' %';
             }
         }
     }
 },
 series: [{
     type: 'pie',
     name: 'Costs share (€)',
     data: dataItems
 }],
 labels: {
  items: [{
   html: "Luís de Sousa 2013",
   style: {
    left: '220px',
    top: '328px',
    font: '5pt'
    }
   },{
   html: "AtTheEdgeOfTime.blogspot.com",
   style: {
    left: '0px',
    top: '328px',
    font: '5pt'
    }
   }]
  } 
    });
};

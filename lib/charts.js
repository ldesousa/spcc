/**
* @author Luis de Sousa [luis.a.de.sousa@gmail.com]
* Date: 22-07-2013
*
* Main calculations.
*/

spcc.charts = spcc.charts || { };

spcc.charts.renderCostTime = function(container) {
chart = new Highcharts.Chart({
            chart: {
                renderTo: container,
                type: 'line',
                marginRight: 25,
                marginBottom: 36
            },
            title: {
                text: 'Solar Power Price',
                x: -20 //center
            },
            subtitle: {
                text: 'Including financial and storage costs',
                x: -20
            },
            xAxis: {
    		title: {
                    text: 'Lifetime (years)'
                },
                categories: ['10', '11', '12', '13', '14', '15', '16', '17',
      '18', '19', '20', '21', '22', '23', '24', '25', '26', '27',
     '28', '29', '30']
            },
            yAxis: {
                title: {
                    text: 'Price (&euro;/kWh)'
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
                        this.x +': '+ this.y +' &#8364;/kWh';
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
                name: '900 Wh/Wp',
                data: [0.299, 0.360, 0.333, 0.310, 0.290, 0.273, 0.258, 0.245, 0.234, 0.223, 0.214,
         0.251, 0.241, 0.233, 0.225, 0.217, 0.210, 0.204, 0.198, 0.193, 0.187]
            }, {
                name: '1100 Wh/Wp',
                data: [0.245, 0.295, 0.273, 0.254, 0.238, 0.224, 0.211, 0.201, 0.191, 0.183, 0.175,
        0.205, 0.198, 0.190, 0.184, 0.178, 0.172, 0.167, 0.162, 0.158, 0.153]
            }, {
                name: '1300 Wp/Wp',
                data: [0.207, 0.249, 0.231, 0.215, 0.201, 0.189, 0.179, 0.170, 0.162, 0.154, 0.148,
        0.174, 0.167, 0.161, 0.155, 0.150, 0.146, 0.141, 0.137, 0.133, 0.130]
            }]
        });
}

function showGraphDialog(renderTo){

 document.getElementById(renderTo).style.height = '600px';
 renderChart(renderTo);

   $("#" + renderTo).dialog({
	width: 'auto',
	height: 'auto',
	//colour: blue,
	margin: 20,
	modal: true,
	buttons: {
	 Close: function() {
	 $( this ).dialog( "close" );
	 }
	}
  });

 
}



    function getData() {
        var token = localStorage.getItem('token');
        var url = 'http://lagpostume.com/api/last-five?token='+token;       
        jQuery.get(url, function (data) {
            if (data['scores']) {
               localStorage.setItem('data', JSON.stringify(data['scores'].reverse()));
               if (data['scores'].length === 0) {
                   localStorage.setItem('data', false);
               }
               localStorage.setItem('data-date', JSON.stringify(data['date'].reverse()));
            }

        })         
    }


    
    var BePagesDashboard = function() {
        getData();
        // Chart.js Charts, for more examples you can check out http://www.chartjs.org/docs
        var initDashboardChartJS = function () {
            // Set Global Chart.js configuration
            Chart.defaults.global.defaultFontColor              = '#555555';
            Chart.defaults.scale.gridLines.color                = "transparent";
            Chart.defaults.scale.gridLines.zeroLineColor        = "transparent";
            Chart.defaults.scale.display                        = false;
            Chart.defaults.scale.ticks.beginAtZero              = true;
            Chart.defaults.global.elements.line.borderWidth     = 2;
            Chart.defaults.global.elements.point.radius         = 5;
            Chart.defaults.global.elements.point.hoverRadius    = 7;
            Chart.defaults.global.tooltips.cornerRadius         = 3;
            Chart.defaults.global.legend.display                = false;
    
            // Chart Containers
            var chartDashboardLinesCon  = jQuery('.js-chartjs-dashboard-lines');
            var chartDashboardLinesCon2 = jQuery('.js-chartjs-dashboard-lines2');

            
            var token = localStorage.getItem('token');
            
            
    
            // Lines Charts Data
            var chartDashboardLinesData = {
                labels: JSON.parse(localStorage.getItem('data-date')),
                datasets: [
                    {
                        label: 'Last Five Aggregate Results',
                        fill: true,
                        backgroundColor: 'rgba(66,165,245,.25)',
                        borderColor: 'rgba(66,165,245,1)',
                        pointBackgroundColor: 'rgba(66,165,245,1)',
                        pointBorderColor: '#fff',
                        pointHoverBackgroundColor: '#fff',
                        pointHoverBorderColor: 'rgba(66,165,245,1)',
                        data: JSON.parse(localStorage.getItem('data'))
                    }
                ]
            };
    
            var chartDashboardLinesOptions = {
                scales: {
                    yAxes: [{
                        ticks: {
                            suggestedMax: 100
                        }
                    }]
                },
                tooltips: {
                    callbacks: {
                        label: function(tooltipItems, data) {
                            return ' ' + tooltipItems.yLabel + ' percent';
                        }
                    }
                }
            };
    
    
    
            // Init Charts
            if ( chartDashboardLinesCon.length ) {
                chartDashboardLines  = new Chart(chartDashboardLinesCon, { type: 'line', data: chartDashboardLinesData, options: chartDashboardLinesOptions });
            }
        };
    
        return {
            init: function () {
                // Init Chart.js Charts
                initDashboardChartJS();
            }
        };
    }();
    
    // Initialize when page loads
    jQuery(function(){ BePagesDashboard.init(); });
    

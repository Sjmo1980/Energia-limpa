am4core.useTheme(am4themes_amchartsdark);
am4core.useTheme(am4themes_animated);

// main container
var mainContainer = am4core.create("introchart", am4core.Container);
mainContainer.width = am4core.percent(100);
mainContainer.height = am4core.percent(100);

var radarChart = mainContainer.createChild(am4charts.RadarChart);

radarChart.data = [{
    "category": "So",
    "value": 10
}, {
    "category": "can",
    "value": 20
}, {
    "category": "your",
    "value": 30
}, {
    "category": "charts",
    "value": 40
}, {
    "category": "do",
    "value": 50
}, {
    "category": "this?",
    "value": 60
}]

radarChart.padding(10, 10, 10, 10);
radarChart.zIndex = 40;
radarChart.radius = am4core.percent(100);
radarChart.zoomOutButton.disabled = true;
radarChart.width = 400;
radarChart.x = am4core.percent(50);
radarChart.y = am4core.percent(50);
radarChart.horizontalCenter = "middle";
radarChart.verticalCenter = "middle";

radarChart.startAngle = 269.9;
radarChart.endAngle = 270.1;

radarChart.innerRadius = am4core.percent(40);

var categoryAxis = radarChart.xAxes.push(new am4charts.CategoryAxis());
categoryAxis.dataFields.category = "category";
categoryAxis.renderer.minGridDistance = 10;
categoryAxis.renderer.grid.template.location = 0;
categoryAxis.renderer.labels.template.disabled = true;

var valueAxis = radarChart.yAxes.push(new am4charts.ValueAxis());
valueAxis.renderer.minGridDistance = 10;
valueAxis.renderer.grid.template.strokeOpacity = 0.05;
valueAxis.renderer.labels.template.disabled = true;
valueAxis.renderer.axisAngle = radarChart.startAngle;
valueAxis.min = 0;
valueAxis.max = 70;
valueAxis.strictMinMax = true;

var radarSeries = radarChart.series.push(new am4charts.RadarColumnSeries());
radarSeries.columns.template.width = am4core.percent(80);
radarSeries.dataFields.categoryX = "category";
radarSeries.columns.template.tooltipText = "{categoryX}";
radarSeries.dataFields.valueY = "value";
radarSeries.columns.template.radarColumn.cornerRadius = 4;
radarSeries.columns.template.radarColumn.innerCornerRadius = 0;
radarSeries.columns.template.strokeOpacity = 0;
radarSeries.defaultState.transitionDuration = 500;
radarSeries.sequencedInterpolation = true;

radarSeries.columns.template.adapter.add("fill", function(fill, target) {
    if (target.dataItem) {
        return radarChart.colors.getIndex(5 - target.dataItem.index);
    }
})

radarChart.events.on("ready", bend);

function bend() {
    var animation = radarChart.animate([{ property: "startAngle", to: 90 }, { property: "endAngle", to: 450 }], 3500, am4core.ease.cubicIn).delay(1000);
    animation.events.on("animationended", unbend);
}


function unbend() {
    var animation = radarChart.animate([{ property: "startAngle", to: 269.9 }, { property: "endAngle", to: 270.1 }], 3500, am4core.ease.cubicIn).delay(500);
    animation.events.on("animationended", bend);
}
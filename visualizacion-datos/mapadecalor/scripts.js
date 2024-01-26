var contenedor = d3
  .select('.fondobarras')
  .append('svg')
  .attr('width', 1280)
  .attr('height', 550);

d3.json("https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json")
.then(data => {

  var fecha = data.monthlyVariance.map(function (item) {
    return item.year;
  });

  var mes = data.monthlyVariance.map(function (item) {
    return item.month;
  });

  const xScale = d3.scaleLinear()
    .domain([d3.min(fecha) - 1, d3.max(fecha)])
    .range([0, 1100]);

  const xAxis = d3.axisBottom(xScale).tickFormat(d3.format('d'));

  const yScale = d3.scaleLinear()
    .domain([parseFloat(d3.max(mes)) - 1, parseFloat(d3.min(mes)) - 1])
    .range([450, 45]);

  const yAxis = d3.axisLeft(yScale).tickFormat(function (month) {
    var date = new Date(0);
    date.setUTCMonth(month);
    var format = d3.utcFormat('%B');
    return format(date);
  });
  
  contenedor
    .append('g')
    .call(xAxis)
    .attr('id', 'x-axis')
    .attr('transform', 'translate(90, 470)');

  contenedor
    .append('g')
    .call(yAxis)
    .attr('id', 'y-axis')
    .attr('transform', 'translate(90, 0)');
  
  var tooltip = d3
    .select(".datoscaja")
    .append("div")
    .attr("id", "tooltip");

  d3.select('svg')
    .append('g')
    .selectAll('rect')
    .data(data.monthlyVariance)
    .enter()
    .append('rect')
    .attr('class', 'cell')
    .attr('data-month', function (d) {
      return d.month - 1;
    })
    .attr('data-year', function (d) {
      return d.year;
    })
    .attr('data-temp', function (d) {
      return data.baseTemperature + d.variance;
    })
    .attr('x', d => xScale(d.year))
    .attr('y', d => yScale(d.month))
    .attr('width', 1100/262)
    .attr('height', 450/12)
    .attr('transform', 'translate(90, -56.25)')
    .attr('fill', function (d) {
      var colorVar = Number(d.variance);
      var colorCelda = "";
      switch (true) {
        case (colorVar < -4):
          colorCelda = "#000aa0ff";
          break;
        case (colorVar >= -4 && colorVar < -3):
          colorCelda = "#61edfdff";
          break; 
        case (colorVar >= -3 && colorVar < -1.5):
          colorCelda = "#b9eef6ff";
          break;
        case (colorVar >= -1.5 && colorVar < -0.5):
          colorCelda = "#d7f6c3ff";
          break; 
        case (colorVar >= -0.5 && colorVar < 0.5):
            colorCelda = "#fffe82ff";
          break;
        case (colorVar >= 0.5 && colorVar < 1.25):
            colorCelda = "#ffc678ff";
          break; 
        case (colorVar >= 1.25 && colorVar < 3):
            colorCelda = "#ff9e00ff";
          break;
        case (colorVar >= 3 && colorVar < 4):
            colorCelda = "#d40000ff";
          break;
        case (colorVar >= 4):
            colorCelda = "#920000ff";
          break;               
        default:
          colorCelda = "#fffe82ff"; 
      } return colorCelda
    })
    .on('mouseover', function (event, d) {
      tooltip
      .attr("data-year", this.getAttribute('data-year'))
      .style("opacity", 1)
      .style("color", this.getAttribute('fill') === "#000aa0ff" || this.getAttribute('fill')  === "#920000ff" || this.getAttribute('fill')  === "#d40000ff" ? "#fff" : "#000"

      )
      .style("margin-left", parseFloat(this.getAttribute("x")) + 108 + "px")
      .style("top", parseFloat(this.getAttribute("y")) + 36 + "px")
      .style("background-color", this.getAttribute('fill'))
      .html(
         "Año: " + d3.utcFormat('%Y - %B')(new Date(d.year, d.month)) + '<br/><br/>'
        + "Temperatura: " + Number(this.getAttribute('data-temp')).toPrecision(2) 
        + '<br/><br/>' + "Diferencia: " + d.variance
      )
    })
    .on("mouseout", function (event, d) {
      tooltip
        .style("opacity", 0)
        .style("margin-left", 0)
        .style("top", 0)
        .style("background-color", "#ff0000")
    });

  d3.select(".fondobarras")
    .append("div")
    .attr("id", "legend");
    
  const xScaleVar = d3.scaleLinear()
    .domain([1.7, 14])
    .range([0, 450]);

  const xAxisVar = d3.axisBottom(xScaleVar);

  const leyenda = d3.select("#legend")
    .append("svg")
    .attr('width', 459)
    .attr('height', 135)
    .attr('transform', 'translate(392.5, 0)');

  leyenda
    .append('g')
    .call(xAxisVar)
    .attr('id', 'x-axisVar')
    .attr('transform', 'translate(0, 50)');
      
  leyenda
    .append('g')
    .selectAll('rect')
    .data([1.7, 3.2, 4.7, 6.2, 7.7, 9.2, 10.7, 12.8, 14])
    .enter()
    .append('rect')
    .attr("width", 450 / 9)
    .attr("height", 45)
    .attr("x", function (d, i) {
      var nose = Number(i) * 50
      return nose
    })
    .attr("fill", function (d, i) {
      var colorVar = i;
      var colorCelda = "";
      switch (true) {
        case (colorVar == 0):
          colorCelda = "#000aa0ff";
          break;
        case (colorVar == 1):
          colorCelda = "#61edfdff";
          break; 
        case (colorVar == 2):
          colorCelda = "#b9eef6ff";
          break;
        case (colorVar == 3):
          colorCelda = "#d7f6c3ff";
          break; 
        case (colorVar == 4):
          colorCelda = "#fffe82ff";
          break;
        case (colorVar == 5):
          colorCelda = "#ffc678ff";
          break; 
        case (colorVar == 6):
          colorCelda = "#ff9e00ff";
          break;
        case (colorVar == 7):
          colorCelda = "#d40000ff";
          break;
        case (colorVar == 8):
          colorCelda = "#920000ff";
          break;               
        default:
          colorCelda = "#fffe82ff"; 
      } return colorCelda
    });  
  

}).catch(e => console.log(e));


var widthContenedor = 900;
var heightContenedor = 450;
var widthBarra = widthContenedor / 275;

var contenedor = d3
  .select('.fondobarras')
  .append('svg')
  .attr('width', widthContenedor + 100)
  .attr('height', heightContenedor + 100);

d3.json("https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json")
.then(data => {

  var fecha = data.data.map(function (item) {
    return new Date(item[0]);
  });

  var minDate = new Date(data.data[0][0]);
  var maxDate = new Date(data.data[274][0]);

  var GDP = data.data.map(function (item) {
    return (item[1]);
  });
  
  const xScale = d3.scaleTime()
                 .domain([minDate, maxDate])
                 .range([0, widthContenedor + 27]);
  const xAxis = d3.axisBottom(xScale);
  
  const yScale = d3.scaleLinear()
                 .domain([0, d3.max(GDP)])
                 .range([heightContenedor, 27]);
  const yAxis = d3.axisLeft(yScale);
  
    contenedor
      .append('g')
      .call(xAxis)
      .attr('id', 'x-axis')
      .attr('transform', 'translate(53, 450)')
      .attr("color", "white");

    contenedor
      .append('g')
      .call(yAxis)
      .attr('id', 'y-axis')
      .attr('transform', 'translate(53, 0)');
   
    var tooltip = d3
      .select(".datoscaja")
      .append("div")
      .attr("id", "tooltip");

    d3.select('svg')
      .selectAll('rect')
      .data(GDP)
      .enter()
      .append('rect')
      .attr('data-date', function (d, i) {
        return data.data[i][0];
      })
      .attr('data-gdp', function (d, i) {
        return data.data[i][1];
      })
      .attr('class', 'bar')
      .attr('x', function(d, i) {
        return xScale(fecha[i]);
      })
      .attr('y', function (d, i) {
        return yScale(GDP[i]);
      })
      .attr('width', widthContenedor / 275)
      .attr('height', function (d, i) {
        return heightContenedor - yScale(GDP[i]);
      })
      .attr('transform', 'translate(53, 0)')
      .on('mouseover', function (event, d,) {

        var trimestre = this.getAttribute('data-date').substring(5,7);
        switch (trimestre) {
          case "01":
            trimestre = "1";
            break;
          case "04":
            trimestre = "2";
            break;
          case "07":
            trimestre = "3";
            break;
          case "10":
            trimestre = "4";
            break;
          default:
            trimestre = ""; 
        } 
          
          tooltip
          .attr('data-date', this.getAttribute('data-date'))
          .style("opacity", 1)
          .style("color", "#43565cff")
          .style("margin-left", parseFloat(this.getAttribute("x")) + widthBarra + 50 + "px")
          .style("top", this.getAttribute("y") + "px")
          .html(parseInt(this.getAttribute('data-date')) + " Trimestre: " + "<span>" +trimestre +"</span>" + "<br/>" + "$" + this.getAttribute('data-gdp') + " Billion")
      })
      .on("mouseout", function (d, i) {
        tooltip
          .style("opacity", 0)
    })

}).catch(e => console.log(e));


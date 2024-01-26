var contenedor = d3
  .select('.fondobarras')
  .append('svg')
  .attr('width', 1080)
  .attr('height', 550);

d3.json("https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json")
.then(data => {

  var fecha = data.map(function (item) {
    return item.Year;
  });

  var tiempo = data.map(function (d) {
    var item = new Date(1980 + "-01-01T01:" + d.Time);
    return item;
  });

  const xScale = d3.scaleLinear()
    .domain([d3.min(fecha) - 1, d3.max(fecha) + 1])
    .range([0, 900]);

  const xAxis = d3.axisBottom(xScale).tickFormat(d3.format('d'));

  const yScale = d3.scaleTime()
    .domain([new Date(d3.max(tiempo).getTime() + 15000), d3.min(tiempo)])
    .range([450, 45]);

  const yAxis = d3.axisLeft(yScale).tickFormat(d3.timeFormat('%M:%S'));

    contenedor
      .append('g')
      .call(xAxis)
      .attr('id', 'x-axis')
      .attr('transform', 'translate(90, 495)')
      .attr("color", "white");

    contenedor
      .append('g')
      .call(yAxis)
      .attr('id', 'y-axis')
      .attr('transform', 'translate(90, 45)')
      .attr("color", "white");

    var tooltip = d3
      .select(".datoscaja")
      .append("div")
      .attr("id", "tooltip");

    d3.select('svg')
      .selectAll('circle')
      .data(data)
      .enter()
      .append('circle')
      .attr("fill",  function (d) {
        if (d.Doping === "") {
          return "#ffcc00ff"
        } else {
          return "#800000ff"
        }
      })
      .attr('data-xvalue', function (d) {
        return d.Year;
      })
      .attr('data-yvalue', (function (d) {
        var datotiempo = new Date(1980 + "-01-01T00:" + d.Time);
        return (datotiempo)
      }))
      .attr('class', 'dot')
      .attr('r', 7)
      .attr('cx', function(d) {
        return xScale(d.Year);
      })
      .attr('cy', function (d) {
        return yScale(new Date(1980 + "-01-01T01:" + d.Time));
      })
      .attr('transform', 'translate(90, 45)')
      .on('mouseover', function (event, d) {
          tooltip
          .attr("data-year", this.getAttribute('data-xvalue'))
          .style("opacity", 1)
          .style("color", "#ffffff")
          .style("margin-left", parseFloat(this.getAttribute("cx")) + 108 + "px")
          .style("top", parseFloat(this.getAttribute("cy")) + 36 + "px")
          .html(
            d.Name + ' - ' + d.Nationality + ' - ' + d.Year + '<br/><br/>' +
            'Time: ' + d.Time +
            (d.Doping ? '<br/><br/>' + d.Doping : '')
          )
      })
      .on("mouseout", function (event, d) {
        tooltip
          .style("opacity", 0)
          .style("margin-left", 0)
          .style("top", 0)
      })
    
      d3.select(".fondobarras")
        .append("div")
        .attr("id", "legend");

      const leyenda = d3.select("#legend")
        .append("svg")
        .attr('width', 270)
        .attr('height', 45);

      leyenda
        .append('circle')
        .attr('r', 7)
        .attr('cx', 9)
        .attr('cy', 12)
        .attr("fill",  "#ffcc00ff");

      leyenda
        .append('text')
        .attr('width', 270)
        .attr('height', 90)
        .attr('x', 27)
        .attr('y', 18)
        .attr("fill",  "#ffffff")
        .text("No doping allegations");

      leyenda
        .append('circle')
        .attr('r', 7)
        .attr('cx', 9)
        .attr('cy', 36)
        .attr("fill",  "#800000ff");
        
      leyenda
        .append('text')
        .attr('width', 270)
        .attr('height', 90)
        .attr('x', 27)
        .attr('y', 42)
        .attr("fill",  "#ffffff")
        .text("Riders with doping allegations");

}).catch(e => console.log(e));


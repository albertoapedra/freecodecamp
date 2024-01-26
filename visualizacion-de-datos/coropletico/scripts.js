Promise.all([
  d3.json('https://raw.githubusercontent.com/no-stack-dub-sack/testable-projects-fcc/master/src/data/choropleth_map/counties.json'),
  d3.json('https://raw.githubusercontent.com/no-stack-dub-sack/testable-projects-fcc/master/src/data/choropleth_map/for_user_education.json')])
  .then(data => mapa(data[0], data[1]))
  .catch(err => console.log(err));

var tooltip = d3
.select(".datoscaja")
.append("div")
.attr("id", "tooltip");

function mapa(us, education) {

  d3.select('svg')
    .append('g')
    .attr('class', 'counties')
    .selectAll('path')
    .data(topojson.feature(us, us.objects.counties).features)
    .enter()
    .append('path')
    .attr('class', 'county')
    .attr('data-fips', function (d) {
      return d.id;
    })
    .attr('data-education', function (d) {
      var pareja = education.filter(function (obj) {
        return obj.fips === d.id;
      });
      return pareja[0].bachelorsOrHigher;
    })
    .attr('fill', function (d) {
      var colorVar = this.getAttribute('data-education');
        switch (true) {
        case (colorVar < 9):
          colorCelda = "#023e57ff";
          break;
        case (colorVar >= 9 && colorVar < 18):
          colorCelda = "#366376ff";
          break; 
        case (colorVar >= 18 && colorVar < 27):
          colorCelda = "#79929dff";
          break;
        case (colorVar >= 27 && colorVar < 36):
          colorCelda = "#a7b3b8ff";
          break; 
        case (colorVar >= 36 && colorVar < 45):
            colorCelda = "#cecfcfff";
          break;
        case (colorVar >= 45 && colorVar < 54):
            colorCelda = "#d4c1b8ff";
          break; 
        case (colorVar >= 54 && colorVar < 63):
            colorCelda = "#e29c7dff";
          break;
        case (colorVar >= 63):
            colorCelda = "#ff0000ff";
          break;              
        default:
          colorCelda = "#cecfcfff"; 
      } return colorCelda
    })
    .attr('d', d3.geoPath())
    .on('mouseover', function (event, d) {
      
        tooltip
        .attr("data-education", this.getAttribute('data-education'))
        .style("opacity", 1)
        .style("color", "#fff")
        .style('margin-left', event.pageX + 27 + 'px')
        .style('top', event.pageY + 27 + 'px')
        .style("background-color", this.getAttribute('fill'))
        .html(
          function () {
            var pareja = education.filter(function (obj) {
              return obj.fips === d.id;
            });
              return (
                pareja[0]['area_name'] +
                '<br/><br/>' +
                pareja[0]['state'] +
                '<br/><br/>' +
                pareja[0].bachelorsOrHigher +
                '%'
              );
            
          }
        );
    })
    .on('mouseout', function () {
      tooltip
      .style("opacity", 0)
    });

    d3.select('svg')
    .append('path')
    .datum(
      topojson.mesh(us, us.objects.states, function (a, b) {
        return a !== b;
      })
    )
    .attr('class', 'states')
    .attr('d', d3.geoPath());

    const xScaleVar = d3.scaleLinear()
    .domain([2, 72])
    .range([0, 405]);

  const xAxisVar = d3.axisBottom(xScaleVar).tickFormat(function (x) {
    return Math.round(x) + '%';
  });
    d3.select(".contenedor")
      .append("div")
      .attr("id", "legend");

    const leyenda = d3.select("#legend")
      .append("svg")
      .attr('width', 414)
      .attr('height', 135)
      .attr('transform', 'translate(417, 0)');

    leyenda
      .append('g')
      .call(xAxisVar)
      .attr('id', 'x-axisVar')
      .attr('transform', 'translate(0, 50)');
      
      leyenda
      .append('g')
      .selectAll('rect')
      .data([0, 9, 18, 27, 36, 45, 54, 63])
      .enter()
      .append('rect')
      .attr("width", 405 / 8)
      .attr("height", 45)
      .attr("x", function (d, i) {
        var nose = Number(i) * 50.625
        return nose
      })
      .attr("fill", function (d, i) {
        var colorVar = i;
        var colorCelda = "";
        switch (true) {
          case (colorVar == 0):
            colorCelda = "#023e57ff";
            break;
          case (colorVar == 1):
            colorCelda = "#366376ff";
            break; 
          case (colorVar == 2):
            colorCelda = "#79929dff";
            break;
          case (colorVar == 3):
            colorCelda = "#a7b3b8ff";
            break; 
          case (colorVar == 4):
              colorCelda = "#cecfcfff";
            break;
          case (colorVar == 5):
              colorCelda = "#d4c1b8ff";
            break; 
          case (colorVar == 6):
              colorCelda = "#e29c7dff";
            break;
          case (colorVar == 7):
              colorCelda = "#ff0000ff";
            break;               
          default:
            colorCelda = "#cecfcfff"; 
        } return colorCelda
      });

      leyenda
      .append("text")
      .html("Fuente: " + "<a href='https://www.ers.usda.gov/data-products/county-level-data-sets/download-data.aspx'>"+ " USDA Economic Research Service" + "</a>")
      .attr("y", 100)

}

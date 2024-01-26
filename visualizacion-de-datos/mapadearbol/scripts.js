const DATOS = {
  videojuegos: {
    titulo: 'Ventas de videojuegos',
    descripcion: 'Los 100 videojuegos más vendidos agrupados por plataforma',
    url: 'https://cdn.rawgit.com/freeCodeCamp/testable-projects-fcc/a80ce8f9/src/data/tree_map/video-game-sales-data.json'
  },
  peliculas: {
    titulo: 'Ventas de películas',
    descripcion: 'Las 100 películas más taquilleras agrupadas por género',
    url: 'https://cdn.rawgit.com/freeCodeCamp/testable-projects-fcc/a80ce8f9/src/data/tree_map/movie-data.json'
  },
  kickstarter: {
    titulo: 'Donaciones de Kickstarter',
    descripcion: 'Las 100 campañas de Kickstarter con más donaciones agrupadas por categoría',
      url: 'https://cdn.rawgit.com/freeCodeCamp/testable-projects-fcc/a80ce8f9/src/data/tree_map/kickstarter-funding-data.json'
  }
};

const urls = new URLSearchParams(window.location.search);
const datosInicio = 'videojuegos';
const DATASET = DATOS[urls.get('data') || datosInicio];

document.getElementById('data-selector').innerHTML = 
  "<a href=" + "?data=videojuegos" +  ">" + DATOS.videojuegos.titulo
  + "</a> " + "|" + " <a href=" + "?data=peliculas" +  ">" + DATOS.peliculas.titulo
  + "</a>" + "|" + " <a href=" + "?data=kickstarter" +  ">" + DATOS.kickstarter.titulo + "</a>";
document.getElementById('title').innerHTML = DATASET.titulo;
document.getElementById('description').innerHTML = DATASET.descripcion;

var colorCelda = d3.scaleOrdinal().range(
  [ '#000000ff',
    '#7c8285ff',
    '#bfbdb0ff',
    '#67161cff',
    '#3f6148ff',
    '#dbd3a4ff',
    '#b2c8bdff',
    '#165b65ff',
    '#fdd666ff',
    '#dc9018ff',
    '#b24f3fff',
    '#b51f29ff',
    '#405000ff',
    '#cd5700ff',
    '#8c8100ff',
    '#629d00ff',
    '#a4804cff',
    '#4b5f80ff',
    '#f4979cff',
  ]
);

var tooltip = d3.select('body')
  .append('div')
  .attr('class', 'tooltip')
  .attr('id', 'tooltip')
  .style('opacity', 0);

var treemap = d3.treemap().size([999, 630]).paddingInner(1);

d3.json(DATASET.url)
  .then(data => {
    var root = d3
      .hierarchy(data)
      .sum(function(d){ return d.value}).sort(function (a, b) {
        return b.height - a.height || b.value - a.value;
      });

    treemap(root);

    var celda = d3.select('#tree-map')
      .selectAll('g')
      .data(root.leaves())
      .enter()
      .append('g')
      .attr('class', 'group')
      .attr('transform', function (d) {
        return 'translate(' + d.x0 + ',' + d.y0 + ')';
      });

    celda
      .append('rect')
      .attr('id', function (d) {
        return d.data.id;
      })
      .attr('class', 'tile')
      .attr('width', function (d) {
        return d.x1 - d.x0;
      })
      .attr('height', function (d) {
        return d.y1 - d.y0;
      })
      .attr('fill', function (d) {
        return colorCelda(d.data.category);
      })
      .attr('data-name', function (d) {
        return d.data.name;
      })
      .attr('data-category', function (d) {
        return d.data.category;
      })
      .attr('data-value', function (d) {
        return d.data.value;
      })
      .on('mousemove', function (event, d) {
        tooltip.style('opacity', 0.81)
          .attr('data-value', d.data.value)
      })
      .on('mouseout', function () {
        tooltip.style('opacity', 0);
      })
    .select("foreignObject")
    .data(root.leaves())
    .enter()
    .append("foreignObject")
    .attr('fill', function (d) {
      return colorCelda(d.data.category);
    })
    .on('mousemove', function (event, d) {
      tooltip
        .html(
          '<p>Name: ' +
            d.data.name +
            '<br>Category: ' +
            d.data.category +
            '<br>Value: ' +
            d.data.value + '</p>'
        )
        .attr('data-value', d.data.value)
        .style("opacity", 0.81)
        .style('left', event.pageX + 10 + 'px')
        .style('top', event.pageY - 28 + 'px')
        .style('background-color', this.getAttribute("fill"))
        ;
    })
    .on('mouseout', function () {
      tooltip.style('opacity', 0);
    })
    .attr('x', function (d) { return d.x0; })
    .attr('y', function (d) { return d.y0; })
    .attr('width', function (d) {
      return d.x1 - d.x0;
    })
    .attr('height', function (d) {
      return d.y1 - d.y0;
    })
    .append("xhtml:div")
    .style("color", "#fff")
    .style("padding", "5px")
    .style("font-size", "0.63em")
    .style("user-select", "none")
    .html(function(d){ return d.data.name})
    ;

    var legendElemento = d3.select('#legend')
      .append('g')
      .attr('transform', 'translate(18,' + 15 + ')')
      .selectAll('g')
      .data(root.descendants().filter(function(d){return d.depth==1}))
      .enter()
      .append('g')
      .attr('transform', function (d, i) {
        return (
          'translate(' +
          (i % 6) * 171 +
          ',' +
          (Math.floor(i / 6) * 15 +
            15 * Math.floor(i / 6)) +
          ')'
        );
      })
      .style("border", "solid black 1px");

    legendElemento
      .append('rect')
      .attr('width', 18)
      .attr('height', 18)
      .attr('class', 'legend-item')
      .attr('fill', function (d) {
        return colorCelda(d.data.name);
      });

    legendElemento
      .append('text')
      .attr('x', 27)
      .attr('y', 15)
      .text(function(d){ return d.data.name });
  })
  .catch(err => console.log(err));

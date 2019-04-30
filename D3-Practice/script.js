// let data = [12, 92, 45, 87, 93, 15, 76];
d3.csv("example-data.csv", function (error, data) {

    console.log(data);
    let margin = {
        top: 30,
        right: 15,
        bottom: 30,
        left: 30
    },
        width = 420 - margin.right - margin.left,
        height = 500 - margin.top - margin.bottom,
        barHeight = height / data.length,
        w = d3.scale.linear()
            .range([0, width])
            .domain([0, d3.max(data, function (d) {
                return d.value;
            })]),
        chart = d3.select("#chart")
            .attr("width", width + margin.right + margin.left)
            .attr("height", barHeight * data.length + margin.top + margin.bottom)
            .append('g')
            .attr("transform", "translate(" + margin.left + ", " + margin.top + ")"),
        bar = chart.selectAll("g")
            .data(data)
            .enter()
            .append("g")
            .attr("transform", function (d, i) {
                console.log(d);
                return "translate(0," + i * barHeight + ")";
            });

    bar.append("rect")
        .attr("width", function (d) {
            return w(d.value);
        })
        .attr("height", barHeight - 1)
        .style("fill", "#FED100");

    bar.append("text")
        .attr("x", function (d) {
            return w(d.value) - 5;
        })
        .attr('y', barHeight/2)
        .attr('dy', '.25em')
        .text(function(d) {
            return d.title + ", " + d.value;
        });

    let xAxis = d3.svg.axis()
        .scale(w)
        .orient('bottom')
        .ticks(5);
    chart.append('g')
        .attr('class', 'xaxis')
        .attr('transform', 'translate(0, ' + height + ')')
        .call(xAxis);

});


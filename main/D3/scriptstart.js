// Set dimensions and margins for the chart

const margin = { top: 70, right: 30, bottom: 40, left: 80 };
const width = 1500 - margin.left - margin.right;
const height = 500 - margin.top - margin.bottom;

// Set up the x and y scales

const x = d3.scaleTime()
  .range([0, width]);

const y = d3.scaleLinear()
  .range([height, 0]);

// Create the SVG element and append it to the chart container

const svg = d3.select("#chart-container")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

/// // Load and Process Data

d3.csv("transactions.csv").then(function(data) {
    // Custom comparison function to sort by date
    function sortByDate(a, b) {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateA - dateB;
    }

    // Sort the data array by date
    data.sort(sortByDate);

    // Print the sorted data
    

const parseDate = d3.timeParse("%Y-%m-%d");
data.forEach(d => {d.date = parseDate(d.date); d.amount =-d.amount;
});
console.log(data);

x.domain(d3.extent(data, d => d.date));
y.domain([0, d3.max(data, d => d.amount)]);

 svg.selectAll("text")
     .attr("class", "graph-text")


// Add the x-axis

    svg.append("g")
   .style("fill", "white")
  .attr("transform", `translate(0,${height})`)
  .call(d3.axisBottom(x)
    .ticks(d3.timeMonth.every(0.25)) 
    .tickFormat(d3.timeFormat("%b %Y")));



// Add the y-axis

    svg.append("g")
  .style("fill", "white")
  .call(d3.axisLeft(y))


  svg.selectAll("xGrid")
  .data(x.ticks().slice(1))
  .join("line")
  .attr("x1", d => x(d))
  .attr("x2", d => x(d))
  .attr("y1", 0)
  .attr("y2", height)
  .attr("stroke", "#e0e0e0")
  .attr("stroke-width", .5);
 

  // // Add horizontal gridlines

svg.selectAll("yGrid")
.data(y.ticks().slice(1))
.join("line")
.attr("x1", 0)
.attr("x2", width)
.attr("y1", d => y(d))
.attr("y2", d => y(d))
.attr("stroke", "#e0e0e0")
.attr("stroke-width", .5)

svg.append("text")
.attr("transform", "rotate(-90)")
.attr("y", 0 - margin.left)
.attr("x", 0 - (height / 2))
.attr("dy", "1em")
.style("text-anchor", "middle")
.style("font-size", "14px")
.style("fill", "#777")
.style("font-family", "sans-serif")
.text("Total Amount");




// Create the line generator

const line = d3.line()
  .x(d => x(d.date))
  .y(d => y(d.amount));

// Add the line path to the SVG element

svg.append("path")
  .datum(data)
  .attr("fill", "none")
  .attr("stroke", "steelblue")
  .attr("stroke-width", 1)
  .attr("d", line);

  // Add a circle element

  const circle = svg.append("circle")
    .attr("r", 0)
    .attr("fill", "steelblue")
    .style("stroke", "white")
    .attr("opacity", .70)
    .style("pointer-events", "none");

 // create a listening rectangle

 const listeningRect = svg.append("rect")
 .attr("width", width)
 .attr("height", height);

// create the mouse move function

listeningRect.on("mousemove", function (event) {
 const [xCoord] = d3.pointer(event, this);
 const bisectDate = d3.bisector(d => d.date).left;
 const x0 = x.invert(xCoord);
 const i = bisectDate(data, x0, 1);
 const d0 = data[i - 1];
 const d1 = data[i];
 const d = x0 - d0.date > d1.date - x0 ? d1 : d0;
 const xPos = x(d.date);
 const yPos = y(d.amount);


 // Update the circle position

 circle.attr("cx", xPos)
   .attr("cy", yPos);

 // Add transition for the circle radius

 circle.transition()
   .duration(50)
   .attr("r", 5);

 // add in  our tooltip

 tooltip
   .style("display", "block")
   .style("left", `${xPos + 100}px`)
   .style("top", `${yPos + 50}px`)
   .html(`<strong>Date:</strong> ${d.date.toLocaleDateString()}<br><strong>Amount:</strong> ${d.amount !== undefined ? (d.amount / 1).toFixed(0) + '₹' : 'N/A'}`)
});
// listening rectangle mouse leave function

listeningRect.on("mouseleave", function () {
 circle.transition()
   .duration(50)
   .attr("r", 0);

 tooltip.style("display", "none");
});




  const tooltip = d3.select("body")
  .append("div")
  .attr("class", "tooltip");

}).catch(function(error) {
  // Handle any errors that occur during CSV loading
  console.error("Error loading CSV:", error);
});
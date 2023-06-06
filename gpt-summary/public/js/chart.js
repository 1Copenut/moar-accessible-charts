/**
 * DataVizDad YouTube
 * Create Beautiful Line Charts with D3 - D3.js Beginner's Guide
 * https://www.youtube.com/watch?v=g5bp02-CRAc
 */

// Set up dimensions and margins for my chart
const margin = {
  top: 50,
  right: 30,
  bottom: 60,
  left: 90,
};
const width = 1066 - margin.left - margin.right;
const height = 600 - margin.top - margin.bottom;

// Set up the x and y scales
const x = d3.scaleTime().range([0, width]);
const y = d3.scaleLinear().range([height, 0]);

// Create the SVG element and append it to the chart container
const svg = d3
  .select("#line-chart-container")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", `translate(${margin.left},${margin.top})`);

// Add my historical AAPL price data
const dataset = [
  { date: new Date("2023-05-12"), value: 172.57 },
  { date: new Date("2023-05-15"), value: 172.07 },
  { date: new Date("2023-05-16"), value: 172.07 },
  { date: new Date("2023-05-17"), value: 172.69 },
  { date: new Date("2023-05-18"), value: 175.05 },
  { date: new Date("2023-05-19"), value: 175.16 },
  { date: new Date("2023-05-22"), value: 174.2 },
  { date: new Date("2023-05-23"), value: 171.56 },
  { date: new Date("2023-05-24"), value: 171.84 },
  { date: new Date("2023-05-25"), value: 172.99 },
  { date: new Date("2023-05-26"), value: 175.43 },
  { date: new Date("2023-05-30"), value: 177.3 },
  { date: new Date("2023-05-31"), value: 177.25 },
  { date: new Date("2023-06-01"), value: 180.09 },
  { date: new Date("2023-06-02"), value: 180.95 },
  { date: new Date("2023-06-05"), value: 179.35 },
];

// Define the x and y domains
const ceiling = d3.max(dataset, (d) => d.value) + 1;
const floor = d3.min(dataset, (d) => d.value) - 1;
x.domain(d3.extent(dataset, (d) => d.date));
y.domain([floor, ceiling]);

// Add the x-axis
svg
  .append("g")
  .attr("transform", `translate(0,${height})`)
  .call(
    d3
      .axisBottom(x)
      .ticks(d3.timeDay.every(3))
      .tickFormat(d3.timeFormat("%b %d"))
  );

// Add the y-axis
svg.append("g").call(d3.axisLeft(y));

// Add the points for each price
svg
  .append("g")
  .selectAll("dot")
  .data(dataset)
  .enter()
  .append("circle")
  .attr("cx", (d) => x(d.date))
  .attr("cy", (d) => y(d.value))
  .attr("r", 4)
  .style("fill", "steelblue");

// Create the line generator
const line = d3
  .line()
  .x((d) => x(d.date))
  .y((d) => y(d.value));

// Add the line path to the SVG element
svg
  .append("path")
  .datum(dataset)
  .attr("fill", "none")
  .attr("stroke", "steelblue")
  .attr("stroke-width", 2)
  .attr("d", line);

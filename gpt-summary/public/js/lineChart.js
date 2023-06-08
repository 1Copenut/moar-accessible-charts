/**
 * DataVizDad YouTube
 * Create Beautiful Line Charts with D3 - D3.js Beginner's Guide
 * https://www.youtube.com/watch?v=g5bp02-CRAc
 * https://www.youtube.com/watch?v=Wk8pIxcidv8
 */

const cssConf = {
  color: {
    chartLine: "#157bcc",
    trendLine: "#ff7f50",
    gridGray: "#e0e0e0",
    labelGray: "#727272",
  },
  margin: {
    top: 48,
    right: 80,
    bottom: 64,
    left: 8,
  },
};

const { color, margin } = cssConf;
const width = 1072 - margin.left - margin.right;
const height = 600 - margin.top - margin.bottom;

// Set up the x and y scales
const x = d3.scaleTime().range([0, width]);
const y = d3.scaleLinear().range([height, 0]);

// Create the SVG element and append it to the chart container
const svg = d3
  .select("#d3-chart-container")
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
  .attr("class", "xAxis")
  .attr("transform", `translate(-8, ${height})`)
  .style("font-size", "0.825rem")
  .style("font-weight", "bold")
  .call(
    d3
      .axisBottom(x)
      .ticks(d3.timeDay.every(4))
      .tickFormat(d3.timeFormat("%b %d"))
      .tickPadding(10)
  )
  .call((g) => g.select(".domain").remove())
  .selectAll(".tick line")
  .style("stroke-opacity", 0);

// Add the y-axis
svg
  .append("g")
  .attr("class", "yAxis")
  .attr("transform", `translate(${width}, 0)`)
  .style("font-size", "0.825rem")
  .call(
    d3
      .axisRight(y)
      .ticks(5)
      .tickFormat((d, i) => {
        if (i === 4) {
          return `${d} USD`;
        }
        return d;
      })
      .tickPadding(10)
  )
  .call((g) => g.select(".domain").remove())
  .selectAll(".tick line")
  .style("stroke-opacity", 0);

// Update the text color
svg.selectAll(".tick text").attr("fill", color.labelGray);

// Add the vertical grid lines
svg
  .selectAll("xGrid")
  .data(x.ticks(d3.timeDay.every(4)))
  .join("line")
  .attr("class", "yGridLine")
  .attr("x1", (d) => x(d))
  .attr("x2", (d) => x(d))
  .attr("y1", 0)
  .attr("y2", height)
  .attr("stroke", color.gridGray)
  .attr("stroke-width", 1);

// Add the horizontal grid lines
svg
  .selectAll("yGrid")
  .data(y.ticks(5))
  .join("line")
  .attr("x1", 0)
  .attr("x2", width)
  .attr("y1", (d) => y(d))
  .attr("y2", (d) => y(d))
  .attr("stroke", color.gridGray)
  .attr("stroke-width", 1);

// Add the trendline
svg
  .append("line")
  .attr("x1", x(dataset[1].date))
  .attr("x2", width)
  .attr("y1", y(dataset[1].value))
  .attr("y2", y(dataset[dataset.length - 1].value))
  .attr("stroke", color.trendLine);

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
  .attr("stroke", color.chartLine)
  .attr("stroke-width", 3)
  .attr("d", line);

// Add the dot for each price
svg
  .append("g")
  .selectAll("dot")
  .data(dataset)
  .enter()
  .append("circle")
  .attr("cx", (d) => x(d.date))
  .attr("cy", (d) => y(d.value))
  .attr("r", 6)
  .style("fill", color.chartLine);

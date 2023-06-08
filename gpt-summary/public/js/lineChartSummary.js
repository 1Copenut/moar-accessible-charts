// DO NOT commit your API token to GitHub
const TOKEN = "YOUR_TOKEN_HERE";

const gptPrompt = {
  model: "gpt-3.5-turbo",
  max_tokens: 512,
  messages: [
    {
      role: "user",
      content:
        "The following data is historical pricing information for Apple. Summarize the data for me. Jun 05, 2023 179.35 Jun 02, 2023 180.95 Jun 01, 2023 180.09 May 31, 2023 177.25 May 30, 2023 177.30 May 26, 2023 175.43 May 25, 2023 172.99 May 24, 2023 171.84 May 23, 2023 171.56 May 22, 2023 174.20 May 19, 2023 175.16 May 18, 2023 175.05 May 17, 2023 172.69 May 16, 2023 172.07 May 15, 2023 172.07 May 12, 2023 172.57",
    },
  ],
  temperature: 1.0,
};

const requestHeaders = new Headers();
requestHeaders.append("Content-Type", "application/json");
requestHeaders.append("Authorization", `Bearer ${TOKEN}`);

const requestInit = {
  method: "POST",
  headers: requestHeaders,
  body: JSON.stringify(gptPrompt),
};

function handleSummaryAndAria(data, summaryId, chartId) {
  const chartContainer = document.getElementById(chartId);
  const summaryContainer = document.getElementById(summaryId);
  const summaryContent = data.choices[0].message.content;

  chartContainer.setAttribute(
    "aria-label",
    "Apple stock price, last three weeks"
  );
  chartContainer.setAttribute("aria-describedby", summaryId);
  chartContainer.setAttribute("tabindex", "0");

  summaryContainer.append(summaryContent);
}

fetch("https://api.openai.com/v1/chat/completions", requestInit)
  .then((response) => {
    let data = response.json();
    return data;
  })
  .then((data) => {
    console.log(data);
    handleSummaryAndAria(data, "gpt-response-container", "d3-chart-container");
  })
  .catch((err) => {
    console.log(err);
  });

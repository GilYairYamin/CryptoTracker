import { getCoinData } from '../data/marketCap.js';

const UPDATE_INTERVAL = 1500;
const MAX_DATA_LENGTH = 15;
const CHART_COLORS = ['pink', 'blue', 'black', 'red', 'orange'];

async function addChart(canvas, selectedCoins) {
  const labels = [];
  const datasets = [];

  let colorIndex = 0;
  for (const coin of selectedCoins) {
    datasets.push({
      label: coin.FullName,
      data: [],
      fill: false,

      borderColor: CHART_COLORS[colorIndex++],
      tension: 0.1,
    });
  }

  const chartConfig = {
    type: 'line',
    data: {
      labels: labels,
      datasets: datasets,
    },
  };

  const myChart = new Chart(canvas, chartConfig);

  const updateChart = async () => {
    const currTime = new Date();
    labels.push(
      `${currTime.getHours()}:${currTime.getMinutes()}:${currTime.getSeconds()}`
    );
    if (labels.length > MAX_DATA_LENGTH) labels.shift();
    for (const coin of selectedCoins) {
      await getCoinData(coin);
      const dataset = datasets.find((ds) => ds.label === coin.FullName);
      const data = dataset.data;
      data.push(coin.USD);
      if (data.length > MAX_DATA_LENGTH) data.shift();
    }

    myChart.update();
  };

  updateChart();
  return setInterval(updateChart, UPDATE_INTERVAL);
}

export { addChart };

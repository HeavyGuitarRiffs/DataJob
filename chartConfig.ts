// chartConfig.ts
// ✅ Must export `chartOptions`
export const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Your Chart Title',
    },
  },
};

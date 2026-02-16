import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function ClosedByAgentBarChart({ data }) {
  const chartData = {
    labels: data.map(item => item.salesAgent),
    datasets: [
      {
        label: 'Closed Leads',
        data: data.map(item => item.closedLeads),
        backgroundColor: '#FF9800'
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { precision: 0 }
      }
    }
  };

  return (
    <div className="chart-wrap">
      <Bar data={chartData} options={options} />
    </div>
  );
}

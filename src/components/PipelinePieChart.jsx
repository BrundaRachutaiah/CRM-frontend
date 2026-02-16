import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function PipelinePieChart({ pipelineCount, closedCount }) {
  const data = {
    labels: ['In Pipeline', 'Closed'],
    datasets: [
      {
        data: [pipelineCount, closedCount],
        backgroundColor: ['#36A2EB', '#4CAF50']
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom'
      }
    }
  };

  return (
    <div className="chart-wrap">
      <Pie data={data} options={options} />
    </div>
  );
}

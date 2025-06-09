import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale);

const data = {
    labels: ['A', 'B', 'C'],
    datasets: [
        { label: 'Demo', data: [12, 19, 3], backgroundColor: 'rgba(75,192,192,0.4)' }
    ]
};

export default function MyChart() {
    return <Bar data={data} />;
}

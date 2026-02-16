import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function ResultsChart({ results }) {
  if (!results || !results.length) {
    return <p>Aucun résultat pour le moment.</p>;
  }

  const chartData = {
    labels: results.map(r => r.id_candidat),
    datasets: [
      {
        label: "Nombre de votes",
        data: results.map(r => r.nombre_votes),
        backgroundColor: [
          "#4CAF50",
          "#2196F3",
          "#FFC107",
          "#E91E63",
          "#9C27B0"
        ],
        borderWidth: 1
      }
    ]
  };

  return (
    <div style={{ width: "400px", margin: "auto" }} className="card">
      <h2>📊 Résultats du vote</h2>
      <Pie
        data={chartData}
        options={{
          animation: {
            duration: 800,
            easing: "easeOutQuart"
          },
          plugins: {
            legend: {
              position: "bottom"
            }
          }
        }}
      />
    </div>
  );
}

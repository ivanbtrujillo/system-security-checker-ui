import {Bar} from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import {SecurityReport} from "@/types/security-report";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface SecurityStatsChartProps {
  reports: SecurityReport[];
}

export function SecurityStatsChart({reports}: SecurityStatsChartProps) {
  const diskEncryptedCount = reports.filter(
    report => report.disk_encrypted
  ).length;
  const antivirusDetectedCount = reports.filter(
    report => report.antivirus_detected
  ).length;
  const screenLockActiveCount = reports.filter(
    report => report.screen_lock_active && (report.screen_lock_time ?? 0) <= 20
  ).length;

  const data = {
    labels: [
      "Disk encrypted",
      "Antivirus detected",
      "Screen lock active (≤20min)",
    ],
    datasets: [
      {
        label: "Compliant",
        data: [
          diskEncryptedCount,
          antivirusDetectedCount,
          screenLockActiveCount,
        ],
        backgroundColor: "rgba(75, 192, 192, 1)",
      },
      {
        label: "Security issues",
        data: [
          reports.length - diskEncryptedCount,
          reports.length - antivirusDetectedCount,
          reports.length - screenLockActiveCount,
        ],
        backgroundColor: "rgba(255, 99, 132, 1)",
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        stacked: true,
        ticks: {color: "rgba(255, 255, 255, 0.8)"},
        grid: {color: "rgba(255, 255, 255, 0.1)"},
      },
      y: {
        stacked: true,
        beginAtZero: true,
        ticks: {color: "rgba(255, 255, 255, 0.8)"},
        grid: {color: "rgba(255, 255, 255, 0.1)"},
      },
    },
    plugins: {
      legend: {
        position: "top" as const,
        color: "rgba(255, 255, 255, 0.9)",
      },
      title: {
        display: true,
        text: "Device Security Status",
        color: "rgba(255, 255, 255, 0.9)",
      },
    },
  };

  return (
    <div className="w-full max-w-2xl h-[50vh] mx-auto">
      <Bar data={data} options={options} />
    </div>
  );
}

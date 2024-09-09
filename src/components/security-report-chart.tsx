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

  const operatingSystemCount = reports.reduce((acc, report) => {
    const os = report.operating_system || "Unknown";
    acc[os] = (acc[os] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const securityData = {
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

  const osColors = Object.keys(operatingSystemCount).reduce(
    (acc, os, index) => {
      const hue = (index * 137.5) % 360;
      acc[os] = `hsla(${hue}, 70%, 60%, 0.8)`;
      return acc;
    },
    {} as Record<string, string>
  );

  const osData = {
    labels: Object.keys(operatingSystemCount),
    datasets: [
      {
        label: "Sistemas Operativos",
        data: Object.values(operatingSystemCount),
        backgroundColor: Object.values(osColors),
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
        labels: {
          color: "white",
        },
      },
    },
  };

  const osOptions = {
    ...options,
    indexAxis: "y" as const,
    plugins: {
      legend: {
        display: true,
        position: "right" as const,
        labels: {
          generateLabels: (chart: any) => {
            const datasets = chart.data.datasets;
            return chart.data.labels.map((label: string, index: number) => ({
              text: `${label}: ${datasets[0].data[index]}`,
              fillStyle: osColors[label],
              hidden: false,
              fontColor: "white",
            }));
          },
        },
      },
    },
  };

  return (
    <div className="w-full flex flex-row justify-between">
      <div className="h-full w-full">
        <h1>Security</h1>

        <div className="h-[40vh] mb-8 ">
          <Bar data={securityData} options={options} />
        </div>
      </div>
      <div className="h-full w-full">
        <h1>Operating systems</h1>
        <div className="h-[40vh] ">
          <Bar data={osData} options={osOptions} />
        </div>
      </div>
    </div>
  );
}

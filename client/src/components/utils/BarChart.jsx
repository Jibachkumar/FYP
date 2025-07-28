import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Helper function to count month bookings
const getMonthlyBookingCounts = (data) => {
  const monthlyCounts = Array(12).fill(0); // 0=Jan, ..., 11=Dec
  console.log(monthlyCounts);

  data?.forEach(({ trips = [], bookings = [] }) => {
    // Count trips
    trips.forEach((trip) => {
      if (trip.startDate) {
        const date = new Date(trip.startDate);
        const monthIndex = date.getMonth();
        monthlyCounts[monthIndex]++;
      }
    });

    // Count bookings
    bookings.forEach((booking) => {
      if (!booking.startDate) {
        const date = new Date(booking.startDate || "2025-05-28");
        console.log(date);
        const monthIndex = date.getMonth();
        monthlyCounts[monthIndex]++;
      }
    });
  });

  return monthlyCounts;
};

const RevenueBarChart = ({ timePeriod = "monthly", data }) => {
  // console.log(data);
  const monthlyCounts = getMonthlyBookingCounts(data);

  // Convert counts to percentages
  const total = monthlyCounts.reduce((sum, val) => sum + val, 0);
  const percentageData = monthlyCounts.map((count) =>
    total ? Math.round((count / total) * 100) : 0
  );

  // Sample data - replace with your actual data
  const monthLabel = [
    "jan",
    "feb",
    "mar",
    "apr",
    "jul",
    "jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const monthlyData = {
    labels: monthLabel,

    datasets: [
      {
        label: "Monthly booked status",
        data: percentageData,
        backgroundColor: "red",
        borderColor: "red",
        borderWidth: 1,
        categoryPercentage: 1.0, // Fill full slot (reduces spacing)
        barPercentage: 0.09, // Slightly thinner bars
      },
    ],
  };

  const yearlyData = {
    labels: ["2020", "2021", "2022", "2023"],
    datasets: [
      {
        label: "Annual Revenue (USD)",
        data: [185000, 210000, 245000, 275000],
        backgroundColor: "rgba(75, 192, 192, 0.7)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
        barThickness: 10, // Set the thickness of the bars
        categoryPercentage: 0.1,
        barPercentage: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text:
          timePeriod === "monthly"
            ? "Reservation Status"
            : "Annual Revenue Trends",
        font: {
          size: 18,
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            return `${context.parsed.y.toLocaleString()}`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        min: 0,
        max: 100,
        ticks: {
          stepSize: 20,
          callback: (value) => `${value.toLocaleString()}`,
        },
      },
      x: {
        grid: {
          display: false,
          drawTicks: true,
          drawBorder: true,
        },
        ticks: {
          padding: 0, // ⬅️ THIS reduces vertical spacing between bars and labels
          font: {
            size: 12,
          },
        },
        offset: true,
      },
    },
  };

  return (
    <div
      className="revenue-chart-container bg-white/80 shadow-md"
      style={{
        width: "100%",
        maxWidth: "640px",
        margin: "0 auto",
        padding: "10px",
        // backgroundColor: "white",
        borderRadius: "2px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      }}
    >
      {/* <div style={{ marginBottom: "10px" }}>
        <select
          value={timePeriod}
          onChange={(e) =>
            (window.location.search = `?period=${e.target.value}`)
          }
          style={{
            padding: "5px 10px",
            borderRadius: "4px",
            border: "1px solid #ddd",
            backgroundColor: "white",
          }}
        >
          <option value="monthly">Monthly View</option>
          <option value="yearly">Yearly View</option>
        </select>
      </div> */}
      <Bar
        data={timePeriod === "monthly" ? monthlyData : yearlyData}
        options={options}
      />
    </div>
  );
};

export default RevenueBarChart;

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export default function Device({ isAnimationActive = true, stats }) {
  // Count devices
  const deviceCount = stats.reduce((acc, item) => {
    acc[item.device] = (acc[item.device] || 0) + 1;
    return acc;
  }, {});

  // Convert to chart-friendly format
  const data = Object.entries(deviceCount).map(([device, count]) => ({
    name: device,
    count,
  }));

  return (
    <div style={{ width: "100%", maxWidth: "500px", height: "400px" }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            dataKey="count"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={120}
            labelLine={false}
            label={({ name, percent }) =>
              `${name}: ${(percent * 100).toFixed(0)}%`
            }
            isAnimationActive={isAnimationActive}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${entry.name}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>

          {/* 👇 Tooltip added here */}
          <Tooltip
            formatter={(value, name) => [`${value}`, `${name}`]}
            contentStyle={{
              backgroundColor: "#1f2937", // dark background
              borderRadius: "8px",
              border: "none",
              padding: "8px 12px",
            }}
            itemStyle={{ color: "#FFFFFF" }}       // <- tooltip text color (white)
            labelStyle={{ color: "#FFFFFF" }}      // <- label text color (white)
            cursor={{ fill: "rgba(255,255,255,0.1)" }} // hover effect optional
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

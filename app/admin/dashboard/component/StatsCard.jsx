// app/dashboard/components/StatsCard.jsx

export default function StatsCard({ title, value }) {
  return (
    <div className="bg-white shadow p-6 rounded-lg">
      <h3 className="text-lg text-gray-600">{title}</h3>
      <p className="text-3xl font-bold mt-2">{value}</p>
    </div>
  );
}

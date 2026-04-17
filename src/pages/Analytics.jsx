import { useMemo } from "react";

export default function Analytics({ properties = [] }) {
  const stats = useMemo(() => {
    return {
      total: properties.length,
      approved: properties.filter((p) => p.status === "approved").length,
      pending: properties.filter((p) => p.status === "pending").length,
      cities: [...new Set(properties.map((p) => p.city))],
    };
  }, [properties]);

  return (
    <div style={{ padding: 20 }}>
      <h1>📊 Analytics</h1>

      <p>Total Properties: {stats.total}</p>
      <p>Approved: {stats.approved}</p>
      <p>Pending: {stats.pending}</p>

      <h3>Cities:</h3>
      {stats.cities.map((c) => (
        <p key={c}>📍 {c}</p>
      ))}
    </div>
  );
}
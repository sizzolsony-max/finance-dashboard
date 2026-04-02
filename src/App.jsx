import { useState } from "react";

export default function App() {
  const [role, setRole] = useState("viewer");
  const [search, setSearch] = useState("");

  const [data] = useState([
    { date: "2024-01-01", amount: 500, category: "Food", type: "expense" },
    { date: "2024-01-02", amount: 2000, category: "Salary", type: "income" },
    { date: "2024-01-03", amount: 700, category: "Shopping", type: "expense" }
  ]);

  // calculations
  const income = data.filter(d => d.type === "income").reduce((a,b)=>a+b.amount,0);
  const expense = data.filter(d => d.type === "expense").reduce((a,b)=>a+b.amount,0);
  const balance = income - expense;

  // filter
  const filtered = data.filter(d =>
    d.category.toLowerCase().includes(search.toLowerCase())
  );

  // insight
  const highest = data.reduce((max, curr) =>
    curr.amount > max.amount ? curr : max
  );

  return (
    <div style={{
      fontFamily: "Inter, sans-serif",
      background: "#0f172a",
      color: "#e2e8f0",
      minHeight: "100vh",
      padding: "30px"
    }}>

      {/* Header */}
      <div style={{ 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center",
        marginBottom: "30px" 
      }}>
        <h1 style={{ 
          fontSize: "32px", 
          color: "#f8fafc", 
          fontWeight: "700" 
        }}>
          💰 Finance Dashboard
        </h1>

        <select
          onChange={(e) => setRole(e.target.value)}
          style={{
            padding: "8px",
            borderRadius: "8px",
            background: "#1e293b",
            color: "#e2e8f0",
            border: "1px solid #334155"
          }}
        >
          <option value="viewer">Viewer</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      {/* Cards */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px,1fr))",
        gap: "20px",
        marginBottom: "30px"
      }}>
        <div style={{ background: "#22c55e", padding: "20px", borderRadius: "12px" }}>
          <h4>Balance</h4>
          <h2>₹{balance}</h2>
        </div>

        <div style={{ background: "#3b82f6", padding: "20px", borderRadius: "12px" }}>
          <h4>Income</h4>
          <h2>₹{income}</h2>
        </div>

        <div style={{ background: "#ef4444", padding: "20px", borderRadius: "12px" }}>
          <h4>Expense</h4>
          <h2>₹{expense}</h2>
        </div>
      </div>

      {/* Search */}
      <input
        placeholder="Search by category..."
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "100%",
          padding: "12px",
          borderRadius: "10px",
          border: "1px solid #334155",
          marginBottom: "20px",
          background: "#1e293b",
          color: "#e2e8f0"
        }}
      />

      {/* Table */}
      <div style={{
        background: "#1e293b",
        borderRadius: "12px",
        overflow: "hidden"
      }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead style={{ background: "#334155" }}>
            <tr>
              <th style={{ padding: "12px" }}>Date</th>
              <th>Amount</th>
              <th>Category</th>
              <th>Type</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((t, i) => (
              <tr key={i} style={{ 
                textAlign: "center", 
                borderTop: "1px solid #475569" 
              }}>
                <td style={{ padding: "12px" }}>{t.date}</td>
                <td>₹{t.amount}</td>
                <td>{t.category}</td>
                <td style={{
                  color: t.type === "income" ? "#22c55e" : "#ef4444",
                  fontWeight: "600"
                }}>
                  {t.type}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Insight */}
      <div style={{
        marginTop: "20px",
        padding: "15px",
        background: "#facc15",
        color: "#111827",
        borderRadius: "12px",
        fontWeight: "500"
      }}>
        🔥 Highest Transaction: ₹{highest.amount} ({highest.category})
      </div>

      {/* Admin */}
      {role === "admin" && (
        <button style={{
          marginTop: "20px",
          padding: "12px 20px",
          borderRadius: "10px",
          border: "none",
          background: "#6366f1",
          color: "white",
          cursor: "pointer"
        }}>
          + Add Transaction
        </button>
      )}

    </div>
  );
}
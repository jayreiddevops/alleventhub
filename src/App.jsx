import React, { useState } from "react";

const Brand = {
  primary: "#0D9488",
  accent: "#14B8A6",
  bg: "#F0FDFA",
  text: "#0f172a",
  muted: "#64748b",
};

const styles = {
  phone: {
    width: 360,
    borderRadius: 32,
    padding: 16,
    boxShadow: "0 8px 24px rgba(15,23,42,0.06)",
    fontFamily:
      'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial',
    background: "#fff",
  },
  topbar: {
    margin: "-16px -16px 16px -16px",
    padding: "16px 20px",
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    color: "#fff",
    display: "flex",
    alignItems: "center",
    gap: 12,
    background: "#0D9488",
    fontWeight: 800,
    letterSpacing: 0.3,
  },
  card: {
    background: "#fff",
    borderRadius: 16,
    boxShadow: "0 1px 2px rgba(15,23,42,0.06)",
    padding: 12,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 12,
    marginTop: 8,
  },
  pill: {
    background: "#14B8A6",
    color: "#fff",
    borderRadius: 999,
    padding: "10px 16px",
    fontWeight: 700,
    border: 0,
    cursor: "pointer",
  },
};

const Phone = ({ children }) => <div style={styles.phone}>{children}</div>;
const TopBar = ({ title }) => <div style={styles.topbar}>{title}</div>;
const Card = ({ children }) => <div style={styles.card}>{children}</div>;
const Button = ({ children, onClick }) => (
  <button style={styles.pill} onClick={onClick}>{children}</button>
);

export default function App() {
  const [view, setView] = useState("home");

  return (
    <div style={{ display: "flex", gap: 24, padding: 24, flexWrap: "wrap" }}>
      <Phone>
        <TopBar title="AllEventHub" />
        <Card>Welcome to AllEventHub demo 🚀</Card>
        <Button onClick={() => setView(view === "home" ? "next" : "home")}>
          {view === "home" ? "Go to Next" : "Back to Home"}
        </Button>
      </Phone>
    </div>
  );
}
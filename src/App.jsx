// All Event Hub — Branded Demo with Hero Banner + SVG Icons
// Home → Results → Supplier Profile → Booking → Bookings Tab

import React, { useState, useEffect } from "react";
import { Mic, Camera, Video, Music2, Lightbulb, Utensils, Type, Wine, Smile } from "lucide-react";

// Brand system (from sponsor brand board)
const Brand = {
  navy: "#0D1B2A",
  white: "#FFFFFF",
  orange: "#FF8C42",
  red: "#E63946",
  teal: "#1ABC9C",
  yellow: "#F4D35E",
  text: "#0f172a",
  muted: "#64748b",
};

// Base UI styles
const styles = {
  phone: {
    maxWidth: 420,
    width: "100%",
    borderRadius: 32,
    padding: 16,
    margin: "0 auto",
    boxShadow: "0 8px 24px rgba(15,23,42,0.06)",
    fontFamily: 'Nunito, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial',
    background: Brand.white,
    minHeight: "90vh",
    display: "flex",
    flexDirection: "column",
  },
  topbar: {
    margin: "-16px -16px 16px -16px",
    padding: "16px 20px",
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    color: Brand.white,
    display: "flex",
    alignItems: "center",
    gap: 12,
    background: Brand.navy,
    fontWeight: 800,
    fontFamily: "Poppins, sans-serif",
    letterSpacing: 0.3,
  },
  card: {
    background: Brand.white,
    borderRadius: 16,
    boxShadow: "0 1px 2px rgba(15,23,42,0.06)",
    padding: 12,
  },
  pill: {
    background: Brand.teal,
    color: Brand.white,
    borderRadius: 999,
    padding: "10px 16px",
    fontWeight: 700,
    border: 0,
    cursor: "pointer",
    fontFamily: "Poppins, sans-serif",
  },
};

const Phone = ({ children, bg }) => (
  <div style={{ ...styles.phone, background: bg ?? Brand.white }}>{children}</div>
);

const TopBar = ({ title, onBack }) => (
  <div style={styles.topbar}>
    {onBack && (
      <button
        onClick={onBack}
        style={{
          background: "rgba(255,255,255,0.2)",
          border: 0,
          color: Brand.white,
          borderRadius: 999,
          padding: "2px 8px",
          fontSize: 18,
          cursor: "pointer",
        }}
      >
        ‹
      </button>
    )}
    <span style={{ fontSize: 18 }}>{title}</span>
  </div>
);

const Card = ({ children, style }) => <div style={{ ...styles.card, ...style }}>{children}</div>;
const Button = ({ children, onClick, style }) => (
  <button style={{ ...styles.pill, ...style }} onClick={onClick}>{children}</button>
);

const Badge = ({ children, tone = "teal" }) => (
  <span style={{
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    background: tone === "teal" ? `${Brand.teal}22` : `${Brand.orange}22`,
    color: tone === "teal" ? Brand.teal : Brand.orange,
    borderRadius: 999,
    padding: "6px 10px",
    fontSize: 11,
    fontWeight: 800,
    fontFamily: "Nunito, sans-serif",
  }}>{children}</span>
);

const BottomTabs = ({ active, onSelect }) => {
  const item = (key, label, emoji) => (
    <button
      key={key}
      onClick={() => onSelect(key)}
      style={{
        flex: 1,
        background: "transparent",
        border: 0,
        padding: "10px 0",
        cursor: "pointer",
        fontWeight: active === key ? 800 : 600,
        color: active === key ? Brand.orange : Brand.muted,
        fontFamily: "Nunito, sans-serif",
      }}
    >
      <div style={{ fontSize: 16 }}>{emoji}</div>
      <div style={{ fontSize: 11 }}>{label}</div>
    </button>
  );
  return (
    <div style={{
      marginTop: "auto",
      display: "flex",
      gap: 8,
      alignItems: "center",
      justifyContent: "space-between",
      background: Brand.white,
      borderRadius: 999,
      padding: "4px 8px",
      boxShadow: "0 6px 14px rgba(15,23,42,0.10)",
    }}>
      {item("home", "Home", "🏠")}
      {item("bookings", "Bookings", "📅")}
      {item("help", "Help", "❓")}
      {item("profile", "Profile", "👤")}
    </div>
  );
};

// ----- Home (tiles) with SVG icons + Hero Banner -----
const categories = [
  { label: "DJs", icon: <Music2 size={28} color={Brand.navy} /> },
  { label: "Event Hosts", icon: <Mic size={28} color={Brand.navy} /> },
  { label: "AV & Lighting", icon: <Lightbulb size={28} color={Brand.navy} /> },
  { label: "Catering", icon: <Utensils size={28} color={Brand.navy} /> },
  { label: "Photography", icon: <Camera size={28} color={Brand.navy} /> },
  { label: "Videography", icon: <Video size={28} color={Brand.navy} /> },
  { label: "Photobooth’s", icon: <Smile size={28} color={Brand.navy} /> },
  { label: "Mobile Bars", icon: <Wine size={28} color={Brand.navy} /> },
  { label: "Light Up Letters", icon: <Type size={28} color={Brand.navy} /> },
];

// ----- App (router) -----
export default function App() {
  const [view, setView] = useState("home");

  let screen;
  if (view === "home") screen = (
    <Phone>
      <TopBar title="All Event Hub" />

      {/* Hero Banner */}
      <div style={{
        background: Brand.navy,
        color: Brand.white,
        borderRadius: 20,
        padding: "20px 16px",
        marginBottom: 16,
        textAlign: "center",
      }}>
        <h2 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 800, fontSize: 20 }}>Plan Your Event With Ease 🎉</h2>
        <p style={{ fontSize: 13, margin: "8px 0 12px" }}>Browse and book top suppliers instantly</p>
        <Button style={{ background: Brand.orange }}>Start Booking</Button>
      </div>

      {/* Category tiles */}
      <div style={{ flex: 1, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
        {categories.map((c) => (
          <div key={c.label} style={{ ...styles.card, textAlign: "center", padding: 16, cursor: "pointer" }}>
            <div>{c.icon}</div>
            <div style={{ fontSize: 12, fontWeight: 800, marginTop: 6, fontFamily: "Poppins, sans-serif" }}>{c.label}</div>
          </div>
        ))}
      </div>

      <BottomTabs active="home" onSelect={setView} />
    </Phone>
  );

  // fallback (other screens omitted for brevity)
  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#eef2f6", padding: 16 }}>
      {screen}
    </div>
  );
}

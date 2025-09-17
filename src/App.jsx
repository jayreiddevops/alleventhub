// src/App.jsx
// All Event Hub — full demo with Featured suppliers, colored tiles, SVG footer icons, Help form & About

import React, { useState, useEffect } from "react";
import { Mic, Camera, Video, Music2, Lightbulb, Utensils, Type, Wine, Smile } from "lucide-react";

// Brand system
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

const styles = {
  phone: {
    maxWidth: 420,
    width: "100%",
    borderRadius: 32,
    padding: 16,
    margin: "0 auto",
    boxShadow: "0 8px 24px rgba(15,23,42,0.06)",
    fontFamily:
      'Nunito, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial',
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
    <img
      src="/logo.png"
      alt="AllEventHub"
      style={{ height: 24, marginRight: 8, borderRadius: 4, background: Brand.white }}
    />
    <span style={{ fontSize: 18 }}>{title}</span>
  </div>
);

const Card = ({ children, style }) => <div style={{ ...styles.card, ...style }}>{children}</div>;
const Button = ({ children, onClick, style }) => (
  <button style={{ ...styles.pill, ...style }} onClick={onClick}>{children}</button>
);

/* ---------- Bottom Tabs with SVG icons ---------- */
const tabSvg = {
  home: (active) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? Brand.orange : Brand.navy} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 10.5 12 3l9 7.5"/><path d="M5 10v10h14V10"/></svg>,
  bookings: (active) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? Brand.orange : Brand.navy} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>,
  help: (active) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? Brand.orange : Brand.navy} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18h.01"/><path d="M9 14a3 3 0 1 1 3-3"/><path d="M12 17v1"/></svg>,
  about: (active) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? Brand.orange : Brand.navy} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8h.01"/><path d="M10 12h2v4"/></svg>,
  profile: (active) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? Brand.orange : Brand.navy} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="7" r="3"/><path d="M4 21v-1a7 7 0 0 1 14 0v1"/></svg>,
};

const BottomTabs = ({ active, onSelect }) => {
  const items = [
    { key: "home", label: "Home" },
    { key: "bookings", label: "Bookings" },
    { key: "help", label: "Help" },
    { key: "about", label: "About" },
    { key: "profile", label: "Profile" },
  ];
  return (
    <div style={{
      marginTop: "auto", display: "flex", gap: 6, alignItems: "center", justifyContent: "space-between",
      background: Brand.white, borderRadius: 999, padding: "4px 6px",
      boxShadow: "0 6px 14px rgba(15,23,42,0.10)",
    }}>
      {items.map(it => (
        <button key={it.key} onClick={() => onSelect(it.key)} style={{
          flex: 1, background: "transparent", border: 0, padding: "8px 0 6px", cursor: "pointer",
          color: active === it.key ? Brand.orange : Brand.muted, fontWeight: active === it.key ? 800 : 600,
          fontFamily: "Nunito, sans-serif",
        }}>
          <div style={{ display: "grid", placeItems: "center" }}>{tabSvg[it.key](active === it.key)}</div>
          <div style={{ fontSize: 10, marginTop: 2 }}>{it.label}</div>
        </button>
      ))}
    </div>
  );
};

/* ---------- Category tiles ---------- */
const categories = [
  { key: "dj", label: "DJs", icon: <Music2 size={28} color={Brand.navy} />, bg: "#1ABC9C22" },
  { key: "host", label: "Event Hosts", icon: <Mic size={28} color={Brand.navy} />, bg: "#FF8C4222" },
  { key: "av", label: "AV & Lighting", icon: <Lightbulb size={28} color={Brand.navy} />, bg: "#F4D35E22" },
  { key: "catering", label: "Catering", icon: <Utensils size={28} color={Brand.navy} />, bg: "#E6394622" },
  { key: "photo", label: "Photography", icon: <Camera size={28} color={Brand.navy} />, bg: "#1ABC9C22" },
  { key: "video", label: "Videography", icon: <Video size={28} color={Brand.navy} />, bg: "#FF8C4222" },
  { key: "booth", label: "Photobooth’s", icon: <Smile size={28} color={Brand.navy} />, bg: "#F4D35E22" },
  { key: "bar", label: "Mobile Bars", icon: <Wine size={28} color={Brand.navy} />, bg: "#1ABC9C22" },
  { key: "letters", label: "Light Up Letters", icon: <Type size={28} color={Brand.navy} />, bg: "#0D1B2A15" },
];

/* ---------- Star Row ---------- */
const StarRow = ({ value = 5 }) => (
  <span aria-label={`${value} stars`}>
    {Array.from({ length: 5 }).map((_, i) => (
      <span key={i} style={{ color: i < Math.round(value) ? "#F59E0B" : "#E2E8F0", marginRight: 2 }}>★</span>
    ))}
  </span>
);

/* ---------- Featured Results Screen ---------- */
const SponsoredBadge = () => (
  <span style={{
    background: `${Brand.orange}22`, color: Brand.orange, fontSize: 10, fontWeight: 800,
    borderRadius: 999, padding: "4px 8px", fontFamily: "Nunito, sans-serif",
  }}>Sponsored</span>
);

const ResultsScreen = ({ category, onBack, onSelectSupplier }) => {
  const allSuppliers = [
    { id: 1, name: "George Harris", role: category, priceFrom: 250, rating: 4.8, jobs: 126, img: "https://i.pravatar.cc/150?img=12", featured: true },
    { id: 2, name: "Maria Lopez", role: category, priceFrom: 320, rating: 4.9, jobs: 203, img: "https://i.pravatar.cc/150?img=45", featured: true },
    { id: 3, name: "DJ Nova", role: category, priceFrom: 280, rating: 4.7, jobs: 98, img: "https://i.pravatar.cc/150?img=23", featured: true },
    { id: 4, name: "Alex Carter", role: category, priceFrom: 220, rating: 4.6, jobs: 87, img: "https://i.pravatar.cc/150?img=31" },
    { id: 5, name: "Lena Park", role: category, priceFrom: 310, rating: 4.9, jobs: 175, img: "https://i.pravatar.cc/150?img=5" },
  ];
  const featuredSuppliers = allSuppliers.filter(s => s.featured).slice(0, 3);
  const listSuppliers = allSuppliers.filter(s => !s.featured);

  return (
    <Phone>
      <TopBar title={`${category} in London`} onBack={onBack} />

      {/* Featured rail */}
      <div style={{ marginBottom: 8 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <h3 style={{ margin: 0, fontSize: 14, fontFamily: "Poppins, sans-serif", fontWeight: 900, color: Brand.text }}>
              Featured {category}
            </h3>
            <SponsoredBadge />
          </div>
        </div>
        <div style={{ display: "flex", gap: 12, overflowX: "auto", paddingBottom: 6, scrollbarWidth: "none" }}>
          {featuredSuppliers.map(s => (
            <div key={s.id} onClick={() => onSelectSupplier(s)} style={{
              minWidth: 220, background: `${Brand.navy}08`, borderRadius: 16, padding: 10,
              boxShadow: "0 1px 2px rgba(15,23,42,0.06)", cursor: "pointer",
            }}>
              <img src={s.img} alt={s.name} style={{ width: "100%", height: 110, borderRadius: 12, objectFit: "cover" }} />
              <div style={{ marginTop: 8 }}>
                <div style={{ fontFamily: "Poppins, sans-serif", fontWeight: 900, fontSize: 14, color: Brand.text }}>{s.name}</div>
                <div style={{ fontSize: 12, color: Brand.muted }}>{s.role}</div>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <StarRow value={s.rating} />
                  <span style={{ fontSize: 12, fontWeight: 700, color: Brand.text }}>{s.rating} ({s.jobs})</span>
                </div>
                <div style={{ fontSize: 13, fontWeight: 900, color: Brand.teal }}>From €{s.priceFrom}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* List */}
      <div style={{ display: "flex", flexDirection: "column", gap: 14, flex: 1 }}>
        {listSuppliers.map(s => (
          <Card key={s.id} style={{ padding: 16, cursor: "pointer" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <img src={s.img} alt={s.name} style={{ width: 90, height: 90, borderRadius: 20, objectFit: "cover" }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: "Poppins, sans-serif", fontWeight: 800, fontSize: 18 }}>{s.name}</div>
                <div style={{ fontSize: 13, color: Brand.muted }}>{s.role}</div>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <StarRow value={s.rating} /><span style={{ fontSize: 13, fontWeight: 700 }}>{s.rating} ({s.jobs})</span>
                </div>
                <div style={{ fontSize: 14, fontWeight: 800, color: Brand.teal }}>From €{s.priceFrom}</div>
              </div>
              <Button onClick={() => onSelectSupplier(s)} style={{ background: Brand.orange }}>View</Button>
            </div>
          </Card>
        ))}
      </div>

      <BottomTabs active="home" onSelect={() => {}} />
    </Phone>
  );
};

/* ---------- App ---------- */
export default function App() {
  const [view, setView] = useState("home");
  const [category, setCategory] = useState("DJs");
  const [supplier, setSupplier] = useState(null);

  let screen;
  if (view === "results") screen = <ResultsScreen category={category} onBack={() => setView("home")} onSelectSupplier={(s) => { setSupplier(s); setView("supplier"); }} />;
  if (view === "home") screen = (
    <Phone>
      <TopBar title="All Event Hub" />
      <div style={{
        background: `linear-gradient(135deg, ${Brand.navy} 0%, ${Brand.navy} 65%, ${Brand.teal}22 100%)`,
        color: Brand.white, borderRadius: 20, padding: "20px 16px", marginBottom: 16, display: "flex", alignItems: "center", gap: 12,
      }}>
        <img src="/logo.png" alt="AllEventHub" style={{ width: 56, height: 56, borderRadius: 14, background: Brand.white }} />
        <div style={{ flex: 1 }}>
          <h2 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 800, fontSize: 18, margin: 0 }}>Plan the perfect event</h2>
          <p style={{ fontSize: 12, margin: "4px 0 0", opacity: 0.9 }}>Book trusted suppliers in minutes.</p>
        </div>
        <Button style={{ background: Brand.orange }} onClick={() => setView("results")}>Get Started</Button>
      </div>
      <div style={{ flex: 1, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
        {categories.map(c => (
          <div key={c.key} onClick={() => { setCategory(c.label); setView("results"); }} style={{
            ...styles.card, textAlign: "center", padding: 16, cursor: "pointer", background: c.bg,
            transition: "transform 0.15s ease", 
          }}>
            <div>{c.icon}</div>
            <div style={{ fontSize: 12, fontWeight: 800, marginTop: 6, fontFamily: "Poppins, sans-serif" }}>{c.label}</div>
          </div>
        ))}
      </div>
      <BottomTabs active="home" onSelect={setView} />
    </Phone>
  );

  return <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#eef2f6", padding: 16 }}>{screen}</div>;
}

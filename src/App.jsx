// Full demo flow with Home → Results → Supplier Profile → Booking
// This is the complete `App.jsx` implementation to ship the stakeholder demo.

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

const Phone = ({ children, bg }) => (
  <div style={{ ...styles.phone, background: bg ?? "#fff" }}>{children}</div>
);
const TopBar = ({ title, onBack }) => (
  <div style={styles.topbar}>
    {onBack && (
      <button
        onClick={onBack}
        style={{
          background: "rgba(255,255,255,0.2)",
          border: 0,
          color: "#fff",
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
  <button style={{ ...styles.pill, ...style }} onClick={onClick}>
    {children}
  </button>
);

// Screens
const HomeScreen = ({ onSelectCategory }) => {
  const categories = [
    { label: "DJs", icon: "🎧" },
    { label: "Event Hosts", icon: "🎤" },
    { label: "AV & Lighting", icon: "💡" },
    { label: "Catering", icon: "🧑‍🍳" },
    { label: "Photography", icon: "📷" },
    { label: "Videography", icon: "🎥" },
    { label: "Photobooth’s", icon: "🤳" },
    { label: "Mobile Bars", icon: "🍸" },
    { label: "Light Up Letters", icon: "🔤" },
  ];
  return (
    <Phone bg={Brand.bg}>
      <TopBar title="Home" />
      <div style={{ display: "flex", flexDirection: "column", gap: 12, paddingInline: 4 }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12 }}>
          <span style={{ color: Brand.text }}>📍 London, UK</span>
          <span style={{ color: Brand.accent, fontWeight: 600 }}>Change ▾</span>
        </div>
        <input
          placeholder="Search services, equipment, or crew"
          style={{
            width: "100%",
            borderRadius: 999,
            border: "1px solid #e5e7eb",
            padding: "12px 16px",
          }}
        />
        <div style={styles.grid}>
          {categories.map((c) => (
            <div
              key={c.label}
              onClick={() => onSelectCategory(c.label)}
              style={{ ...styles.card, textAlign: "center", cursor: "pointer" }}
            >
              <div style={{ fontSize: 24 }}>{c.icon}</div>
              <div style={{ fontSize: 12, fontWeight: 700, marginTop: 4 }}>{c.label}</div>
            </div>
          ))}
        </div>
      </div>
    </Phone>
  );
};

const ResultsScreen = ({ category, onBack, onSelectSupplier }) => (
  <Phone bg={Brand.bg}>
    <TopBar title={`${category} in London`} onBack={onBack} />
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {[1, 2, 3].map((n) => (
        <Card key={n}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <img
              alt="provider"
              src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=120&auto=format&fit=crop"
              style={{ width: 56, height: 56, borderRadius: 16, objectFit: "cover" }}
            />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 800, color: Brand.text }}>{
                category
              } Pro #{n}</div>
              <div style={{ fontSize: 12, color: Brand.muted }}>From £{150 + n * 25}</div>
            </div>
            <Button onClick={() => onSelectSupplier(`${category} Pro #${n}`)}>View</Button>
          </div>
        </Card>
      ))}
    </div>
  </Phone>
);

const SupplierProfile = ({ name, onBack, onBook }) => (
  <Phone bg={Brand.bg}>
    <TopBar title="Supplier Profile" onBack={onBack} />
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <img
          src="https://images.unsplash.com/photo-1607746882042-944635dfe10e?q=80&w=150&auto=format&fit=crop"
          alt="profile"
          style={{ width: 80, height: 80, borderRadius: 999, objectFit: "cover" }}
        />
        <div>
          <div style={{ fontSize: 18, fontWeight: 800, color: Brand.text }}>{name}</div>
          <div style={{ fontSize: 12, color: Brand.muted }}>10 years experience</div>
          <div style={{ fontSize: 12, color: "#b45309" }}>★ 4.8 (120 reviews)</div>
        </div>
      </div>
      <Card>
        Energetic professional providing services for weddings, parties, and corporate events.
      </Card>
      <div>
        <div style={{ fontSize: 14, fontWeight: 800, marginBottom: 8 }}>Packages</div>
        <Card style={{ display: "flex", justifyContent: "space-between" }}>
          <span>Bronze Package</span>
          <span>£250</span>
        </Card>
        <Card style={{ display: "flex", justifyContent: "space-between", marginTop: 8 }}>
          <span>Silver Package</span>
          <span>£400</span>
        </Card>
        <Card style={{ display: "flex", justifyContent: "space-between", marginTop: 8 }}>
          <span>Gold Package</span>
          <span>£650</span>
        </Card>
      </div>
      <Button onClick={onBook} style={{ width: "100%" }}>Book Now</Button>
    </div>
  </Phone>
);

const BookingScreen = ({ supplier, onBack }) => (
  <Phone bg={Brand.bg}>
    <TopBar title="Booking" onBack={onBack} />
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <div style={{ fontSize: 18, fontWeight: 800, color: Brand.text }}>{supplier}</div>
      <Card>[Calendar picker placeholder]</Card>
      <div style={{ fontSize: 13, color: Brand.text }}>Selected Package: Silver (£400)</div>
      <Button style={{ width: "100%" }}>Confirm & Pay</Button>
    </div>
  </Phone>
);

export default function App() {
  const [view, setView] = useState("home");
  const [category, setCategory] = useState("DJs");
  const [supplier, setSupplier] = useState(null);

  return (
    <div style={{ display: "flex", gap: 24, padding: 24, flexWrap: "wrap" }}>
      {/* Splash */}
      <Phone bg={Brand.primary}>
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: 640,
          borderRadius: 32,
          color: "#fff",
          fontSize: 28,
          fontWeight: 900,
        }}>
          AllEventHub
        </div>
      </Phone>

      {view === "home" && <HomeScreen onSelectCategory={(c) => { setCategory(c); setView("results"); }} />}
      {view === "results" && <ResultsScreen category={category} onBack={() => setView("home")} onSelectSupplier={(s) => { setSupplier(s); setView("profile"); }} />}
      {view === "profile" && <SupplierProfile name={supplier} onBack={() => setView("results")} onBook={() => setView("booking")} />}
      {view === "booking" && <BookingScreen supplier={supplier} onBack={() => setView("profile")} />}
    </div>
  );
}

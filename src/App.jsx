// Single-screen demo with bottom tab bar and searchable categories
// Flow: Home → Results → Supplier Profile → Booking, plus tab navigation and search.

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

// UI helpers for the profile page
const Badge = ({ children }) => (
  <span style={{
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    background: `${Brand.accent}22`,
    color: Brand.accent,
    borderRadius: 999,
    padding: "6px 10px",
    fontSize: 11,
    fontWeight: 800,
  }}>{children}</span>
);

const StarRow = ({ value = 5 }) => (
  <span aria-label={`${value} stars`}>
    {Array.from({ length: 5 }).map((_, i) => (
      <span key={i} style={{ color: i < value ? "#f59e0b" : "#e2e8f0", marginRight: 2 }}>★</span>
    ))}
  </span>
);


// Bottom tab bar
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
        color: active === key ? Brand.accent : Brand.muted,
      }}
    >
      <div style={{ fontSize: 16 }}>{emoji}</div>
      <div style={{ fontSize: 11 }}>{label}</div>
    </button>
  );
  return (
    <div style={{
      position: "sticky",
      bottom: 0,
      left: 0,
      right: 0,
      display: "flex",
      gap: 8,
      alignItems: "center",
      justifyContent: "space-between",
      marginTop: 12,
      background: "#fff",
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

// Screens
const HomeScreen = ({ onSelectCategory, onSelectTab, onSearch }) => {
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
  const [query, setQuery] = React.useState("");
  const filtered = query
    ? categories.filter((c) => c.label.toLowerCase().includes(query.toLowerCase()))
    : categories;

  const submit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    onSearch?.(query.trim());
  };

  return (
    <Phone bg={Brand.bg}>
      <TopBar title="Home" />
      <div style={{ display: "flex", flexDirection: "column", gap: 12, paddingInline: 4 }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12 }}>
          <span style={{ color: Brand.text }}>📍 London, UK</span>
          <span style={{ color: Brand.accent, fontWeight: 600 }}>Change ▾</span>
        </div>

        {/* Search bar */}
        <form onSubmit={submit} style={{ position: "relative", display: "flex", justifyContent: "center" }}>
          <span style={{ position: "absolute", left: 12, top: 10, fontSize: 16 }}>🔎</span>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') submit(e); }}
            placeholder="Find services, equipment, or crew"
            style={{
              maxWidth: 260,
              height: 40,
              borderRadius: 999,
              border: "1px solid #e5e7eb",
              padding: "0 80px 0 36px",
              fontSize: 14,
              outline: "none",
              background: "#fff",
            }}
          />
          {query && (
            <button type="button" onClick={() => setQuery("")} style={{ position: "absolute", right: 88, top: 8, border: 0, background: "transparent", cursor: "pointer", fontSize: 14, color: Brand.muted }}>✕</button>
          )}
          
        </form>

        {/* Category grid (filters as you type) */}
        <div style={styles.grid}>
          {filtered.map((c) => (
            <div
              key={c.label}
              onClick={() => onSelectCategory(c.label)}
              style={{ ...styles.card, textAlign: "center", cursor: "pointer" }}
            >
              <div style={{ fontSize: 24 }}>{c.icon}</div>
              <div style={{ fontSize: 12, fontWeight: 700, marginTop: 4 }}>{c.label}</div>
            </div>
          ))}
          {filtered.length === 0 && (
            <div style={{ gridColumn: "1 / -1", fontSize: 12, color: Brand.muted }}>No categories match “{query}”.</div>
          )}
        </div>
        <BottomTabs active="home" onSelect={onSelectTab} />
      </div>
    </Phone>
  );
};

const ResultsScreen = ({ category, onBack, onSelectSupplier, onSelectTab }) => (
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
              <div style={{ fontSize: 14, fontWeight: 800, color: Brand.text }}>
                {category} Pro #{n}
              </div>
              <div style={{ fontSize: 12, color: Brand.muted }}>From £{150 + n * 25}</div>
            </div>
            <Button onClick={() => onSelectSupplier(`${category} Pro #${n}`)}>View</Button>
          </div>
        </Card>
      ))}
      <BottomTabs active="home" onSelect={onSelectTab} />
    </div>
  </Phone>
);

const SupplierProfile = ({ name, onBack, onBook, onSelectTab }) => {
  const packages = [
    { tier: "Bronze", price: 150, unit: "/hr" },
    { tier: "Silver", price: 300, unit: "" },
    { tier: "Gold", price: 500, unit: "" },
  ];
  const availability = [
    "https://images.unsplash.com/photo-1506157786151-b8491531f063?q=80&w=400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1520975661595-6453be3f7070?q=80&w=400&auto=format&fit=crop",
  ];

  return (
    <Phone bg={Brand.bg}>
      <TopBar title="Supplier Profile" onBack={onBack} />
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {/* Header with avatar, name, rating & badges */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <img src="https://images.unsplash.com/photo-1544723795-3fb6469f5b39?q=80&w=200&auto=format&fit=crop" alt="avatar" style={{ width: 96, height: 96, borderRadius: 999, objectFit: "cover" }}/>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 22, fontWeight: 900, color: Brand.text }}>{name || "George Harris"}</div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 6 }}>
              <StarRow value={5} />
              <span style={{ fontWeight: 700, color: Brand.text }}>4.8</span>
            </div>
            <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
              <Badge>✔︎ Verified</Badge>
              <Badge>🛡 Insured</Badge>
            </div>
          </div>
        </div>

        {/* Bio */}
        <div style={{ fontSize: 18, fontWeight: 900, color: Brand.text }}>Bio</div>
        <Card>
          DJ with 10 years of experience performing at weddings, parties, and corporate events.
        </Card>

        {/* Services Offered (packages) */}
        <div style={{ fontSize: 18, fontWeight: 900, color: Brand.text }}>Services Offered</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          {packages.map((p) => (
            <div key={p.tier} style={{ ...styles.card, padding: 14 }}>
              <div style={{ fontSize: 16, fontWeight: 900 }}>{p.tier}</div>
              <div style={{ marginTop: 6, fontWeight: 800 }}>€ {p.price}<span style={{ fontSize: 12, color: Brand.muted }}>{p.unit}</span></div>
            </div>
          ))}
        </div>

        {/* Availability (gallery) */}
        <div style={{ fontSize: 18, fontWeight: 900, color: Brand.text }}>Availability</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
          {availability.map((src, i) => (
            <img key={i} src={src} alt="availability" style={{ width: "100%", height: 84, objectFit: "cover", borderRadius: 12 }} />
          ))}
        </div>

        {/* Portfolio (blurb + map tile) */}
        <div style={{ fontSize: 18, fontWeight: 900, color: Brand.text }}>Portfolio</div>
        <Card>
          <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <StarRow value={5} /><span style={{ fontWeight: 700, color: Brand.text }}>5</span>
              </div>
              <div style={{ marginTop: 6 }}>
                Absolutely fantastic DJ! Kept the dance floor packed all night.
              </div>
            </div>
            <img src="https://maps.geoapify.com/v1/staticmap?style=osm-carto&width=140&height=120&center=lonlat:-6.2603,53.3498&zoom=11&apiKey=demo" alt="Dublin map" style={{ width: 140, height: 120, objectFit: "cover", borderRadius: 12 }}/>
          </div>
        </Card>

        {/* Reviews */}
        <div style={{ fontSize: 18, fontWeight: 900, color: Brand.text }}>Reviews</div>
        <Card>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=80&auto=format&fit=crop" alt="reviewer" style={{ width: 40, height: 40, borderRadius: 999, objectFit: "cover" }} />
            <div>
              <div style={{ fontWeight: 800 }}>Maria P.</div>
              <StarRow value={5} />
            </div>
          </div>
          <div style={{ marginTop: 8 }}>
            Incredible set, super professional and friendly. Would absolutely recommend!
          </div>
        </Card>

        {/* CTA */}
        <div style={{ display: "flex", gap: 8 }}>
          <Button style={{ flex: 1, background: "#475569" }}>Message</Button>
          <Button style={{ flex: 1 }} onClick={() => onBook("Silver")}>Book Now</Button>
        </div>

        <BottomTabs active="home" onSelect={onSelectTab} />
      </div>
    </Phone>
  );
};

const BookingScreen = ({ supplier, onBack, onSelectTab }) => (
  <Phone bg={Brand.bg}>
    <TopBar title="Booking" onBack={onBack} />
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <div style={{ fontSize: 18, fontWeight: 800, color: Brand.text }}>{supplier}</div>
      <Card>[Calendar picker placeholder]</Card>
      <div style={{ fontSize: 13, color: Brand.text }}>Selected Package: Silver (£400)</div>
      <Button style={{ width: "100%" }}>Confirm & Pay</Button>
      <BottomTabs active="bookings" onSelect={onSelectTab} />
    </div>
  </Phone>
);

export default function App() {
  const [view, setView] = useState("home");
  const [category, setCategory] = useState("DJs");
  const [supplier, setSupplier] = useState(null);

  const handleTab = (tab) => {
    if (tab === "home") setView("home");
    if (tab === "bookings") setView("booking");
    if (tab === "help") setView("help");
    if (tab === "profile") setView("profileTab");
  };

  // Search handler: route to best matching category
  const handleSearch = (q) => {
    const cats = [
      "DJs",
      "Event Hosts",
      "AV & Lighting",
      "Catering",
      "Photography",
      "Videography",
      "Photobooth’s",
      "Mobile Bars",
      "Light Up Letters",
    ];
    const match = cats.find((c) => c.toLowerCase().includes(q.toLowerCase())) || "Photography";
    setCategory(match);
    setView("results");
  };

  let screen;
  if (view === "home") screen = <HomeScreen onSelectCategory={(c) => { setCategory(c); setView("results"); }} onSelectTab={handleTab} onSearch={handleSearch} />;
  if (view === "results") screen = <ResultsScreen category={category} onBack={() => setView("home")} onSelectSupplier={(s) => { setSupplier(s); setView("profile"); }} onSelectTab={handleTab} />;
  if (view === "profile") screen = <SupplierProfile name={supplier} onBack={() => setView("results")} onBook={() => setView("booking")} onSelectTab={handleTab} />;
  if (view === "booking") screen = <BookingScreen supplier={supplier || "Your bookings"} onBack={() => setView("home")} onSelectTab={handleTab} />;
  if (view === "help") screen = (
    <Phone bg={Brand.bg}>
      <TopBar title="Help & Support" onBack={() => setView("home")} />
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <Card>FAQ coming soon. For now, email support@alleventhub.example</Card>
        <BottomTabs active="help" onSelect={handleTab} />
      </div>
    </Phone>
  );
  if (view === "profileTab") screen = (
    <Phone bg={Brand.bg}>
      <TopBar title="My Profile" onBack={() => setView("home")} />
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <Card>Signed in as: demo@user.com</Card>
        <Card>Upcoming bookings will appear here.</Card>
        <BottomTabs active="profile" onSelect={handleTab} />
      </div>
    </Phone>
  );

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", background: "#f1f5f9", padding: 16 }}>
      {screen}
    </div>
  );
}

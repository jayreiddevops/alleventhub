// asp.jsx
// All Event Hub — Branded Demo with Hero Banner + SVG/Lucide Icons
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
    <span style={{ fontSize: 18 }}>{title}</span>
  </div>
);

const Card = ({ children, style }) => (
  <div style={{ ...styles.card, ...style }}>{children}</div>
);
const Button = ({ children, onClick, style }) => (
  <button style={{ ...styles.pill, ...style }} onClick={onClick}>
    {children}
  </button>
);

const Badge = ({ children, tone = "teal" }) => (
  <span
    style={{
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
    }}
  >
    {children}
  </span>
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
    <div
      style={{
        marginTop: "auto",
        display: "flex",
        gap: 8,
        alignItems: "center",
        justifyContent: "space-between",
        background: Brand.white,
        borderRadius: 999,
        padding: "4px 8px",
        boxShadow: "0 6px 14px rgba(15,23,42,0.10)",
      }}
    >
      {item("home", "Home", "🏠")}
      {item("bookings", "Bookings", "📅")}
      {item("help", "Help", "❓")}
      {item("profile", "Profile", "👤")}
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* Home (tiles) + hero                                                 */
/* ------------------------------------------------------------------ */
const categories = [
  { key: "dj", label: "DJs", icon: <Music2 size={28} color={Brand.navy} /> },
  { key: "host", label: "Event Hosts", icon: <Mic size={28} color={Brand.navy} /> },
  { key: "av", label: "AV & Lighting", icon: <Lightbulb size={28} color={Brand.navy} /> },
  { key: "catering", label: "Catering", icon: <Utensils size={28} color={Brand.navy} /> },
  { key: "photo", label: "Photography", icon: <Camera size={28} color={Brand.navy} /> },
  { key: "video", label: "Videography", icon: <Video size={28} color={Brand.navy} /> },
  { key: "booth", label: "Photobooth’s", icon: <Smile size={28} color={Brand.navy} /> },
  { key: "bar", label: "Mobile Bars", icon: <Wine size={28} color={Brand.navy} /> },
  { key: "letters", label: "Light Up Letters", icon: <Type size={28} color={Brand.navy} /> },
];

/* ------------------------------------------------------------------ */
/* Results (supplier list for a category)                              */
/* ------------------------------------------------------------------ */
const ResultsScreen = ({ category, onBack, onSelectSupplier }) => {
  // mock suppliers for demo
  const suppliers = [
    {
      id: 1,
      name: "George Harris",
      role: category,
      priceFrom: 250,
      rating: 4.8,
      jobs: 126,
      img: "https://i.pravatar.cc/100?img=12",
    },
    {
      id: 2,
      name: "Maria Lopez",
      role: category,
      priceFrom: 320,
      rating: 4.9,
      jobs: 203,
      img: "https://i.pravatar.cc/100?img=45",
    },
    {
      id: 3,
      name: "DJ Nova",
      role: category,
      priceFrom: 280,
      rating: 4.7,
      jobs: 98,
      img: "https://i.pravatar.cc/100?img=23",
    },
  ];

  return (
    <Phone>
      <TopBar title={`${category} in London`} onBack={onBack} />
      <div style={{ display: "flex", flexDirection: "column", gap: 12, flex: 1 }}>
        {suppliers.map((s) => (
          <Card key={s.id}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <img
                src={s.img}
                alt={s.name}
                style={{ width: 56, height: 56, borderRadius: 16, objectFit: "cover" }}
              />
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: "Poppins, sans-serif", fontWeight: 800 }}>
                  {s.name}
                </div>
                <div style={{ fontSize: 12, color: Brand.muted }}>
                  {s.role} • ⭐ {s.rating} ({s.jobs})
                </div>
                <div style={{ fontSize: 12, color: Brand.text }}>From €{s.priceFrom}</div>
              </div>
              <Button onClick={() => onSelectSupplier(s)}>View</Button>
            </div>
          </Card>
        ))}
      </div>
      <BottomTabs active="home" onSelect={() => {}} />
    </Phone>
  );
};

/* ------------------------------------------------------------------ */
/* Supplier Profile                                                    */
/* ------------------------------------------------------------------ */
const StarRow = ({ value = 5 }) => (
  <span aria-label={`${value} stars`}>
    {Array.from({ length: 5 }).map((_, i) => (
      <span
        key={i}
        style={{ color: i < value ? "#F59E0B" : "#E2E8F0", marginRight: 2 }}
      >
        ★
      </span>
    ))}
  </span>
);

const SupplierProfile = ({ supplier, onBack, onBook }) => {
  const packages = [
    { tier: "Bronze", price: 150, unit: "/hr" },
    { tier: "Silver", price: 300, unit: "" },
    { tier: "Gold", price: 500, unit: "" },
  ];
  const gallery = [
    "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1520975661595-6453be3f7070?w=400&auto=format&fit=crop",
  ];

  return (
    <Phone>
      <TopBar title="Supplier Profile" onBack={onBack} />
      <div style={{ display: "flex", flexDirection: "column", gap: 14, flex: 1 }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <img
            src={supplier?.img || `https://i.pravatar.cc/120?u=${supplier?.name}`}
            alt={supplier?.name}
            style={{ width: 96, height: 96, borderRadius: 999, objectFit: "cover" }}
          />
          <div style={{ flex: 1 }}>
            <div
              style={{
                fontSize: 22,
                fontWeight: 900,
                fontFamily: "Poppins, sans-serif",
                color: Brand.text,
              }}
            >
              {supplier?.name}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 6 }}>
              <StarRow value={5} />
              <span style={{ fontWeight: 700, color: Brand.text }}>4.8</span>
            </div>
            <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
              <Badge>✔︎ Verified</Badge>
              <Badge tone="orange">🛡 Insured</Badge>
            </div>
          </div>
        </div>

        {/* Bio */}
        <div
          style={{
            fontSize: 18,
            fontWeight: 900,
            fontFamily: "Poppins, sans-serif",
            color: Brand.text,
          }}
        >
          Bio
        </div>
        <Card>
          Experienced {supplier?.role} for weddings, parties, and corporate events.
        </Card>

        {/* Services */}
        <div
          style={{
            fontSize: 18,
            fontWeight: 900,
            fontFamily: "Poppins, sans-serif",
            color: Brand.text,
          }}
        >
          Services Offered
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          {packages.map((p) => (
            <div key={p.tier} style={{ ...styles.card, padding: 14 }}>
              <div
                style={{ fontSize: 16, fontWeight: 900, fontFamily: "Poppins, sans-serif" }}
              >
                {p.tier}
              </div>
              <div style={{ marginTop: 6, fontWeight: 800 }}>
                € {p.price}
                <span style={{ fontSize: 12, color: Brand.muted }}>{p.unit}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Availability (gallery) */}
        <div
          style={{
            fontSize: 18,
            fontWeight: 900,
            fontFamily: "Poppins, sans-serif",
            color: Brand.text,
          }}
        >
          Availability
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
          {gallery.map((src, i) => (
            <img
              key={i}
              src={src}
              alt="availability"
              style={{ width: "100%", height: 84, objectFit: "cover", borderRadius: 12 }}
            />
          ))}
        </div>

        {/* Portfolio sample */}
        <div
          style={{
            fontSize: 18,
            fontWeight: 900,
            fontFamily: "Poppins, sans-serif",
            color: Brand.text,
          }}
        >
          Portfolio
        </div>
        <Card>
          <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <StarRow value={5} />
                <span style={{ fontWeight: 700, color: Brand.text }}>5</span>
              </div>
              <div style={{ marginTop: 6 }}>
                Absolutely fantastic! Kept the dance floor packed all night.
              </div>
            </div>
            <img
              src="https://maps.geoapify.com/v1/staticmap?style=osm-carto&width=140&height=120&center=lonlat:-0.1276,51.5072&zoom=11&apiKey=demo"
              alt="London map"
              style={{ width: 140, height: 120, objectFit: "cover", borderRadius: 12 }}
            />
          </div>
        </Card>

        {/* CTA */}
        <div style={{ display: "flex", gap: 8 }}>
          <Button style={{ flex: 1, background: Brand.navy }}>Message</Button>
          <Button
            style={{ flex: 1, background: Brand.orange }}
            onClick={() => onBook("Silver (€300)")}
          >
            Book Now
          </Button>
        </div>

        <BottomTabs active="home" onSelect={() => {}} />
      </div>
    </Phone>
  );
};

/* ------------------------------------------------------------------ */
/* Booking                                                             */
/* ------------------------------------------------------------------ */
const BookingPage = ({
  supplier = "George Harris",
  selectedPackage = "Silver (€300)",
  onBack,
  onSelectTab,
}) => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [notes, setNotes] = useState("");

  return (
    <Phone>
      <TopBar title="Booking" onBack={onBack} />
      <div style={{ display: "flex", flexDirection: "column", gap: 14, flex: 1 }}>
        <Card>
          <div
            style={{ fontSize: 18, fontWeight: 800, fontFamily: "Poppins, sans-serif" }}
          >
            {supplier}
          </div>
          <div style={{ fontSize: 14, marginTop: 4, color: Brand.muted }}>
            Package: {selectedPackage}
          </div>
        </Card>

        <div
          style={{ fontSize: 16, fontWeight: 800, fontFamily: "Poppins, sans-serif" }}
        >
          Choose Date
        </div>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          style={{ ...styles.card, padding: 10, fontSize: 14 }}
        />

        <div
          style={{ fontSize: 16, fontWeight: 800, fontFamily: "Poppins, sans-serif" }}
        >
          Choose Time
        </div>
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          style={{ ...styles.card, padding: 10, fontSize: 14 }}
        />

        <div
          style={{ fontSize: 16, fontWeight: 800, fontFamily: "Poppins, sans-serif" }}
        >
          Notes
        </div>
        <textarea
          placeholder="Add any special requests (optional)"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          style={{ ...styles.card, padding: 10, fontSize: 14, minHeight: 80, resize: "vertical" }}
        />

        <Button
          style={{ width: "100%", marginTop: 12, background: Brand.teal }}
          onClick={() => {
            const payload = {
              id: Date.now(),
              supplier,
              selectedPackage,
              date,
              time,
              notes,
              status: "Confirmed",
              createdAt: new Date().toISOString(),
            };
            try {
              const key = "aeh_bookings";
              const current = JSON.parse(localStorage.getItem(key) || "[]");
              current.unshift(payload);
              localStorage.setItem(key, JSON.stringify(current));
            } catch {}
            alert(
              `Booked ${supplier} on ${date || "(date)"} at ${
                time || "(time)"
              } — ${selectedPackage}`
            );
            onSelectTab?.("bookings");
          }}
        >
          Confirm & Pay
        </Button>

        <BottomTabs active="bookings" onSelect={onSelectTab} />
      </div>
    </Phone>
  );
};

/* ------------------------------------------------------------------ */
/* Bookings tab                                                        */
/* ------------------------------------------------------------------ */
const BookingsTab = ({ onSelectTab }) => {
  const [bookings, setBookings] = useState([]);
  useEffect(() => {
    try {
      setBookings(JSON.parse(localStorage.getItem("aeh_bookings") || "[]"));
    } catch {
      setBookings([]);
    }
  }, []);

  const cancel = (id) => {
    const updated = bookings.map((b) =>
      b.id === id ? { ...b, status: "Cancelled" } : b
    );
    setBookings(updated);
    try {
      localStorage.setItem("aeh_bookings", JSON.stringify(updated));
    } catch {}
  };

  return (
    <Phone>
      <TopBar title="My Bookings" />
      <div style={{ display: "flex", flexDirection: "column", gap: 12, flex: 1 }}>
        {bookings.length === 0 && (
          <Card>
            <div
              style={{
                fontWeight: 800,
                marginBottom: 6,
                fontFamily: "Poppins, sans-serif",
              }}
            >
              No bookings yet
            </div>
            <div style={{ fontSize: 13, color: Brand.muted }}>
              When you confirm a booking it will appear here.
            </div>
            <Button
              style={{ marginTop: 10, background: Brand.orange }}
              onClick={() => onSelectTab?.("home")}
            >
              Find services
            </Button>
          </Card>
        )}
        {bookings.map((b) => (
          <Card key={b.id}>
            <div style={{ fontFamily: "Poppins, sans-serif", fontWeight: 900 }}>
              {b.supplier}
            </div>
            <div style={{ fontSize: 12, color: Brand.muted }}>{b.selectedPackage}</div>
            <div style={{ fontSize: 12 }}>
              {b.date} at {b.time}
            </div>
            <span
              style={{
                fontSize: 12,
                fontWeight: 800,
                color: b.status === "Cancelled" ? Brand.red : Brand.teal,
              }}
            >
              {b.status}
            </span>
            <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
              <Button
                style={{ background: Brand.navy, flex: 1 }}
                onClick={() => alert(JSON.stringify(b, null, 2))}
              >
                View
              </Button>
              <Button
                style={{ background: Brand.red, flex: 1 }}
                onClick={() => cancel(b.id)}
              >
                Cancel
              </Button>
            </div>
          </Card>
        ))}

        <BottomTabs active="bookings" onSelect={onSelectTab} />
      </div>
    </Phone>
  );
};

/* ------------------------------------------------------------------ */
/* App (router)                                                        */
/* ------------------------------------------------------------------ */
export default function App() {
  const [view, setView] = useState("home");
  const [category, setCategory] = useState("DJs");
  const [supplier, setSupplier] = useState(null);

  let screen;
  if (view === "results")
    screen = (
      <ResultsScreen
        category={category}
        onBack={() => setView("home")}
        onSelectSupplier={(s) => {
          setSupplier(s);
          setView("supplier");
        }}
      />
    );

  if (view === "supplier")
    screen = (
      <SupplierProfile
        supplier={supplier}
        onBack={() => setView("results")}
        onBook={() => setView("booking")}
      />
    );

  if (view === "booking")
    screen = (
      <BookingPage
        supplier={supplier?.name || "George Harris"}
        selectedPackage={"Silver (€300)"}
        onBack={() => setView("supplier")}
        onSelectTab={setView}
      />
    );

  if (view === "bookings") screen = <BookingsTab onSelectTab={setView} />;

  if (view === "home")
    screen = (
      <Phone>
        <TopBar title="All Event Hub" />

        {/* Hero Banner */}
        <div
          style={{
            background: `linear-gradient(135deg, ${Brand.navy} 0%, ${Brand.navy} 65%, ${Brand.teal}22 100%)`,
            color: Brand.white,
            borderRadius: 20,
            padding: "20px 16px",
            marginBottom: 16,
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <img
            src="/logo.png"
            alt="AllEventHub"
            style={{ width: 56, height: 56, borderRadius: 14, background: Brand.white }}
          />
          <div style={{ flex: 1 }}>
            <h2 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 800, fontSize: 18, margin: 0 }}>
              Plan the perfect event
            </h2>
            <p style={{ fontSize: 12, margin: "4px 0 0", opacity: 0.9 }}>
              Book trusted suppliers in minutes.
            </p>
          </div>
          <Button style={{ background: Brand.orange }} onClick={() => setView("results")}>
            Get Started
          </Button>
        </div>

        {/* Category tiles */}
        <div
          style={{
            flex: 1,
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 12,
          }}
        >
          {categories.map((c) => (
            <div
              key={c.key}
              onClick={() => {
                setCategory(c.label);
                setView("results");
              }}
              style={{ ...styles.card, textAlign: "center", padding: 16, cursor: "pointer" }}
            >
              <div>{c.icon}</div>
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 800,
                  marginTop: 6,
                  fontFamily: "Poppins, sans-serif",
                }}
              >
                {c.label}
              </div>
            </div>
          ))}
        </div>

        <BottomTabs active="home" onSelect={setView} />
      </Phone>
    );

  // Center on page
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#eef2f6",
        padding: 16,
      }}
    >
      {screen}
    </div>
  );
}

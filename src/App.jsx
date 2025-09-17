// asp.jsx
// ============================================================================
// All Event Hub — FULL DEMO
// Home (colored tiles + hero) → Results (with Featured rail) → Supplier Profile
// → Booking → Bookings tab → Help (Contact Form) → About Us → (Profile placeholder)
// Bottom Tabs use SVG icons (no emojis). Bookings saved to localStorage.
// ============================================================================

import React, { useState, useEffect } from "react";
import { Mic, Camera, Video, Music2, Lightbulb, Utensils, Type, Wine, Smile } from "lucide-react";

// ============================================================================
// SECTION: BRAND SYSTEM & BASE STYLES
// ============================================================================
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
  input: {
    border: "1px solid #e2e8f0",
    borderRadius: 12,
    padding: "10px 12px",
    fontSize: 14,
    outline: "none",
  },
  textarea: {
    border: "1px solid #e2e8f0",
    borderRadius: 12,
    padding: "10px 12px",
    fontSize: 14,
    minHeight: 100,
    resize: "vertical",
    outline: "none",
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
const Button = ({ children, onClick, style, type = "button" }) => (
  <button type={type} style={{ ...styles.pill, ...style }} onClick={onClick}>
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

// ============================================================================
// SECTION: BOTTOM TABS (SVG ICONS, NO EMOJIS)
// ============================================================================
const tabSvg = {
  home: (active) => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? Brand.orange : Brand.navy} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 10.5 12 3l9 7.5"/><path d="M5 10v10h14V10"/></svg>
  ),
  bookings: (active) => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? Brand.orange : Brand.navy} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
  ),
  help: (active) => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? Brand.orange : Brand.navy} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18h.01"/><path d="M9 14a3 3 0 1 1 3-3"/><path d="M12 17v1"/></svg>
  ),
  about: (active) => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? Brand.orange : Brand.navy} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8h.01"/><path d="M10 12h2v4"/></svg>
  ),
  profile: (active) => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? Brand.orange : Brand.navy} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="7" r="3"/><path d="M4 21v-1a7 7 0 0 1 14 0v1"/></svg>
  ),
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
    <div
      style={{
        marginTop: "auto",
        display: "flex",
        gap: 6,
        alignItems: "center",
        justifyContent: "space-between",
        background: Brand.white,
        borderRadius: 999,
        padding: "4px 6px",
        boxShadow: "0 6px 14px rgba(15,23,42,0.10)",
      }}
    >
      {items.map((it) => (
        <button
          key={it.key}
          onClick={() => onSelect(it.key)}
          style={{
            flex: 1,
            background: "transparent",
            border: 0,
            padding: "8px 0 6px",
            cursor: "pointer",
            color: active === it.key ? Brand.orange : Brand.muted,
            fontWeight: active === it.key ? 800 : 600,
            fontFamily: "Nunito, sans-serif",
          }}
        >
          <div style={{ display: "grid", placeItems: "center" }}>
            {tabSvg[it.key](active === it.key)}
          </div>
          <div style={{ fontSize: 10, marginTop: 2 }}>{it.label}</div>
        </button>
      ))}
    </div>
  );
};

// ============================================================================
// SECTION: HOME (COLORED TILES + HERO)
// ============================================================================
const categories = [
  { key: "dj",      label: "DJs",             icon: <Music2 size={28} color={Brand.navy} />,     bg: "#1ABC9C22" },
  { key: "host",    label: "Event Hosts",     icon: <Mic size={28} color={Brand.navy} />,        bg: "#FF8C4222" },
  { key: "av",      label: "AV & Lighting",   icon: <Lightbulb size={28} color={Brand.navy} />,  bg: "#F4D35E22" },
  { key: "catering",label: "Catering",        icon: <Utensils size={28} color={Brand.navy} />,   bg: "#E6394622" },
  { key: "photo",   label: "Photography",     icon: <Camera size={28} color={Brand.navy} />,     bg: "#1ABC9C22" },
  { key: "video",   label: "Videography",     icon: <Video size={28} color={Brand.navy} />,      bg: "#FF8C4222" },
  { key: "booth",   label: "Photobooth’s",    icon: <Smile size={28} color={Brand.navy} />,      bg: "#F4D35E22" },
  { key: "bar",     label: "Mobile Bars",     icon: <Wine size={28} color={Brand.navy} />,       bg: "#1ABC9C22" },
  { key: "letters", label: "Light Up Letters",icon: <Type size={28} color={Brand.navy} />,       bg: "#0D1B2A15" },
];

// ============================================================================
// SECTION: SHARED — STAR ROW
// ============================================================================
const StarRow = ({ value = 5 }) => (
  <span aria-label={`${value} stars`}>
    {Array.from({ length: 5 }).map((_, i) => (
      <span key={i} style={{ color: i < Math.round(value) ? "#F59E0B" : "#E2E8F0", marginRight: 2 }}>
        ★
      </span>
    ))}
  </span>
);

// ============================================================================
// SECTION: RESULTS (WITH FEATURED RAIL + LIST)
// ============================================================================
const SponsoredBadge = () => (
  <span
    style={{
      background: `${Brand.orange}22`,
      color: Brand.orange,
      fontSize: 10,
      fontWeight: 800,
      borderRadius: 999,
      padding: "4px 8px",
      fontFamily: "Nunito, sans-serif",
    }}
  >
    Sponsored
  </span>
);

const ResultsScreen = ({ category, onBack, onSelectSupplier }) => {
  const allSuppliers = [
    { id: 1, name: "George Harris", role: category, priceFrom: 250, rating: 4.8, jobs: 126, img: "https://i.pravatar.cc/150?img=12", featured: true },
    { id: 2, name: "Maria Lopez",  role: category, priceFrom: 320, rating: 4.9, jobs: 203, img: "https://i.pravatar.cc/150?img=45", featured: true },
    { id: 3, name: "DJ Nova",      role: category, priceFrom: 280, rating: 4.7, jobs: 98,  img: "https://i.pravatar.cc/150?img=23", featured: true },
    { id: 4, name: "Alex Carter",  role: category, priceFrom: 220, rating: 4.6, jobs: 87,  img: "https://i.pravatar.cc/150?img=31" },
    { id: 5, name: "Lena Park",    role: category, priceFrom: 310, rating: 4.9, jobs: 175, img: "https://i.pravatar.cc/150?img=5" },
  ];

  const featuredSuppliers = allSuppliers.filter((s) => s.featured).slice(0, 3);
  const listSuppliers = allSuppliers.filter((s) => !s.featured);

  return (
    <Phone>
      <TopBar title={`${category} in London`} onBack={onBack} />

      {/* Featured rail */}
      <div style={{ marginBottom: 8 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 8,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <h3
              style={{
                margin: 0,
                fontSize: 14,
                fontFamily: "Poppins, sans-serif",
                fontWeight: 900,
                color: Brand.text,
              }}
            >
              Featured {category}
            </h3>
            <SponsoredBadge />
          </div>
          <div style={{ fontSize: 11, color: Brand.muted }}>3 spots</div>
        </div>

        <div
          style={{
            display: "flex",
            gap: 12,
            overflowX: "auto",
            paddingBottom: 6,
            scrollbarWidth: "none",
          }}
        >
          {featuredSuppliers.map((s) => (
            <div
              key={s.id}
              onClick={() => onSelectSupplier(s)}
              style={{
                minWidth: 220,
                background: `${Brand.navy}08`,
                borderRadius: 16,
                padding: 10,
                boxShadow: "0 1px 2px rgba(15,23,42,0.06)",
                cursor: "pointer",
              }}
            >
              <img
                src={s.img}
                alt={s.name}
                style={{
                  width: "100%",
                  height: 110,
                  borderRadius: 12,
                  objectFit: "cover",
                }}
              />
              <div style={{ marginTop: 8 }}>
                <div
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: 900,
                    fontSize: 14,
                    color: Brand.text,
                  }}
                >
                  {s.name}
                </div>
                <div style={{ fontSize: 12, color: Brand.muted }}>{s.role}</div>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <StarRow value={s.rating} />
                  <span style={{ fontSize: 12, fontWeight: 700, color: Brand.text }}>
                    {s.rating} ({s.jobs})
                  </span>
                </div>
                <div style={{ fontSize: 13, fontWeight: 900, color: Brand.teal }}>
                  From €{s.priceFrom}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main list */}
      <div style={{ display: "flex", flexDirection: "column", gap: 14, flex: 1 }}>
        {listSuppliers.map((s) => (
          <Card key={s.id} style={{ padding: 16, cursor: "pointer" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <img
                src={s.img}
                alt={s.name}
                style={{
                  width: 90,
                  height: 90,
                  borderRadius: 20,
                  objectFit: "cover",
                  flexShrink: 0,
                }}
              />
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: 800,
                    fontSize: 18,
                    marginBottom: 4,
                  }}
                >
                  {s.name}
                </div>
                <div style={{ fontSize: 13, color: Brand.muted, marginBottom: 6 }}>
                  {s.role}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
                  <StarRow value={s.rating} />
                  <span style={{ fontSize: 13, fontWeight: 700, color: Brand.text }}>
                    {s.rating} ({s.jobs})
                  </span>
                </div>
                <div style={{ fontSize: 14, fontWeight: 800, color: Brand.teal }}>
                  From €{s.priceFrom}
                </div>
              </div>
              <Button onClick={() => onSelectSupplier(s)} style={{ background: Brand.orange }}>
                View
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <BottomTabs active="home" onSelect={() => {}} />
    </Phone>
  );
};

// ============================================================================
// SECTION: SUPPLIER PROFILE
// ============================================================================
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
        <Card>Experienced {supplier?.role} for weddings, parties, and corporate events.</Card>

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
              <div style={{ fontSize: 16, fontWeight: 900, fontFamily: "Poppins, sans-serif" }}>
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

        {/* CTAs */}
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

// ============================================================================
// SECTION: BOOKING PAGE
// ============================================================================
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
          <div style={{ fontSize: 18, fontWeight: 800, fontFamily: "Poppins, sans-serif" }}>
            {supplier}
          </div>
          <div style={{ fontSize: 14, marginTop: 4, color: Brand.muted }}>
            Package: {selectedPackage}
          </div>
        </Card>

        <div style={{ fontSize: 16, fontWeight: 800, fontFamily: "Poppins, sans-serif" }}>
          Choose Date
        </div>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          style={{ ...styles.card, padding: 10, fontSize: 14 }}
        />

        <div style={{ fontSize: 16, fontWeight: 800, fontFamily: "Poppins, sans-serif" }}>
          Choose Time
        </div>
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          style={{ ...styles.card, padding: 10, fontSize: 14 }}
        />

        <div style={{ fontSize: 16, fontWeight: 800, fontFamily: "Poppins, sans-serif" }}>
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
              `Booked ${supplier} on ${date || "(date)"} at ${time || "(time)"} — ${selectedPackage}`
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

// ============================================================================
// SECTION: BOOKINGS TAB (CURRENT BOOKINGS)
// ============================================================================
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
              <Button style={{ background: Brand.red, flex: 1 }} onClick={() => cancel(b.id)}>
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

// ============================================================================
// SECTION: HELP (CONTACT FORM)
// ============================================================================
const HelpScreen = ({ onSelectTab }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const submit = (e) => {
    e.preventDefault();
    const record = { id: Date.now(), name, email, message, createdAt: new Date().toISOString() };
    try {
      const key = "aeh_contacts";
      const all = JSON.parse(localStorage.getItem(key) || "[]");
      all.unshift(record);
      localStorage.setItem(key, JSON.stringify(all));
    } catch {}
    alert("Thanks! We’ll get back to you shortly.");
    setName("");
    setEmail("");
    setMessage("");
    onSelectTab?.("home");
  };

  return (
    <Phone>
      <TopBar title="Help & Contact" />
      <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 12, flex: 1 }}>
        <div>
          <div style={{ fontWeight: 800, fontFamily: "Poppins, sans-serif", marginBottom: 6 }}>
            Your Name
          </div>
          <input
            style={{ ...styles.input, width: "100%" }}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Jane Doe"
            required
          />
        </div>
        <div>
          <div style={{ fontWeight: 800, fontFamily: "Poppins, sans-serif", marginBottom: 6 }}>
            Email
          </div>
          <input
            type="email"
            style={{ ...styles.input, width: "100%" }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
            required
          />
        </div>
        <div>
          <div style={{ fontWeight: 800, fontFamily: "Poppins, sans-serif", marginBottom: 6 }}>
            Message
          </div>
          <textarea
            style={{ ...styles.textarea, width: "100%" }}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="How can we help?"
            required
          />
        </div>
        <Button type="submit" style={{ background: Brand.orange, width: "100%" }}>
          Send
        </Button>
        <BottomTabs active="help" onSelect={onSelectTab} />
      </form>
    </Phone>
  );
};

// ============================================================================
// SECTION: ABOUT US
// ============================================================================
const AboutScreen = ({ onSelectTab }) => (
  <Phone>
    <TopBar title="About Us" />
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <Card>
        <div style={{ fontFamily: "Poppins, sans-serif", fontWeight: 900, fontSize: 18 }}>
          ✨ Welcome to All Event Hub
        </div>
        <div style={{ marginTop: 6 }}>Book Your Event Services. Tried & Trusted.</div>
        <div style={{ marginTop: 6 }}>
          At All Event Hub, we make planning effortless. Whether you’re hosting a high-profile
          corporate conference, an intimate celebration, or a once-in-a-lifetime party, we connect
          you with the right suppliers — all in one place.
        </div>
      </Card>
      <Card>
        <div style={{ fontFamily: "Poppins, sans-serif", fontWeight: 900 }}>Who We Are</div>
        <div style={{ marginTop: 6 }}>
          With over 40 years of combined experience in the events industry, our team has worked
          across both the corporate and private events arenas. From global summits to weddings,
          festivals, and brand activations — we’ve seen it all, and we know what it takes to deliver
          seamless, memorable experiences.
        </div>
      </Card>
      <Card>
        <div style={{ fontFamily: "Poppins, sans-serif", fontWeight: 900 }}>Why All Event Hub?</div>
        <ul style={{ marginTop: 6, paddingLeft: 18 }}>
          <li>✔️ Tried & Trusted – Every supplier is vetted to ensure quality and professionalism.</li>
          <li>✔️ One Hub, Endless Options – From DJs to caterers, AV teams to florists, everything you need is here.</li>
          <li>✔️ Industry Experts – We’ve gathered our most reliable contacts and partners into one trusted platform.</li>
          <li>✔️ Peace of Mind – You don’t have to sift through endless directories; we’ve done the hard work for you.</li>
        </ul>
      </Card>
      <BottomTabs active="about" onSelect={onSelectTab} />
    </div>
  </Phone>
);

// ============================================================================
// SECTION: PROFILE (PLACEHOLDER)
// ============================================================================
const ProfileScreen = ({ onSelectTab }) => (
  <Phone>
    <TopBar title="My Profile" />
    <Card>
      <div style={{ fontFamily: "Poppins, sans-serif", fontWeight: 900 }}>Coming soon</div>
      <div style={{ marginTop: 6, color: Brand.muted, fontSize: 13 }}>
        Account details, payment methods, and preferences will live here.
      </div>
    </Card>
    <BottomTabs active="profile" onSelect={onSelectTab} />
  </Phone>
);

// ============================================================================
// SECTION: APP (ROUTER)
// ============================================================================
export default function App() {
  const [view, setView] = useState("home");
  const [category, setCategory] = useState("DJs");
  const [supplier, setSupplier] = useState(null);

  let screen;

  // Results
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

  // Supplier Profile
  if (view === "supplier")
    screen = (
      <SupplierProfile
        supplier={supplier}
        onBack={() => setView("results")}
        onBook={() => setView("booking")}
      />
    );

  // Booking
  if (view === "booking")
    screen = (
      <BookingPage
        supplier={supplier?.name || "George Harris"}
        selectedPackage={"Silver (€300)"}
        onBack={() => setView("supplier")}
        onSelectTab={setView}
      />
    );

  // Bookings Tab
  if (view === "bookings") screen = <BookingsTab onSelectTab={setView} />;

  // Help
  if (view === "help") screen = <HelpScreen onSelectTab={setView} />;

  // About
  if (view === "about") screen = <AboutScreen onSelectTab={setView} />;

  // Profile (placeholder)
  if (view === "profile") screen = <ProfileScreen onSelectTab={setView} />;

  // Home
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
            <h2
              style={{
                fontFamily: "Poppins, sans-serif",
                fontWeight: 800,
                fontSize: 18,
                margin: 0,
              }}
            >
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

        {/* Category tiles (colored buttons) */}
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
              style={{
                ...styles.card,
                textAlign: "center",
                padding: 16,
                cursor: "pointer",
                background: c.bg,
                transition: "transform 0.15s ease, box-shadow 0.15s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
              onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.97)")}
              onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
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

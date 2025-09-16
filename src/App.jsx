// src/App.jsx
import React, { useState, useEffect } from "react";

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

const Card = ({ children, style }) => (
  <div style={{ ...styles.card, ...style }}>{children}</div>
);
const Button = ({ children, onClick, style }) => (
  <button style={{ ...styles.pill, ...style }} onClick={onClick}>
    {children}
  </button>
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
        color: active === key ? Brand.accent : Brand.muted,
      }}
    >
      <div style={{ fontSize: 16 }}>{emoji}</div>
      <div style={{ fontSize: 11 }}>{label}</div>
    </button>
  );
  return (
    <div
      style={{
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
      }}
    >
      {item("home", "Home", "🏠")}
      {item("bookings", "Bookings", "📅")}
      {item("help", "Help", "❓")}
      {item("profile", "Profile", "👤")}
    </div>
  );
};

/* ---------- Booking form ---------- */
const BookingPage = ({
  supplier = "George Harris",
  selectedPackage = "Silver (€300)",
  onBack,
  onConfirm,
  onSelectTab,
}) => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [notes, setNotes] = useState("");

  return (
    <Phone bg={Brand.bg}>
      <TopBar title="Booking" onBack={onBack} />
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <Card>
          <div style={{ fontSize: 18, fontWeight: 800 }}>{supplier}</div>
          <div style={{ fontSize: 14, marginTop: 4, color: Brand.muted }}>
            Package: {selectedPackage}
          </div>
        </Card>

        <div style={{ fontSize: 16, fontWeight: 800 }}>Choose Date</div>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          style={{ ...styles.card, padding: 10, fontSize: 14 }}
        />

        <div style={{ fontSize: 16, fontWeight: 800 }}>Choose Time</div>
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          style={{ ...styles.card, padding: 10, fontSize: 14 }}
        />

        <div style={{ fontSize: 16, fontWeight: 800 }}>Notes</div>
        <textarea
          placeholder="Add any special requests (optional)"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          style={{
            ...styles.card,
            padding: 10,
            fontSize: 14,
            minHeight: 80,
            resize: "vertical",
          }}
        />

        <Button
          style={{ width: "100%", marginTop: 12 }}
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
            if (onConfirm) {
              onConfirm(payload);
            } else {
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
            }
          }}
        >
          Confirm & Pay
        </Button>

        <BottomTabs active="bookings" onSelect={onSelectTab} />
      </div>
    </Phone>
  );
};

/* ---------- Bookings tab ---------- */
const BookingsTab = ({ onSelectTab }) => {
  const [bookings, setBookings] = useState([]);

  const load = () => {
    try {
      return JSON.parse(localStorage.getItem("aeh_bookings") || "[]");
    } catch {
      return [];
    }
  };

  useEffect(() => {
    setBookings(load());
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
    <Phone bg={Brand.bg}>
      <TopBar title="My Bookings" />
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {bookings.length === 0 && (
          <Card>
            <div style={{ fontWeight: 800, marginBottom: 6 }}>
              No bookings yet
            </div>
            <div style={{ fontSize: 13, color: Brand.muted }}>
              When you confirm a booking it will appear here.
            </div>
            <Button
              style={{ marginTop: 10 }}
              onClick={() => onSelectTab?.("home")}
            >
              Find services
            </Button>
          </Card>
        )}

        {bookings.map((b) => (
          <Card key={b.id}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 900 }}>{b.supplier}</div>
                <div style={{ fontSize: 12, color: Brand.muted }}>
                  {b.selectedPackage}
                </div>
                <div style={{ fontSize: 12 }}>
                  {b.date} at {b.time}
                </div>
                {b.notes && (
                  <div style={{ fontSize: 12, marginTop: 4 }}>
                    “{b.notes}”
                  </div>
                )}
              </div>
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 800,
                  color: b.status === "Cancelled" ? "#ef4444" : Brand.accent,
                }}
              >
                {b.status}
              </span>
            </div>
            <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
              <Button
                style={{ background: "#475569", flex: 1 }}
                onClick={() => alert(JSON.stringify(b, null, 2))}
              >
                View
              </Button>
              <Button
                style={{ background: "#ef4444", flex: 1 }}
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

/* ---------- Root app & navigation (centered) ---------- */
export default function App() {
  const [view, setView] = useState("home"); // start on Home

  let screen;
  if (view === "bookings") screen = <BookingsTab onSelectTab={setView} />;
  if (view === "bookingForm") screen = <BookingPage onSelectTab={setView} />;
  if (view === "home")
    screen = (
      <Phone bg={Brand.bg}>
        <TopBar title="Home" />
        <Card>
          <div style={{ fontWeight: 800 }}>Welcome to AllEventHub</div>
          <Button style={{ marginTop: 12 }} onClick={() => setView("bookingForm")}>
            New Booking
          </Button>
        </Card>
        <BottomTabs active="home" onSelect={setView} />
      </Phone>
    );
  if (view === "help")
    screen = (
      <Phone bg={Brand.bg}>
        <TopBar title="Help" />
        <Card>Help & FAQs placeholder</Card>
        <BottomTabs active="help" onSelect={setView} />
      </Phone>
    );
  if (view === "profile")
    screen = (
      <Phone bg={Brand.bg}>
        <TopBar title="Profile" />
        <Card>Profile placeholder</Card>
        <BottomTabs active="profile" onSelect={setView} />
      </Phone>
    );

  // Center the phone on page
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#f1f5f9",
        padding: 16,
      }}
    >
      {screen}
    </div>
  );
}

export { BookingPage, BookingsTab };

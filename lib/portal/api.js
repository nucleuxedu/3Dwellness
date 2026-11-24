import {
  OPEN_HOUR, CLOSE_HOUR, CANCEL_REFUND_HOURS, DAYS_SHOWN,
  addDays, at, dayKey, fmtDate, TODAY, ME,
} from "./dates";

const db = (() => {
  const rooms = [
    { id: 1, name: "Massage Room 1", room_type: "massage" },
    { id: 2, name: "Massage Room 2", room_type: "massage" },
    { id: 3, name: "Consultation Room 1", room_type: "consultation" },
    { id: 4, name: "Consultation Room 2", room_type: "consultation" },
    { id: 5, name: "Yoga Room", room_type: "yoga" },
    { id: 6, name: "Fitness Room", room_type: "fitness" },
  ];

  const bookings = [];
  let id = 1;
  const add = (practitioner, room, dayOffset, hour, hours, client, status) => {
    const day = addDays(TODAY, dayOffset);
    const b = {
      id: id++,
      practitioner,
      room,
      start: at(day, hour).toISOString(),
      end: at(day, hour + hours).toISOString(),
      client: client || null,
      status: status || "confirmed",
    };
    bookings.push(b);
    return b;
  };

  // Other practitioners' bookings, so the grid has taken slots.
  for (let d = 0; d < DAYS_SHOWN; d++) {
    rooms.forEach((room, r) => {
      add(2 + ((d + r) % 3), room.id, d, 9 + ((d * 3 + r * 2) % 9), 1 + ((d + r) % 2));
    });
  }

  // The signed-in practitioner's bookings.
  const mine = [
    add(ME, 1, -1, 13, 2, 1, "completed"),
    add(ME, 4, 0, 17, 1, 2),
    add(ME, 1, 1, 10, 2, 1),
    add(ME, 3, 3, 16, 1, 3),
    add(ME, 2, 6, 9, 2, 2),
  ];

  const periodStart = new Date(TODAY.getFullYear(), TODAY.getMonth(), 1);
  const periodEnd = new Date(TODAY.getFullYear(), TODAY.getMonth() + 1, 1);
  const roomName = (rid) => rooms.find((r) => r.id === rid).name;

  const ledger = [
    {
      id: id++,
      kind: "grant",
      minutes: 1200,
      booking: null,
      note: "Monthly hours, Regular plan",
      created_at: periodStart.toISOString(),
    },
    ...mine.map((b, i) => ({
      id: id++,
      kind: "booking",
      minutes: -(new Date(b.end) - new Date(b.start)) / 60000,
      booking: b.id,
      note: `Booked ${roomName(b.room)} for ${fmtDate(b.start)}`,
      created_at: new Date(periodStart.getTime() + (i + 1) * 3600000).toISOString(),
    })),
  ];

  return {
    me: { id: ME, name: "Maya Lindqvist", specialty: "Massage therapist", role: "practitioner" },
    practitioners: { 1: "Maya Lindqvist", 2: "Owen Barretto", 3: "Priya Raman", 4: "Tomas Engel" },
    plans: [
      { id: 1, name: "Starter", minutes_per_month: 600, price: 100 },
      { id: 2, name: "Regular", minutes_per_month: 1200, price: 180 },
      { id: 3, name: "Plus", minutes_per_month: 1800, price: 255 },
      { id: 4, name: "Full practice", minutes_per_month: 2400, price: 320 },
    ],
    subscription: {
      plan: 2,
      next_plan: null,
      status: "active",
      period_start: periodStart.toISOString(),
      period_end: periodEnd.toISOString(),
    },
    rooms,
    bookings,
    ledger,
    clients: [
      { id: 1, practitioner: ME, name: "Dana Whitfield", email: "dana@example.com", phone: "555-0142", waiver_signed_at: addDays(TODAY, -40).toISOString() },
      { id: 2, practitioner: ME, name: "Luis Okafor", email: "luis@example.com", phone: "555-0178", waiver_signed_at: addDays(TODAY, -12).toISOString() },
      { id: 3, practitioner: ME, name: "Hannah Sorensen", email: "hannah@example.com", phone: "555-0119", waiver_signed_at: addDays(TODAY, -3).toISOString() },
      { id: 4, practitioner: ME, name: "Ravi Menon", email: "ravi@example.com", phone: "555-0163", waiver_signed_at: null },
    ],
    checkins: [],
    nextId: id + 100,
  };
})();

/* ---------- mock API: replace each body with a real request ---------- */

const clone = (v) => JSON.parse(JSON.stringify(v));
const ok = (v) => new Promise((resolve) => setTimeout(() => resolve(clone(v)), 150));
const fail = (code, detail) =>
  new Promise((_, reject) => setTimeout(() => reject({ code, detail }), 150));

const planById = (pid) => db.plans.find((p) => p.id === pid) || null;
const balanceNow = () => db.ledger.reduce((sum, e) => sum + e.minutes, 0);
const decorate = (b) => ({
  ...b,
  minutes: (new Date(b.end) - new Date(b.start)) / 60000,
  room_name: db.rooms.find((r) => r.id === b.room).name,
  client_name: b.client ? db.clients.find((c) => c.id === b.client).name : null,
  practitioner_name: db.practitioners[b.practitioner],
});

const api = {
  // GET /api/me/
  getMe: () =>
    ok({
      ...db.me,
      subscription: {
        ...db.subscription,
        plan: planById(db.subscription.plan),
        next_plan: planById(db.subscription.next_plan),
      },
    }),

  // GET /api/plans/
  getPlans: () => ok(db.plans),

  // GET /api/hours/balance/
  getBalance: () => {
    const granted = db.ledger.filter((e) => e.kind === "grant").reduce((s, e) => s + e.minutes, 0);
    const balance = balanceNow();
    return ok({
      balance_minutes: balance,
      granted_minutes: granted,
      used_minutes: granted - balance,
      period_start: db.subscription.period_start,
      period_end: db.subscription.period_end,
    });
  },

  // GET /api/hours/ledger/
  getLedger: () =>
    ok([...db.ledger].sort((a, b) => (a.created_at < b.created_at ? 1 : a.created_at > b.created_at ? -1 : b.id - a.id))),

  // GET /api/rooms/
  getRooms: () => ok(db.rooms),

  // GET /api/rooms/availability/?date=YYYY-MM-DD
  getAvailability: (date) =>
    ok(
      db.rooms.map((room) => ({
        room: room.id,
        busy: db.bookings
          .filter((b) => b.room === room.id && b.status !== "cancelled" && dayKey(new Date(b.start)) === date)
          .map((b) => ({ start: b.start, end: b.end, mine: b.practitioner === ME })),
      }))
    ),

  // GET /api/bookings/
  getBookings: () =>
    ok(
      db.bookings
        .filter((b) => b.practitioner === ME)
        .sort((a, b) => (a.start < b.start ? -1 : 1))
        .map(decorate)
    ),

  // POST /api/bookings/   body: { room, start, end, client }
  createBooking: ({ room, start, end, client }) => {
    const s = new Date(start);
    const e = new Date(end);
    const minutes = (e - s) / 60000;
    if (db.subscription.status !== "active")
      return fail("subscription_inactive", "Your plan is not active. Update your payment to book rooms.");
    if (s < new Date() || s.getHours() < OPEN_HOUR || s.getHours() + minutes / 60 > CLOSE_HOUR)
      return fail("outside_hours", "That time is not open for booking. Pick another slot.");
    const clash = db.bookings.some(
      (b) => b.room === room && b.status !== "cancelled" && new Date(b.start) < e && new Date(b.end) > s
    );
    if (clash) return fail("slot_taken", "Someone booked that time a moment ago. Pick another slot.");
    if (balanceNow() < minutes)
      return fail("insufficient_hours", "You do not have enough hours left for this booking.");
    const booking = {
      id: db.nextId++,
      practitioner: ME,
      room,
      start: s.toISOString(),
      end: e.toISOString(),
      client: client || null,
      status: "confirmed",
    };
    db.bookings.push(booking);
    db.ledger.push({
      id: db.nextId++,
      kind: "booking",
      minutes: -minutes,
      booking: booking.id,
      note: `Booked ${decorate(booking).room_name} for ${fmtDate(booking.start)}`,
      created_at: new Date().toISOString(),
    });
    return ok(decorate(booking));
  },

  // POST /api/bookings/{id}/cancel/
  cancelBooking: (id) => {
    const booking = db.bookings.find((b) => b.id === id && b.practitioner === ME);
    const minutes = (new Date(booking.end) - new Date(booking.start)) / 60000;
    const hoursAway = (new Date(booking.start) - new Date()) / 3600000;
    const refunded = hoursAway >= CANCEL_REFUND_HOURS ? minutes : 0;
    booking.status = "cancelled";
    if (refunded) {
      db.ledger.push({
        id: db.nextId++,
        kind: "refund",
        minutes: refunded,
        booking: booking.id,
        note: `Cancelled ${decorate(booking).room_name} for ${fmtDate(booking.start)}`,
        created_at: new Date().toISOString(),
      });
    }
    return ok({ ...decorate(booking), refunded_minutes: refunded });
  },

  // GET /api/clients/
  getClients: () => ok(db.clients.filter((c) => c.practitioner === ME)),

  // POST /api/clients/   body: { name, email, phone }
  createClient: ({ name, email, phone }) => {
    const client = { id: db.nextId++, practitioner: ME, name, email, phone, waiver_signed_at: null };
    db.clients.push(client);
    return ok(client);
  },

  // POST /api/subscription/change-plan/   body: { plan }
  // The real backend starts the change in Zoho Billing and may return a checkout url.
  changePlan: (planId) => {
    const current = planById(db.subscription.plan);
    const next = planById(planId);
    if (next.minutes_per_month > current.minutes_per_month) {
      const added = next.minutes_per_month - current.minutes_per_month;
      db.subscription.plan = planId;
      db.subscription.next_plan = null;
      db.ledger.push({
        id: db.nextId++,
        kind: "grant",
        minutes: added,
        booking: null,
        note: `Upgrade to ${next.name} plan`,
        created_at: new Date().toISOString(),
      });
      return ok({ effective: "now", added_minutes: added });
    }
    db.subscription.next_plan = planId;
    return ok({ effective: "renewal", added_minutes: 0 });
  },

  // GET /api/frontdesk/today/
  getFrontDeskToday: () =>
    ok({
      bookings: db.bookings
        .filter((b) => b.status !== "cancelled" && dayKey(new Date(b.start)) === dayKey(TODAY))
        .sort((a, b) => (a.start < b.start ? -1 : 1))
        .map(decorate),
      clients: db.clients,
      checkins: [...db.checkins].reverse(),
    }),

  // POST /api/frontdesk/checkins/   body: { client, facility }
  createCheckIn: ({ client, facility }) => {
    const c = db.clients.find((x) => x.id === client);
    if (!c.waiver_signed_at)
      return fail("waiver_missing", `${c.name} has no signed waiver. Have them sign it before they go in.`);
    const bookedToday = db.bookings.some(
      (b) => b.practitioner === c.practitioner && b.status !== "cancelled" && dayKey(new Date(b.start)) === dayKey(TODAY)
    );
    if (!bookedToday)
      return fail("no_booking_today", `${c.name}’s practitioner has no booking today, so facility access is not open.`);
    const checkin = {
      id: db.nextId++,
      client,
      client_name: c.name,
      facility,
      checked_in_at: new Date().toISOString(),
    };
    db.checkins.push(checkin);
    return ok(checkin);
  },
};


export { api };

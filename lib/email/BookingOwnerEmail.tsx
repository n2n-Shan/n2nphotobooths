import { Html, Head, Body, Container, Text, Heading, Hr, Preview, Link } from "@react-email/components";

type Props = {
  bookingId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  eventDate: string;
  eventStartTime?: string | null;
  hours: number;
  eventType: string;
  boothName: string;
  packageHours: number;
  packagePrice: string;
  backdropName?: string | null;
  venueName?: string | null;
  venueAddress?: string | null;
  guestCount?: number | null;
  notes?: string | null;
  estimatedTotal: string;
  deliveryFee: string;
  adminUrl: string;
};

export function BookingOwnerEmail(p: Props) {
  return (
    <Html>
      <Head />
      <Preview>New booking · {p.customerName} · {p.eventDate}</Preview>
      <Body style={body}>
        <Container style={container}>
          <Text style={badge}>NEW BOOKING REQUEST</Text>
          <Heading style={h1}>{p.customerName}</Heading>
          <Text style={subtitle}>
            {p.eventType} · {p.eventDate}
            {p.eventStartTime ? ` · ${p.eventStartTime}` : ""}
          </Text>

          <Hr style={hr} />

          <Section title="Event">
            <KV k="Type" v={p.eventType} />
            <KV k="Date" v={p.eventDate} />
            {p.eventStartTime && <KV k="Start" v={p.eventStartTime} />}
            <KV k="Hours" v={`${p.hours}`} />
            {p.guestCount ? <KV k="Guests" v={`${p.guestCount}`} /> : null}
          </Section>

          <Section title="Booth & package">
            <KV k="Booth" v={p.boothName} />
            <KV k="Package" v={`${p.packageHours}h · ${p.packagePrice}`} />
            {p.backdropName && <KV k="Backdrop" v={p.backdropName} />}
          </Section>

          <Section title="Venue">
            {p.venueName && <KV k="Name" v={p.venueName} />}
            {p.venueAddress && <KV k="Address" v={p.venueAddress} />}
          </Section>

          <Section title="Customer">
            <KV k="Email" v={p.customerEmail} />
            <KV k="Phone" v={p.customerPhone} />
          </Section>

          {p.notes && (
            <Section title="Notes">
              <Text style={notes}>{p.notes}</Text>
            </Section>
          )}

          <Hr style={hr} />

          <Section title="Total">
            <KV k="Subtotal" v={p.packagePrice} />
            <KV k="Delivery" v={p.deliveryFee} />
            <KV k="Estimated total" v={p.estimatedTotal} bold />
          </Section>

          <Hr style={hr} />

          <Text style={p_}>
            <Link href={p.adminUrl} style={link}>
              Open in admin →
            </Link>
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ margin: "20px 0" }}>
      <Text style={sectionTitle}>{title}</Text>
      {children}
    </div>
  );
}

function KV({ k, v, bold }: { k: string; v: string; bold?: boolean }) {
  return (
    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      <tbody>
        <tr>
          <td style={kvLabel}>{k}</td>
          <td style={{ ...kvVal, fontWeight: bold ? 700 : 400 }}>{v}</td>
        </tr>
      </tbody>
    </table>
  );
}

const body = { backgroundColor: "#f7f3ec", fontFamily: "Helvetica, Arial, sans-serif", margin: 0, padding: "40px 0" };
const container = { backgroundColor: "#ffffff", margin: "0 auto", padding: "40px", maxWidth: "640px" };
const badge = { fontSize: "11px", letterSpacing: "0.2em", color: "#9b7e45", textTransform: "uppercase" as const, margin: 0 };
const h1 = { fontFamily: "Georgia, serif", fontSize: "30px", margin: "12px 0 4px", color: "#0b0b0a", fontWeight: 400 as const };
const subtitle = { fontSize: "14px", color: "#1c1b19", margin: 0 };
const hr = { borderColor: "rgba(201, 169, 106, 0.45)", margin: "28px 0" };
const sectionTitle = { fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase" as const, color: "#9b7e45", marginBottom: "8px" };
const kvLabel = { fontSize: "13px", color: "#807a6e", padding: "4px 0", width: "30%" };
const kvVal = { fontSize: "14px", color: "#0b0b0a", padding: "4px 0" };
const notes = { fontSize: "14px", color: "#1c1b19", lineHeight: 1.6 };
const p_ = { fontSize: "14px", color: "#1c1b19" };
const link = { color: "#9b7e45", textDecoration: "underline" };

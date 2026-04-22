import { Html, Head, Body, Container, Text, Heading, Hr, Preview } from "@react-email/components";

type Props = {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  eventDate?: string | null;
  eventType?: string | null;
  hours?: number | null;
  message?: string | null;
};

export function QuoteOwnerEmail(p: Props) {
  return (
    <Html>
      <Head />
      <Preview>Quote request · {p.customerName}</Preview>
      <Body style={{ backgroundColor: "#f7f3ec", fontFamily: "Helvetica, Arial, sans-serif", padding: "40px 0" }}>
        <Container style={{ backgroundColor: "#fff", padding: "40px", maxWidth: "560px", margin: "0 auto" }}>
          <Text style={{ fontSize: 11, letterSpacing: "0.2em", color: "#9b7e45", textTransform: "uppercase" }}>
            QUOTE REQUEST
          </Text>
          <Heading style={{ fontFamily: "Georgia, serif", fontSize: 28, margin: "12px 0 8px", fontWeight: 400 }}>
            {p.customerName}
          </Heading>
          <Text style={{ color: "#1c1b19", margin: 0 }}>
            {p.customerEmail} · {p.customerPhone}
          </Text>
          <Hr style={{ borderColor: "rgba(201, 169, 106, 0.45)", margin: "24px 0" }} />
          {p.eventType && <KV k="Event" v={p.eventType} />}
          {p.eventDate && <KV k="Date" v={p.eventDate} />}
          {p.hours && <KV k="Hours" v={`${p.hours}`} />}
          {p.message && (
            <>
              <Text style={{ fontSize: 11, letterSpacing: "0.2em", color: "#9b7e45", textTransform: "uppercase", marginTop: 16 }}>
                NOTES
              </Text>
              <Text style={{ color: "#1c1b19", lineHeight: 1.6 }}>{p.message}</Text>
            </>
          )}
        </Container>
      </Body>
    </Html>
  );
}

function KV({ k, v }: { k: string; v: string }) {
  return (
    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      <tbody>
        <tr>
          <td style={{ fontSize: 13, color: "#807a6e", padding: "4px 0", width: "30%" }}>{k}</td>
          <td style={{ fontSize: 14, color: "#0b0b0a", padding: "4px 0" }}>{v}</td>
        </tr>
      </tbody>
    </table>
  );
}

import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Heading,
  Hr,
  Preview,
} from "@react-email/components";

type Props = {
  customerName: string;
  eventDate: string;
  hours: number;
  boothName: string;
  total: string;
};

export function BookingCustomerEmail({
  customerName,
  eventDate,
  hours,
  boothName,
  total,
}: Props) {
  return (
    <Html>
      <Head />
      <Preview>We have your booking details — N2N Photobooths</Preview>
      <Body style={body}>
        <Container style={container}>
          <Text style={eyebrow}>N2N PHOTOBOOTHS</Text>
          <Heading style={h1}>Thank you, {customerName.split(" ")[0]}.</Heading>
          <Text style={lede}>
            Your booking request has reached us. We&rsquo;ll confirm your date
            within one business day — usually much sooner.
          </Text>

          <Hr style={hr} />

          <Section>
            <Row label="Date" value={eventDate} />
            <Row label="Booth" value={boothName} />
            <Row label="Duration" value={`${hours} hours`} />
            <Row label="Estimated total" value={total} />
          </Section>

          <Hr style={hr} />

          <Text style={p}>
            Have a question, a venue change, or a special request? Reply to this
            email or call <strong>0414&nbsp;521&nbsp;425</strong>.
          </Text>

          <Text style={signature}>
            — Nimi &amp; the N2N team
            <br />
            n2nphotobooths.com.au
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      <tbody>
        <tr>
          <td style={rowLabel}>{label}</td>
          <td style={rowValue}>{value}</td>
        </tr>
      </tbody>
    </table>
  );
}

const body = { backgroundColor: "#f7f3ec", fontFamily: "Georgia, serif", margin: 0, padding: "40px 0" };
const container = { backgroundColor: "#ffffff", margin: "0 auto", padding: "48px 40px", maxWidth: "560px" };
const eyebrow = {
  fontFamily: "Helvetica, Arial, sans-serif",
  fontSize: "11px",
  letterSpacing: "0.22em",
  color: "#9b7e45",
  textTransform: "uppercase" as const,
  margin: 0,
};
const h1 = { fontFamily: "Georgia, serif", fontSize: "32px", lineHeight: 1.1, color: "#0b0b0a", margin: "16px 0 12px", fontWeight: 400 as const };
const lede = { fontFamily: "Helvetica, Arial, sans-serif", fontSize: "15px", lineHeight: 1.6, color: "#1c1b19" };
const hr = { borderColor: "rgba(201, 169, 106, 0.45)", margin: "32px 0" };
const p = { fontFamily: "Helvetica, Arial, sans-serif", fontSize: "14px", lineHeight: 1.6, color: "#1c1b19" };
const rowLabel = { fontFamily: "Helvetica, Arial, sans-serif", fontSize: "12px", letterSpacing: "0.16em", textTransform: "uppercase" as const, color: "#807a6e", padding: "8px 0", width: "40%" };
const rowValue = { fontFamily: "Georgia, serif", fontSize: "16px", color: "#0b0b0a", padding: "8px 0" };
const signature = { fontFamily: "Georgia, serif", fontStyle: "italic" as const, fontSize: "15px", color: "#1c1b19", marginTop: "32px" };

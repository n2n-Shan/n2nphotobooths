import { Html, Head, Body, Container, Text, Heading, Hr, Preview } from "@react-email/components";

type Props = { name: string; email: string; phone?: string | null; message: string };

export function ContactOwnerEmail({ name, email, phone, message }: Props) {
  return (
    <Html>
      <Head />
      <Preview>Contact form · {name}</Preview>
      <Body style={{ backgroundColor: "#f7f3ec", fontFamily: "Helvetica, Arial, sans-serif", padding: "40px 0" }}>
        <Container style={{ backgroundColor: "#fff", padding: "40px", maxWidth: "560px", margin: "0 auto" }}>
          <Text style={{ fontSize: 11, letterSpacing: "0.2em", color: "#9b7e45", textTransform: "uppercase" }}>
            CONTACT FORM
          </Text>
          <Heading style={{ fontFamily: "Georgia, serif", fontSize: 28, margin: "12px 0 8px", fontWeight: 400 }}>
            {name}
          </Heading>
          <Text style={{ color: "#1c1b19", margin: 0 }}>
            {email}{phone ? ` · ${phone}` : ""}
          </Text>
          <Hr style={{ borderColor: "rgba(201, 169, 106, 0.45)", margin: "24px 0" }} />
          <Text style={{ color: "#1c1b19", lineHeight: 1.6 }}>{message}</Text>
        </Container>
      </Body>
    </Html>
  );
}

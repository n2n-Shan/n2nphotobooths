/**
 * Prisma seed — populates booths, packages, backdrops, gallery, admin allowlist.
 * Run with: npm run db:seed
 *
 * Image URLs use Unsplash placeholders. Replace with real client photography
 * (uploaded to Supabase Storage `public-media` bucket) before launch.
 */
import { PrismaClient, BoothGroup, EventType } from "@prisma/client";

const prisma = new PrismaClient();

const u = (id: string, w = 1600, h = 2000) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&h=${h}&q=80`;

async function main() {
  console.log("🌱 Seeding…");

  // ── Booths ─────────────────────────────────────────────
  await prisma.booth.deleteMany();
  const open = await prisma.booth.create({
    data: {
      slug: "open",
      name: "Open Air",
      tagline: "Compact. Cinematic. Endlessly photogenic.",
      description:
        "A minimalist open-air booth that fits any room. Choose from fifteen editorial backdrops; your guests step into a studio-grade frame the moment they walk up.",
      heroImage: u("1530023367847-a683933f4172"),
      gear: [
        "Mirrorless Canon body with prime lens",
        "Twin Godox studio strobes",
        "DNP photo printer with instant 4×6 prints",
        "Premium props — hats, masks, oversized glasses",
        "Online digital gallery + USB",
      ],
      sortOrder: 1,
    },
  });

  const glam = await prisma.booth.create({
    data: {
      slug: "glam",
      name: "Glam",
      tagline: "Black-and-white, beauty-filtered, unforgettable.",
      description:
        "Inspired by the Vanity Fair Oscar portraits. A signature white sweep, a kind beauty filter, and postcard-format prints that feel like a magazine spread.",
      heroImage: u("1492684223066-81342ee5ff30"),
      gear: [
        "Cinematic beauty-filter retouch",
        "White seamless sweep + soft-light setup",
        "DNP postcard 5×7 prints",
        "Custom photo-strip art direction",
        "Online digital gallery + USB",
      ],
      sortOrder: 2,
    },
  });

  const enclosed = await prisma.booth.create({
    data: {
      slug: "enclosed",
      name: "Enclosed",
      tagline: "An inflatable cocoon of soft light and confetti.",
      description:
        "An inflatable balloon-style booth — colour-flexible, cocooning, made for guests who want to disappear inside the moment and come out laughing.",
      heroImage: u("1519225421980-715cb0215aed"),
      gear: [
        "Inflatable colour-tunable enclosure",
        "Mirrorless Canon body + prime lens",
        "Soft continuous lighting inside",
        "DNP photo printer with instant 4×6 prints",
        "Online digital gallery + USB",
      ],
      sortOrder: 3,
    },
  });

  // ── Packages ───────────────────────────────────────────
  await prisma.package.deleteMany();
  const oeIncl = (extra: string[] = []) => [
    "Unlimited photos",
    "Instant prints",
    "Event props",
    "USB drive",
    "Online gallery",
    ...extra,
  ];
  const glamIncl = (extra: string[] = []) => [
    "Unlimited photos",
    "Postcard-size prints",
    "Photo-strip design",
    "Beauty filter",
    "Event props",
    "Online gallery",
    ...extra,
  ];

  await prisma.package.createMany({
    data: [
      // Open / Enclosed tier
      { boothGroup: BoothGroup.OPEN_ENCLOSED, hours: 2, price: 400, inclusions: oeIncl(), sortOrder: 1 },
      { boothGroup: BoothGroup.OPEN_ENCLOSED, hours: 3, price: 550, inclusions: oeIncl(), isPopular: true, sortOrder: 2 },
      { boothGroup: BoothGroup.OPEN_ENCLOSED, hours: 4, price: 700, inclusions: oeIncl(["Traditional guest book"]), sortOrder: 3 },
      { boothGroup: BoothGroup.OPEN_ENCLOSED, hours: 5, price: 800, inclusions: oeIncl(["Traditional guest book"]), sortOrder: 4 },
      // Glam tier
      { boothGroup: BoothGroup.GLAM, hours: 2, price: 490, inclusions: glamIncl(), sortOrder: 1 },
      { boothGroup: BoothGroup.GLAM, hours: 3, price: 590, inclusions: glamIncl(), isPopular: true, sortOrder: 2 },
      { boothGroup: BoothGroup.GLAM, hours: 4, price: 750, inclusions: glamIncl(["Traditional guest book"]), sortOrder: 3 },
      { boothGroup: BoothGroup.GLAM, hours: 5, price: 850, inclusions: glamIncl(["Traditional guest book", "Extra prints"]), sortOrder: 4 },
    ],
  });

  // ── Backdrops ──────────────────────────────────────────
  await prisma.backdrop.deleteMany();
  const backdrops: Array<[string, string, string, string]> = [
    // [slug, name, mood, image-id]
    ["white", "White", "Neutral", "1517511620798-cec17d428bc0"],
    ["black", "Black", "Neutral", "1486312338219-ce68d2c6f44d"],
    ["candy", "Candy", "Atmospheric", "1488646953014-85cb44e25828"],
    ["gold-bokeh", "Gold Bokeh", "Luxe", "1467810563316-b5476525c0f9"],
    ["fairylight", "Fairylight", "Atmospheric", "1545048702-79362596cdc9"],
    ["geometry", "Geometry", "Geometric", "1557804506-669a67965ba0"],
    ["green-leaf", "Green Leaf", "Natural", "1490750967868-88aa4486c946"],
    ["black-geometry", "Black Geometry", "Geometric", "1518770660439-4636190af475"],
    ["starry-blue", "Starry Blue", "Atmospheric", "1419242902214-272b3f66ee7a"],
    ["gold-glitter", "Gold Glitter", "Luxe", "1513151233558-d860c5398176"],
    ["silver-pixel", "Silver Pixel", "Geometric", "1531297484001-80022131f5a1"],
    ["white-wall", "White Wall", "Neutral", "1505691938895-1758d7feb511"],
    ["white-geometry", "White Geometry", "Geometric", "1505934044-f6c63e77f2f0"],
    ["green-garden", "Green Garden", "Natural", "1507003211169-0a1dd7228f2d"],
    ["floral-wall", "Floral Wall", "Natural", "1511795409834-ef04bbd61622"],
  ];
  for (let i = 0; i < backdrops.length; i++) {
    const [slug, name, mood, id] = backdrops[i];
    await prisma.backdrop.create({
      data: { slug, name, mood, imageUrl: u(id, 1200, 1500), sortOrder: i + 1 },
    });
  }

  // ── Gallery ────────────────────────────────────────────
  await prisma.galleryItem.deleteMany();
  const gallery: Array<[EventType, string, string]> = [
    [EventType.WEDDING, "1519741497674-611481863552", "Wedding portrait"],
    [EventType.WEDDING, "1511795409834-ef04bbd61622", "Bride and groom"],
    [EventType.WEDDING, "1606800052052-a08af7148866", "Wedding party"],
    [EventType.BIRTHDAY, "1530023367847-a683933f4172", "Birthday celebration"],
    [EventType.BIRTHDAY, "1530103862676-de8c9debad1d", "Friends in booth"],
    [EventType.CORPORATE, "1556761175-5973dc0f32e7", "Corporate event"],
    [EventType.CORPORATE, "1511795409834-ef04bbd61622", "Brand activation"],
    [EventType.SCHOOL, "1517457373958-b7bdd4587205", "School graduation"],
    [EventType.SCHOOL, "1523580494863-6f3031224c94", "School formal"],
    [EventType.WEDDING, "1525258946800-98cfd641d0de", "Reception portrait"],
    [EventType.BIRTHDAY, "1492684223066-81342ee5ff30", "Glam portrait"],
    [EventType.CORPORATE, "1492366254240-43affaefc3e3", "Corporate launch"],
  ];
  for (let i = 0; i < gallery.length; i++) {
    const [eventType, id, alt] = gallery[i];
    await prisma.galleryItem.create({
      data: {
        imageUrl: u(id, 1200, 1500),
        eventType,
        alt,
        sortOrder: i + 1,
      },
    });
  }

  // ── Admin allowlist ────────────────────────────────────
  await prisma.admin.upsert({
    where: { email: "info@n2nphotobooths.com.au" },
    create: { email: "info@n2nphotobooths.com.au" },
    update: {},
  });

  console.log("✅ Seed complete.");
  console.log(`   Booths:    ${[open.name, glam.name, enclosed.name].join(", ")}`);
  console.log(`   Packages:  8`);
  console.log(`   Backdrops: ${backdrops.length}`);
  console.log(`   Gallery:   ${gallery.length}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());

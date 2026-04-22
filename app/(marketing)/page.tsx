import { getBooths, getBackdrops, getPackages } from "@/lib/queries";
import { getGoogleRating } from "@/lib/google-reviews";
import { Hero } from "@/components/marketing/Hero";
import { Manifesto } from "@/components/marketing/Manifesto";
import { BoothShowcase } from "@/components/marketing/BoothShowcase";
import { BackdropMarquee } from "@/components/marketing/BackdropMarquee";
import { PackagesPreview } from "@/components/marketing/PackagesPreview";
import { TrustStrip } from "@/components/marketing/TrustStrip";
import { Testimonial } from "@/components/marketing/Testimonial";
import { ReviewsGrid } from "@/components/marketing/ReviewsGrid";

export const revalidate = 600;

export default async function HomePage() {
  const [booths, backdrops, packages, googleMeta] = await Promise.all([
    getBooths(),
    getBackdrops(),
    getPackages(),
    getGoogleRating(),
  ]);

  const openEnclosed = packages
    .filter((p) => p.boothGroup === "OPEN_ENCLOSED")
    .map((p) => ({ id: p.id, hours: p.hours, price: p.price, isPopular: p.isPopular }));
  const glam = packages
    .filter((p) => p.boothGroup === "GLAM")
    .map((p) => ({ id: p.id, hours: p.hours, price: p.price, isPopular: p.isPopular }));

  return (
    <>
      <Hero rating={googleMeta?.rating} reviewCount={googleMeta?.total} />
      <Manifesto reviewCount={googleMeta?.total} />
      <BoothShowcase booths={booths} />
      <TrustStrip />
      <BackdropMarquee backdrops={backdrops} />
      <PackagesPreview openEnclosed={openEnclosed} glam={glam} />
      <Testimonial />
      <ReviewsGrid />
    </>
  );
}

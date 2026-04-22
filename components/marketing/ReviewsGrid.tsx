import { getGoogleReviews, getGoogleRating } from "@/lib/google-reviews";
import Image from "next/image";
import { MarqueeRow } from "@/components/motion/MarqueeRow";

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array(5).fill(null).map((_, i) => (
        <svg
          key={i}
          className={`h-4 w-4 ${i < rating ? "fill-champagne" : "fill-white/20"}`}
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export async function ReviewsGrid() {
  const [reviews, meta] = await Promise.all([getGoogleReviews(), getGoogleRating()]);

  if (reviews.length === 0) return null;

  return (
    <section className="bg-[#0a0a0a] py-24 overflow-hidden">
      <div className="container-luxe mb-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.22em] text-champagne">
              Google Reviews
            </p>
            <h2 className="text-3xl font-black text-white md:text-4xl">
              What our clients say
            </h2>
          </div>
          {meta && (
            <a
              href="https://www.google.com/maps/place/N2N+Photobooths"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-xl border border-white/8 bg-[#1a1a1a] px-5 py-3 transition hover:border-champagne/30 self-start sm:self-auto"
            >
              <div className="flex gap-0.5">
                {Array(5).fill(null).map((_, i) => (
                  <svg key={i} className="h-4 w-4 fill-champagne" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <div className="text-left">
                <p className="text-sm font-bold text-white">{meta.rating.toFixed(1)} out of 5</p>
                <p className="text-xs text-white/40">{meta.total}+ reviews on Google</p>
              </div>
            </a>
          )}
        </div>
      </div>

      {/* Fade edges */}
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[#0a0a0a] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[#0a0a0a] to-transparent" />

        <MarqueeRow duration={35} pauseOnHover className="py-2">
          {reviews.map((review, i) => (
            <div
              key={i}
              className="w-80 shrink-0 rounded-2xl border border-white/8 bg-[#1a1a1a] p-6 whitespace-normal"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full bg-[#2a2a2a]">
                  {review.profile_photo_url && (
                    <Image
                      src={review.profile_photo_url}
                      alt={review.author_name}
                      fill
                      sizes="40px"
                      className="object-cover"
                      unoptimized
                    />
                  )}
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-bold text-white">{review.author_name}</p>
                  <p className="text-xs text-white/40">{review.relative_time_description}</p>
                </div>
              </div>

              <Stars rating={review.rating} />

              <p className="mt-3 text-sm leading-relaxed text-white/70">
                {review.text.length > 180 ? review.text.slice(0, 180) + "…" : review.text}
              </p>
            </div>
          ))}
        </MarqueeRow>
      </div>

      <div className="container-luxe mt-8 text-center">
        <a
          href="https://www.google.com/maps/place/N2N+Photobooths"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-semibold text-champagne hover:underline"
        >
          See all reviews on Google
          <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>
      </div>
    </section>
  );
}

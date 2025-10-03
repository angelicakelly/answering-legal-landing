"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

/* -----------------------------------------------------------
   Types
----------------------------------------------------------- */
interface LeadForm {
  firstName: string;
  lastName: string;
  company: string;
  email: string;
  phone: string;
}
interface Errors {
  firstName?: string;
  lastName?: string;
  company?: string;
  email?: string;
  phone?: string;
}

/* -----------------------------------------------------------
   Blog Carousel (top-level component, not nested)
----------------------------------------------------------- */
type Post = {
  id: number;
  tag: string;
  date: string;
  title: string;
  excerpt: string;
  href: string;
  image: string;
};

const BLOG_POSTS: Post[] = [
  {
    id: 1,
    tag: "LAWYER WELLNESS 1",
    date: "June 6, 2024",
    title: "How Viable Is Remote Work For Lawyers?",
    excerpt:
      "This month on the Answering Legal blog, we’ll be covering remote work in the legal world...",
    href: "#",
    image: "/images/Article_img_placeholder.jpg",
  },
  {
    id: 2,
    tag: "LAWYER WELLNESS 2",
    date: "June 6, 2024",
    title: "How Viable Is Remote Work For Lawyers?",
    excerpt:
      "This month on the Answering Legal blog, we’ll be covering remote work in the legal world...",
    href: "#",
    image: "/images/Article_img_placeholder.jpg",
  },
  {
    id: 3,
    tag: "LAWYER WELLNESS 3",
    date: "June 6, 2024",
    title: "How Viable Is Remote Work For Lawyers?",
    excerpt:
      "This month on the Answering Legal blog, we’ll be covering remote work in the legal world...",
    href: "#",
    image: "/images/Article_img_placeholder.jpg",
  },
  {
    id: 4,
    tag: "LAWYER WELLNESS 4",
    date: "June 6, 2024",
    title: "How Viable Is Remote Work For Lawyers?",
    excerpt:
      "This month on the Answering Legal blog, we’ll be covering remote work in the legal world...",
    href: "#",
    image: "/images/Article_img_placeholder.jpg",
  },
  {
    id: 5,
    tag: "LAWYER WELLNESS 5",
    date: "June 6, 2024",
    title: "How Viable Is Remote Work For Lawyers?",
    excerpt:
      "This month on the Answering Legal blog, we’ll be covering remote work in the legal world...",
    href: "#",
    image: "/images/Article_img_placeholder.jpg",
  },
  {
    id: 6,
    tag: "LAWYER WELLNESS 5",
    date: "June 6, 2024",
    title: "How Viable Is Remote Work For Lawyers?",
    excerpt:
      "This month on the Answering Legal blog, we’ll be covering remote work in the legal world...",
    href: "#",
    image: "/images/Article_img_placeholder.jpg",
  },
  {
    id: 7,
    tag: "LAWYER WELLNESS 5",
    date: "June 6, 2024",
    title: "How Viable Is Remote Work For Lawyers?",
    excerpt:
      "This month on the Answering Legal blog, we’ll be covering remote work in the legal world...",
    href: "#",
    image: "/images/Article_img_placeholder.jpg",
  },
];

function BlogCarouselExact() {
  const viewportRef = useRef<HTMLDivElement>(null);

  // Evita hydration mismatch
  const [mounted, setMounted] = useState(false);

  // Slides visibles según ancho (solo en cliente)
  const [perView, setPerView] = useState(1);

  const [page, setPage] = useState(0);
  const [hover, setHover] = useState(false);

  const totalPages = Math.max(1, Math.ceil(BLOG_POSTS.length / perView));

  const getPerView = () => {
    if (typeof window === "undefined") return 1;
    if (window.innerWidth >= 1024) return 3;
    if (window.innerWidth >= 768) return 2;
    return 1;
  };

  useEffect(() => {
    setMounted(true);                // marca que ya estamos en cliente
    const update = () => setPerView(getPerView());
    update();                        // calcula perView al montar
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const goTo = (i: number) => {
    if (!viewportRef.current) return;
    const clamped = Math.max(0, Math.min(totalPages - 1, i));
    setPage(clamped);
    const x = viewportRef.current.clientWidth * clamped;
    viewportRef.current.scrollTo({ left: x, behavior: "smooth" });
  };

  const prev = () => goTo(page - 1);
  const next = () => goTo(page + 1);

  // autoplay solo cuando está montado y no hay hover
  useEffect(() => {
    if (!mounted || hover) return;
    const id = setInterval(() => {
      setPage((p) => {
        const n = p + 1 >= totalPages ? 0 : p + 1;
        goTo(n);
        return n;
      });
    }, 4000);
    return () => clearInterval(id);
  }, [mounted, hover, totalPages]);

  // re-alinea en resize
  useEffect(() => {
    if (!mounted) return;
    goTo(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [perView]);


  return (
   <section className="w-full bg-[#F7F5F5] py-14 md:py-16">
     <div className="mx-auto max-w-7xl px-6 md:px-12">
       {/* Heading */}
       <h2 className="text-center text-[#162B53] font-extrabold tracking-tight
                      text-[34px] leading-[1.15] md:text-[40px] md:leading-tight mb-6 md:mb-8">
         Want to learn more? <br className="hidden md:block" />
         Read our articles on <br className="hidden md:block" />
         legal intake.
       </h2>

       {/* Mobile controls bar (visible only on mobile) */}
       <div className="md:hidden flex items-center justify-center gap-8 mb-4">
         <button
           onClick={prev}
           aria-label="Previous"
           className="h-14 w-14 inline-flex items-center justify-center rounded-full
                      bg-white/90 border border-[#D7DBDF] shadow-md
                      active:scale-[0.98] transition"
         >
           <span className="text-3xl leading-none text-[#162B53]">‹</span>
         </button>
         <button
           onClick={next}
           aria-label="Next"
           className="h-14 w-14 inline-flex items-center justify-center rounded-full
                      bg-white/90 border border-[#D7DBDF] shadow-md
                      active:scale-[0.98] transition"
         >
           <span className="text-3xl leading-none text-[#162B53]">›</span>
         </button>
       </div>

       <div
         className="relative"
         onMouseEnter={() => setHover(true)}
         onMouseLeave={() => setHover(false)}
       >
         {/* Desktop prev */}
         <button
           onClick={prev}
           aria-label="Previous"
           className="hidden md:flex absolute -left-8 top-[44%] -translate-y-1/2 z-10
                      h-12 w-12 items-center justify-center rounded-full
                      bg-white border border-[#D7DBDF] shadow-md
                      hover:bg-[#F7F7F7] transition"
         >
           <span className="text-2xl text-[#162B53]">‹</span>
         </button>

         {/* Desktop next */}
         <button
           onClick={next}
           aria-label="Next"
           className="hidden md:flex absolute -right-8 top-[44%] -translate-y-1/2 z-10
                      h-12 w-12 items-center justify-center rounded-full
                      bg-white border border-[#D7DBDF] shadow-md
                      hover:bg-[#F7F7F7] transition"
         >
           <span className="text-2xl text-[#162B53]">›</span>
         </button>

         {/* Viewport */}
         <div ref={viewportRef} className="overflow-hidden snap-x snap-mandatory scroll-smooth">
           <div className="flex">
             {BLOG_POSTS.map((p) => (
               <article
                 key={p.id}
                 className="snap-start shrink-0 basis-full md:basis-1/2 lg:basis-1/3 pr-6 last:pr-0"
               >
                 <div className="bg-white rounded-[22px] border border-[#D7DBDF]
                                 shadow-[0_10px_28px_rgba(0,0,0,0.10)] overflow-hidden">
                   {/* Image */}
                   <div className="p-4 pb-0">
                     <div className="relative w-full aspect-[16/10] rounded-[18px] overflow-hidden">
                       <Image
                         src={p.image}
                         alt={p.title}
                         fill
                         className="object-cover"
                         sizes="(max-width:768px) 100vw, 33vw"
                       />
                     </div>
                   </div>

                   {/* Content */}
                   <div className="px-6 pb-6 pt-4">
                     <div className="text-[#0360E6] text-[12px] md:text-xs font-extrabold tracking-wide uppercase">
                       {p.tag}
                     </div>

                     <div className="mt-1 text-[#666666] text-[14px] md:text-sm">{p.date}</div>

                     {/* Title with aqua accent */}
                     <div className="mt-3 flex gap-3">
                       <div className="mt-1 w-[3px] h-7 md:h-6 rounded bg-[#3CCED7]" />
                       <h3 className="text-[#141414] text-[28px] md:text-[22px] font-extrabold leading-snug">
                         {p.title}
                       </h3>
                     </div>

                     <p className="mt-3 text-[16px] md:text-sm text-[#666666] leading-relaxed">
                       {p.excerpt}
                     </p>

                     <a
                       href={p.href}
                       className="mt-4 inline-block text-[#0360E6] font-bold text-[18px] md:text-base"
                     >
                       [Read More&gt;]
                     </a>
                   </div>
                 </div>
               </article>
             ))}
           </div>
         </div>

         {/* Dots (unchanged) */}
         <div className="mt-6 flex items-center justify-center gap-2">
           {Array.from({ length: totalPages }).map((_, i) => (
             <button
               key={i}
               aria-label={`Go to slide ${i + 1}`}
               onClick={() => goTo(i)}
               className={`h-2.5 rounded-full transition-all ${
                 page === i ? "w-6 bg-[#0360E6]" : "w-2.5 bg-[#C9CDD1]"
               }`}
             />
           ))}
         </div>
       </div>

       {/* CTA */}
       <div className="mt-8 flex justify-center">
         <a
           href="#"
           className="inline-flex items-center justify-center
                      bg-[#0360E6] hover:bg-[#0056d1] text-white
                      rounded-[16px] text-[22px] font-bold
                      px-8 py-4 shadow-[0_8px_20px_rgba(3,96,230,0.25)]
                      transition min-w-[260px] text-center"
         >
           Go to blog
         </a>
       </div>
     </div>
   </section>
 );
}

/* -----------------------------------------------------------
   Page
----------------------------------------------------------- */
export default function Page() {
  // form state
  const [values, setValues] = useState<LeadForm>({
    firstName: "",
    lastName: "",
    company: "",
    email: "",
    phone: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [success, setSuccess] = useState(false);

  // mobile menu
  const [isOpen, setIsOpen] = useState(false);

  const validate = (): Errors => {
    const e: Errors = {};
    if (!values.firstName) e.firstName = "Required";
    if (!values.lastName) e.lastName = "Required";
    if (!values.company) e.company = "Required";
    if (!values.email) e.email = "Required";
    else if (!/\S+@\S+\.\S+/.test(values.email)) e.email = "Invalid email";
    if (!values.phone) e.phone = "Required";
    return e;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      setSuccess(true);
      setValues({ firstName: "", lastName: "", company: "", email: "", phone: "" });
      setTimeout(() => setSuccess(false), 3000);
    }
  };

  return (
    <main>
      {/* ---------- NAVBAR ---------- */}
      <header className="w-full bg-[#FAFAFA] border-b border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex items-center justify-between h-30">
          {/* Logo */}
          <div className="flex items-center">
            <Image
              src="/images/Answering LegalTM_Blue.png"
              alt="Answering Legal Logo"
              width={300}
              height={100}
              className="object-contain"
              priority
            />
          </div>

          {/* Desktop Menu */}
          <nav className="hidden lg:flex items-center space-x-8 text-[var(--navy-900)] font-semibold">
            <div className="flex items-center gap-1 cursor-pointer hover:text-[var(--blue-600)]">
              <span>Products</span>
              <span className="text-[10px]">▼</span>
            </div>
            <div className="flex items-center gap-1 cursor-pointer hover:text-[var(--blue-600)]">
              <span>About</span>
              <span className="text-[10px]">▼</span>
            </div>
            <div className="flex items-center gap-1 cursor-pointer hover:text-[var(--blue-600)]">
              <span>Resources</span>
              <span className="text-[10px]">▼</span>
            </div>
            <a href="#" className="hover:text-[var(--blue-600)]">
              Pricing
            </a>
          </nav>

          {/* Right Section */}
          <div
            className="
              hidden lg:grid
              grid-cols-[auto,auto] grid-rows-2
              items-center gap-x-8 gap-y-0
            "
          >
            <a
              href="#"
              className="text-[#999999] underline underline-offset-4 decoration-[#999999] hover:text-[#0360E6] transition-colors leading-none"
            >
              Support
            </a>

            <a
              href="tel:6316869700"
              className="font-semibold text-[#0360E6] text-2xl leading-none tracking-tight"
              aria-label="Call (631) 686-9700"
            >
              (631) 686-9700
            </a>

            <button
              type="button"
              aria-label="Search"
              className="row-start-2 col-start-1 p-1 hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-[#3CCED7] rounded-full"
            >
              <Image src="/images/Search.svg" alt="" width={50} height={50} />
            </button>

            <button
              type="button"
              className="row-start-2 col-start-2 inline-flex items-center justify-center bg-[#0360E6] hover:bg-[#0056d1] text-white font-semibold h-10 px-6 rounded-[6px] text-lg leading-none shadow-[0_4px_10px_rgba(3,96,230,0.25)] transition-colors"
            >
              Try for free
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen((v) => !v)}
            className="lg:hidden flex flex-col justify-center items-end gap-[6px]"
            aria-label="Toggle menu"
          >
            <span className="block w-8 h-[6px] bg-[var(--navy-900)] rounded-full" />
            <span className="block w-8 h-[6px] bg-[var(--navy-900)] rounded-full" />
            <span className="block w-8 h-[6px] bg-[var(--navy-900)] rounded-full" />
          </button>
        </div>

        {/* Mobile Menu (drawer) */}
        {isOpen && (
          <div className="lg:hidden fixed inset-0 z-50">
            <div className="absolute inset-0 bg-black/40" onClick={() => setIsOpen(false)} aria-hidden="true" />
            <div
              className="absolute right-0 top-0 h-full w-[85%] max-w-sm bg-white shadow-xl animate-[slideIn_.2s_ease-out]"
              role="dialog"
              aria-modal="true"
            >
              <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
                <span className="font-semibold text-[var(--navy-900)]">Menu</span>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-[var(--navy-900)] text-2xl font-bold"
                  aria-label="Close menu"
                >
                  ✕
                </button>
              </div>

              <nav className="px-6 py-4 space-y-4 font-semibold text-[var(--navy-900)]">
                <div className="flex items-center gap-1">
                  <span>Products</span>
                  <span className="text-[10px]">▼</span>
                </div>
                <div className="flex items-center gap-1">
                  <span>About</span>
                  <span className="text-[10px]">▼</span>
                </div>
                <div className="flex items-center gap-1">
                  <span>Resources</span>
                  <span className="text-[10px]">▼</span>
                </div>
                <a href="#" className="block">
                  Pricing
                </a>

                <div className="pt-4 mt-2 border-t border-gray-100 space-y-3">
                  <a href="#" className="text-[#999999] underline underline-offset-2 block">
                    Support
                  </a>
                  <a href="tel:6316869700" className="text-[var(--blue-600)] block">
                    (631) 686-9700
                  </a>
                  <button className="bg-[var(--blue-600)] hover:bg-[var(--blue-700)] text-white w-full font-semibold py-2 rounded-md">
                    Try for free
                  </button>
                </div>
              </nav>
            </div>
          </div>
        )}
      </header>

      {/* ---------- HERO  ---------- */}
<section className="relative">

  {/* ===== MOBILE (< md) ===== */}
  <div className="md:hidden">
    {/* 1) Top image */}
    <div className="relative w-full aspect-[3/4]">
      <Image
        src="/images/LandingHeroMobile.jpg"
        alt="Answering Legal"
        fill
        priority
        className="object-cover"
      />
    </div>

    {/* 2) Navy panel with content */}
    <div className="bg-[var(--navy-900)] text-white px-5 pt-8 pb-10">
      {/* Rating row */}
      <div className="flex items-center justify-between gap-3">
        <h3 className="font-extrabold leading-none">
          Excellent 4.84
        </h3>

        <div className="flex items-center gap-1 text-[#FBBF24] shrink-0">
          {Array.from({ length: 5 }).map((_, i) => (
            <svg key={i} width="22" height="22" viewBox="0 0 20 20" fill="#FBBF24">
              <path d="M10 1.5l2.47 5 5.53.8-4 3.9.94 5.5L10 14.8 5.06 16.7l.94-5.5-4-3.9 5.53-.8L10 1.5z" />
            </svg>
          ))}
        </div>
      </div>
      <p className="text-white/90 mt-1 font-extrabold text-[24px] ">
        based on 230 reviews
      </p>

      {/* H1 */}
      <h1 className="mt-5 font-extrabold leading-tight text-[40px]">
        We’re more than an <br /> answering service
      </h1>

      {/* Body */}
      <p className="mt-4 text-[24px] font-extrabold text-white/90">
        Answering Legal has everything you need to make sure your firm never
        misses another opportunity.
      </p>

      {/* CTA */}
      <button className="mt-7 w-full h-14 rounded-[16px] bg-[#0360E6] hover:bg-[#0056d1] text-white text-[22px] font-bold shadow-[0_8px_20px_rgba(3,96,230,0.25)]">
        See our pricing
      </button>
    </div>

    {/* 3) “Here’s what…”  */}
    <div>
      <div className="mx-auto max-w-7xl px-6 py-4">
        <h2 className="text-center text--white text-[28px] font-extrabold">
          Here’s what we can do for your law firm
        </h2>
        <div className="mt-4 h-[3px] bg-[#3CCED7]" />
      </div>
    </div>
  </div>

  {/* ===== DESKTOP (md+) — your original layout preserved ===== */}
  <div className="hidden md:block">
    <section className="relative overflow-hidden text-white h-[800px]">
      {/* Desktop bg */}
      <Image
        src="/images/LandingHero.jpg"
        alt="Hero"
        fill
        priority
        className="absolute inset-0 object-cover"
      />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-12 py-20">
        <div className="max-w-xl">
          <h1 className="font-bold leading-tight text-[48px]">
            We’re more than an <br className="hidden md:block" /> answering service
          </h1>

          <p className="mt-4 text-[18px] text-white/90">
            Answering Legal has everything you need to make sure your firm never
            misses another opportunity.
          </p>

          <div className="mt-6">
            <p className="font-extrabold text-[20px]">Excellent 4.84</p>
            <div className="mt-1 flex items-center gap-1 text-[#FBBF24]">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg key={i} width="20" height="20" viewBox="0 0 20 20" fill="#FBBF24">
                  <path d="M10 1.5l2.47 5 5.53.8-4 3.9.94 5.5L10 14.8 5.06 16.7l.94-5.5-4-3.9 5.53-.8L10 1.5z" />
                </svg>
              ))}
            </div>
            <p className="mt-1 text-white/90 text-sm">based on 230 reviews</p>
          </div>

          <button className="mt-6 inline-flex items-center rounded-md bg-[#0360E6] px-5 py-3 text-white font-semibold shadow hover:bg-[#0056d1]">
            See our pricing
          </button>
        </div>
      </div>

      {/* Bottom strip (desktop) */}
      <div className="relative z-20">
        <div className="mx-auto max-w-7xl px-12 mt-[-40px] pb-6">
          <h2 className="text-center text-white text-[26px] font-extrabold">
            Here’s what we can do for your law firm
          </h2>
        </div>
        <div className="mx-auto max-w-7xl px-12 pb-4">
          <div className="h-[3px] bg-[#3CCED7] opacity-90" />
        </div>
      </div>
    </section>
  </div>
</section>


      {/* ---------- FEATURES (cards overlapping hero by ~25%) ---------- */}
      <section className="bg-[#F7F5F5]">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <div className="md:relative md:z-[40] md:-translate-y-[25%]">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {[
                {
                  icon: "/images/AL_2ColorIcon-AnsweringService.svg",
                  title: "Legal answering service",
                  text: "With 24/7 legal intake, you’ll never miss a potential client’s call.",
                },
                {
                  icon: "/images/AL_2ColorIcon-Chatbot.svg",
                  title: "AI intake chatbot",
                  text: "Turn web leads into clients with a chatbot powered by the latest in AI technology.",
                },
                {
                  icon: "/images/AL_2ColorIcon-LVCv2.svg",
                  title: "Live translation services",
                  text:
                    "Break through the language barrier and schedule video conferences with live interpreters.",
                },
              ].map((c) => (
                <article
                  key={c.title}
                  className="bg-white border border-[#D2EDEF] rounded-[18px] shadow-[0_10px_28px_rgba(0,0,0,0.15)] px-8 py-10 text-center flex flex-col items-center"
                >
                  <Image src={c.icon} alt={c.title} width={72} height={72} className="mb-4" />
                  <h3 className="text-[22px] font-extrabold text-[#141414]">{c.title}</h3>
                  <div className="mt-3 w-20 h-[3px] bg-[#3CCED7]" />
                  <p className="mt-4 text-[#666666] text-sm leading-relaxed max-w-[300px]">{c.text}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Good Hands ---------- */}
  <section className="bg-[#F7F5F5]">
    <div className="mx-auto max-w-7xl px-6 md:px-12 py-20 md:py-24">
      <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
        {/* Image (left) */}
        <div className="flex justify-center md:justify-start">
          <Image
            src="/images/CRM-Graphic.png"
            alt="CRM"
            width={560}
            height={440}
            className="w-auto h-auto drop-shadow-xl"
          />
        </div>

        {/* Copy (right) */}
        <div className="max-w-[560px]">
          <h2 className="text-[#141414] font-extrabold leading-tight text-[28px] md:text-[36px]">
            Your data’s in good hands
          </h2>

          <p className="mt-4 text-[15px] md:text-[16px] leading-7 text-[#444]">
            Our partnership with your CRM enables a seamless flow of information. Answering Legal’s
            receptionists take down exactly the information you need.
          </p>
          <p className="mt-4 text-[15px] md:text-[16px] leading-7 text-[#444]">
            Through native API integrations with our proprietary software, we make sure it’s
            immediately where you need it to be. All you’ll have to do is open your CRM and follow up
            to secure your new client’s business.
          </p>

          <button className="mt-6 inline-flex items-center rounded-md bg-[#0360E6] px-5 py-3 text-white font-semibold shadow hover:bg-[#0056d1]">
            See our pricing
          </button>
        </div>
      </div>
    </div>
  </section>

  {/* ---------- Intake ---------- */}
  <section className="bg-[#F7F5F5]">
    <div className="mx-auto max-w-7xl px-6 md:px-12 py-20 md:py-24">
      <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
        {/* Copy (left on desktop) */}
        <div className="order-2 md:order-1 max-w-[560px]">
          <h2 className="text-[#141414] font-extrabold leading-tight text-[28px] md:text-[36px]">
            Design your perfect legal intake process
          </h2>

          <p className="mt-4 text-[15px] md:text-[16px] leading-7 text-[#444]">
            Get everything you need out of every new client call. The virtual receptionists at our
            legal intake call center will use your unique specifications to perform a legal intake for
            every new client caller.
          </p>

          <button className="mt-6 inline-flex items-center rounded-md bg-[#0360E6] px-5 py-3 text-white font-semibold shadow hover:bg-[#0056d1]">
            See our pricing
          </button>
        </div>

        {/* Image (right on desktop) */}
        <div className="order-1 md:order-2 flex justify-center md:justify-end">
          <Image
            src="/images/Receptionist_IMG.png"
            alt="Receptionist"
            width={560}
            height={440}
            className="w-auto h-auto drop-shadow-xl"
          />
        </div>
      </div>
    </div>
  </section>


      {/* ---------- Blog (Carousel) ---------- */}
      <BlogCarouselExact />

      {/* ---------- Footer (pixel-accurate mobile, desktop unchanged) ---------- */}
    <footer className="bg-[#161641] text-white">
      {/* Top band: copy + form (stack on mobile, 2 cols on desktop) */}
       <section className="mx-auto max-w-7xl px-5 md:px-10 pt-8 md:pt-20 pb-6 md:pb-10 grid md:grid-cols-2 gap-6 md:gap-16 items-center">
        {/* Copy block — first on mobile, left on desktop */}
        <div className="order-1 md:order-1">
          <p className="text-[50px] leading-[1.12] font-extrabold tracking-tight">
            24/7 coverage at a
            <br />fraction of the cost
            <br />of in-house
            <br />receptionists.
          </p>

          <p className="mt-4 text-white/90 text-[30px] leading-[1.6] md:max-w-[560px]">
            Don’t believe us? Fill out the form on the right, and we’ll take you to our pricing
            page, where you can find out just how little 24/7 legal intake will cost you.
          </p>
        </div>

        {/* Form — second on mobile (below copy), right on desktop */}
        <form
          onSubmit={handleSubmit}
          className="
            order-2 md:order-2
            w-full max-w-[520px] mx-auto md:ml-auto
            bg-white text-[#141414]
            rounded-[20px]
            shadow-[0_10px_30px_rgba(0,0,0,0.25)]
            p-5 md:p-8
          "
        >
          <h3 className="font-extrabold text-[22px] leading-snug mb-3 md:mb-4">
            Tell us about yourself. We’ll show you all of our pricing information on the next page.
          </h3>

          {/* Global error (red, compact like screenshot) */}
          {Object.keys(errors).length > 0 && (
            <div className="mb-4 md:mb-6 text-[#B91C1C] text-[13px] md:text-sm">
              <p className="font-semibold">Please fill in a valid value for all required fields</p>
              <p className="mt-1">
                Fields:{' '}
                <span className="font-extrabold">
                  Name, Company Name, Email, Phone
                </span>
              </p>
            </div>
          )}

          <div className="space-y-4 md:space-y-5">
            <div>
              <label className="block text-[13px] md:text-[14px] font-semibold mb-1">First Name*</label>
              <input
                placeholder="First Name*"
                value={values.firstName}
                onChange={(e) => setValues({ ...values, firstName: e.target.value })}
                className={`w-full rounded-md border h-10 px-3 outline-none ${
                  errors.firstName
                    ? 'border-[#B91C1C] focus:border-[#B91C1C]'
                    : 'border-[#E5E7EB] focus:border-[#0360E6]'
                }`}
              />
            </div>

            <div>
              <label className="block text-[13px] md:text-[14px] font-semibold mb-1">Last Name*</label>
              <input
                placeholder="Last Name*"
                value={values.lastName}
                onChange={(e) => setValues({ ...values, lastName: e.target.value })}
                className={`w-full rounded-md border h-10 px-3 outline-none ${
                  errors.lastName
                    ? 'border-[#B91C1C] focus:border-[#B91C1C]'
                    : 'border-[#E5E7EB] focus:border-[#0360E6]'
                }`}
              />
            </div>

            <div>
              <label className="block text-[13px] md:text-[14px] font-semibold mb-1">Company Name*</label>
              <input
                placeholder="Company Name*"
                value={values.company}
                onChange={(e) => setValues({ ...values, company: e.target.value })}
                className={`w-full rounded-md border h-10 px-3 outline-none ${
                  errors.company
                    ? 'border-[#B91C1C] focus:border-[#B91C1C]'
                    : 'border-[#E5E7EB] focus:border-[#0360E6]'
                }`}
              />
            </div>

            <div>
              <label className="block text-[13px] md:text-[14px] font-semibold mb-1">Email*</label>
              <input
                placeholder="Email*"
                value={values.email}
                onChange={(e) => setValues({ ...values, email: e.target.value })}
                className={`w-full rounded-md border h-10 px-3 outline-none ${
                  errors.email
                    ? 'border-[#B91C1C] focus:border-[#B91C1C]'
                    : 'border-[#E5E7EB] focus:border-[#0360E6]'
                }`}
              />
            </div>

            <div>
              <label className="block text-[13px] md:text-[14px] font-semibold mb-1">Cell Phone*</label>
              <input
                placeholder="Cell Phone*"
                value={values.phone}
                onChange={(e) => setValues({ ...values, phone: e.target.value })}
                className={`w-full rounded-md border h-10 px-3 outline-none ${
                  errors.phone
                    ? 'border-[#B91C1C] focus:border-[#B91C1C]'
                    : 'border-[#E5E7EB] focus:border-[#0360E6]'
                }`}
              />
            </div>
          </div>

          <button
            type="submit"
            className="
              mt-5 md:mt-6
              w-full h-12
              bg-[#0360E6] hover:bg-[#0056d1]
              text-white font-bold
              rounded-md
              shadow-[0_4px_10px_rgba(3,96,230,0.25)]
              transition
            "
          >
            See plans & pricing
          </button>

          {success && (
            <p className="text-green-600 text-sm mt-3 text-center">Form submitted successfully!</p>
          )}
        </form>
      </section>

      {/* Help strip — centered (three lines) */}
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <div className="mt-6 mb-8 md:mb-10 text-center">
          <p className="text-white font-extrabold">Have questions? Our team is here</p>
          <p className="text-white font-extrabold">to help. Call 631-400-8888</p>
          <p className="text-[#3CCED7] text-[15px] tracking-wide mt-1 font-extrabold">
            MONDAY TO FRIDAY FROM 9 AM TO 7 PM EST.
          </p>
        </div>
      </div>

      {/* Divider */}

  <div className="h-px bg-white/10" />

  {/* ================= MOBILE (compact, 2 columns, only headings) ================= */}
  <div className="md:hidden mx-auto max-w-[480px] px-6 pt-8 pb-10">
    {/* Two column headings only */}
    <div className="grid grid-cols-2 gap-x-10 gap-y-6">
      {/* Left column */}
      <div className="space-y-5">
        <a href="#" className="block text-white font-extrabold text-[20px] leading-none">
          Our Service
        </a>
        <a href="#" className="block text-white font-extrabold text-[20px] leading-none">
          Partnerships
        </a>
        <a href="#" className="block text-white font-extrabold text-[20px] leading-none">
          Support
        </a>
      </div>
      {/* Right column */}
      <div className="space-y-5 text-right">
        <a href="#" className="block text-white font-extrabold text-[20px] leading-none">
          Company
        </a>
        <a href="#" className="block text-white font-extrabold text-[20px] leading-none">
          Resources
        </a>
        <a href="#" className="block text-white font-extrabold text-[20px] leading-none">
          Follow Us
        </a>
      </div>
    </div>
  </div>

  {/* ================= DESKTOP (your existing full link columns) ================= */}
  <div className="hidden md:grid mx-auto max-w-7xl px-6 md:px-10 py-12 grid-cols-4 gap-10">
    {/* Our Service */}
    <div>
      <h4 className="font-semibold mb-3">Our Service</h4>
      <ul className="space-y-2 text-white/80 text-[14px]">
        {[
          'Who We Serve',
          'FAQs',
          'Tutorials',
          'What Is An Answering Service?',
          'What Is A Legal Intake Receptionist?',
          'What Is A Virtual Receptionist?',
        ].map(x => (
          <li key={x}><a href="#" className="hover:underline">{x}</a></li>
        ))}
      </ul>
    </div>

    {/* Company */}
    <div>
      <h4 className="font-semibold mb-3">Company</h4>
      <ul className="space-y-2 text-white/80 text-[14px]">
        {['Meet The Team', 'Our Authors'].map(x => (
          <li key={x}><a href="#" className="hover:underline">{x}</a></li>
        ))}
      </ul>
    </div>

    {/* Resources */}
    <div>
      <h4 className="font-semibold mb-3">Resources</h4>
      <ul className="space-y-2 text-white/80 text-[14px]">
        {[
          'Blog',
          'Podcast',
          'Videos',
          "Let’s Talk Legal",
          'Marketing',
          'The Answering Legal Book Club',
          'Top Legal Softwares',
        ].map(x => (
          <li key={x}><a href="#" className="hover:underline">{x}</a></li>
        ))}
      </ul>
    </div>

    {/* Support + socials */}
    <div>
      <h4 className="font-semibold mb-3">Support</h4>
      <ul className="space-y-2 text-white/80 text-[14px]">
        {[
          'Contact Us',
          'Submit A Ticket',
          'Privacy Policy',
          'Terms Of Service',
          'Employment Opportunities',
        ].map(x => (
          <li key={x}><a href="#" className="hover:underline">{x}</a></li>
        ))}
      </ul>

      <h5 className="font-semibold mt-6 mb-2">Follow Us</h5>
      <ul className="flex gap-4 text-white/80 text-sm">
        {['Twitter', 'Facebook', 'Instagram', 'LinkedIn'].map(x => (
          <li key={x}><a href="#" className="hover:text-white">{x}</a></li>
        ))}
      </ul>
    </div>
  </div>

  {/* ───────── Bottom bar ───────── */}
  <div className="h-px bg-white/10" />

  {/* Mobile: centered copyright only */}
  <div className="md:hidden text-center px-6 py-6 text-white font-extrabold text-[12px] tracking-tight">
    <p>© 2024 ANSWERING LEGAL · ALL RIGHTS RESERVED</p>
  </div>


  {/* Bottom bar  */}

<div className=" hidden md:block w-full flex justify-center px-4 pb-6 my-4">
  <p className="text-white font-extrabold text-[12px] md:text-sm text-center">
    © 2024 Answering Legal · All Rights Reserved  <a href="tel:6316869700" className="hover:underline">Support (631) 686-9700</a>
  </p>
</div>

    </footer>

    </main>
  );
}

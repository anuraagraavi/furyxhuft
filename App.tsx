import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Heart, 
  Camera, 
  MapPin, 
  Bone, 
  Briefcase, 
  Star,
  CheckCircle2,
  Play,
  PawPrint,
  Mail,
  Download,
  Sun,
  Smile,
  Mountain
} from 'lucide-react';
import { Navigation } from './components/Navigation';
import { Section } from './components/ui/Section';

// --- DATA & ASSETS ---

const IMAGES = {
  hero: [
    "https://i.ibb.co/tjjGL9t/Fury-1.jpg",
    "https://i.ibb.co/HLQLBLFJ/Fury-3.jpg",
    "https://i.ibb.co/spvC2JJt/Fury-2.jpg"
  ],
  story: [
    "https://i.ibb.co/s9JdbKps/Fury-9.jpg",
    "https://i.ibb.co/BKQKs7t6/Fury-7.jpg",
    "https://i.ibb.co/hR6xxnvv/Fury-8.jpg"
  ],
  snapshots: [
    { src: "https://i.ibb.co/ZpMFMyjC/Fury-10.jpg", caption: "I’m soft, slow, and full of stories." },
    // Swapped: Vertical collage moved to 2nd position (fits portrait grid)
    { src: "https://i.ibb.co/hwn9YJL/Fury-14.jpg", caption: "I’ve mastered the art of being gentle." },
    { src: "https://i.ibb.co/9HGZLzpD/Fury-15.jpg", caption: "Sunsets are my golden hour." }, 
    { src: "https://i.ibb.co/7J4Ns72H/Fury-5.jpg", caption: "Age doesn’t dim glow — it deepens it." },
    // Swapped: Landscape hug photo moved to end (fits full width banner)
    { src: "https://i.ibb.co/r2mQP3Xs/Fury-13.jpg", caption: "Safety is a warm hug." }
  ],
  gallery: [
    "https://i.ibb.co/MDwYQ9RS/Fury-11.jpg",
    "https://i.ibb.co/s4nDBqZ/Fury-12.jpg",
    "https://i.ibb.co/kVRFx3xx/Fury-17.jpg",
    "https://i.ibb.co/HDSMMqC2/Fury-18.jpg",
    "https://i.ibb.co/xSWtgtFx/Fury-16.jpg",
    "https://i.ibb.co/tM2GmsrJ/Fury-4.jpg"
  ]
};

const HUFT_TAGS = [
  "Heartys Biscuits", "Chicken Jerky", "Bonafee Pie", "Berry Bites"
];

// --- DOODLE COMPONENTS ---

const DoodlePaw = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C10.9 2 10 2.9 10 4C10 5.1 10.9 6 12 6C13.1 6 14 5.1 14 4C14 2.9 13.1 2 12 2ZM8 5C6.9 5 6 5.9 6 7C6 8.1 6.9 9 8 9C9.1 9 10 8.1 10 7C10 5.9 9.1 5 8 5ZM16 5C14.9 5 14 5.9 14 7C14 8.1 14.9 9 16 9C17.1 9 18 8.1 18 7C18 5.9 17.1 5 16 5ZM6.5 11C4.5 11 3 12.5 3 14.5C3 16.5 4.5 18 6.5 18C7.2 18 7.8 17.8 8.4 17.5C8.9 19.5 10.7 21 12.8 21C15.3 21 17.3 19 17.3 16.5C17.3 16.1 17.2 15.7 17.1 15.3C18.2 14.8 19 13.7 19 12.5C19 10.8 17.7 9.5 16 9.5C15.6 9.5 15.2 9.6 14.8 9.7C14.2 8.1 12.7 7 11 7C8.5 7 6.5 9 6.5 11Z" />
  </svg>
);

const DoodleBlob = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 200 200" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M44.7,-76.4C58.9,-69.2,71.8,-59.1,79.6,-46.3C87.4,-33.4,90.1,-17.9,89.2,-2.7C88.4,12.5,84,27.3,75.4,39.9C66.8,52.5,54,62.8,40.3,69.5C26.6,76.1,12,79.1,-2.3,83.1C-16.7,87.1,-30.7,92,-42.6,87.3C-54.4,82.6,-64,68.2,-71.3,53.8C-78.5,39.4,-83.4,25,-82.9,10.8C-82.4,-3.4,-76.6,-17.4,-68.1,-29.4C-59.5,-41.4,-48.3,-51.4,-36.1,-59.7C-23.9,-67.9,-10.8,-74.4,3.2,-80C17.2,-85.5,30.5,-90.1,44.7,-76.4Z" transform="translate(100 100)" />
  </svg>
);

const DoodleLines = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 20" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" className={className}>
    <path d="M5 10 Q 25 20, 45 10 T 85 10" />
  </svg>
);

const App: React.FC = () => {
  const [heroIndex, setHeroIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % IMAGES.hero.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="font-sans text-huft-charcoal bg-huft-cream overflow-x-hidden">
      <Navigation />

      {/* 1. HERO SECTION - HUFT Style */}
      <section id="hero" className="min-h-screen pt-24 md:pt-28 pb-16 flex items-center relative overflow-hidden bg-gradient-to-b from-huft-peach/30 to-huft-cream">
        {/* Doodles */}
        <DoodlePaw className="absolute top-20 left-10 w-16 h-16 text-huft-orange/20 rotate-12 animate-pulse" />
        <DoodlePaw className="absolute bottom-20 right-10 w-24 h-24 text-huft-green/20 -rotate-12" />
        <DoodleBlob className="absolute -top-20 -right-20 w-96 h-96 text-huft-beige opacity-80" />
        
        <div className="max-w-7xl mx-auto px-6 w-full grid md:grid-cols-2 gap-12 items-center relative z-10">
          {/* Left Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="order-2 md:order-1"
          >
            <h1 className="font-rounded text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 text-huft-charcoal">
              Hi, I’m Fury. <br />
              <span className="text-huft-orange">Senior Ambassador</span> <br/>
              <span className="text-3xl md:text-4xl text-huft-brown/80">(in Waiting)</span>
            </h1>
            
            <p className="font-rounded text-xl md:text-2xl font-semibold text-huft-brown mb-4">
              11-year-old Golden Retriever. Cancer warrior. Lifelong HUFT girl.
            </p>
            <p className="text-lg md:text-xl text-huft-charcoal/80 font-medium mb-8 max-w-lg leading-relaxed">
              I’ve spent 11 years loving people. Now I’d love to work with the brand that’s loved me back.
            </p>
            
            <div className="flex flex-wrap gap-3">
               {[
                 { label: "Age", value: "11" },
                 { label: "Personality", value: "Calm, gentle, expressive" },
                 { label: "Location", value: "Gurugram" },
                 { label: "Loves", value: "Heartys & Belly Rubs" }
               ].map((stat, idx) => (
                 <span key={idx} className="bg-white border-2 border-huft-peach px-4 py-2 rounded-full text-sm font-bold text-huft-charcoal shadow-sm hover:border-huft-orange transition-colors">
                   <span className="text-huft-orange mr-1">•</span> {stat.value}
                 </span>
               ))}
            </div>
          </motion.div>

          {/* Right Hero Image */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="order-1 md:order-2 relative h-[450px] md:h-[550px] w-full"
          >
            {/* Soft blob background for image */}
            <div className="absolute inset-0 bg-huft-peach rounded-[3rem] transform rotate-3 scale-95" />
            <div className="absolute inset-0 bg-white rounded-[3rem] overflow-hidden shadow-xl border-4 border-white transform -rotate-2 hover:rotate-0 transition-transform duration-500">
              {IMAGES.hero.map((img, index) => (
                <motion.img
                  key={index}
                  src={img}
                  alt={`Fury Hero ${index + 1}`}
                  className="absolute inset-0 w-full h-full object-cover object-top"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: index === heroIndex ? 1 : 0 }}
                  transition={{ duration: 1 }}
                />
              ))}
            </div>
             <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-lg border border-huft-peach transform rotate-6">
                <Heart className="text-huft-orange fill-huft-orange w-8 h-8" />
             </div>
          </motion.div>
        </div>
        
        {/* Divider */}
        <div className="absolute bottom-0 w-full text-huft-beige fill-current">
           <svg viewBox="0 0 1440 48" xmlns="http://www.w3.org/2000/svg"><path d="M0 48h1440V0c-283.4 34.6-595 48-1440 0v48z"/></svg>
        </div>
      </section>

      {/* 2. OUR STORY - Redesigned */}
      <Section id="story" bg="white">
        <div className="relative isolate">
          {/* Background Decor */}
          <div className="absolute -left-20 top-20 w-72 h-72 bg-huft-peach/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob" />
          <div className="absolute -right-20 bottom-20 w-72 h-72 bg-huft-green/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000" />
          
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
             
             {/* Left: Content */}
             <div className="relative">
                <div className="mb-6">
                  <span className="bg-huft-orange/10 text-huft-orange font-bold px-4 py-1.5 rounded-full text-sm tracking-wide uppercase inline-block mb-4">
                    Why HUFT?
                  </span>
                  <h2 className="font-rounded text-4xl md:text-5xl font-bold text-huft-charcoal leading-tight">
                    A love story written in <br className="hidden lg:block"/>
                    <span className="relative inline-block">
                      <span className="relative z-10 text-huft-orange">treats</span>
                      <svg className="absolute bottom-1 left-0 w-full h-3 text-huft-peach -z-10" viewBox="0 0 100 10" preserveAspectRatio="none"><path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" /></svg>
                    </span> 
                    & 
                    <span className="text-huft-green"> tail wags</span>.
                  </h2>
                </div>

                <div className="bg-white p-8 rounded-[2rem] shadow-xl shadow-huft-peach/10 border border-huft-beige relative transform hover:-translate-y-1 transition-transform duration-300">
                   {/* Tape Effect */}
                   <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-huft-peach/40 rotate-1 shadow-sm backdrop-blur-sm" />
                   
                   <p className="text-lg text-huft-charcoal/80 font-medium leading-relaxed mb-6">
                     Fury has grown up on HUFT. From her first collar to her senior orthopedic bed, you’ve been there.
                   </p>
                   <p className="text-lg text-huft-charcoal/80 font-medium leading-relaxed">
                     After her liver cancer diagnosis, <strong className="text-huft-orange bg-huft-orange/10 px-1 rounded">HUFT treats are the only ones gentle enough</strong> for her sensitive tummy. They keep her strong, happy, and asking for more.
                   </p>
                </div>

                <div className="mt-8">
                  <p className="text-sm font-bold text-huft-brown/60 uppercase tracking-widest mb-3 text-center md:text-left">Fury's Pantry Essentials</p>
                  <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                     {["Goat Milk Cookies", "Sara's Jerky", "Bonafee Pie", "Pet Wipes"].map((tag, i) => (
                       <span key={i} className="px-4 py-2 bg-white border border-huft-peach rounded-xl text-huft-charcoal font-bold text-sm shadow-sm hover:border-huft-orange hover:text-huft-orange transition-colors cursor-default">
                         {tag}
                       </span>
                     ))}
                  </div>
                </div>
             </div>

             {/* Right: Creative Image Composition */}
             <div className="relative h-[400px] md:h-[500px] w-full mt-8 md:mt-0 select-none">
                {/* Image 1: Wipes (Back) */}
                <motion.div 
                  className="absolute left-4 md:left-10 top-0 w-40 md:w-56 aspect-[3/4] bg-white p-2 pb-8 shadow-lg rounded-2xl transform -rotate-12 z-10 border border-gray-100"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                >
                   <img src={IMAGES.story[2]} alt="Wipes" className="w-full h-full object-cover rounded-xl" />
                </motion.div>

                {/* Image 2: Cookies (Back Right) */}
                <motion.div 
                  className="absolute right-4 md:right-10 top-10 w-40 md:w-56 aspect-[3/4] bg-white p-2 pb-8 shadow-lg rounded-2xl transform rotate-6 z-20 border border-gray-100"
                   animate={{ y: [0, 10, 0] }}
                   transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                >
                   <img src={IMAGES.story[0]} alt="Cookies" className="w-full h-full object-cover rounded-xl" />
                </motion.div>

                {/* Image 3: Jerky (Front Center) */}
                <motion.div 
                  className="absolute left-1/2 -translate-x-1/2 bottom-0 w-48 md:w-64 aspect-[3/4] bg-white p-3 pb-10 shadow-2xl rounded-2xl transform -rotate-3 z-30 border border-gray-100"
                  whileHover={{ scale: 1.05, rotate: 0 }}
                >
                   <img src={IMAGES.story[1]} alt="Treats" className="w-full h-full object-cover rounded-xl" />
                   <div className="absolute -top-4 -right-4 bg-huft-orange text-white w-14 h-14 md:w-20 md:h-20 rounded-full flex items-center justify-center font-bold text-[10px] md:text-xs shadow-lg rotate-12 text-center leading-tight border-4 border-white">
                     FURY'S<br/>#1 PICK
                   </div>
                </motion.div>
                
                {/* Decorative Doodles around images */}
                <Bone className="absolute top-1/2 left-0 text-huft-green w-8 h-8 -rotate-45 opacity-60" />
                <Heart className="absolute bottom-10 right-10 text-huft-orange w-10 h-10 rotate-12 opacity-60" />
             </div>

          </div>
          
          {/* Custom Section Divider */}
          <div className="absolute -bottom-28 left-0 w-full overflow-hidden leading-[0] rotate-180 text-huft-cream z-10">
             <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                 <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="currentColor"></path>
             </svg>
          </div>
        </div>
      </Section>

      {/* 3. SNAPSHOTS - IMPROVED LAYOUT WITH NO CROPPING */}
      <Section id="snapshots" bg="cream">
        <div className="text-center mb-16 relative">
          <DoodleBlob className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 text-huft-peach opacity-50 -z-10" />
          <h2 className="font-rounded text-4xl md:text-5xl font-bold mb-4 text-huft-charcoal">Fury in <span className="text-huft-orange underline decoration-wavy decoration-2 underline-offset-4">5 Snapshots</span></h2>
          <p className="text-huft-brown font-medium">Moments of quiet joy.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
           {IMAGES.snapshots.map((item, idx) => {
             const isLast = idx === IMAGES.snapshots.length - 1;
             
             // Container specific styles
             const containerClasses = isLast 
               ? 'md:col-span-2 w-full mx-auto' 
               : 'w-full';
               
             // Image container styles
             // First 4: Use aspect-[4/5] to provide vertical room.
             // Last one: Use aspect-video for the landscape photo to give it a cinematic full-width look.
             const imageContainerClasses = isLast
               ? 'aspect-video rounded-[2rem] overflow-hidden mb-6 relative bg-huft-beige/30 border-4 border-white shadow-sm flex items-center justify-center'
               : 'aspect-[4/5] rounded-[2rem] overflow-hidden mb-6 relative bg-huft-beige/30 border-4 border-white shadow-sm';

             // Image styles
             // For the last one (landscape), we use object-cover because it's a photo and we want it to fill the banner nicely.
             // For others, we stick to object-contain to ensure no cropping (as per previous request), or object-cover if it's a standard photo that fits.
             // Given "Safety is a warm hug" is a nice photo, cover works best for banner feel.
             const imgClasses = isLast
               ? 'w-full h-full object-cover' 
               : 'w-full h-full object-contain';

             return (
               <motion.div 
                 key={idx}
                 whileHover={{ y: -8 }}
                 className={`bg-white p-4 pb-8 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all duration-300 border border-huft-peach/30 ${containerClasses}`}
               >
                 <div className={imageContainerClasses}>
                   <img 
                      src={item.src} 
                      alt="Snapshot" 
                      className={imgClasses} 
                   />
                   <div className="absolute top-4 right-4 bg-white/90 p-2.5 rounded-full backdrop-blur-sm shadow-sm">
                      <Camera size={20} className="text-huft-charcoal" />
                   </div>
                 </div>
                 <p className="text-center font-rounded font-bold text-xl text-huft-charcoal px-4 leading-snug">
                   "{item.caption}"
                 </p>
               </motion.div>
             )
           })}
        </div>
      </Section>

      {/* 4. RESUME - PROFESSIONAL PORTFOLIO STYLE (REVISED) */}
      <Section id="resume" bg="white">
        <div className="relative">
          <div className="text-center max-w-3xl mx-auto mb-16 relative z-10">
            <div className="inline-flex items-center gap-3 bg-huft-orange/10 px-5 py-2 rounded-full mb-6">
              <Star className="w-5 h-5 text-huft-orange fill-huft-orange" />
              <span className="font-bold text-huft-orange tracking-wide uppercase text-sm">Professional Profile</span>
            </div>
            <h2 className="font-rounded text-4xl md:text-5xl font-bold text-huft-charcoal mb-4">
              The Resume of a <span className="text-huft-orange inline-block relative">
                Professional
                <svg className="absolute -bottom-2 left-0 w-full text-huft-peach" viewBox="0 0 100 15" preserveAspectRatio="none"><path d="M0 5 Q 50 15 100 5" stroke="currentColor" strokeWidth="4" fill="none"/></svg>
              </span> Good Girl
            </h2>
            <p className="text-xl text-huft-brown/80 font-medium">11 years of experience in being absolutely adorable.</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 items-start relative z-10">
            
            {/* Card 1: Experience */}
            <motion.div 
              whileHover={{ y: -8 }}
              className="bg-white rounded-[2.5rem] p-8 shadow-xl shadow-huft-peach/20 border border-huft-beige h-full relative overflow-hidden group"
            >
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-300 to-blue-400" />
              <div className="w-16 h-16 bg-blue-50 rounded-2xl rotate-3 flex items-center justify-center mb-6 group-hover:rotate-6 transition-transform">
                <Briefcase className="w-8 h-8 text-blue-500" strokeWidth={2.5} />
              </div>
              <h3 className="font-rounded text-2xl font-bold text-huft-charcoal mb-6">Work History</h3>
              <ul className="space-y-4">
                {[
                  "11 years as Chief Happiness Officer",
                  "Professional cuddle specialist",
                  "100+ shoots with family & friends",
                  "Calm in crowds & chaos"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <PawPrint className="w-4 h-4 text-blue-400 mt-1 shrink-0 rotate-12" />
                    <span className="font-medium text-huft-charcoal/80">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Card 2: Skills */}
            <motion.div 
              whileHover={{ y: -8 }}
              className="bg-white rounded-[2.5rem] p-8 shadow-xl shadow-huft-peach/20 border border-huft-beige h-full relative overflow-hidden group mt-0 lg:-mt-8"
            >
              <div className="absolute top-0 right-0 p-4">
                 <div className="bg-huft-green/10 text-huft-green font-bold text-xs px-3 py-1 rounded-full uppercase tracking-wider">Top Rated</div>
              </div>
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-huft-green to-emerald-400" />
              <div className="w-16 h-16 bg-green-50 rounded-2xl -rotate-2 flex items-center justify-center mb-6 group-hover:-rotate-6 transition-transform">
                <Star className="w-8 h-8 text-huft-green" strokeWidth={2.5} />
              </div>
              <h3 className="font-rounded text-2xl font-bold text-huft-charcoal mb-6">Core Skills</h3>
              <ul className="space-y-4">
                 {[
                  "Camera-friendly puppy eyes",
                  "Very good listener (mostly)",
                  "Loves travel & car rides",
                  "Treat-motivated (HUFT only!)"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <PawPrint className="w-4 h-4 text-huft-green mt-1 shrink-0 rotate-12" />
                    <span className="font-medium text-huft-charcoal/80">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Card 3: Superpowers */}
            <motion.div 
              whileHover={{ y: -8 }}
              className="bg-white rounded-[2.5rem] p-8 shadow-xl shadow-huft-peach/20 border border-huft-beige h-full relative overflow-hidden group"
            >
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-huft-orange to-red-400" />
              <div className="w-16 h-16 bg-orange-50 rounded-2xl rotate-2 flex items-center justify-center mb-6 group-hover:rotate-6 transition-transform">
                <Heart className="w-8 h-8 text-huft-orange" strokeWidth={2.5} />
              </div>
              <h3 className="font-rounded text-2xl font-bold text-huft-charcoal mb-6">Superpowers</h3>
              <ul className="space-y-4 relative z-10">
                 {[
                  "Senior dog representation",
                  "Cancer warrior & survivor",
                  "Calm, healing energy",
                  "Ready for any outfit!"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <PawPrint className="w-4 h-4 text-huft-orange mt-1 shrink-0 rotate-12" />
                    <span className="font-medium text-huft-charcoal/80">{item}</span>
                  </li>
                ))}
              </ul>
              
              {/* Stamp Effect */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 border-4 border-huft-orange/20 rounded-full flex items-center justify-center rotate-12 opacity-40 pointer-events-none group-hover:opacity-60 transition-opacity">
                 <span className="text-huft-orange/60 font-black uppercase text-xs tracking-widest text-center transform -rotate-12 leading-none">
                   HIRED!<br/><span className="text-[10px]">IMMEDIATELY</span>
                 </span>
              </div>
            </motion.div>
          </div>
        </div>
      </Section>

      {/* 5. GALLERY - HUFT Happy Tales Style */}
      <Section id="gallery" bg="cream">
        <div className="flex flex-col items-center mb-12">
           <DoodleLines className="w-32 text-huft-orange mb-4" />
           <h2 className="font-rounded text-3xl md:text-4xl font-bold text-center">“Happiness is a wet nose <br/>and a wagging tail!”</h2>
        </div>
        
        {/* Changed to Grid for even rows */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {IMAGES.gallery.map((src, i) => (
             <div key={i} className="relative group rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 aspect-square">
               <img src={src} alt="Gallery" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
               <div className="absolute inset-0 bg-huft-orange/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
             </div>
          ))}
        </div>
      </Section>

      {/* 6. VIDEO SECTION */}
      <Section id="video" bg="white">
        <div className="max-w-4xl mx-auto text-center bg-huft-beige/50 rounded-[3rem] p-6 md:p-12 border-2 border-dashed border-huft-brown/20 relative">
           <PawPrint className="absolute top-6 left-6 text-huft-brown/20 -rotate-12 w-8 h-8" />
           <PawPrint className="absolute bottom-6 right-6 text-huft-brown/20 rotate-12 w-8 h-8" />
           
           <h2 className="font-rounded text-3xl font-bold mb-8">Watch Fury In Action</h2>
           
           <div className="relative aspect-video bg-black rounded-3xl overflow-hidden shadow-xl mb-8 group">
              {/* Embed Streamable Video - Autoplay, Muted, No Controls (iframe controls hidden if supported or use wrapper) */}
              <iframe 
                src="https://streamable.com/e/s0v2r3?autoplay=1&muted=1&controls=0&loop=1" 
                width="100%" 
                height="100%" 
                frameBorder="0" 
                allowFullScreen 
                className="w-full h-full absolute inset-0"
                style={{ pointerEvents: 'none' }} // This effectively disables interaction including context menu in some cases, enforcing 'no audio option' feeling
                title="Fury Video"
              ></iframe>
              {/* Overlay to prevent clicking controls if any appear */}
              <div className="absolute inset-0 bg-transparent" style={{ pointerEvents: 'auto' }}></div>
           </div>
           
           <p className="font-rounded font-bold text-xl text-huft-charcoal">
             “Here’s the part where I pretend to be shy, but only for 2 seconds.”
           </p>
        </div>
      </Section>

      {/* 7. HEALTH & CARE */}
      <Section id="care" bg="cream">
         <div className="max-w-4xl mx-auto bg-huft-peach/20 rounded-[3rem] p-8 md:p-16 border border-huft-peach">
           <div className="text-center mb-10">
              <h2 className="font-rounded text-3xl font-bold mb-4">Her Health & On-Set Care</h2>
              <p className="text-huft-brown font-medium">Safe, comfortable, and tailored to a senior warrior.</p>
           </div>
           
           <div className="grid md:grid-cols-2 gap-8">
             <ul className="space-y-4">
               {[
                 "Senior Golden Retriever, 11 years",
                 "Living with liver cancer, but stable",
                 "Only HUFT treats suit her diet",
                 "Always accompanied by Amanpreet"
               ].map((item, i) => (
                 <li key={i} className="flex items-center gap-3 bg-white p-3 rounded-2xl shadow-sm">
                   <CheckCircle2 className="text-huft-green w-5 h-5 shrink-0" />
                   <span className="font-medium text-sm text-huft-charcoal">{item}</span>
                 </li>
               ))}
             </ul>
             <ul className="space-y-4">
               {[
                 "Calm, gentle, easy-going",
                 "Works best with short, paced shoots",
                 "Needs shade and water breaks",
                 "Comfortable in harnesses & outfits"
               ].map((item, i) => (
                 <li key={i} className="flex items-center gap-3 bg-white p-3 rounded-2xl shadow-sm">
                   <CheckCircle2 className="text-huft-green w-5 h-5 shrink-0" />
                   <span className="font-medium text-sm text-huft-charcoal">{item}</span>
                 </li>
               ))}
             </ul>
           </div>
         </div>
      </Section>

      {/* 8. IDEAS - HUFT Initiatives Cards */}
      <Section id="ideas" bg="white">
        <h2 className="font-rounded text-4xl font-bold mb-12 text-center">Ideas for <span className="text-huft-orange">HUFT x Fury</span></h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
           {[
             { title: "Senior Sundays", icon: <Sun className="w-8 h-8 text-huft-orange" />, desc: "Celebrating the golden years with comfort products." },
             { title: "Mountain Memories", icon: <Mountain className="w-8 h-8 text-huft-green" />, desc: "Winter wear and travel gear in her natural habitat." },
             { title: "Healthy Treats", icon: <Bone className="w-8 h-8 text-huft-brown" />, desc: "Moments that matter with treats that are safe." },
             { title: "Soft Home Stories", icon: <Smile className="w-8 h-8 text-huft-orange" />, desc: "Cozy beds and quiet corners for senior dogs." }
           ].map((card, i) => (
             <div key={i} className="bg-huft-cream p-6 rounded-[2rem] hover:bg-huft-peach/30 transition-colors group text-center border border-transparent hover:border-huft-peach cursor-default">
               <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm group-hover:scale-110 transition-transform">
                 {card.icon}
               </div>
               <h3 className="font-rounded font-bold text-lg mb-2 text-huft-charcoal">{card.title}</h3>
               <p className="text-sm font-medium text-huft-charcoal/70">{card.desc}</p>
             </div>
           ))}
        </div>
      </Section>

      {/* 9. BOTTOM QUOTE STRIP - Founder Note Style */}
      <section className="py-24 bg-huft-cream relative overflow-hidden">
        <DoodleBlob className="absolute -left-20 top-0 w-64 h-64 text-huft-peach/40" />
        <DoodleBlob className="absolute -right-20 bottom-0 w-64 h-64 text-huft-beige" />
        
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
           <div className="w-20 h-20 mx-auto bg-huft-orange rounded-full flex items-center justify-center mb-8">
             <Heart fill="white" className="text-white w-10 h-10" />
           </div>
           <p className="font-serif text-3xl md:text-5xl text-huft-charcoal leading-tight mb-8">
            “HUFT has been part of every chapter of Fury’s life. This page is her little thank-you.”
          </p>
        </div>
      </section>

      {/* 10. FOOTER - HUFT Style */}
      <footer id="contact" className="bg-huft-charcoal text-white py-16 rounded-t-[3rem] relative mt-[-2rem]">
        <div className="max-w-7xl mx-auto px-6 text-center">
           <div className="mb-10">
             <div className="bg-white/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
               <PawPrint className="w-8 h-8 text-huft-orange" />
             </div>
             <h2 className="font-rounded text-3xl font-bold mb-2">Say Hi to Fury</h2>
             <p className="text-white/60">Let's create something beautiful together.</p>
           </div>
           
           <div className="flex flex-col items-center gap-6 mb-12">
             <a 
               href="mailto:amanpreetkaur432@gmail.com"
               className="inline-flex items-center justify-center gap-2 bg-huft-orange text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-huft-orangeHover hover:scale-105 transition-all shadow-lg shadow-huft-orange/20"
             >
               <Mail size={22} />
               Email Fury's Human
             </a>
             
             <div className="flex items-center gap-2 text-white/70 bg-white/5 px-6 py-2 rounded-full">
               <MapPin size={16} />
               <span className="text-sm">Based in DLF Phase 2, Gurugram — happy to travel!</span>
             </div>
           </div>
           
           <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-white/40 gap-4">
             <p>© {new Date().getFullYear()} Fury. All tail wags reserved.</p>
             <p className="flex items-center gap-1">Designed with <Heart size={10} className="fill-huft-orange text-huft-orange" /> for HUFT</p>
           </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
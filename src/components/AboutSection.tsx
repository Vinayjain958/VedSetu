import React from 'react';
import { TESTIMONIALS } from '../data/mockData';
import { 
  GraduationCap, 
  Briefcase, 
  Home, 
  Star, 
  Quote,
  Target,
  Award
} from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about-section" className="py-16 sm:py-24 bg-white relative overflow-hidden">
      
      {/* Decorative ambient elements */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-orange-100/40 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-100/40 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* Section 1: The Core Mission */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-100 text-orange-800 text-xs font-extrabold uppercase tracking-wider">
              <Target className="w-4 h-4 text-orange-600" />
              Our Sacred Purpose
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Bringing Transparency & Trust to the{' '}
              <span className="text-orange-600">Spiritual Sector</span>
            </h2>

            <div className="p-4 rounded-2xl bg-orange-50/80 border-l-4 border-orange-600 space-y-1">
              <p className="text-lg font-spiritual font-bold text-orange-950">
                “आपकी आस्था, हमारी व्यवस्था”
              </p>
              <p className="text-xs font-semibold text-slate-600">
                Vedsetu bridges sacred Indian heritage with modern, reliable on-demand technology.
              </p>
            </div>

            <p className="text-base text-slate-700 leading-relaxed">
              For decades, organizing a Vedic ritual in urban India has been fraught with ambiguity: unregulated pricing, unverified credentials, missing samagri items, and language barriers.
            </p>

            <p className="text-base text-slate-700 leading-relaxed">
              <strong>Vedsetu</strong> was founded to solve this with complete transparency. We verify every priest's credentials through DigiLocker & premier Vedic Gurukuls, deliver authentic 100% organic samagri kits, and offer live step-by-step procedure tracking so you never feel lost during your sacred occasions.
            </p>

            {/* Impact Metric counters */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-100">
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">12,500+</div>
                <div className="text-xs text-slate-500 font-medium mt-0.5">Pujas Performed</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-orange-600">850+</div>
                <div className="text-xs text-slate-500 font-medium mt-0.5">Verified Acharyas</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-amber-600">4.94 ★</div>
                <div className="text-xs text-slate-500 font-medium mt-0.5">Customer Rating</div>
              </div>
            </div>

          </div>

          {/* Right Column: Tailored for 3 Core User Segments */}
          <div className="lg:col-span-6 space-y-4">
            <h3 className="text-lg font-bold text-slate-900 uppercase tracking-wider text-center lg:text-left mb-2">
              Who We Solve For:
            </h3>

            {/* Persona 1: Students */}
            <div className="p-5 rounded-2xl bg-slate-50 hover:bg-orange-50/50 border border-slate-200 hover:border-orange-200 transition-all flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-orange-100 text-orange-700 flex items-center justify-center flex-shrink-0">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-base">Students Away From Home</h4>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                  Moving into a new PG or hostel? Organize a small Saraswati or Ganesh Puja with pre-packaged kits without spending hours hunting 30 individual ingredients.
                </p>
              </div>
            </div>

            {/* Persona 2: Working Tech Professionals */}
            <div className="p-5 rounded-2xl bg-slate-50 hover:bg-orange-50/50 border border-slate-200 hover:border-orange-200 transition-all flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center flex-shrink-0">
                <Briefcase className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-base">Busy Tech & Corporate Professionals</h4>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                  Zero time for elaborate offline planning. Book Griha Pravesh, Vastu Shanti, or festival Havans with transparent pricing, punctuality, and English/Hindi explanation.
                </p>
              </div>
            </div>

            {/* Persona 3: Nuclear Families */}
            <div className="p-5 rounded-2xl bg-slate-50 hover:bg-orange-50/50 border border-slate-200 hover:border-orange-200 transition-all flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0">
                <Home className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-base">Nuclear Families in High-Rises</h4>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                  Apartment-friendly smoke-free havan wood, child-friendly storytelling of katha meanings, and pure certified cow ghee directly from gaushalas.
                </p>
              </div>
            </div>

          </div>

        </div>

        {/* Section 2: The Founders */}
        <div className="bg-gradient-to-b from-orange-50/60 to-amber-50/40 rounded-3xl p-8 sm:p-12 border border-orange-100">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-orange-800 text-xs font-bold uppercase tracking-wider mb-2">
              <Award className="w-3.5 h-3.5 text-orange-600" />
              Leadership & Vision
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Meet the Founders
            </h3>
            <p className="text-sm text-slate-600 mt-2">
              Engineering minds driven by a deep reverence for Indian culture and structured digital innovation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            
            {/* Founder 1: Vinay Jain */}
            <div className="bg-white p-6 rounded-2xl border border-orange-200 shadow-sm flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
              <img 
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=240&q=80" 
                alt="Vinay Jain"
                className="w-24 h-24 rounded-2xl object-cover border-2 border-orange-500 shadow-md flex-shrink-0"
              />
              <div className="space-y-2">
                <div>
                  <h4 className="text-lg font-extrabold text-slate-900">Vinay Jain</h4>
                  <p className="text-xs font-bold text-orange-600 uppercase tracking-wider">Co-Founder & Product Architect</p>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Passionate about standardizing spiritual workflows, ritual milestone tracking, and building ethical marketplace solutions for the Indian ecosystem.
                </p>
                <div className="pt-1 flex items-center justify-center sm:justify-start gap-2 text-[11px] font-semibold text-slate-500">
                  <span className="bg-slate-100 px-2 py-0.5 rounded">Product Vision</span>
                  <span className="bg-slate-100 px-2 py-0.5 rounded">Tech Strategy</span>
                </div>
              </div>
            </div>

            {/* Founder 2: Harsh Joshi */}
            <div className="bg-white p-6 rounded-2xl border border-orange-200 shadow-sm flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=240&q=80" 
                alt="Harsh Joshi"
                className="w-24 h-24 rounded-2xl object-cover border-2 border-amber-500 shadow-md flex-shrink-0"
              />
              <div className="space-y-2">
                <div>
                  <h4 className="text-lg font-extrabold text-slate-900">Harsh Joshi</h4>
                  <p className="text-xs font-bold text-amber-700 uppercase tracking-wider">Co-Founder & Operations Lead</p>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Deeply engaged with Vedic Gurukuls, Acharya onboarding pipelines, quality assurance for organic samagri kits, and user trust protocols.
                </p>
                <div className="pt-1 flex items-center justify-center sm:justify-start gap-2 text-[11px] font-semibold text-slate-500">
                  <span className="bg-slate-100 px-2 py-0.5 rounded">Gurukul Relations</span>
                  <span className="bg-slate-100 px-2 py-0.5 rounded">Operations</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Section 3: Testimonials */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Trusted by 12,000+ Devotees Across India
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              Read authentic feedback from families who celebrated their milestone moments with Vedsetu.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <div 
                key={t.id}
                className="bg-slate-50 p-6 rounded-2xl border border-slate-200/90 flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-amber-500">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400" />
                      ))}
                    </div>
                    <Quote className="w-6 h-6 text-orange-300" />
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                    "{t.comment}"
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-200/70 flex items-center gap-3">
                  <img 
                    src={t.avatar} 
                    alt={t.name}
                    className="w-10 h-10 rounded-full object-cover border border-orange-200"
                  />
                  <div>
                    <h5 className="text-xs font-bold text-slate-900">{t.name}</h5>
                    <p className="text-[11px] text-slate-500">{t.role} · {t.location}</p>
                    <p className="text-[10px] text-orange-600 font-semibold">{t.pujaAttended}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

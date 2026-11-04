import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  BookOpen,
  Calendar,
  Clock,
  ChevronRight,
  ArrowLeft,
  Share2,
  CheckCircle2,
  HelpCircle,
  Tag,
  Search,
  ChevronDown,
  Sparkles
} from 'lucide-react';
import { BLOG_POSTS, BlogPost } from '../data/blogs';
import { WhatsAppIcon } from './icons/WhatsAppIcon';
import { sound } from '../utils/audio';
import { APP_IMAGES } from '../data/images';
import { COMPANY_INFO } from '../data/fleet';

interface BlogSectionProps {
  onOpenBooking: () => void;
}

export const BlogSection: React.FC<BlogSectionProps> = ({ onOpenBooking }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeArticle, setActiveArticle] = useState<BlogPost | null>(null);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const filteredPosts = BLOG_POSTS.filter((post) => {
    const matchesCat = selectedCategory === 'all' || post.category === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.targetKeywords.some((k) => k.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  const handleOpenArticle = (post: BlogPost) => {
    sound.playClick();
    setActiveArticle(post);
    setOpenFaqIndex(null);
  };

  const handleToggleFaq = (idx: number) => {
    sound.playClick();
    setOpenFaqIndex(openFaqIndex === idx ? null : idx);
  };

  return (
    <section id="blogs" className="relative py-16 sm:py-24 bg-slate-950 border-t border-emerald-500/20 overflow-hidden">
      {/* High-Clarity Background Image: Scenic Nairobi Skyline & Safari Sunset */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src={APP_IMAGES.nairobiGuidesBg}
          alt="Nairobi & Kenya Safari Scenic Travel Guides"
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover object-center brightness-[0.75] contrast-[1.05]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/60" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 space-y-3 sm:space-y-4"
        >
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-emerald-400 uppercase">
            <BookOpen className="w-4 h-4 shrink-0" />
            <span>SEO Knowledge Hub & Travel Guides</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight font-display break-words">
            Nairobi & Kenya Car Hire Guides
          </h2>
          <p className="text-sm sm:text-base text-slate-200 max-w-2xl mx-auto leading-relaxed">
            Expertly researched local guides tailored to rank high on Google Search Console, answering every question about Kenyan road trips, national park terrain, and airport expressway corridors.
          </p>
        </motion.div>

        {/* Search & Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8 sm:mb-10"
        >
          {/* Category Chips */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto scrollbar-none pb-2 md:pb-0">
            {['all', 'Local Guide', 'Cost Savings', 'Road Trips', 'Tips & Regulations', 'Airport Transfers'].map(
              (cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    sound.playClick();
                    setSelectedCategory(cat);
                  }}
                  className={`px-3.5 sm:px-4 py-2 text-xs font-semibold rounded-xl whitespace-nowrap shrink-0 transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-gradient-to-r from-emerald-400 to-teal-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20'
                      : 'bg-slate-900/80 text-slate-300 hover:text-white border border-slate-800'
                  }`}
                >
                  {cat === 'all' ? 'All Articles' : cat}
                </button>
              )
            )}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search guides or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950/90 border border-slate-700 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400"
            />
          </div>
        </motion.div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredPosts.map((post, idx) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.55, delay: (idx % 3) * 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6 }}
              className="group bg-slate-900/85 rounded-3xl border border-emerald-500/20 overflow-hidden hover:border-emerald-400/50 transition-all duration-300 flex flex-col justify-between hover:shadow-2xl hover:shadow-emerald-950/40 backdrop-blur-md"
            >
              <div>
                {/* Hero Thumbnail */}
                <div
                  onClick={() => handleOpenArticle(post)}
                  className="relative aspect-[16/10] overflow-hidden cursor-pointer"
                >
                  <img
                    src={post.heroImage}
                    alt={post.title}
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-lg bg-slate-950/85 backdrop-blur-md text-[11px] font-semibold text-emerald-300 border border-emerald-500/30">
                    {post.category}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 sm:p-6 space-y-3">
                  <div className="flex items-center gap-3 text-xs text-slate-400">
                    <span>{post.readTime}</span>
                    <span aria-hidden="true">·</span>
                    <span>{post.publishDate}</span>
                  </div>

                  <h3
                    onClick={() => handleOpenArticle(post)}
                    className="text-base sm:text-lg font-bold text-white font-display group-hover:text-emerald-400 transition-colors cursor-pointer line-clamp-2 break-words"
                  >
                    {post.title}
                  </h3>

                  <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>

                  {/* Target Keywords */}
                  <div className="pt-2 flex flex-wrap gap-1.5 text-[11px] text-emerald-400/80">
                    {post.targetKeywords.slice(0, 3).map((kw) => (
                      <span
                        key={kw}
                        className="px-2 py-0.5 rounded bg-slate-950/80 border border-slate-800"
                      >
                        #{kw}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs">
                <span className="text-slate-400 font-medium">By {post.author}</span>
                <button
                  onClick={() => handleOpenArticle(post)}
                  className="font-bold text-emerald-400 group-hover:text-emerald-300 flex items-center gap-1 cursor-pointer font-display"
                >
                  <span>Read Guide</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      {/* Full Article Modal */}
      <AnimatePresence>
        {activeArticle && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/90 backdrop-blur-md flex items-start justify-center p-3 sm:p-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="bg-slate-900 border border-emerald-500/30 w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl my-8 relative text-white"
            >
              {/* Close Button */}
              <button
                onClick={() => {
                  sound.playClick();
                  setActiveArticle(null);
                }}
                className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-slate-950/80 hover:bg-slate-800 text-slate-300 hover:text-white transition-colors border border-slate-700 cursor-pointer"
                aria-label="Close article"
              >
                ✕
              </button>

              {/* Hero Image */}
              <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-slate-950">
                <img
                  src={activeArticle.heroImage}
                  alt={activeArticle.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 space-y-2">
                  <div className="inline-block px-3 py-1 rounded-full bg-emerald-950/90 border border-emerald-400/40 text-xs font-semibold text-emerald-300">
                    {activeArticle.category}
                  </div>
                  <h1 className="text-xl sm:text-3xl font-black font-display text-white leading-tight">
                    {activeArticle.title}
                  </h1>
                  <div className="flex items-center gap-4 text-xs text-slate-300 pt-1">
                    <span>{activeArticle.readTime}</span>
                    <span>·</span>
                    <span>{activeArticle.publishDate}</span>
                    <span>·</span>
                    <span>By {activeArticle.author}</span>
                  </div>
                </div>
              </div>

              {/* Article Content */}
              <div className="p-6 sm:p-10 space-y-8">
                {/* Table of Contents */}
                <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 block font-display">
                    Table of Contents
                  </span>
                  <ul className="space-y-1.5 text-xs sm:text-sm text-slate-300">
                    {activeArticle.tableOfContents.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="text-emerald-400 font-bold">{idx + 1}.</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Body Sections */}
                <div className="space-y-8 text-sm sm:text-base text-slate-200 leading-relaxed">
                  {activeArticle.content.map((sec, sIdx) => (
                    <div key={sIdx} className="space-y-3">
                      <h2 className="text-lg sm:text-2xl font-bold font-display text-white">
                        {sec.sectionHeading}
                      </h2>
                      {sec.paragraphs.map((p, pIdx) => (
                        <p key={pIdx} className="text-slate-300 leading-relaxed">
                          {p}
                        </p>
                      ))}

                      {sec.bulletPoints && (
                        <ul className="space-y-2 pt-2 text-sm text-slate-300 pl-4 border-l-2 border-emerald-400">
                          {sec.bulletPoints.map((bp, bpIdx) => (
                            <li key={bpIdx} className="flex items-start gap-2">
                              <span className="text-emerald-400 font-bold">•</span>
                              <span>{bp}</span>
                            </li>
                          ))}
                        </ul>
                      )}

                      {sec.callout && (
                        <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-500/30 text-xs sm:text-sm text-emerald-200">
                          <strong>💡 Pro-Tip: </strong>
                          {sec.callout}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Article FAQs */}
                {activeArticle.faqs && activeArticle.faqs.length > 0 && (
                  <div className="pt-6 border-t border-slate-800 space-y-4">
                    <h3 className="text-lg font-bold font-display text-white flex items-center gap-2">
                      <HelpCircle className="w-5 h-5 text-emerald-400" />
                      Frequently Asked Questions
                    </h3>
                    <div className="space-y-3">
                      {activeArticle.faqs.map((faq, fIdx) => (
                        <div
                          key={fIdx}
                          className="rounded-xl border border-slate-800 bg-slate-950 p-4 space-y-2"
                        >
                          <button
                            onClick={() => handleToggleFaq(fIdx)}
                            className="w-full flex items-center justify-between text-left font-semibold text-sm text-white"
                          >
                            <span>{faq.question}</span>
                            <ChevronDown
                              className={`w-4 h-4 text-emerald-400 transition-transform ${
                                openFaqIndex === fIdx ? 'rotate-180' : ''
                              }`}
                            />
                          </button>
                          {openFaqIndex === fIdx && (
                            <p className="text-xs sm:text-sm text-slate-300 pt-2 border-t border-slate-800/80 leading-relaxed">
                              {faq.answer}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Footer Action */}
                <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-xs text-slate-400">
                    Ready to book your vehicle from <strong className="text-white">Prime Carhire Ojijo Rd</strong>?
                  </div>
                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    <button
                      onClick={() => {
                        sound.playCarChirp();
                        setActiveArticle(null);
                        onOpenBooking();
                      }}
                      className="flex-1 sm:flex-none px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-500 text-slate-950 font-bold text-xs uppercase tracking-wider cursor-pointer font-display"
                    >
                      Reserve Now
                    </button>
                    <a
                      href={COMPANY_INFO.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5"
                    >
                      <WhatsAppIcon className="w-4 h-4 fill-white" />
                      <span>WhatsApp</span>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

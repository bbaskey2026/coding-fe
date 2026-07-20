import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Code, Trophy, Target, Shield, Users, ArrowUpRight, Check, HelpCircle } from "lucide-react";
import { Card, CardBody } from "../components/ui/Card";
import { Button } from "../components/ui/Button";

export const Landing = () => {
  const [activeFaq, setActiveFaq] = useState(null);

  const stats = [
    { number: "12M+", label: "Submissions Compiled" },
    { number: "450K+", label: "Platform Members" },
    { number: "120+", label: "Partner Companies" },
    { number: "98.4%", label: "Satisfaction Rate" }
  ];

  const features = [
    {
      title: "Interactive Roadmaps",
      desc: "Structured paths going from core arrays to complex dynamic networks step-by-step.",
      icon: Target
    },
    {
      title: "Monaco Code Playground",
      desc: "High fidelity sandboxed execution console with code template completions.",
      icon: Code
    },
    {
      title: "Simulated Mock Interviews",
      desc: "Timeline-based interview rounds complete with audio prompts and feedback loops.",
      icon: Users
    },
    {
      title: "Real-time Leaderboards",
      desc: "Participate in weekly sprints, rank top, and claim verifiable accomplishment badges.",
      icon: Trophy
    }
  ];

  const tiers = [
    {
      name: "Starter",
      price: "$0",
      desc: "Access basic problem lists and roadmap structures.",
      features: ["Access to 100+ coding problems", "Standard code console compiler", "Personal notes workspace", "Basic weekly ranking access"],
      cta: "Start Practicing",
      popular: false
    },
    {
      name: "CodeForge Premium",
      price: "$29",
      desc: "The ultimate preparation suite for top tier technical interviews.",
      features: [
        "Unrestricted access to all 1000+ problems",
        "Curated roadmaps & automated certificates",
        "Structured Audio Mock Interview simulation",
        "Inside insights from 100+ company experience logs",
        "Priority support & advanced performance analytics"
      ],
      cta: "Go Premium",
      popular: true
    },
    {
      name: "Enterprise Team",
      price: "$99",
      desc: "Empower university clubs or engineering teams to learn.",
      features: ["Custom group contests & private tables", "Group analytics & admin panels", "Dedicated coaching boards", "API key compilation slots"],
      cta: "Contact Sales",
      popular: false
    }
  ];

  const faqs = [
    { q: "Is the compiler code editor fully functional?", a: "Yes, CodeForge integrates an advanced Monaco Editor layout supporting JavaScript, Python, C++, and Java execution pipelines complete with console logs." },
    { q: "Can I claim shareable completion certificates?", a: "Absolutely! Completing any of the Premium Study Plans unlocks an interactive SVG-rendered certification card with unique metadata codes." },
    { q: "How do mock interviews work?", a: "Mock interviews provide step-by-step timeline sessions. The system reads questions via mock audio synthesis, letting you write code under mock timers, finishing with feedback grids." }
  ];

  return (
    <div className="bg-bg min-h-screen text-text-primary overflow-x-hidden pt-16">
      {/* Background gradients */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[450px] h-[450px] bg-accent/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 pt-16 pb-12 flex flex-col items-center text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-primary/10 border border-primary/20 px-3 py-1 rounded-full text-xs font-bold text-primary inline-flex items-center gap-1.5 mb-6"
        >
          <span>Announcing CodeForge Studio v1.0</span>
          <ArrowUpRight size={12} />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-4xl sm:text-6xl font-extrabold tracking-tight max-w-4xl leading-tight"
        >
          Forge Your Coding Skills. <br />
          <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            Conquer Technical Interviews.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-text-secondary text-base sm:text-lg max-w-2xl font-light mt-6 leading-relaxed"
        >
          An ultra-premium coding preparation platform mimicking actual interview loops. Solve challenges with Monaco editor layouts, track plans, and master simulated technical questions.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-3.5 mt-10"
        >
          <Link to="/auth">
            <Button size="lg" className="w-full sm:w-auto font-semibold">
              Get Started Free <ArrowRight size={16} />
            </Button>
          </Link>
          <Link to="/problems">
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              Explore Problems
            </Button>
          </Link>
        </motion.div>

        {/* Floating Code Illustration */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, type: "spring", stiffness: 80 }}
          className="w-full max-w-4xl mt-16 rounded-xl border border-border/80 bg-surface/50 p-2.5 shadow-2xl relative"
        >
          <div className="flex gap-1.5 pb-2 px-1 text-zinc-500 border-b border-border/40 mb-3 text-xs justify-start">
            <div className="w-2.5 h-2.5 rounded-full bg-danger" />
            <div className="w-2.5 h-2.5 rounded-full bg-warning" />
            <div className="w-2.5 h-2.5 rounded-full bg-success" />
            <span className="font-mono ml-4 text-[10px]">solution.js — CodeForge Sandbox</span>
          </div>
          <div className="text-left font-mono text-xs text-primary leading-relaxed p-4 bg-zinc-950/60 rounded-lg overflow-x-auto min-h-[140px]">
            <span className="text-text-secondary">// Problem: Find K-th Largest Element</span><br />
            <span className="text-accent">function</span> <span className="text-text-primary">findKthLargest</span>(nums, k) &#123;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-accent">const</span> minHeap = <span className="text-accent">new</span> <span className="text-text-primary">MinHeap</span>();<br />
            &nbsp;&nbsp;&nbsp;&nbsp;nums.forEach(num =&gt; &#123;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;minHeap.push(num);<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-accent">if</span> (minHeap.size() &gt; k) minHeap.pop();<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&#125;);<br />
            &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-accent">return</span> minHeap.peek();<br />
            &#125;
          </div>
        </motion.div>
      </section>

      {/* Companies hiring banner */}
      <section className="bg-card/30 border-y border-border/40 py-8 text-center relative z-10 overflow-hidden">
        <span className="text-[10px] font-bold tracking-widest text-text-secondary uppercase">Empowering engineers at companies globally</span>
        <div className="flex justify-center flex-wrap gap-8 sm:gap-14 items-center mt-6 px-6 opacity-60">
          {["Google", "Stripe", "Netflix", "Amazon", "Apple", "Microsoft"].map(c => (
            <span key={c} className="font-bold text-base tracking-wider text-text-primary">{c}</span>
          ))}
        </div>
      </section>

      {/* Statistics Section */}
      <section className="max-w-7xl mx-auto px-6 py-20 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map((s, idx) => (
            <div key={idx} className="p-4 border border-border/40 rounded-xl bg-card/20">
              <div className="text-3xl sm:text-4xl font-extrabold text-primary">{s.number}</div>
              <div className="text-xs text-text-secondary mt-1.5 font-light">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Feature grid */}
      <section className="max-w-7xl mx-auto px-6 py-12 relative z-10">
        <div className="text-center max-w-xl mx-auto mb-16">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-text-primary">Designed for high performers.</h2>
          <p className="text-xs text-text-secondary mt-3 leading-relaxed">Everything you need to level up your programming, organize folders of notes, and prepare interview experiences.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, idx) => {
            const Icon = f.icon;
            return (
              <Card key={idx} hoverGlow glowColor="primary" className="p-6">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4 border border-primary/20">
                  <Icon size={20} />
                </div>
                <CardBody>
                  <h3 className="text-sm font-bold text-text-primary mb-2">{f.title}</h3>
                  <p className="text-xs leading-relaxed text-text-secondary font-light">{f.desc}</p>
                </CardBody>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Pricing Matrix */}
      <section className="max-w-7xl mx-auto px-6 py-20 relative z-10">
        <div className="text-center max-w-xl mx-auto mb-16">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-text-primary">Transparent Pricing Plans</h2>
          <p className="text-xs text-text-secondary mt-3">Invest in your career. Upgrade anytime, cancel in a click.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 items-stretch">
          {tiers.map((t, idx) => (
            <div
              key={idx}
              className={`p-8 rounded-xl border flex flex-col justify-between text-left ${
                t.popular
                  ? "bg-surface border-primary shadow-[0_0_30px_rgba(99,102,241,0.15)] relative"
                  : "bg-card/40 border-border/80"
              }`}
            >
              {t.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-primary text-[10px] font-bold text-text-primary tracking-widest uppercase">
                  Most Popular
                </span>
              )}
              <div>
                <h3 className="text-base font-bold text-text-primary">{t.name}</h3>
                <p className="text-xs text-text-secondary mt-1 min-h-[30px] font-light leading-relaxed">{t.desc}</p>
                <div className="flex items-baseline gap-1 mt-4">
                  <span className="text-3xl sm:text-4xl font-extrabold text-text-primary">{t.price}</span>
                  <span className="text-xs text-text-secondary">/month</span>
                </div>

                <div className="border-t border-border/40 my-6" />

                <ul className="flex flex-col gap-3">
                  {t.features.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-2.5 text-xs text-text-secondary font-light">
                      <Check size={14} className="text-success mt-0.5 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8">
                <Link to="/auth" className="w-full">
                  <Button variant={t.popular ? "primary" : "outline"} className="w-full font-semibold">
                    {t.cta}
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQs */}
      <section className="max-w-3xl mx-auto px-6 py-12 relative z-10">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-center text-text-primary mb-12">Frequently Asked Questions</h2>
        <div className="flex flex-col gap-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-border/60 rounded-xl bg-card/25 overflow-hidden transition-colors"
            >
              <button
                onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                className="w-full flex items-center justify-between p-5 text-left text-xs font-bold text-text-primary cursor-pointer hover:bg-card/40 focus:outline-none"
              >
                <span>{faq.q}</span>
                <HelpCircle size={14} className="text-text-secondary" />
              </button>
              {activeFaq === index && (
                <div className="px-5 pb-5 text-xs text-text-secondary leading-relaxed font-light border-t border-border/40 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Platform Footer */}
      <footer className="border-t border-border/40 bg-zinc-950/40 py-12 text-center text-xs text-text-secondary relative z-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-primary flex items-center justify-center font-bold text-text-primary text-[10px]">CF</div>
            <span className="font-bold text-text-primary">CodeForge</span>
          </div>
          <div className="flex gap-6 font-light">
            <a href="#" className="hover:text-text-primary">Terms of Service</a>
            <a href="#" className="hover:text-text-primary">Privacy Policy</a>
            <a href="#" className="hover:text-text-primary">Contact Support</a>
          </div>
          <div>© 2026 CodeForge Inc. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
};
export default Landing;

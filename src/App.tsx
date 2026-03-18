import React, { Component, ErrorInfo, ReactNode, useEffect, useRef } from 'react';
import { 
  Hammer, 
  Menu, 
  Armchair, 
  History, 
  Layers, 
  ArrowRight, 
  Quote, 
  MapPin, 
  Phone, 
  Mail, 
  Share2, 
  Instagram, 
  Globe 
} from 'lucide-react';

// Error Boundary Component
interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-background-dark flex items-center justify-center p-6 text-center">
          <div className="max-w-md w-full bg-white/5 border border-primary/20 rounded-2xl p-8 backdrop-blur-md">
            <h2 className="text-2xl font-bold text-primary mb-4">Something went wrong</h2>
            <p className="text-slate-400 mb-6">
              The application encountered an error. Please try refreshing the page.
            </p>
            <pre className="text-xs text-red-400 bg-black/30 p-4 rounded-lg overflow-auto text-left mb-6">
              {this.state.error?.message}
            </pre>
            <button 
              onClick={() => window.location.reload()}
              className="w-full bg-primary text-white py-3 rounded-xl font-bold hover:bg-primary/90 transition-colors"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Intersection Observer Hook for scroll animations
const useIntersectionObserver = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return ref;
};

const RevealOnScroll: React.FC<{ children: ReactNode; className?: string }> = ({ children, className = '' }) => {
  const ref = useIntersectionObserver();
  return (
    <div ref={ref} className={`reveal ${className}`}>
      {children}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <div className="bg-background-dark text-slate-100 min-h-screen font-sans selection:bg-primary selection:text-white">
      {/* Header */}
      <header className="fixed top-0 z-50 w-full bg-background-dark/90 backdrop-blur-md border-b border-primary/20">
        <div className="flex items-center p-4 justify-between max-w-7xl mx-auto">
          <div className="text-primary flex size-10 shrink-0 items-center">
            <Hammer className="w-8 h-8" />
          </div>
          <h2 className="text-white text-xl font-bold leading-tight tracking-[-0.015em] flex-1 ml-2">carpenter</h2>
          <div className="flex items-center justify-end">
            <button className="flex cursor-pointer items-center justify-center rounded-lg h-10 w-10 bg-transparent text-white hover:bg-white/10 transition-colors">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative">
          <div 
            className="flex min-h-[75vh] flex-col gap-6 bg-cover bg-center bg-no-repeat items-start justify-end px-6 pb-16 relative overflow-hidden" 
            style={{
              backgroundImage: `linear-gradient(rgba(33, 24, 17, 0.4) 0%, rgba(33, 24, 17, 0.9) 100%), url('https://lh3.googleusercontent.com/aida-public/AB6AXuDgbnsUDZDEkakETlmJUUfAZSlmb--DpXzByFtY7nimwpp7PvXcekHiZnf2xkbZbqy81MrehPmpA13nrWxXUzQtUPRrTvxK7NWaj4TKICoVVOtn1iF5iT65eqjqgVLpBl41ZZFMAIicmeBNyyGJWjT8OKSvTMzBHxLo-PAZbSOeQ7fHDc2eEMCJyNhYfIT2VVNWA_DWmoegvx0Uasb-LK5q3Fg--6cn8cDwq0Hfr0l5loz0SzSsFlarXlZpnYoiUihaFnKxQzA2OdM8')`
            }}
          >
            <div className="flex flex-col gap-4 max-w-2xl fade-in-up">
              <span className="inline-block w-fit px-3 py-1 bg-primary text-white text-xs font-bold uppercase tracking-widest rounded">Excellence in Wood</span>
              <h1 className="text-white text-5xl font-black leading-tight tracking-[-0.033em] md:text-7xl">
                Transforming Wood into Art
              </h1>
              <h2 className="text-slate-300 text-lg font-normal leading-relaxed md:text-xl">
                Specialized carpentry services for your home and office. Exclusive pieces with impeccable finish.
              </h2>
            </div>
            <button className="flex min-w-[200px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-14 px-8 bg-primary text-white text-lg font-bold hover:bg-primary/90 transition-all hover:scale-105 active:scale-95 fade-in-up" style={{ animationDelay: '0.2s' }}>
              Request a Quote
            </button>
          </div>
        </section>

        {/* About Section */}
        <section className="py-20 px-6 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <RevealOnScroll className="space-y-6">
              <h2 className="text-primary text-sm font-bold tracking-[0.2em] uppercase">The Artisan</h2>
              <h3 className="text-3xl md:text-4xl font-bold leading-tight text-primary">Passion for detail, commitment to quality</h3>
              <p className="text-slate-400 text-lg leading-relaxed">
                With over 20 years of experience in fine woodworking, carpenter combines traditional hand-joinery techniques with the latest in design and finishes. Each piece is treated as a unique work of art, built to last for generations.
              </p>
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="border-l-2 border-primary pl-4">
                  <span className="block text-2xl font-bold text-white">500+</span>
                  <span className="text-slate-500 text-sm">Projects Delivered</span>
                </div>
                <div className="border-l-2 border-primary pl-4">
                  <span className="block text-2xl font-bold text-white">100%</span>
                  <span className="text-slate-500 text-sm">Certified Wood</span>
                </div>
              </div>
            </RevealOnScroll>
            <RevealOnScroll className="relative rounded-2xl overflow-hidden aspect-[4/3] md:aspect-[16/10] shadow-2xl border border-primary/10 group">
              <img 
                alt="Woodworking tools" 
                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB_gdn5E1w3o7LVCNdNikjsa-7eE4G6_ieaTIHHtSDN0IKuaZY9ZldGi30QWgxq2CZBIdRAfRk63iT6DLIP9saHYvY0m0lRG6HKJTm8R7OLOatoquq1WbXDz8b95k2TXsUw0Kld1q1Y7GNhUpwQArBVb4eUG777ZI4miwDPgqoOT8z10dc-_81QOBkLpEvMXq3zbb_LQH1F6t659E-ESlVBW0lOR-glRX6jHSBllTGON71KqXS4_ol3HVpGWZu5bhqSVXjpV_PVApNw"
                referrerPolicy="no-referrer"
                loading="lazy"
              />
            </RevealOnScroll>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-20 bg-background-dark/50 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-primary text-sm font-bold tracking-[0.2em] uppercase mb-4">Specialties</h2>
              <h3 className="text-3xl md:text-4xl font-bold text-white">Our Services</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { icon: Armchair, title: "Custom Furniture", desc: "Custom design for kitchens, bedrooms, and offices, optimizing your space with elegance." },
                { icon: History, title: "Restoration", desc: "We bring back the life and original shine to antique furniture and pieces of sentimental value." },
                { icon: Layers, title: "Wood Structures", desc: "Construction of decks, pergolas, and roofs with the best wood on the market." }
              ].map((service, idx) => (
                <RevealOnScroll key={idx} className="bg-background-dark border border-primary/10 p-8 rounded-2xl hover:border-primary transition-all group hover:-translate-y-2">
                  <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                    <service.icon className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold text-white mb-3">{service.title}</h4>
                  <p className="text-slate-400">{service.desc}</p>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* Portfolio Section */}
        <section className="py-20 px-6 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <h2 className="text-primary text-sm font-bold tracking-[0.2em] uppercase mb-4">Gallery</h2>
              <h3 className="text-3xl md:text-4xl font-bold text-primary">Project Portfolio</h3>
            </div>
            <button className="text-primary font-bold flex items-center gap-2 hover:underline">
              View all projects <ArrowRight className="w-5 h-5" />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Modern Cabinetry", category: "Premium Woodwork", img: "https://azim.hostlin.com/Craftmax/assets/images/project/project-1.jpg" },
              { title: "Minimalist Kitchen", category: "American Oak", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBtkW6vQMzgxdELFIr574ZDsqGoAlQYfRu_KUAfy9bpxqwVzm0sHGqDB1mVJIBLo6ovg_LHw_zMLPybOl5Bm9qb9VA4JMFQxY_e9GhWTrPS4zR3oXdlScCAsSo1TNW_CHroxvG2CUFf-qo5GyygtB8nDkubmTQT6zGYEU3O_tMwuIfIAeHCDWVjtAmDYfWFvwrDYFT97zMml6qwTGvXJJMnDbwV-3VtcBwmelzJMXunnhOTVaiS0wCgQm4mIOL9VSHTZM8O0NK3d5fe" },
              { title: "Executive Office", category: "Solid Walnut", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCgfSBw_r5d70DC04dtg851eXlwTkSarWtjETD3IAB373Dzo7J50ZNARfmMiGf4M2RrtINDTm3DVuhv54qvoVibuJbp_Bsm6LkCRSlW7_aaRI5QBhI2QggYSdi7QsFv6IDk-jXGs00o2V7PnqYWwKOQ9Qun9LvbCBxFyqwiZfRQdnBolN3ORgZyQDZTawbZGL9h_KZluVxNYk7rcCPOf15lpGp7LsM_irWZmiVF9PJMRwUy3tIub9OmzDpfZTLIQgX4E-aKBFgpAh4K" },
              { title: "Live Edge Table", category: "Reclaimed Wood", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuA2Q2GiIHyMk-5M_oxR1jHlThPW3uvkqKwuFFUSUg10_BY9o-DTvNlbPeWdC_hSilJeTL_mEv4zXRG0fO4ESjSV5YQJZ1ChkjxRFEs_OVcXdpqaFIV6Ciiztc6y382cAodJw_V6RIczCIjNrD8K1VQ1zRRPdnVM74sHzz_5KPbX0TncXEZ7HaYaorMvvrj9ZtRQzRO5hUgOSfbanDkrvmNVfm9twwZOrJlmnW6gLt8ruHVMTkF1FGbo0PF9gawx_tzHKednL6qLm7g0" }
            ].map((project, idx) => (
              <RevealOnScroll key={idx} className="group relative overflow-hidden rounded-2xl aspect-[4/5]">
                <img 
                  alt={project.title} 
                  className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500" 
                  src={project.img} 
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background-dark/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-6 flex flex-col justify-end">
                  <h5 className="text-white font-bold text-lg">{project.title}</h5>
                  <p className="text-slate-300 text-sm">{project.category}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 bg-background-dark px-6">
          <RevealOnScroll className="max-w-4xl mx-auto text-center">
            <h2 className="text-primary text-sm font-bold tracking-[0.2em] uppercase mb-12">Testimonials</h2>
            <div className="flex flex-col items-center">
              <Quote className="text-primary w-12 h-12 mb-6" />
              <p className="text-xl md:text-2xl text-slate-200 italic mb-8">
                "The work of carpenter exceeded all my expectations. The custom cabinet turned out perfect and the attention to detail in the finish is visible from afar. Exemplary professionalism!"
              </p>
              <div className="flex items-center gap-4 text-left">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">RM</div>
                <div>
                  <h6 className="text-white font-bold">Richard Mendes</h6>
                  <p className="text-slate-500 text-sm">Architect</p>
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </section>

        {/* Contact Section */}
        <section className="py-20 px-6 max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto">
            <RevealOnScroll>
              <h2 className="text-primary text-sm font-bold tracking-[0.2em] uppercase mb-4">Contact</h2>
              <h3 className="text-3xl md:text-4xl font-bold text-primary mb-12">Shall we start your project?</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { icon: MapPin, title: "Address", desc: "1234 Wood Ave - Industrial District, San Francisco, CA" },
                  { icon: Phone, title: "Phone / WhatsApp", desc: "+1 (555) 123-4567" },
                  { icon: Mail, title: "Email", desc: "contact@carpenter.com" }
                ].map((item, idx) => (
                  <div key={idx} className="flex flex-col items-center gap-4 p-6 bg-background-dark/30 border border-primary/10 rounded-2xl">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary shrink-0">
                      <item.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h5 className="text-white font-bold mb-2">{item.title}</h5>
                      <p className="text-slate-400 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </RevealOnScroll>
          </div>
        </section>

        {/* Additional Gallery */}
        <section className="py-12 px-6 bg-background-dark/20">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              "https://azim.hostlin.com/Craftmax/assets/images/project/project-2.jpg",
              "https://azim.hostlin.com/Craftmax/assets/images/project/project-5.jpg",
              "https://azim.hostlin.com/Craftmax/assets/images/project/project-3.jpg"
            ].map((img, idx) => (
              <RevealOnScroll key={idx} className="rounded-2xl overflow-hidden aspect-video shadow-lg border border-primary/5">
                <img 
                  src={img} 
                  alt={`Project ${idx + 1}`} 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" 
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
              </RevealOnScroll>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-background-dark border-t border-primary/20 pt-16 pb-8 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <Hammer className="text-primary w-8 h-8" />
                <h2 className="text-white text-2xl font-bold">carpenter</h2>
              </div>
              <p className="text-slate-500 text-sm">Wood craftsmanship with Premium quality. Creating unique environments through manual talent.</p>
            </div>
            <div>
              <h5 className="text-white font-bold mb-6">Quick Links</h5>
              <ul className="space-y-4 text-slate-500 text-sm">
                <li><a className="hover:text-primary transition-colors" href="#">About Us</a></li>
                <li><a className="hover:text-primary transition-colors" href="#">Our Services</a></li>
                <li><a className="hover:text-primary transition-colors" href="#">Photo Gallery</a></li>
                <li><a className="hover:text-primary transition-colors" href="#">Quotes</a></li>
              </ul>
            </div>
            <div>
              <h5 className="text-white font-bold mb-6">Follow Us</h5>
              <div className="flex gap-4">
                {[Share2, Instagram, Globe].map((Icon, idx) => (
                  <a key={idx} className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all" href="#">
                    <Icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="border-t border-primary/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-600 text-xs">
            <p>© 2026 carpenter - Fine Woodworking. All rights reserved.</p>
            <div className="flex gap-6">
              <a className="hover:underline" href="#">Privacy Policy</a>
              <a className="hover:underline" href="#">Terms of Use</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
    </ErrorBoundary>
  );
};

export default App;

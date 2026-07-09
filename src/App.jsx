import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";

const logo = "https://raw.githubusercontent.com/altcomunic/alt-site-institucional-v3/main/public/LOGO.svg";
const kommo = "/kommo-partner.svg";
const formEndpoint = "https://script.google.com/macros/s/AKfycbznzRZUtxhncHDloFvd4pff1m2LE2VTvelFSFDUr16mS__wG1ngCaBwi50Petyl0KbJqQ/exec";
const social = {
  instagram: "https://www.instagram.com/alt.comunic/",
  linkedin: "https://www.linkedin.com/company/alt-comunic/about/?viewAsMember=true"
};

const nav = [
  ["Sistema", "#sistema"],
  ["Método", "#metodo"],
  ["Cases", "#cases"],
  ["Insights", "#insights"],
  ["Parceiros", "#parceiros"]
];

const modules = [
  ["Branding", "Clareza de marca", "Posicionamento, identidade e percepção de valor."],
  ["Conteúdo", "Autoridade e desejo", "Narrativas, criativos e produção audiovisual."],
  ["Performance", "Demanda qualificada", "Campanhas orientadas por oferta, canal e conversão."],
  ["CRM", "Processo comercial", "Funil, automação, follow-up e inteligência de vendas."],
  ["Dados", "Decisão objetiva", "KPIs, leitura de jornada e priorização de oportunidades."],
  ["Growth", "Escala com método", "Testes, melhoria contínua e crescimento previsível."]
];

const method = ["Diagnóstico", "Posicionamento", "Produção", "Distribuição", "Inteligência", "Escala"];

const cases = [
  { name: "Meso", type: "Arquitetura / Branding", image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1800&auto=format&fit=crop", link: "https://www.instagram.com/meso_arquitetura/" },
  { name: "EnForce", type: "Engenharia / Identidade", image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1800&auto=format&fit=crop", link: "https://www.instagram.com/en.forceengenharia/" },
  { name: "Grupo Saga", type: "Automotivo / Performance", image: "https://images.unsplash.com/photo-1542362567-b07e54358753?q=80&w=1800&auto=format&fit=crop", link: "https://www.instagram.com/sagavolkswagengoiania/" }
];

const insights = [
  "Marketing não começa no post. Começa na direção.",
  "Tráfego sem posicionamento acelera o erro.",
  "CRM não vende sozinho. Processo vende.",
  "IA só gera valor quando conecta dados, conteúdo e operação."
];

function Logo({ className = "" }) {
  return <img src={logo} alt="ALT Comunicação" className={className} />;
}

function SectionTitle({ eyebrow, title, text }) {
  return (
    <div className="section-copy">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {text && <p className="section-lead">{text}</p>}
    </div>
  );
}

function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="navbar">
      <div className="container nav-inner">
        <a href="#home" aria-label="ALT Comunicação"><Logo className="nav-logo" /></a>
        <nav className="nav-links" aria-label="Navegação principal">
          {nav.map(([label, href]) => <a key={label} href={href}>{label}</a>)}
          <a className="nav-cta" href="#diagnostico">Diagnóstico</a>
        </nav>
        <button className="mobile-toggle" onClick={() => setOpen(!open)} aria-label="Abrir menu">{open ? <X size={20}/> : <Menu size={20}/>}</button>
      </div>
      {open && <div className="mobile-menu">{nav.map(([label, href]) => <a key={label} href={href} onClick={() => setOpen(false)}>{label}</a>)}<a onClick={() => setOpen(false)} href="#diagnostico">Diagnóstico</a></div>}
    </header>
  );
}

function Hero() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 0.35], [0, 120]);
  return (
    <section id="home" className="hero section-full">
      <motion.div className="hero-bg" style={{ y }} />
      <div className="container hero-grid">
        <motion.div initial={{opacity:0, y:24}} animate={{opacity:1, y:0}} transition={{duration:.7}}>
          <p className="eyebrow muted">Marketing · Branding · Performance</p>
          <h1>Marketing sem achismo.<span>Resultado que converte.</span></h1>
          <p className="hero-lead">Uma operação integrada de marca, conteúdo, mídia, CRM e inteligência comercial para empresas que querem crescer com direção.</p>
          <div className="hero-actions">
            <a className="btn primary" href="#diagnostico">Solicitar diagnóstico <ArrowRight size={16}/></a>
            <a className="btn ghost" href="#cases">Conhecer cases</a>
          </div>
        </motion.div>
        <motion.aside className="hero-panel" initial={{opacity:0, x:32}} animate={{opacity:1, x:0}} transition={{delay:.2, duration:.7}}>
          <Logo className="panel-logo" />
          <div className="panel-line" />
          <p>Branding</p><p>Conteúdo</p><p>Performance</p><p>CRM</p><p>Dados</p><p>Growth</p>
        </motion.aside>
      </div>
    </section>
  );
}

function Manifesto() {
  return (
    <section className="manifesto section-block">
      <div className="container manifesto-grid">
        <p className="eyebrow">Manifesto ALT</p>
        <h2>A maioria das empresas não precisa de mais conteúdo. Precisa de uma direção clara para transformar atenção em oportunidade.</h2>
      </div>
    </section>
  );
}

function System() {
  return (
    <section id="sistema" className="section-block system-section">
      <div className="container">
        <SectionTitle eyebrow="01 — Sistema ALT" title="Um sistema modular para crescer com consistência." text="Cada módulo tem uma função. Juntos, eles conectam percepção, aquisição, relacionamento e venda." />
        <div className="module-grid">
          {modules.map(([title, short, text], index) => (
            <motion.article className="module-card" key={title} initial={{opacity:0, y:22}} whileInView={{opacity:1, y:0}} viewport={{once:true}} transition={{delay:index*.04}}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{title}</h3>
              <strong>{short}</strong>
              <p>{text}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Method() {
  return (
    <section id="metodo" className="section-block method-section">
      <div className="container method-grid">
        <SectionTitle eyebrow="02 — Método" title="Do diagnóstico à escala." text="Uma jornada objetiva para entender, posicionar, executar, medir e evoluir." />
        <div className="timeline">
          {method.map((item, index) => <div className="timeline-row" key={item}><span>{String(index + 1).padStart(2, "0")}</span><h3>{item}</h3></div>)}
        </div>
      </div>
    </section>
  );
}

function Cases() {
  return (
    <section id="cases" className="section-block cases-section">
      <div className="container">
        <SectionTitle eyebrow="03 — Cases" title="Projetos com marca, conteúdo e visão comercial." />
        <div className="case-stack">
          {cases.map((item) => (
            <a href={item.link} target="_blank" className="case-feature" key={item.name}>
              <div className="case-image" style={{backgroundImage:`url(${item.image})`}} />
              <div><p>{item.type}</p><h3>{item.name}</h3></div>
              <ArrowRight size={20}/>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function Results() {
  return (
    <section id="resultados" className="section-block results-section">
      <div className="container results-grid">
        <SectionTitle eyebrow="04 — Resultado" title="Design precisa gerar confiança. Estratégia precisa gerar negócio." />
        <div className="result-numbers">
          {[ ["10+", "anos de experiência"], ["50+", "projetos e marcas"], ["360°", "marca, mídia e comercial"] ].map(([value, label]) => <div key={label}><strong>{value}</strong><span>{label}</span></div>)}
        </div>
      </div>
    </section>
  );
}

function Insights() {
  return (
    <section id="insights" className="section-block insights-section">
      <div className="container">
        <SectionTitle eyebrow="05 — Insights" title="Pensamento estratégico para empresas em movimento." />
        <div className="insight-grid">{insights.map((item) => <article key={item}>{item}</article>)}</div>
      </div>
    </section>
  );
}

function Partners() {
  return (
    <section id="parceiros" className="section-block partners-section">
      <div className="container partners-grid">
        <SectionTitle eyebrow="06 — Parceiros" title="Tecnologia e parceiros conectados à operação." text="Incluímos ferramentas e integrações quando elas fortalecem a jornada comercial." />
        <div className="partner-panel">
          <img src={kommo} alt="Kommo Partner" />
          <p>CRM, automação e relacionamento para operações que precisam acompanhar oportunidades com mais controle.</p>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [sending, setSending] = useState(false);
  const [form, setForm] = useState({nome:"", empresa:"", email:"", whatsapp:"", dor:""});
  const update = (field, value) => setForm(prev => ({...prev, [field]: value}));
  const submit = async (event) => {
    event.preventDefault();
    setSending(true);
    try {
      await fetch(formEndpoint, { method:"POST", mode:"no-cors", headers:{"Content-Type":"text/plain;charset=utf-8"}, body:JSON.stringify(form) });
      alert("Diagnóstico solicitado com sucesso.");
      setForm({nome:"", empresa:"", email:"", whatsapp:"", dor:""});
    } finally { setSending(false); }
  };
  return (
    <section id="diagnostico" className="section-block contact-section">
      <div className="container contact-grid">
        <SectionTitle eyebrow="07 — Diagnóstico" title="Vamos entender onde sua marca pode crescer." text="Responda o essencial. A partir disso, analisamos cenário, oportunidade e próximos passos." />
        <form className="contact-form" onSubmit={submit}>
          <input required placeholder="Nome" value={form.nome} onChange={e=>update("nome", e.target.value)} />
          <input placeholder="Empresa" value={form.empresa} onChange={e=>update("empresa", e.target.value)} />
          <input required type="email" placeholder="E-mail" value={form.email} onChange={e=>update("email", e.target.value)} />
          <input required placeholder="WhatsApp" value={form.whatsapp} onChange={e=>update("whatsapp", e.target.value)} />
          <textarea placeholder="Maior desafio hoje" value={form.dor} onChange={e=>update("dor", e.target.value)} />
          <button className="btn primary" disabled={sending}>{sending ? "Enviando..." : "Enviar diagnóstico"} <ArrowRight size={16}/></button>
        </form>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div><Logo className="footer-logo" /><p>Marketing sem achismo. Resultado que converte.</p></div>
        <nav><a href={social.instagram}>Instagram</a><a href={social.linkedin}>LinkedIn</a><a href="#diagnostico">Contato</a></nav>
      </div>
    </footer>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);
  const { scrollYProgress } = useScroll();
  const width = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  useEffect(() => { const timer = setTimeout(() => setLoading(false), 900); return () => clearTimeout(timer); }, []);
  return (
    <div>
      <motion.div className="scroll-progress" style={{ width }} />
      {loading && <div className="loader"><Logo /></div>}
      <Navbar />
      <main><Hero /><Manifesto /><System /><Method /><Cases /><Results /><Insights /><Partners /><Contact /></main>
      <Footer />
    </div>
  );
}

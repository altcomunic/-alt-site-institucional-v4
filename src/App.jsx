import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";

const logo = "https://raw.githubusercontent.com/altcomunic/alt-site-institucional-v3/main/public/LOGO.svg";
const heroVideo = "https://videos.pexels.com/video-files/3255275/3255275-uhd_2560_1440_25fps.mp4";

const architecture = [
  ["01", "Diagnóstico", "Entendemos o cenário antes de propor qualquer ação."],
  ["02", "Estratégia", "Definimos prioridades, posicionamento e direção de crescimento."],
  ["03", "Marca", "Aumentamos percepção, clareza e valor percebido."],
  ["04", "Conteúdo", "Transformamos estratégia em narrativa, desejo e autoridade."],
  ["05", "Aquisição", "Criamos demanda qualificada com mídia e canais adequados."],
  ["06", "CRM", "Organizamos relacionamento, velocidade e acompanhamento comercial."],
  ["07", "Comercial", "Conectamos oportunidade, abordagem, diagnóstico e proposta."],
  ["08", "Receita", "Medimos o que realmente sustenta crescimento."],
];

const cases = [
  { name: "Meso", sector: "Arquitetura", headline: "Marca construída para ocupar um território de alto valor.", metric: "Branding + presença digital", image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1800&auto=format&fit=crop" },
  { name: "EnForce", sector: "Engenharia", headline: "Clareza institucional para uma empresa técnica e comercial.", metric: "Identidade + posicionamento", image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1800&auto=format&fit=crop" },
  { name: "Grupo Saga", sector: "Automotivo", headline: "Marketing conectado à rotina real de vendas.", metric: "Conteúdo + performance", image: "https://images.unsplash.com/photo-1542362567-b07e54358753?q=80&w=1800&auto=format&fit=crop" },
];

const insights = [
  ["Estratégia", "Marketing não começa no post. Começa na direção."],
  ["Performance", "Tráfego sem posicionamento acelera o erro."],
  ["CRM", "O lead não se perde no anúncio. Ele se perde no processo."],
];

function Reveal({ children, delay = 0, className = "" }) {
  return <motion.div className={className} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.18 }} transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}>{children}</motion.div>;
}

function Navbar() {
  const [open, setOpen] = useState(false);
  const links = [["Arquitetura", "#arquitetura"], ["Cases", "#cases"], ["Operação", "#operacao"], ["Insights", "#insights"]];
  return <header className="navbar"><div className="container nav-inner"><a href="#home" className="brand"><img src={logo} alt="ALT Comunicação" /></a><nav className="nav-links">{links.map(([label, href]) => <a key={label} href={href}>{label}</a>)}<a href="#diagnostico" className="nav-cta">Diagnóstico</a></nav><button className="mobile-toggle" onClick={() => setOpen(!open)} aria-label="Abrir menu">{open ? <X size={20} /> : <Menu size={20} />}</button></div>{open && <div className="mobile-menu">{links.map(([label, href]) => <a key={label} href={href} onClick={() => setOpen(false)}>{label}</a>)}<a href="#diagnostico" onClick={() => setOpen(false)}>Diagnóstico</a></div>}</header>;
}

function Hero() {
  return <section id="home" className="hero"><video className="hero-video" autoPlay muted loop playsInline><source src={heroVideo} type="video/mp4" /></video><div className="hero-overlay" /><div className="container hero-content"><Reveal><p className="eyebrow muted">Estratégia · Marca · Aquisição · Comercial</p><h1>Marketing sem achismo.<span>Resultado que converte.</span></h1><p className="hero-lead">Integramos estratégia, marca, conteúdo, mídia e processo comercial para transformar marketing em crescimento.</p><div className="hero-actions"><a className="btn primary" href="#diagnostico">Solicitar diagnóstico <ArrowRight size={16} /></a><a className="text-link" href="#arquitetura">Entender como fazemos <ArrowRight size={15} /></a></div></Reveal></div><div className="hero-index">ALT / 2026</div></section>;
}

function Architecture() {
  return <section id="arquitetura" className="section architecture"><div className="container"><Reveal className="section-head"><p className="eyebrow">Arquitetura ALT</p><h2>Não entregamos peças soltas.<br />Construímos uma operação.</h2><p>O crescimento acontece quando marca, aquisição, relacionamento e comercial trabalham na mesma direção.</p></Reveal><div className="architecture-grid">{architecture.map(([number, title, text], index) => <Reveal key={title} delay={index * 0.035}><article className="architecture-card"><span>{number}</span><h3>{title}</h3><p>{text}</p></article></Reveal>)}</div></div></section>;
}

function Rhythm() {
  return <section className="rhythm"><div className="container rhythm-list">{["Marca.", "Conteúdo.", "Aquisição.", "CRM.", "Comercial.", "Receita."].map((item, index) => <Reveal key={item} delay={index * 0.04}><h2 className={index === 5 ? "accent" : ""}>{item}</h2></Reveal>)}</div></section>;
}

function Cases() {
  return <section id="cases" className="section cases"><div className="container"><Reveal className="section-head row"><div><p className="eyebrow">Cases</p><h2>Estratégia aplicada<br />a negócios reais.</h2></div><p>Menos portfólio. Mais contexto, direção e resultado.</p></Reveal><div className="case-grid">{cases.map((item, index) => <Reveal key={item.name} delay={index * 0.06}><article className="case-card"><div className="case-image" style={{ backgroundImage: `url(${item.image})` }} /><div className="case-overlay" /><div className="case-top"><span>{item.sector}</span><span>0{index + 1}</span></div><div className="case-copy"><p>{item.metric}</p><h3>{item.name}</h3><strong>{item.headline}</strong></div></article></Reveal>)}</div></div></section>;
}

function Operation() {
  const steps = ["Diagnóstico", "Direção estratégica", "Narrativa", "Direção criativa", "Aquisição", "Relacionamento", "Direção comercial", "Conversão", "Receita"];
  return <section id="operacao" className="section operation"><div className="container operation-grid"><Reveal className="operation-intro"><p className="eyebrow">Operação ALT</p><h2>Da estratégia<br />à receita.</h2><p>A ALT organiza o caminho inteiro. O objetivo não é produzir mais. É tomar decisões melhores e converter com consistência.</p><a className="text-link" href="#diagnostico">Solicitar diagnóstico <ArrowRight size={15} /></a></Reveal><div className="operation-flow">{steps.map((step, index) => <Reveal key={step} delay={index * 0.035}><div className="flow-row"><span>{String(index + 1).padStart(2, "0")}</span><strong>{step}</strong><i>{index < steps.length - 1 ? "↓" : "↗"}</i></div></Reveal>)}</div></div></section>;
}

function Insights() {
  return <section id="insights" className="section insights"><div className="container"><Reveal className="section-head"><p className="eyebrow">Leituras ALT</p><h2>Pensamento para empresas<br />em movimento.</h2></Reveal><div className="insight-grid">{insights.map(([tag, title], index) => <Reveal key={title} delay={index * 0.05}><article className="insight-card"><span>{tag}</span><h3>{title}</h3><a href="#insights">Ler análise <ArrowRight size={14} /></a></article></Reveal>)}</div></div></section>;
}

function Contact() {
  const empty = { nome: "", empresa: "", email: "", whatsapp: "", dor: "", website: "" };
  const [form, setForm] = useState(empty);
  const [status, setStatus] = useState("idle");
  const update = (field, value) => setForm((prev) => ({ ...prev, [field]: value }));
  const submit = async (event) => {
    event.preventDefault(); setStatus("sending");
    const params = new URLSearchParams(window.location.search);
    const payload = { ...form, utm_source: params.get("utm_source") || "", utm_medium: params.get("utm_medium") || "", utm_campaign: params.get("utm_campaign") || "", utm_content: params.get("utm_content") || "", utm_term: params.get("utm_term") || "", gclid: params.get("gclid") || "", fbclid: params.get("fbclid") || "", referrer: document.referrer || "", utm_referrer: window.location.href };
    try { const response = await fetch("/api/kommo-lead", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) }); const data = await response.json().catch(() => ({})); if (!response.ok || !data.ok) throw new Error(); setForm(empty); setStatus("success"); } catch { setStatus("error"); }
  };
  return <section id="diagnostico" className="diagnostic"><div className="container diagnostic-grid"><Reveal><p className="eyebrow">Próximo passo</p><h2>Sua empresa cresce por método ou por tentativa?</h2><p>O diagnóstico identifica onde o crescimento está travado e quais decisões precisam ser priorizadas.</p><div className="trust"><span>Diagnóstico gratuito</span><span>Sem compromisso</span><span>Análise inicial</span></div></Reveal><Reveal delay={0.08}><form className="contact-form" onSubmit={submit}><input required placeholder="Nome" value={form.nome} onChange={(e) => update("nome", e.target.value)} /><input placeholder="Empresa" value={form.empresa} onChange={(e) => update("empresa", e.target.value)} /><input required type="email" placeholder="E-mail" value={form.email} onChange={(e) => update("email", e.target.value)} /><input required placeholder="WhatsApp" value={form.whatsapp} onChange={(e) => update("whatsapp", e.target.value)} /><textarea placeholder="Qual é o maior desafio da empresa hoje?" value={form.dor} onChange={(e) => update("dor", e.target.value)} /><input className="honeypot" tabIndex="-1" autoComplete="off" value={form.website} onChange={(e) => update("website", e.target.value)} /><button className="btn primary" disabled={status === "sending"}>{status === "sending" ? "Enviando..." : "Solicitar diagnóstico"}<ArrowRight size={16} /></button><p className={`form-status ${status}`}>{status === "success" ? "Diagnóstico solicitado. Nossa equipe entrará em contato em breve." : status === "error" ? "Não foi possível enviar agora. Tente novamente." : ""}</p></form></Reveal></div></section>;
}

function Footer() {
  return <footer><div className="container footer-grid"><div><img src={logo} alt="ALT Comunicação" /><h2>Marketing sem achismo.<br />Resultado que converte.</h2></div><div className="footer-links"><a href="#arquitetura">Arquitetura</a><a href="#cases">Cases</a><a href="#operacao">Operação</a><a href="#diagnostico">Diagnóstico</a></div><div className="footer-partners"><span>Kommo Partner</span><span>Synapse</span><span>Meta</span><span>Google</span></div></div><div className="container footer-bottom"><span>© 2026 ALT Comunicação</span><span>Goiânia · GO</span></div></footer>;
}

export default function App() {
  useEffect(() => { document.documentElement.style.scrollBehavior = "smooth"; }, []);
  return <><Navbar /><main><Hero /><Architecture /><Rhythm /><Cases /><Operation /><Insights /><Contact /></main><Footer /></>;
}

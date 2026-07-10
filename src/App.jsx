import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ExternalLink, Menu, X } from "lucide-react";

const logo = "https://raw.githubusercontent.com/altcomunic/alt-site-institucional-v3/main/public/LOGO.svg";
const formEndpoint = "https://script.google.com/macros/s/AKfycbznzRZUtxhncHDloFvd4pff1m2LE2VTvelFSFDUr16mS__wG1ngCaBwi50Petyl0KbJqQ/exec";
const heroVideo = "https://videos.pexels.com/video-files/3255275/3255275-uhd_2560_1440_25fps.mp4";
const cinemaVideo = "https://videos.pexels.com/video-files/3209828/3209828-uhd_2560_1440_25fps.mp4";

const social = { instagram: "https://www.instagram.com/alt.comunic/", linkedin: "https://www.linkedin.com/company/alt-comunic/about/?viewAsMember=true", youtube: "#", google: "#" };
const nav = [["Sistema", "#sistema"], ["Método", "#metodo"], ["Cases", "#cases"], ["Insights", "#insights"], ["Parceiros", "#parceiros"]];

const modules = [
  { title: "Branding", short: "Clareza de marca", text: "Posicionamento, identidade e percepção de valor.", detail: "Posicionamos empresas para serem percebidas como referência antes da negociação começar.", items: ["Posicionamento", "Arquitetura de marca", "Identidade visual", "Tom de voz", "Direção criativa"], benefits: ["Mais autoridade", "Maior percepção de valor", "Comunicação consistente"] },
  { title: "Conteúdo", short: "Autoridade e desejo", text: "Narrativas, criativos e produção audiovisual.", detail: "Criamos conteúdo com função estratégica: educar, gerar desejo, construir confiança e apoiar vendas.", items: ["Reels", "Roteiros", "Social media", "Vídeos", "Calendário editorial"], benefits: ["Mais consistência", "Mais conexão", "Mais clareza comercial"] },
  { title: "Performance", short: "Demanda qualificada", text: "Campanhas orientadas por oferta, canal e conversão.", detail: "Distribuímos a mensagem certa para o público certo, com leitura de funil e otimização contínua.", items: ["Meta Ads", "Google Ads", "Landing pages", "Testes criativos", "Otimização"], benefits: ["Mais demanda", "Mais aprendizado", "Mais conversão"] },
  { title: "CRM", short: "Processo comercial", text: "Funil, automação, follow-up e inteligência de vendas.", detail: "Conectamos marketing e comercial para que oportunidades não se percam depois do primeiro contato.", items: ["Funis", "Kommo CRM", "Automações", "Follow-up", "Pipeline"], benefits: ["Mais controle", "Mais velocidade", "Menos perda de leads"] },
  { title: "Dados", short: "Decisão objetiva", text: "KPIs, leitura de jornada e priorização de oportunidades.", detail: "Transformamos dados em prioridades para reduzir achismo e melhorar a tomada de decisão.", items: ["Dashboards", "KPIs", "Relatórios", "BI", "Insights"], benefits: ["Mais previsibilidade", "Mais foco", "Mais direção"] },
  { title: "Growth", short: "Escala com método", text: "Testes, melhoria contínua e crescimento previsível.", detail: "Criamos ciclos de teste, aprendizado e escala para evoluir o que realmente gera resultado.", items: ["Experimentos", "Funil", "CRO", "Escala", "Receita"], benefits: ["Mais crescimento", "Mais eficiência", "Mais visão de futuro"] }
];

const method = [["Diagnóstico", "Entender", "Mapear cenário, gargalos e oportunidades."], ["Posicionamento", "Definir", "Dar direção para marca, oferta e narrativa."], ["Produção", "Construir", "Criar ativos, conteúdos, páginas e campanhas."], ["Distribuição", "Ativar", "Levar a mensagem aos canais certos."], ["Inteligência", "Medir", "Ler dados, funil e sinais de conversão."], ["Escala", "Evoluir", "Ampliar o que funciona com método."]];

const cases = [
  { name: "Meso", type: "Arquitetura / Branding", note: "Arquitetura residencial de alto padrão", image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1800&auto=format&fit=crop", link: "https://www.instagram.com/meso_arquitetura/" },
  { name: "EnForce", type: "Engenharia / Identidade", note: "Marca técnica com presença institucional", image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1800&auto=format&fit=crop", link: "https://www.instagram.com/en.forceengenharia/" },
  { name: "Grupo Saga", type: "Automotivo / Performance", note: "Conteúdo e campanhas para operação comercial", image: "https://images.unsplash.com/photo-1542362567-b07e54358753?q=80&w=1800&auto=format&fit=crop", link: "https://www.instagram.com/sagavolkswagengoiania/" }
];

const posts = [
  ["Estratégia", "5 min", "Marketing não começa no post. Começa na direção.", "Por que empresas que publicam muito ainda crescem pouco."],
  ["Performance", "4 min", "Tráfego sem posicionamento acelera o erro.", "Antes de escalar mídia, é preciso ajustar oferta e narrativa."],
  ["CRM", "6 min", "CRM não vende sozinho. Processo vende.", "Como transformar contatos em oportunidades reais."],
  ["IA", "5 min", "IA só gera valor quando conecta dados, conteúdo e operação.", "O uso estratégico da inteligência artificial no marketing."]
];

function Logo({ className = "" }) { return <img src={logo} alt="ALT Comunicação" className={className} />; }
function Reveal({ children, delay = 0, className = "" }) { return <motion.div className={className} initial={{ opacity: 0, y: 32, filter: "blur(8px)" }} whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }} viewport={{ once: true, amount: 0.22 }} transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}>{children}</motion.div>; }
function SectionTitle({ eyebrow, title, text }) { return <Reveal className="section-copy"><p className="eyebrow">{eyebrow}</p><h2>{title}</h2>{text ? <p className="section-lead">{text}</p> : null}</Reveal>; }

function SmartCursor() {
  const [pos, setPos] = useState({ x: -80, y: -80 });
  const [label, setLabel] = useState("");
  useEffect(() => {
    const move = (event) => {
      setPos({ x: event.clientX, y: event.clientY });
      const target = event.target.closest?.("[data-cursor]");
      setLabel(target?.dataset?.cursor || "");
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);
  return <motion.div className={`smart-cursor ${label ? "active" : ""}`} animate={{ x: pos.x - 22, y: pos.y - 22 }} transition={{ type: "spring", stiffness: 360, damping: 30 }}>{label}</motion.div>;
}

function Navbar() {
  const [open, setOpen] = useState(false);
  return <header className="navbar"><div className="container nav-inner"><a href="#home"><Logo className="nav-logo" /></a><nav className="nav-links">{nav.map(([label, href]) => <a key={label} href={href}>{label}</a>)}<a className="nav-cta" href="#diagnostico">Diagnóstico</a></nav><button className="mobile-toggle" onClick={() => setOpen(!open)} aria-label="Abrir menu">{open ? <X size={20} /> : <Menu size={20} />}</button></div>{open ? <div className="mobile-menu">{nav.map(([label, href]) => <a key={label} href={href} onClick={() => setOpen(false)}>{label}</a>)}<a href="#diagnostico" onClick={() => setOpen(false)}>Diagnóstico</a></div> : null}</header>;
}

function Hero() {
  return <section id="home" className="hero section-full"><video className="hero-video" autoPlay muted loop playsInline><source src={heroVideo} type="video/mp4" /></video><div className="hero-overlay" /><div className="container hero-grid"><Reveal><p className="eyebrow muted">Marketing · Branding · Performance</p><h1>Marketing sem achismo.<span>Resultado que converte.</span></h1><p className="hero-lead">Estratégia, criatividade e direção comercial para empresas que querem crescer com consistência.</p><div className="hero-actions"><a className="btn primary" href="#diagnostico" data-cursor="Contato">Solicitar diagnóstico <ArrowRight size={16} /></a><a className="btn ghost" href="#cases" data-cursor="Cases">Conhecer cases</a></div></Reveal><Reveal delay={0.15} className="hero-topics"><a>Branding</a><a>Performance</a><a>CRM</a><a>Dados</a><a>Growth</a></Reveal></div></section>;
}

function ManifestoLine({ text, progress, range, highlight = false }) {
  const opacity = useTransform(progress, range, [0, 1, 1, 0]);
  const y = useTransform(progress, range, [70, 0, 0, -70]);
  const scale = useTransform(progress, range, [0.96, 1, 1, 0.96]);
  const blur = useTransform(progress, range, [16, 0, 0, 16]);
  const filter = useTransform(blur, (value) => `blur(${value}px)`);
  return <motion.h2 className={highlight ? "is-highlight" : ""} style={{ opacity, y, scale, filter }}>{text}</motion.h2>;
}

function Manifesto() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const lines = [
    { text: "Marketing sem direção vira produção.", range: [0.02, 0.13, 0.21, 0.30] },
    { text: "Marketing com direção vira crescimento.", range: [0.26, 0.37, 0.45, 0.54] },
    { text: "Nós não vendemos posts.", range: [0.50, 0.61, 0.69, 0.77] },
    { text: "Construímos sistemas de aquisição.", range: [0.72, 0.83, 0.96, 1], highlight: true }
  ];
  return <section ref={ref} className="manifesto manifesto-apple"><div className="manifesto-stage"><div className="container manifesto-scene"><p className="eyebrow">Manifesto ALT</p>{lines.map((item) => <ManifestoLine key={item.text} progress={scrollYProgress} range={item.range} text={item.text} highlight={item.highlight} />)}</div></div></section>;
}

function Modal({ title, children, onClose }) { return <motion.div className="modal" initial={{ opacity: 0 }} animate={{ opacity: 1 }}><button className="modal-bg" onClick={onClose} aria-label="Fechar" /><motion.div className="modal-panel" initial={{ x: "100%" }} animate={{ x: 0 }} transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}><button className="modal-close" onClick={onClose} aria-label="Fechar"><X size={22} /></button><p className="eyebrow">Ecossistema ALT</p><h2>{title}</h2>{children}</motion.div></motion.div>; }
function System() { const [active, setActive] = useState(null); return <section id="sistema" className="section-block system-section"><div className="container"><SectionTitle eyebrow="01 — Sistema ALT" title="Um sistema modular para crescer com consistência." text="Cada módulo tem uma função. Juntos, eles conectam percepção, aquisição, relacionamento e venda." /><div className="module-grid">{modules.map((module, index) => <motion.button key={module.title} className="module-card" onClick={() => setActive(module)} data-cursor="Explorar" initial={{ opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.04 }}><span>{String(index + 1).padStart(2, "0")}</span><h3>{module.title}</h3><strong>{module.short}</strong><p>{module.text}</p><small>Explorar frente <ArrowRight size={13} /></small></motion.button>)}</div></div>{active ? <Modal title={active.title} onClose={() => setActive(null)}><p className="modal-lead">{active.detail}</p><div className="modal-columns"><div><h4>O que fazemos</h4>{active.items.map((item) => <span key={item}>{item}</span>)}</div><div><h4>Resultado esperado</h4>{active.benefits.map((item) => <span key={item}>{item}</span>)}</div></div><a className="btn primary" href="#diagnostico" onClick={() => setActive(null)}>Solicitar diagnóstico <ArrowRight size={16} /></a></Modal> : null}</section>; }
function Method() { return <section id="metodo" className="section-block method-section"><div className="container method-grid"><SectionTitle eyebrow="02 — Método" title="Do diagnóstico à escala." text="Uma jornada objetiva para entender, posicionar, executar, medir e evoluir." /><div className="timeline">{method.map(([title, verb, text], index) => <motion.div key={title} className="timeline-row" initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.05 }}><span>{String(index + 1).padStart(2, "0")}</span><div><h3>{title}</h3><p><b>{verb}</b> — {text}</p></div></motion.div>)}</div></div></section>; }
function Cases() { const [active, setActive] = useState(null); return <section id="cases" className="section-block cases-section"><div className="container"><SectionTitle eyebrow="03 — Cases" title="Projetos com marca, conteúdo e visão comercial." /><div className="case-stack">{cases.map((item, index) => <motion.button key={item.name} className="case-feature" onClick={() => setActive(item)} data-cursor="Ver" initial={{ opacity: 0, y: 34 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.06 }}><div className="case-image" style={{ backgroundImage: `url(${item.image})` }} /><div><p>{item.type}</p><h3>{item.name}</h3><small>{item.note}</small></div><span className="case-arrow"><ArrowRight size={20} /></span></motion.button>)}</div></div>{active ? <Modal title={active.name} onClose={() => setActive(null)}><p className="modal-lead">{active.note}</p><div className="modal-columns"><div><h4>Frentes</h4><span>Direção visual</span><span>Conteúdo</span><span>Posicionamento</span></div><div><h4>Objetivo</h4><span>Construir autoridade</span><span>Melhorar percepção</span><span>Apoiar aquisição</span></div></div><a className="btn primary" href={active.link} target="_blank" rel="noreferrer">Ver projeto <ExternalLink size={16} /></a></Modal> : null}</section>; }
function Cinematic() { return <section className="cinema section-block"><video autoPlay muted loop playsInline><source src={cinemaVideo} type="video/mp4" /></video><div className="container cinema-copy"><Reveal><p className="eyebrow">04 — Resultado</p><h2>Enquanto muitos medem curtidas,<br />nós medimos crescimento.</h2><div className="dash"><span>CRM</span><span>Marca</span><span>Performance</span><span>Receita</span></div></Reveal></div></section>; }
function Insights() { return <section id="insights" className="section-block insights-section"><div className="container"><SectionTitle eyebrow="05 — Leituras ALT" title="Pensamento estratégico para empresas em movimento." /><div className="blog-grid">{posts.map(([cat, time, title, desc], index) => <motion.article key={title} className="blog-card" data-cursor="Ler" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.05 }}><div><span>{cat}</span><em>{time} de leitura</em></div><h3>{title}</h3><p>{desc}</p><a href="#insights">Ler artigo <ArrowRight size={14} /></a></motion.article>)}</div></div></section>; }
function Partners() { return <section id="parceiros" className="section-block partners-section"><div className="container"><SectionTitle eyebrow="06 — Parceiros" title="Ecossistema tecnológico." text="As plataformas e parceiros que utilizamos para transformar estratégia em operação." /><div className="partner-grid"><a className="partner-card" href="https://www.kommo.com/br/" target="_blank" rel="noreferrer"><img src="/kommo-partner.svg" alt="Kommo Partner" /><p>CRM comercial, automação e pipeline.</p><span>Conhecer parceiro <ArrowRight size={14} /></span></a><a className="partner-card synapse" href="https://www.synapsestrateg.com" target="_blank" rel="noreferrer"><strong>Synapse</strong><p>IA aplicada, automações e treinamentos.</p><span>Conhecer parceiro <ArrowRight size={14} /></span></a></div></div></section>; }

function Contact() { const [sending, setSending] = useState(false); const [form, setForm] = useState({ nome: "", empresa: "", email: "", whatsapp: "", dor: "" }); const update = (field, value) => setForm((prev) => ({ ...prev, [field]: value })); const submit = async (event) => { event.preventDefault(); setSending(true); try { await fetch(formEndpoint, { method: "POST", mode: "no-cors", headers: { "Content-Type": "text/plain;charset=utf-8" }, body: JSON.stringify(form) }); alert("Diagnóstico recebido. Nossa equipe fará uma análise inicial e entrará em contato."); setForm({ nome: "", empresa: "", email: "", whatsapp: "", dor: "" }); } finally { setSending(false); } }; return <section id="diagnostico" className="section-block contact-section"><div className="container contact-grid"><div><SectionTitle eyebrow="07 — Diagnóstico" title="Vamos entender onde sua marca pode crescer." text="Poucas perguntas. Muito mais direção para o seu marketing." /><div className="trust"><span>Diagnóstico gratuito</span><span>Sem compromisso</span><span>Análise inicial</span></div></div><Reveal><form className="contact-form" onSubmit={submit}><input required placeholder="Nome" value={form.nome} onChange={(e) => update("nome", e.target.value)} /><input placeholder="Empresa" value={form.empresa} onChange={(e) => update("empresa", e.target.value)} /><input required type="email" placeholder="E-mail" value={form.email} onChange={(e) => update("email", e.target.value)} /><input required placeholder="WhatsApp" value={form.whatsapp} onChange={(e) => update("whatsapp", e.target.value)} /><textarea placeholder="Maior desafio hoje" value={form.dor} onChange={(e) => update("dor", e.target.value)} /><button className="btn primary" disabled={sending}>{sending ? "Enviando..." : "Solicitar diagnóstico"}<ArrowRight size={16} /></button></form></Reveal></div></section>; }
function Footer() { return <footer className="footer"><div className="container footer-grid"><div><Logo className="footer-logo" /><p>Marketing sem achismo. Resultado que converte.</p><div className="legal"><a href="/politica-de-privacidade">Privacidade</a><a href="/termos-de-uso">Termos</a><a href="/politica-de-cookies">Cookies</a><a href="/lgpd">LGPD</a></div></div><nav className="socials"><a href={social.instagram} aria-label="Instagram">IG</a><a href={social.linkedin} aria-label="LinkedIn">IN</a><a href={social.youtube} aria-label="YouTube">YT</a><a href={social.google} aria-label="Google">G</a></nav></div></footer>; }
export default function App() { const [loading, setLoading] = useState(true); const { scrollYProgress } = useScroll(); const width = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]); useEffect(() => { const timer = setTimeout(() => setLoading(false), 900); return () => clearTimeout(timer); }, []); return <div><motion.div className="scroll-progress" style={{ width }} /><SmartCursor />{loading ? <div className="loader"><Logo /></div> : null}<Navbar /><main><Hero /><Manifesto /><System /><Method /><Cases /><Cinematic /><Insights /><Partners /><Contact /></main><Footer /></div>; }

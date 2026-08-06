import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, BarChart3, Compass, Database, Handshake, Menu, PenSquare, ScanSearch, Shapes, Target, X } from "lucide-react";
import { sanityClient } from "./sanity/client";
import { latestPostsQuery } from "./sanity/queries";

const logo = "https://raw.githubusercontent.com/altcomunic/alt-site-institucional-v3/main/public/LOGO.svg";
const heroVideo = "https://videos.pexels.com/video-files/3255275/3255275-uhd_2560_1440_25fps.mp4";

const architecture = [
  { number: "01", title: "Diagnóstico", text: "Identificamos os gargalos que impedem a empresa de crescer.", result: "Prioridades definidas", icon: ScanSearch, objective: "Entender o cenário antes de propor qualquer ação.", deliveries: ["Leitura do negócio", "Mapeamento de gargalos", "Análise de marketing e comercial", "Priorização de oportunidades"], indicators: ["Clareza de cenário", "Velocidade de decisão", "Foco de execução"] },
  { number: "02", title: "Estratégia", text: "Transformamos objetivos em um plano claro de crescimento.", result: "Direção definida", icon: Compass, objective: "Definir onde concentrar esforço, investimento e energia.", deliveries: ["Direcionamento estratégico", "Definição de prioridades", "Plano de ação", "Metas e responsáveis"], indicators: ["Aderência ao plano", "Execução de prioridades", "Evolução dos objetivos"] },
  { number: "03", title: "Marca", text: "Construímos posicionamentos que geram percepção e confiança.", result: "Autoridade", icon: Shapes, objective: "Tornar a empresa mais clara, relevante e valorizada pelo mercado.", deliveries: ["Posicionamento", "Narrativa", "Identidade", "Direção de comunicação"], indicators: ["Percepção de valor", "Consistência", "Autoridade"] },
  { number: "04", title: "Conteúdo", text: "Produzimos comunicação alinhada aos objetivos do negócio.", result: "Relevância", icon: PenSquare, objective: "Transformar estratégia em comunicação capaz de educar, gerar desejo e apoiar vendas.", deliveries: ["Planejamento editorial", "Direção criativa", "Produção de conteúdo", "Campanhas"], indicators: ["Atenção qualificada", "Engajamento", "Demanda gerada"] },
  { number: "05", title: "Aquisição", text: "Atraímos empresas com potencial para se tornarem clientes.", result: "Oportunidades", icon: Target, objective: "Criar demanda qualificada por meio dos canais adequados.", deliveries: ["Mídia paga", "Campanhas", "Landing pages", "Otimização de conversão"], indicators: ["Leads qualificados", "Custo por oportunidade", "Taxa de conversão"] },
  { number: "06", title: "CRM", text: "Estruturamos processos para acompanhar cada oportunidade.", result: "Relacionamento", icon: Database, objective: "Organizar a jornada comercial para que oportunidades não se percam.", deliveries: ["Pipeline", "Automações", "Integrações", "Follow-up"], indicators: ["Tempo de resposta", "Conversão por etapa", "Receita no pipeline"] },
  { number: "07", title: "Comercial", text: "Conectamos marketing ao processo de vendas.", result: "Conversão", icon: Handshake, objective: "Transformar oportunidades em negociações conduzidas com método.", deliveries: ["Processo comercial", "Critérios de qualificação", "Roteiros", "Gestão do funil"], indicators: ["Taxa de qualificação", "Propostas enviadas", "Taxa de fechamento"] },
  { number: "08", title: "Dados", text: "Monitoramos indicadores para orientar decisões.", result: "Crescimento contínuo", icon: BarChart3, objective: "Usar dados para decidir o que manter, corrigir ou escalar.", deliveries: ["Dashboards", "KPIs", "Relatórios", "Rituais de análise"], indicators: ["Receita", "Eficiência", "Evolução do funil"] },
];

const cases = [
  { name: "Meso", sector: "Arquitetura", headline: "Marca construída para ocupar um território de alto valor.", metric: "Branding + presença digital", image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1800&auto=format&fit=crop" },
  { name: "EnForce", sector: "Engenharia", headline: "Clareza institucional para uma empresa técnica e comercial.", metric: "Identidade + posicionamento", image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1800&auto=format&fit=crop" },
  { name: "Grupo Saga", sector: "Automotivo", headline: "Marketing conectado à rotina real de vendas.", metric: "Conteúdo + performance", image: "https://images.unsplash.com/photo-1542362567-b07e54358753?q=80&w=1800&auto=format&fit=crop" },
];

const insights = [["Estratégia", "Marketing não começa no post. Começa na direção."], ["Performance", "Tráfego sem posicionamento acelera o erro."], ["CRM", "O lead não se perde no anúncio. Ele se perde no processo."]];

function Reveal({ children, delay = 0, className = "" }) {
  return <motion.div className={className} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.18 }} transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}>{children}</motion.div>;
}

function Navbar() {
  const [open, setOpen] = useState(false);
  const links = [["Arquitetura", "#arquitetura"], ["Cases", "#cases"], ["Operação", "#operacao"], ["Blog", "/blog"]];
  return <header className="navbar"><div className="container nav-inner"><a href="#home" className="brand"><img src={logo} alt="ALT Comunicação" /></a><nav className="nav-links">{links.map(([label, href]) => <a key={label} href={href}>{label}</a>)}<a href="#diagnostico" className="nav-cta">Diagnóstico</a></nav><button className="mobile-toggle" onClick={() => setOpen(!open)} aria-label="Abrir menu">{open ? <X size={20} /> : <Menu size={20} />}</button></div>{open && <div className="mobile-menu">{links.map(([label, href]) => <a key={label} href={href} onClick={() => setOpen(false)}>{label}</a>)}<a href="#diagnostico" onClick={() => setOpen(false)}>Diagnóstico</a></div>}</header>;
}

function Hero() {
  return <section id="home" className="hero"><video className="hero-video" autoPlay muted loop playsInline><source src={heroVideo} type="video/mp4" /></video><div className="hero-overlay" /><div className="container hero-content"><Reveal><p className="eyebrow muted">Estratégia · Marketing · Comercial</p><h1>Empresas crescem<br />por decisão.<span>Não por postagem.</span></h1><p className="hero-lead">Integramos estratégia, marketing e processo comercial para transformar crescimento em um sistema.</p><div className="hero-actions"><a className="btn primary" href="#diagnostico">Solicitar diagnóstico <ArrowRight size={16} /></a><a className="text-link" href="#operacao">Conhecer a operação <ArrowRight size={15} /></a></div></Reveal></div><div className="hero-index">ALT / 2026</div></section>;
}

function ArchitectureModal({ item, onClose }) {
  if (!item) return null;
  const Icon = item.icon;
  return <motion.div className="architecture-modal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><button className="architecture-modal-bg" onClick={onClose} aria-label="Fechar" /><motion.div className="architecture-modal-panel" initial={{ x: "100%" }} animate={{ x: 0 }} transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}><button className="architecture-modal-close" onClick={onClose} aria-label="Fechar"><X size={20} /></button><div className="architecture-modal-icon"><Icon size={30} strokeWidth={1.5} /></div><p className="eyebrow">Módulo {item.number}</p><h2>{item.title}</h2><p className="architecture-modal-lead">{item.objective}</p><div className="architecture-modal-columns"><div><h3>Entregas</h3>{item.deliveries.map((entry) => <span key={entry}>{entry}</span>)}</div><div><h3>Indicadores</h3>{item.indicators.map((entry) => <span key={entry}>{entry}</span>)}</div></div><a className="btn primary" href="#diagnostico" onClick={onClose}>Solicitar diagnóstico <ArrowRight size={16} /></a></motion.div></motion.div>;
}

function Architecture() {
  const [active, setActive] = useState(null);
  return <section id="arquitetura" className="section architecture"><div className="container"><Reveal className="architecture-head"><div className="architecture-title"><p className="eyebrow">Arquitetura ALT</p><h2>Crescimento não acontece em áreas isoladas.</h2></div><div className="architecture-copy"><strong>Estratégia, marketing e comercial precisam operar como um único sistema.</strong><p>A Arquitetura ALT integra todas as frentes responsáveis por transformar estratégia em oportunidades, relacionamento em conversão e marketing em crescimento.</p></div></Reveal><div className="architecture-grid">{architecture.map((item, index) => { const Icon = item.icon; return <Reveal key={item.title} delay={index * 0.035}><button className="architecture-card architecture-card-button" onClick={() => setActive(item)}><div className="architecture-card-top"><span>{item.number}</span><Icon size={28} strokeWidth={1.5} /></div><h3>{item.title}</h3><p>{item.text}</p><div className="architecture-card-result"><small>Resultado</small><strong>{item.result} <ArrowRight size={14} /></strong></div></button></Reveal>; })}</div></div><ArchitectureModal item={active} onClose={() => setActive(null)} /></section>;
}

const networkNodes = [
  { label: "Diagnóstico", x: 135, y: 255 }, { label: "Estratégia", x: 315, y: 120 }, { label: "Marca", x: 315, y: 390 },
  { label: "Aquisição", x: 515, y: 205 }, { label: "CRM", x: 515, y: 345 }, { label: "Comercial", x: 715, y: 205 },
  { label: "Dados", x: 715, y: 345 }, { label: "Receita", x: 885, y: 255 },
];
const networkLinks = [[0,1],[0,2],[1,3],[1,4],[2,3],[2,4],[3,4],[3,5],[3,6],[4,5],[4,6],[5,6],[5,7],[6,7]];

function GrowthNetwork() {
  const [pointer, setPointer] = useState({ x: 500, y: 260 });
  const [active, setActive] = useState(null);
  const move = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 1000;
    const y = ((event.clientY - rect.top) / rect.height) * 520;
    setPointer({ x, y });
    let nearest = null;
    let min = 145;
    networkNodes.forEach((node, index) => {
      const distance = Math.hypot(node.x - x, node.y - y);
      if (distance < min) { min = distance; nearest = index; }
    });
    setActive(nearest);
  };

  return <section className="growth-network" aria-label="Rede de crescimento ALT" onMouseMove={move} onMouseLeave={() => { setActive(null); setPointer({ x: 500, y: 260 }); }}><svg className="growth-network-bg" viewBox="0 0 1000 520" role="img" aria-label="Módulos da operação conectados" preserveAspectRatio="xMidYMid slice"><defs><radialGradient id="cursorGlow"><stop offset="0%" stopColor="#f26a2e" stopOpacity=".12"/><stop offset="100%" stopColor="#f26a2e" stopOpacity="0"/></radialGradient></defs><circle cx={pointer.x} cy={pointer.y} r="175" fill="url(#cursorGlow)" className="network-cursor-glow" />{networkLinks.map(([from, to]) => { const highlighted = active === from || active === to; return <line key={`${from}-${to}`} x1={networkNodes[from].x} y1={networkNodes[from].y} x2={networkNodes[to].x} y2={networkNodes[to].y} className={highlighted ? "network-line active" : "network-line"} />; })}{networkNodes.map((node, index) => <g key={node.label} className={active === index ? "network-node active" : "network-node"}><circle cx={node.x} cy={node.y} r={active === index ? 8 : 5} /><circle cx={node.x} cy={node.y} r="18" className="network-node-halo" /><text x={node.x} y={node.y + (node.y < 200 ? -27 : 34)} textAnchor="middle">{node.label}</text></g>)}</svg><div className="growth-network-overlay" /><Reveal className="growth-network-center"><h2><span>Quando uma área evolui,</span><span>toda a operação responde.</span></h2></Reveal></section>;
}

function Cases() {
  return <section id="cases" className="section cases"><div className="container"><Reveal className="section-head row"><div><p className="eyebrow">Cases</p><h2>Estratégia aplicada<br />a negócios reais.</h2></div><p>Menos portfólio. Mais contexto, direção e resultado.</p></Reveal><div className="case-grid">{cases.map((item, index) => <Reveal key={item.name} delay={index * 0.06}><article className="case-card"><div className="case-image" style={{ backgroundImage: `url(${item.image})` }} /><div className="case-overlay" /><div className="case-top"><span>{item.sector}</span><span>0{index + 1}</span></div><div className="case-copy"><p>{item.metric}</p><h3>{item.name}</h3><strong>{item.headline}</strong></div></article></Reveal>)}</div></div></section>;
}

function Operation() {
  const steps = ["Diagnóstico", "Direção estratégica", "Narrativa", "Direção criativa", "Aquisição", "Relacionamento", "Direção comercial", "Conversão", "Receita"];
  return <section id="operacao" className="section operation"><div className="container operation-grid"><Reveal className="operation-intro"><p className="eyebrow">Operação ALT</p><h2>Da estratégia<br />à receita.</h2><p>A ALT organiza o caminho inteiro. O objetivo não é produzir mais. É tomar decisões melhores e converter com consistência.</p><a className="text-link" href="#diagnostico">Solicitar diagnóstico <ArrowRight size={15} /></a></Reveal><div className="operation-flow">{steps.map((step, index) => <Reveal key={step} delay={index * 0.035}><div className="flow-row"><span>{String(index + 1).padStart(2, "0")}</span><strong>{step}</strong><i>{index < steps.length - 1 ? "↓" : "↗"}</i></div></Reveal>)}</div></div></section>;
}

function Insights() {
  const [posts, setPosts] = useState([]);
  useEffect(() => { sanityClient.fetch(latestPostsQuery).then(setPosts).catch(() => setPosts([])); }, []);
  const cards = posts.length ? posts.map((post) => ({ tag: post.category || "Leituras ALT", title: post.title, href: `/blog/${post.slug}` })) : insights.map(([tag, title]) => ({ tag, title, href: "/blog" }));
  return <section id="insights" className="section insights"><div className="container"><Reveal className="section-head"><p className="eyebrow">Leituras ALT</p><h2>Pensamento para empresas<br />em movimento.</h2></Reveal><div className="insight-grid">{cards.map((item, index) => <Reveal key={item.title} delay={index * 0.05}><article className="insight-card"><span>{item.tag}</span><h3>{item.title}</h3><a href={item.href}>Ler análise <ArrowRight size={14} /></a></article></Reveal>)}</div><a className="insights-all text-link" href="/blog">Ver todas as leituras <ArrowRight size={15} /></a></div></section>;
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
  return <footer className="footer-premium"><div className="container footer-main"><div className="footer-brand"><img src={logo} alt="ALT Comunicação" /></div><div className="footer-column"><strong>Navegação</strong><a href="#arquitetura">Arquitetura ALT</a><a href="#cases">Cases</a><a href="#operacao">Operação</a><a href="#insights">Insights</a><a href="#diagnostico">Diagnóstico</a></div><div className="footer-column"><strong>Contato</strong><a href="#diagnostico">Solicitar diagnóstico</a><a href="https://www.instagram.com/alt.comunic/" target="_blank" rel="noreferrer">Instagram</a><a href="https://www.linkedin.com/company/alt-comunic/" target="_blank" rel="noreferrer">LinkedIn</a><span>Goiânia · GO</span></div><div className="footer-column footer-ecosystem"><strong>Ecossistema ALT</strong><span>Kommo Partner</span><span>Synapse</span><span>Meta</span><span>Google</span><p>Uma operação integrada para empresas que decidiram crescer.</p></div></div><div className="container footer-bottom"><span>© 2026 ALT Comunicação</span><span>Diagnóstico. Estratégia. Execução. Crescimento.</span></div></footer>;
}

export default function App() {
  useEffect(() => { document.documentElement.style.scrollBehavior = "smooth"; }, []);
  return <><Navbar /><main><Hero /><Architecture /><GrowthNetwork /><Cases /><Operation /><Insights /><Contact /></main><Footer /></>;
}

import { useEffect, useState } from "react";
import { PortableText } from "@portabletext/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { sanityClient, imageUrl } from "./sanity/client";
import { allPostsQuery, postBySlugQuery } from "./sanity/queries";

function setMeta({ title, description, canonical, image, type = "website" }) {
  document.title = title;
  const values = { description, "og:title": title, "og:description": description, "og:url": canonical, "og:type": type, "twitter:title": title, "twitter:description": description };
  Object.entries(values).forEach(([name, content]) => {
    const property = name.startsWith("og:");
    let tag = document.head.querySelector(`meta[${property ? "property" : "name"}="${name}"]`);
    if (!tag) { tag = document.createElement("meta"); tag.setAttribute(property ? "property" : "name", name); document.head.appendChild(tag); }
    tag.setAttribute("content", content || "");
  });
  if (image) ["og:image", "twitter:image"].forEach((name) => { const property = name.startsWith("og:"); const tag = document.head.querySelector(`meta[${property ? "property" : "name"}="${name}"]`); if (tag) tag.setAttribute("content", image); });
  const link = document.head.querySelector('link[rel="canonical"]');
  if (link) link.setAttribute("href", canonical);
}

const formatDate = (value) => value ? new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "long", year: "numeric" }).format(new Date(value)) : "";

export function BlogCard({ post }) {
  return <article className="blog-card"><a className="blog-card-image" href={`/blog/${post.slug}`} style={{ backgroundImage: post.coverImage ? `url(${imageUrl(post.coverImage, 1000, 650)})` : undefined }} aria-label={`Ler ${post.title}`} /><div className="blog-card-copy"><div className="blog-meta"><span>{post.category || "Leituras ALT"}</span><span>{post.readingTime || 5} min</span></div><h2><a href={`/blog/${post.slug}`}>{post.title}</a></h2><p>{post.excerpt}</p><a className="blog-read" href={`/blog/${post.slug}`}>Ler análise <ArrowRight size={14} /></a></div></article>;
}

function BlogNav() { return <header className="blog-nav"><div className="container"><a href="/" className="blog-back"><ArrowLeft size={15} /> Voltar para a ALT</a><a href="/blog">Leituras ALT</a></div></header>; }

export function BlogIndex() {
  const [posts, setPosts] = useState([]); const [state, setState] = useState("loading");
  useEffect(() => { setMeta({ title: "Leituras ALT | Estratégia, Marketing e Vendas", description: "Análises da ALT sobre branding, marketing, conteúdo, vendas e crescimento empresarial.", canonical: "https://altcomunic.com.br/blog" }); sanityClient.fetch(allPostsQuery).then((data) => { setPosts(data); setState("ready"); }).catch(() => setState("error")); }, []);
  return <><BlogNav /><main className="blog-page"><section className="blog-hero"><div className="container"><p className="eyebrow">Leituras ALT</p><h1>Pensamento para empresas<br />em movimento.</h1><p>Estratégia, branding, marketing e comercial tratados como partes do mesmo sistema.</p></div></section><section className="blog-list"><div className="container">{state === "loading" && <p className="blog-status">Carregando artigos...</p>}{state === "error" && <p className="blog-status">Não foi possível carregar os artigos agora.</p>}{state === "ready" && posts.length === 0 && <div className="blog-empty"><span>Publicação em preparação</span><h2>As primeiras Leituras ALT chegam em breve.</h2><p>Os artigos publicados no painel aparecerão automaticamente aqui.</p></div>}<div className="blog-grid">{posts.map((post) => <BlogCard key={post._id} post={post} />)}</div></div></section></main></>;
}

const portableComponents = { types: { image: ({ value }) => <figure><img src={imageUrl(value, 1600)} alt={value.alt || ""} />{value.caption && <figcaption>{value.caption}</figcaption>}</figure> }, marks: { link: ({ children, value }) => <a href={value?.href} target={value?.href?.startsWith("http") ? "_blank" : undefined} rel="noreferrer">{children}</a> } };

export function BlogPost({ slug }) {
  const [post, setPost] = useState(null); const [state, setState] = useState("loading");
  useEffect(() => { sanityClient.fetch(postBySlugQuery, { slug }).then((data) => { if (!data) { setState("missing"); return; } setPost(data); setState("ready"); const cover = data.coverImage ? imageUrl(data.coverImage, 1200, 630) : "https://altcomunic.com.br/og-alt.svg"; setMeta({ title: `${data.seo?.metaTitle || data.title} | ALT Comunicação`, description: data.seo?.metaDescription || data.excerpt, canonical: `https://altcomunic.com.br/blog/${data.slug}`, image: cover, type: "article" }); }).catch(() => setState("error")); }, [slug]);
  if (state === "loading") return <><BlogNav /><main className="article-state">Carregando artigo...</main></>;
  if (state !== "ready") return <><BlogNav /><main className="article-state"><h1>{state === "missing" ? "Artigo não encontrado." : "Não foi possível carregar este artigo."}</h1><a href="/blog">Voltar para o blog</a></main></>;
  return <><BlogNav /><main className="article-page"><article><header className="article-header"><div className="container article-header-inner"><p className="eyebrow">{post.category || "Leituras ALT"}</p><h1>{post.title}</h1><p className="article-excerpt">{post.excerpt}</p><div className="article-byline"><span>{post.author?.name || "ALT Comunicação"}</span><span>{formatDate(post.publishedAt)}</span><span>{post.readingTime || 5} min de leitura</span></div></div></header>{post.coverImage && <div className="container article-cover"><img src={imageUrl(post.coverImage, 1800, 980)} alt={post.coverImage.alt || post.title} /></div>}<div className="container article-layout"><div className="article-body"><PortableText value={post.body || []} components={portableComponents} /></div><aside><span>ALT Comunicação</span><p>Estratégia, marketing e processo comercial operando como um único sistema.</p><a href="/#diagnostico">Solicitar diagnóstico <ArrowRight size={14} /></a></aside></div></article><section className="article-cta"><div className="container"><p className="eyebrow">Próximo passo</p><h2>Transforme direção em crescimento.</h2><a className="btn primary" href="/#diagnostico">Solicitar diagnóstico <ArrowRight size={16} /></a></div></section></main></>;
}

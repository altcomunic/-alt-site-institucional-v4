import { defineArrayMember, defineField, defineType } from "sanity";

const author = defineType({ name: "author", title: "Autores", type: "document", fields: [
  defineField({ name: "name", title: "Nome", type: "string", validation: (r) => r.required() }),
  defineField({ name: "role", title: "Cargo ou identificação", type: "string" }),
  defineField({ name: "photo", title: "Foto", type: "image", options: { hotspot: true } }),
  defineField({ name: "bio", title: "Biografia curta", type: "text", rows: 3 }),
], preview: { select: { title: "name", subtitle: "role", media: "photo" } } });

const category = defineType({ name: "category", title: "Categorias", type: "document", fields: [
  defineField({ name: "title", title: "Nome", type: "string", validation: (r) => r.required() }),
  defineField({ name: "slug", title: "Endereço", type: "slug", options: { source: "title", maxLength: 80 }, validation: (r) => r.required() }),
] });

const post = defineType({ name: "post", title: "Artigos", type: "document", fields: [
  defineField({ name: "title", title: "Título", type: "string", validation: (r) => r.required().max(90) }),
  defineField({ name: "slug", title: "Endereço do artigo", type: "slug", options: { source: "title", maxLength: 96 }, validation: (r) => r.required() }),
  defineField({ name: "excerpt", title: "Resumo", description: "Texto curto usado nos cards e no Google.", type: "text", rows: 3, validation: (r) => r.required().max(180) }),
  defineField({ name: "coverImage", title: "Imagem de capa", type: "image", options: { hotspot: true }, fields: [defineField({ name: "alt", title: "Descrição da imagem", type: "string", validation: (r) => r.required() })], validation: (r) => r.required() }),
  defineField({ name: "author", title: "Autor", type: "reference", to: [{ type: "author" }], validation: (r) => r.required() }),
  defineField({ name: "category", title: "Categoria", type: "reference", to: [{ type: "category" }], validation: (r) => r.required() }),
  defineField({ name: "publishedAt", title: "Data de publicação", type: "datetime", initialValue: () => new Date().toISOString(), validation: (r) => r.required() }),
  defineField({ name: "readingTime", title: "Tempo de leitura (minutos)", type: "number", initialValue: 5, validation: (r) => r.required().integer().min(1).max(60) }),
  defineField({ name: "featured", title: "Destacar na página inicial", type: "boolean", initialValue: false }),
  defineField({ name: "body", title: "Conteúdo", type: "array", of: [
    defineArrayMember({ type: "block", styles: [{ title: "Normal", value: "normal" }, { title: "Título 2", value: "h2" }, { title: "Título 3", value: "h3" }, { title: "Citação", value: "blockquote" }], marks: { annotations: [defineArrayMember({ name: "link", title: "Link", type: "object", fields: [defineField({ name: "href", title: "URL", type: "url", validation: (r) => r.uri({ allowRelative: true, scheme: ["http", "https", "mailto", "tel"] }) })] })] } }),
    defineArrayMember({ type: "image", title: "Imagem", options: { hotspot: true }, fields: [defineField({ name: "alt", title: "Descrição da imagem", type: "string", validation: (r) => r.required() }), defineField({ name: "caption", title: "Legenda", type: "string" })] }),
  ], validation: (r) => r.required() }),
  defineField({ name: "seo", title: "SEO", type: "object", options: { collapsible: true, collapsed: true }, fields: [
    defineField({ name: "metaTitle", title: "Título para o Google", type: "string", validation: (r) => r.max(60) }),
    defineField({ name: "metaDescription", title: "Descrição para o Google", type: "text", rows: 2, validation: (r) => r.max(160) }),
  ] }),
], orderings: [{ title: "Mais recentes", name: "publishedAtDesc", by: [{ field: "publishedAt", direction: "desc" }] }], preview: { select: { title: "title", subtitle: "category.title", media: "coverImage" } } });

export const schemaTypes = [post, author, category];

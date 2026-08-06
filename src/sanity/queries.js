export const postFields = `_id,title,"slug":slug.current,excerpt,publishedAt,readingTime,featured,coverImage,"category":category->title,"author":author->{name,role,photo},seo`;
export const allPostsQuery = `*[_type == "post" && defined(slug.current)] | order(publishedAt desc) {${postFields}}`;
export const latestPostsQuery = `*[_type == "post" && defined(slug.current)] | order(featured desc, publishedAt desc)[0...3] {${postFields}}`;
export const postBySlugQuery = `*[_type == "post" && slug.current == $slug][0] {${postFields},body}`;

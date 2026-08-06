import { Studio, defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./sanity/schemaTypes";

const config = defineConfig({ name: "blog-alt", title: "Blog ALT", projectId: "5ljn4m88", dataset: "production", basePath: "/studio", plugins: [structureTool()], schema: { types: schemaTypes } });
export default function StudioPage() { return <div className="studio-shell"><Studio config={config} /></div>; }

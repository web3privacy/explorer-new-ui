import { Label } from "@/components/ui/label";
import MultipleSelector, { Option } from "@/components/ui/multiselect";

const ecosystems: Option[] = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
  {
    value: "angular",
    label: "Angular",
  },
  {
    value: "vue",
    label: "Vue.js",
  },
  {
    value: "react",
    label: "React",
  },
  {
    value: "ember",
    label: "Ember.js",
  },
  {
    value: "gatsby",
    label: "Gatsby",
  },
  {
    value: "eleventy",
    label: "Eleventy",
  },
  {
    value: "solid",
    label: "SolidJS",
  },
  {
    value: "preact",
    label: "Preact",
  },
  {
    value: "qwik",
    label: "Qwik",
  },
  {
    value: "alpine",
    label: "Alpine.js",
  },
  {
    value: "lit",
    label: "Lit",
  },
];

export default function EcosystemFilter() {
  return (
    <div className="*:not-first:mt-2">
      <Label>Ecosystems:</Label>
      <MultipleSelector
        commandProps={{
          label: "Select ecosystems",
        }}
        defaultOptions={ecosystems}
        placeholder="Select ecosystems"
        emptyIndicator={<p className="text-center text-sm">No results found</p>}
      />
    </div>
  );
}

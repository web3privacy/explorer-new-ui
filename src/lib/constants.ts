export const API_URLS = {
  EXPLORER_DATA: "https://explorer-data.web3privacy.info",
} as const;

export const API_RESPONSE_KEYS = {
  PROJECTS: "projects",
  ECOSYSTEMS: "ecosystems",
  CATEGORIES: "categories",
  USECASES: "usecases",
  RANKS: "ranks",
} as const;

export const NAVIGATION_LINKS = {
  ABOUT_EXTERNAL: "https://hackmd.io/@m-f-/HJZ3aZSekl",
  ABOUT_INTERNAL: "/about",
  SCORING_EXTERNAL:
    "https://mirror.xyz/0x0f1F3DAf416B74DB3DE55Eb4D7513a80F4841073/s9flkE6tMaJ4f2tzWu-FmDy7Zx_TRPe3jdXr2iYmYH0",
  SCORING_INTERNAL: "/scoring",
  CONTRIBUTE: "https://github.com/web3privacy/explorer-data",
  ADD_PROJECT: "https://old-explorer-app.vercel.app/project/create",
} as const;

export const HEADER_MENU_ITEMS = [
  { text: "About", href: NAVIGATION_LINKS.ABOUT_EXTERNAL },
  { text: "Scoring", href: NAVIGATION_LINKS.SCORING_EXTERNAL },
  { text: "Contribute", href: NAVIGATION_LINKS.CONTRIBUTE },
] as const;

export const MAIN_NAV_MENU_ITEMS = [
  { text: "About", href: NAVIGATION_LINKS.ABOUT_EXTERNAL },
  { text: "Scoring", href: NAVIGATION_LINKS.SCORING_INTERNAL },
  { text: "Contribute", href: NAVIGATION_LINKS.CONTRIBUTE },
  {
    text: "+ Add Project",
    href: NAVIGATION_LINKS.ADD_PROJECT,
    isButton: true,
  },
] as const;

export type MenuItem = {
  text: string;
  href: string;
  isButton?: boolean;
};

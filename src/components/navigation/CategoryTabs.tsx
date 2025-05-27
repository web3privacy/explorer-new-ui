// import { cn } from "@/lib/utils";
// import Link from "next/link";

// const categories = [
//   { name: "All", href: "/" },
//   { name: "Infrastructure", href: "/?category=infrastructure" },
//   {
//     name: "Social & Communications",
//     href: "/?category=social", // Changed from social-and-communications to match data
//   },
//   { name: "Hardware", href: "/?category=hardware" },
//   { name: "Applications", href: "/?category=applications" },
//   { name: "DeFi", href: "/?category=defi" },
// ];

// interface CategoryTabsProps {
//   activeCategory?: string;
//   className?: string;
// }

// export function CategoryTabs({
//   activeCategory = "All",
//   className,
// }: CategoryTabsProps) {
//   return (
//     <nav className={cn("border-b border-border", className)}>
//       <div className="flex space-x-8">
//         {categories.map((category) => (
//           <Link
//             key={category.name}
//             href={category.href}
//             className={cn(
//               "border-b-2 py-4 px-1 text-sm font-medium transition-colors hover:text-foreground/80",
//               activeCategory === category.name
//                 ? "border-primary text-foreground"
//                 : "border-transparent text-foreground/60"
//             )}
//           >
//             {category.name}
//           </Link>
//         ))}
//       </div>
//     </nav>
//   );
// }

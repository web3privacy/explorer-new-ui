"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

const highlightedProjects = [
  {
    id: "railgun",
    name: "Railgun",
    category: "Applications",
    description:
      "A privacy-focused smart contract platform that enables private transactions on Ethereum and other blockchains.",
    logo: "/logo-railgun.png",
    bgColor: "bg-gray-700",
  },
  {
    id: "aztec",
    name: "Aztec",
    category: "Infrastructure",
    description:
      "A privacy-first L2 on Ethereum that has a hybrid privacy model.",
    logo: "/logo-aztec.png",
    bgColor: "bg-purple-600",
  },
  {
    id: "cake-wallet",
    name: "Cake Wallet",
    category: "Applications",
    description:
      "A secure and private wallet for Monero and other cryptocurrencies, focusing on user privacy.",
    logo: "/logo-cake.png",
    bgColor: "bg-orange-500",
  },
];

export function Highlights() {
  return (
    <section className="py-16">
      <div className="space-y-8">
        {/* Bordered Title */}
        <div className="flex justify-center">
          <div className="border-2 border-white bg-black px-8 py-4 w-full">
            <h2 className="text-3xl md:text-4xl tracking-tight text-white text-center ">
              Highlights
            </h2>
          </div>
        </div>

        {/* Highlights Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {highlightedProjects.map((project) => (
            <Link 
              key={project.id}
              href={`/project/${project.id}`}
              className="no-underline"
            >
              <Card className="group hover:shadow-lg transition-all duration-200 h-full">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <Avatar className={`h-12 w-12 ${project.bgColor}`}>
                      <AvatarImage src={project.logo} alt={project.name} />
                      <AvatarFallback className="text-white font-semibold">
                        {project.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-xl">{project.name}</CardTitle>
                      </div>
                      <Badge variant="secondary" className="w-fit">
                        {project.category}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    {project.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

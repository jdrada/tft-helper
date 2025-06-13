"use client";

import { useState } from "react";
import { champions, type ChampionType } from "@/data/champions";
import { comps } from "@/data/comps";
import Image from "next/image";
import { Search, Star, Trash2, Sparkles, Target, Crown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export interface ChampionBoard extends ChampionType {
  level: 1 | 2 | 3;
}

// Helper function to get champion image path
function getChampionImagePath(championName: string): string {
  const nameMapping: Record<string, string> = {
    "Cho'Gath": "Chogath",
    "Dr.Mundo": "DrMundo",
    "Jarvan IV": "JarvanIV",
    "Kog'Maw": "Kogmaw",
    LeBlanc: "Leblanc",
    "Miss Fortune": "MissFortune",
    "Twisted Fate": "TwistedFate",
  };

  const fileName = nameMapping[championName] || championName;
  return `/champs/${fileName}.webp`;
}

// Helper function to get cost-based styling
function getCostStyling(cost: number) {
  const styles = {
    1: {
      border: "border-slate-400",
      bg: "bg-slate-50",
      hover: "hover:border-slate-500 hover:shadow-slate-200",
      text: "text-slate-700",
    },
    2: {
      border: "border-emerald-400",
      bg: "bg-emerald-50",
      hover: "hover:border-emerald-500 hover:shadow-emerald-200",
      text: "text-emerald-700",
    },
    3: {
      border: "border-blue-400",
      bg: "bg-blue-50",
      hover: "hover:border-blue-500 hover:shadow-blue-200",
      text: "text-blue-700",
    },
    4: {
      border: "border-purple-400",
      bg: "bg-purple-50",
      hover: "hover:border-purple-500 hover:shadow-purple-200",
      text: "text-purple-700",
    },
    5: {
      border: "border-amber-400",
      bg: "bg-amber-50",
      hover: "hover:border-amber-500 hover:shadow-amber-200",
      text: "text-amber-700",
    },
  };
  return styles[cost as keyof typeof styles] || styles[1];
}

// Reusable component for champion cost section
function ChampionCostSection({
  cost,
  champions,
  onChampionClick,
}: {
  cost: number;
  champions: ChampionType[];
  onChampionClick: (champion: ChampionType) => void;
}) {
  const styling = getCostStyling(cost);

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-semibold flex items-center gap-2">
          <div
            className={`w-3 h-3 rounded-full ${styling.bg} ${styling.border} border-2`}
          />
          {cost} Cost Champions
          <Badge variant="secondary" className="ml-auto">
            {champions.length}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12 gap-2">
          {champions.map((champion) => (
            <button
              key={champion.name}
              type="button"
              className={`group relative aspect-square rounded-lg border-2 ${styling.border} ${styling.bg} ${styling.hover} hover:shadow-lg transition-all duration-200 hover:scale-105 active:scale-95`}
              onClick={() => onChampionClick(champion)}
              title={champion.name}
            >
              <div className="absolute inset-1 rounded-md overflow-hidden">
                <Image
                  src={
                    getChampionImagePath(champion.name) || "/placeholder.svg"
                  }
                  alt={champion.name}
                  width={64}
                  height={64}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent rounded-b-lg">
                <span className="text-[10px] text-white font-medium px-1 py-0.5 block text-center leading-tight">
                  {champion.name}
                </span>
              </div>
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

// Interface for comp with match count and scores
interface CompWithMatchCount {
  name: string;
  style: string;
  champions: { name: string; level: 1 | 2 | 3; priority: string }[];
  matchCount: number;
  earlyScore: number;
  mainScore: number;
}

// Function to find relevant comps
function findRelevantComps(
  ownedChampions: ChampionBoard[]
): CompWithMatchCount[] {
  const ownedChampionNames = new Set(
    ownedChampions.map((champion) => champion.name)
  );

  const compsWithMatches = comps.map((comp) => {
    const compChampionNames = new Set(
      comp.champions.map((champion) => champion.name)
    );

    let matchCount = 0;
    for (const championName of compChampionNames) {
      if (ownedChampionNames.has(championName)) {
        matchCount++;
      }
    }

    const calculatePhaseScore = (priority: "early" | "main"): number => {
      const phaseChampions = comp.champions.filter(
        (c) => c.priority === priority
      );
      if (phaseChampions.length === 0) return 100;

      let totalWeightedScore = 0;
      let maxWeightedScore = 0;

      const championGroups = new Map<
        string,
        { level: number; count: number }
      >();

      for (const champion of phaseChampions) {
        const existing = championGroups.get(champion.name);
        if (existing) {
          existing.count += 1;
          existing.level = Math.max(existing.level, champion.level);
        } else {
          championGroups.set(champion.name, {
            level: champion.level,
            count: 1,
          });
        }
      }

      for (const [championName, group] of championGroups) {
        const championData = champions.find((c) => c.name === championName);
        const championCost = championData ? championData.cost : 1;

        maxWeightedScore += championCost;

        const ownedChampion = ownedChampions.find(
          (owned) => owned.name === championName
        );

        if (ownedChampion) {
          if (ownedChampion.level >= group.level) {
            totalWeightedScore += championCost;
          } else {
            totalWeightedScore +=
              (ownedChampion.level / group.level) * championCost;
          }
        }
      }

      return Math.round((totalWeightedScore / maxWeightedScore) * 100);
    };

    const earlyScore = calculatePhaseScore("early");
    const mainScore = calculatePhaseScore("main");

    return { ...comp, matchCount, earlyScore, mainScore };
  });

  const relevantComps = compsWithMatches.filter((comp) => comp.matchCount > 0);

  relevantComps.sort((a, b) => {
    if (b.mainScore !== a.mainScore) return b.mainScore - a.mainScore;
    if (b.earlyScore !== a.earlyScore) return b.earlyScore - a.earlyScore;
    return b.matchCount - a.matchCount;
  });

  return relevantComps;
}

export default function Home() {
  const [ownedChampions, setOwnedChampions] = useState<ChampionBoard[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const filteredChampions = champions.filter((champion) =>
    champion.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const championsByCost = {
    1: filteredChampions.filter((champion) => champion.cost === 1),
    2: filteredChampions.filter((champion) => champion.cost === 2),
    3: filteredChampions.filter((champion) => champion.cost === 3),
    4: filteredChampions.filter((champion) => champion.cost === 4),
    5: filteredChampions.filter((champion) => champion.cost === 5),
  };

  const addChampion = (champion: ChampionType) => {
    setOwnedChampions((prev) => {
      const existingIndex = prev.findIndex((c) => c.name === champion.name);

      if (existingIndex === -1) {
        return [...prev, { ...champion, level: 1 as const }];
      }

      const existing = prev[existingIndex];
      const newOwned = [...prev];

      if (existing.level === 1) {
        newOwned[existingIndex] = { ...existing, level: 2 as const };
      } else if (existing.level === 2) {
        newOwned[existingIndex] = { ...existing, level: 3 as const };
      } else {
        newOwned.splice(existingIndex, 1);
      }

      return newOwned;
    });
  };

  const removeChampion = (champion: ChampionBoard) => {
    setOwnedChampions((prev) => prev.filter((c) => c.name !== champion.name));
  };

  const relevantComps = findRelevantComps(ownedChampions);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto p-4 lg:p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-slate-800 mb-2 flex items-center gap-3">
            <Sparkles className="w-8 h-8 text-purple-600" />
            TFT Helper
          </h1>
          <p className="text-slate-600">Build your perfect team composition</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Left Side - Champions */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Search className="w-5 h-5" />
                  Champion Pool
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative mb-4">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <Input
                    type="text"
                    placeholder="Search champions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </CardContent>
            </Card>

            <div className="space-y-4">
              {Object.entries(championsByCost).map(([cost, champions]) => (
                <ChampionCostSection
                  key={cost}
                  cost={Number.parseInt(cost)}
                  champions={champions}
                  onChampionClick={addChampion}
                />
              ))}
            </div>
          </div>

          {/* Right Side - Board and Comps */}
          <div className="space-y-6">
            {/* Your Board */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Crown className="w-5 h-5 text-amber-600" />
                    Your Board
                  </div>
                  <Badge variant="outline">{ownedChampions.length}/10</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="min-h-[120px] bg-slate-50 rounded-lg p-4 border-2 border-dashed border-slate-200">
                  {ownedChampions.length > 0 ? (
                    <div className="grid grid-cols-5 gap-3">
                      {ownedChampions.map((champion, index) => {
                        const styling = getCostStyling(champion.cost);
                        return (
                          <div
                            key={`${champion.name}-${champion.level}-${index}`}
                            className="group relative"
                          >
                            <button
                              type="button"
                              className={`relative aspect-square w-full rounded-lg border-2 ${styling.border} ${styling.bg} hover:border-red-400 transition-all duration-200 hover:scale-105`}
                              onClick={() => removeChampion(champion)}
                              title={`${champion.name} ★${champion.level} - Click to remove`}
                            >
                              <div className="absolute inset-1 rounded-md overflow-hidden">
                                <Image
                                  src={
                                    getChampionImagePath(champion.name) ||
                                    "/placeholder.svg"
                                  }
                                  alt={champion.name}
                                  width={64}
                                  height={64}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="absolute top-1 right-1">
                                <div className="flex">
                                  {Array.from({ length: champion.level }).map(
                                    (_, i) => (
                                      <Star
                                        key={i}
                                        className="w-3 h-3 fill-amber-400 text-amber-400"
                                      />
                                    )
                                  )}
                                </div>
                              </div>
                              <div className="absolute inset-0 bg-red-500/0 group-hover:bg-red-500/20 rounded-lg transition-colors duration-200 flex items-center justify-center">
                                <Trash2 className="w-4 h-4 text-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                              </div>
                            </button>
                            <span className="text-xs text-center block mt-1 font-medium text-slate-700">
                              {champion.name}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-slate-500">
                      <Crown className="w-12 h-12 mx-auto mb-3 text-slate-300" />
                      <p className="font-medium">Your board is empty</p>
                      <p className="text-sm">Click champions to add them</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Recommended Comps */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-green-600" />
                  Recommended Compositions
                </CardTitle>
              </CardHeader>
              <CardContent className="max-h-[600px] overflow-y-auto">
                {relevantComps.length > 0 ? (
                  <div className="space-y-4">
                    {relevantComps.map((comp, index) => (
                      <Card
                        key={`${comp.name}-${index}`}
                        className="border-l-4 border-l-green-500"
                      >
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <h3 className="font-semibold text-lg text-slate-800">
                                {comp.name}
                              </h3>
                              <p className="text-sm text-slate-600">
                                {comp.style}
                              </p>
                            </div>
                            <div className="flex gap-2">
                              <Badge
                                variant="secondary"
                                className="bg-blue-100 text-blue-800"
                              >
                                Early: {comp.earlyScore}%
                              </Badge>
                              <Badge
                                variant="secondary"
                                className="bg-purple-100 text-purple-800"
                              >
                                Main: {comp.mainScore}%
                              </Badge>
                              <Badge variant="outline">
                                {comp.matchCount} match
                                {comp.matchCount !== 1 ? "es" : ""}
                              </Badge>
                            </div>
                          </div>

                          {/* Early Game Champions */}
                          {comp.champions.filter((c) => c.priority === "early")
                            .length > 0 && (
                            <div className="mb-3">
                              <h4 className="text-xs font-semibold text-slate-500 mb-2 uppercase tracking-wide">
                                Early Game
                              </h4>
                              <div className="flex flex-wrap gap-2">
                                {comp.champions
                                  .filter((c) => c.priority === "early")
                                  .map((champion, champIndex) => {
                                    const ownedChampion = ownedChampions.find(
                                      (owned) => owned.name === champion.name
                                    );
                                    const isOwned = ownedChampion !== undefined;

                                    return (
                                      <div
                                        key={`${champion.name}-early-${champIndex}`}
                                        className={`flex items-center gap-2 px-2 py-1 rounded-md border ${
                                          isOwned
                                            ? "bg-green-50 border-green-200 text-green-800"
                                            : "bg-slate-50 border-slate-200 text-slate-600"
                                        }`}
                                      >
                                        <div className="relative">
                                          <Image
                                            src={
                                              getChampionImagePath(
                                                champion.name
                                              ) || "/placeholder.svg"
                                            }
                                            alt={champion.name}
                                            width={24}
                                            height={24}
                                            className="w-6 h-6 object-cover rounded"
                                          />
                                          {champion.level > 1 && (
                                            <div className="absolute -top-1 -right-1">
                                              <div className="flex">
                                                {Array.from({
                                                  length: champion.level,
                                                }).map((_, i) => (
                                                  <Star
                                                    key={i}
                                                    className="w-2 h-2 fill-amber-400 text-amber-400"
                                                  />
                                                ))}
                                              </div>
                                            </div>
                                          )}
                                        </div>
                                        <span className="text-sm font-medium">
                                          {champion.name}
                                        </span>
                                      </div>
                                    );
                                  })}
                              </div>
                            </div>
                          )}

                          {/* Main Comp Champions */}
                          {comp.champions.filter((c) => c.priority === "main")
                            .length > 0 && (
                            <div>
                              <h4 className="text-xs font-semibold text-slate-500 mb-2 uppercase tracking-wide">
                                Main Composition
                              </h4>
                              <div className="flex flex-wrap gap-2">
                                {comp.champions
                                  .filter((c) => c.priority === "main")
                                  .map((champion, champIndex) => {
                                    const ownedChampion = ownedChampions.find(
                                      (owned) => owned.name === champion.name
                                    );
                                    const isOwned = ownedChampion !== undefined;

                                    return (
                                      <div
                                        key={`${champion.name}-main-${champIndex}`}
                                        className={`flex items-center gap-2 px-2 py-1 rounded-md border ${
                                          isOwned
                                            ? "bg-green-50 border-green-200 text-green-800"
                                            : "bg-slate-50 border-slate-200 text-slate-600"
                                        }`}
                                      >
                                        <div className="relative">
                                          <Image
                                            src={
                                              getChampionImagePath(
                                                champion.name
                                              ) || "/placeholder.svg"
                                            }
                                            alt={champion.name}
                                            width={24}
                                            height={24}
                                            className="w-6 h-6 object-cover rounded"
                                          />
                                          {champion.level > 1 && (
                                            <div className="absolute -top-1 -right-1">
                                              <div className="flex">
                                                {Array.from({
                                                  length: champion.level,
                                                }).map((_, i) => (
                                                  <Star
                                                    key={i}
                                                    className="w-2 h-2 fill-amber-400 text-amber-400"
                                                  />
                                                ))}
                                              </div>
                                            </div>
                                          )}
                                        </div>
                                        <span className="text-sm font-medium">
                                          {champion.name}
                                        </span>
                                      </div>
                                    );
                                  })}
                              </div>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 text-slate-500">
                    <Target className="w-16 h-16 mx-auto mb-4 text-slate-300" />
                    <p className="font-medium text-lg">No compositions found</p>
                    <p className="text-sm">
                      Add champions to your board to see recommendations
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

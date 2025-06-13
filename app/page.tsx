"use client";

import { useState } from "react";
import { champions, ChampionType } from "@/data/champions";
import { comps } from "@/data/comps";
import Image from "next/image";

export interface ChampionBoard extends ChampionType {
  level: 1 | 2 | 3;
}

// Helper function to get champion image path
function getChampionImagePath(championName: string): string {
  // Handle special cases for file naming
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

// Helper function to get hover border color based on cost
function getHoverBorderColor(cost: number): string {
  const colorMap: Record<number, string> = {
    1: "hover:border-gray-500",
    2: "hover:border-green-500",
    3: "hover:border-blue-500",
    4: "hover:border-purple-500",
    5: "hover:border-yellow-500", // gold
  };
  return colorMap[cost] || "hover:border-gray-500";
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
  const hoverBorderClass = getHoverBorderColor(cost);

  // Cost tier colors for purple gaming theme
  const getCostBadgeColor = (cost: number): string => {
    const colorMap: Record<number, string> = {
      1: "bg-purple-800/80 text-purple-200 border-purple-600/50",
      2: "bg-indigo-800/80 text-indigo-200 border-indigo-600/50",
      3: "bg-violet-800/80 text-violet-200 border-violet-600/50",
      4: "bg-fuchsia-800/80 text-fuchsia-200 border-fuchsia-600/50",
      5: "bg-pink-800/80 text-pink-200 border-pink-600/50",
    };
    return (
      colorMap[cost] || "bg-purple-800/80 text-purple-200 border-purple-600/50"
    );
  };

  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-4">
        <span
          className={`px-4 py-2 rounded-full text-sm font-bold border backdrop-blur-sm ${getCostBadgeColor(
            cost
          )}`}
        >
          {cost} Cost
        </span>
        <div className="flex-1 h-px bg-gradient-to-r from-purple-500/50 to-transparent"></div>
      </div>
      <div className="grid grid-cols-6 gap-3">
        {champions.map((champion) => (
          <button
            key={champion.name}
            type="button"
            className={`group relative cursor-pointer p-3 rounded-xl border-2 border-purple-600/30 ${hoverBorderClass} hover:shadow-xl hover:shadow-purple-500/25 transition-all duration-300 bg-purple-900/30 hover:bg-purple-800/40 backdrop-blur-sm`}
            onClick={() => onChampionClick(champion)}
            title={champion.name}
          >
            <div className="aspect-square w-full mb-2 rounded-lg overflow-hidden ring-1 ring-purple-400/20">
              <Image
                src={getChampionImagePath(champion.name)}
                alt={champion.name}
                width={80}
                height={80}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="text-xs font-medium text-purple-100 text-center leading-tight group-hover:text-white">
              {champion.name}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

// Add this interface for the comp with match count and separate early/main scores
interface CompWithMatchCount {
  name: string;
  style: string;
  tier: string;
  tip: string;
  url: string;
  champions: { name: string; level: 1 | 2 | 3; priority: string }[];
  matchCount: number;
  earlyScore: number; // 0-100 percentage for early game champions
  mainScore: number; // 0-100 percentage for main comp champions
}

// Add this function to find relevant comps
function findRelevantComps(
  ownedChampions: ChampionBoard[]
): CompWithMatchCount[] {
  const ownedChampionNames = new Set(
    ownedChampions.map((champion) => champion.name)
  );

  const compsWithMatches = comps.map((comp) => {
    // Get unique champion names from the comp (since a comp might have duplicate champions)
    const compChampionNames = new Set(
      comp.champions.map((champion) => champion.name)
    );

    // Count how many owned champions match this comp
    let matchCount = 0;
    for (const championName of compChampionNames) {
      if (ownedChampionNames.has(championName)) {
        matchCount++;
      }
    }

    // Calculate separate scores for early and main champions
    const calculatePhaseScore = (priority: "early" | "main"): number => {
      const phaseChampions = comp.champions.filter(
        (c) => c.priority === priority
      );
      if (phaseChampions.length === 0) return 100; // 100% if no champions needed

      let totalWeightedScore = 0;
      let maxWeightedScore = 0;

      // Group champions by name within this phase
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
        // Find the champion's cost from the champions data
        const championData = champions.find((c) => c.name === championName);
        const championCost = championData ? championData.cost : 1;

        maxWeightedScore += championCost;

        const ownedChampion = ownedChampions.find(
          (owned) => owned.name === championName
        );

        if (ownedChampion) {
          if (ownedChampion.level >= group.level) {
            // Perfect match or higher level - full cost
            totalWeightedScore += championCost;
          } else {
            // Lower level - partial points based on level ratio
            totalWeightedScore +=
              (ownedChampion.level / group.level) * championCost;
          }
        }
        // If not owned, add 0 points
      }

      return Math.round((totalWeightedScore / maxWeightedScore) * 100);
    };

    const earlyScore = calculatePhaseScore("early");
    const mainScore = calculatePhaseScore("main");

    return {
      ...comp,
      matchCount,
      earlyScore,
      mainScore,
    };
  });

  // Filter to only include comps with at least 1 match
  const relevantComps = compsWithMatches.filter((comp) => comp.matchCount > 0);

  // Sort by main score first, then early score, then match count
  relevantComps.sort((a, b) => {
    if (b.mainScore !== a.mainScore) {
      return b.mainScore - a.mainScore;
    }
    if (b.earlyScore !== a.earlyScore) {
      return b.earlyScore - a.earlyScore;
    }
    return b.matchCount - a.matchCount;
  });

  return relevantComps;
}

export default function Home() {
  const [ownedChampions, setOwnedChampions] = useState<ChampionBoard[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [expandedTips, setExpandedTips] = useState<Set<string>>(new Set());

  // Filter champions based on search term
  const filteredChampions = champions.filter((champion) =>
    champion.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const oneCostChampions = filteredChampions.filter(
    (champion) => champion.cost === 1
  );
  const twoCostChampions = filteredChampions.filter(
    (champion) => champion.cost === 2
  );
  const threeCostChampions = filteredChampions.filter(
    (champion) => champion.cost === 3
  );
  const fourCostChampions = filteredChampions.filter(
    (champion) => champion.cost === 4
  );
  const fiveCostChampions = filteredChampions.filter(
    (champion) => champion.cost === 5
  );

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
    setOwnedChampions((prev) => {
      return prev.filter((c) => c.name !== champion.name);
    });
  };

  // Get relevant comps based on owned champions
  const relevantComps = findRelevantComps(ownedChampions);

  return (
    <main className="flex h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900">
      {/* Left Side - Champions Grid */}
      <section className="w-1/2 border-r border-purple-600/30 bg-black/20 backdrop-blur-sm flex flex-col">
        {/* Sticky Header */}
        <div className="sticky top-0 z-10 bg-black/40 backdrop-blur-md border-b border-purple-600/30 p-6 pb-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300">
              Champions
            </h1>
            <div className="text-xs text-purple-400 font-medium">
              Made by: Juan C. Drada
            </div>
          </div>

          {/* Search Bar */}
          <div>
            <input
              type="text"
              placeholder="Search champions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 bg-purple-900/50 border border-purple-500/50 rounded-xl text-white placeholder-purple-300 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 backdrop-blur-sm"
            />
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 pt-2">
          <div>
            <ChampionCostSection
              cost={1}
              champions={oneCostChampions}
              onChampionClick={addChampion}
            />
            <ChampionCostSection
              cost={2}
              champions={twoCostChampions}
              onChampionClick={addChampion}
            />
            <ChampionCostSection
              cost={3}
              champions={threeCostChampions}
              onChampionClick={addChampion}
            />
            <ChampionCostSection
              cost={4}
              champions={fourCostChampions}
              onChampionClick={addChampion}
            />
            <ChampionCostSection
              cost={5}
              champions={fiveCostChampions}
              onChampionClick={addChampion}
            />
          </div>
        </div>
      </section>

      {/* Right Side - Board and Comps */}
      <section className="w-1/2 flex flex-col">
        {/* Board Section */}
        <div className="p-6 border-b border-purple-600/30 bg-gradient-to-r from-purple-900/40 to-indigo-900/40 backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-4">
            <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300">
              Your Board
            </h2>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-sm font-medium bg-purple-800/60 text-purple-200 border border-purple-500/50 backdrop-blur-sm">
                {ownedChampions.length} Champions
              </span>
              {ownedChampions.length > 0 && (
                <button
                  onClick={() => setOwnedChampions([])}
                  className="px-3 py-1 rounded-full text-sm font-medium bg-red-800/60 text-red-200 border border-red-500/50 hover:bg-red-700/60 transition-colors backdrop-blur-sm"
                >
                  Clear All
                </button>
              )}
            </div>
          </div>

          <div className="min-h-[140px] bg-purple-900/30 rounded-xl border-2 border-dashed border-purple-500/50 p-4 shadow-lg backdrop-blur-sm">
            {ownedChampions.length > 0 ? (
              <div className="grid grid-cols-8 gap-3">
                {ownedChampions.map((champion, index) => (
                  <div
                    key={`${champion.name}-${champion.level}-${index}`}
                    className="group relative"
                  >
                    <button
                      type="button"
                      className="w-full cursor-pointer bg-purple-800/40 rounded-xl border-2 border-purple-500/50 p-2 hover:border-red-400 hover:shadow-xl hover:shadow-purple-500/25 transition-all duration-300 backdrop-blur-sm"
                      onClick={() => removeChampion(champion)}
                      title={`${champion.name} ★${champion.level} - Click to remove`}
                    >
                      <div className="relative aspect-square mb-2">
                        <div className="w-full h-full bg-purple-700/30 rounded-lg overflow-hidden ring-1 ring-purple-400/30">
                          <Image
                            src={getChampionImagePath(champion.name)}
                            alt={champion.name}
                            width={120}
                            height={120}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        {/* Star level indicator - positioned outside the overflow container */}
                        <div className="absolute -top-1 -right-1 bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shadow-lg">
                          {champion.level}
                        </div>
                      </div>
                      <div className="text-xs font-medium text-purple-100 text-center leading-tight group-hover:text-red-300">
                        {champion.name}
                      </div>
                    </button>
                  </div>
                ))}

                {/* Empty slots to show board capacity */}
                {Array.from({
                  length: Math.max(0, 8 - ownedChampions.length),
                }).map((_, index) => (
                  <div
                    key={`empty-${index}`}
                    className="aspect-square border-2 border-dashed border-purple-500/40 rounded-xl flex items-center justify-center text-purple-300 bg-purple-900/20 backdrop-blur-sm"
                  >
                    <span className="text-2xl">+</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-purple-300">
                <div className="text-4xl mb-2">⚔️</div>
                <div className="text-lg font-medium mb-1 text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300">
                  Your board is empty
                </div>
                <div className="text-sm text-purple-400">
                  Click champions on the left to add them
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Comps Section - Scrollable */}
        <div className="flex-1 p-6 overflow-y-auto bg-purple-900/20 backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300">
              Recommended Comps
            </h2>
            <div className="flex-1 h-px bg-gradient-to-r from-purple-500/50 to-transparent"></div>
            <span className="px-3 py-1 rounded-full text-sm font-medium bg-purple-800/60 text-purple-200 border border-purple-500/50 backdrop-blur-sm">
              {relevantComps.length} Found
            </span>
          </div>

          {relevantComps.length > 0 ? (
            <div className="space-y-4">
              {relevantComps.map((comp, index) => (
                <div
                  key={`${comp.name}-${index}`}
                  className="bg-purple-900/40 rounded-xl border border-purple-500/50 p-6 shadow-lg hover:shadow-xl hover:shadow-purple-500/25 transition-all duration-200 backdrop-blur-sm"
                >
                  {/* Header Section */}
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-bold text-white">
                          {comp.name}
                        </h3>
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-bold ${
                            comp.tier === "S"
                              ? "bg-red-100 text-red-700 border border-red-200"
                              : comp.tier === "A"
                              ? "bg-orange-100 text-orange-700 border border-orange-200"
                              : comp.tier === "B"
                              ? "bg-yellow-100 text-yellow-700 border border-yellow-200"
                              : comp.tier === "C"
                              ? "bg-green-100 text-green-700 border border-green-200"
                              : "bg-gray-100 text-gray-700 border border-gray-200"
                          }`}
                        >
                          {comp.tier} Tier
                        </span>
                      </div>

                      <div className="flex items-center gap-4 text-sm text-purple-200 mb-3">
                        <span className="flex items-center gap-1">
                          <span className="w-2 h-2 bg-cyan-400 rounded-full"></span>
                          Style: {comp.style}
                        </span>
                        <span className="flex items-center gap-1">
                          <span className="w-2 h-2 bg-pink-400 rounded-full"></span>
                          {comp.matchCount} match
                          {comp.matchCount !== 1 ? "es" : ""}
                        </span>
                      </div>

                      {/* Tip Section */}
                      <div className="text-sm text-purple-100 leading-relaxed">
                        <span>{comp.tip.split(".")[0]}.</span>
                        {comp.tip.split(".").length > 1 && (
                          <>
                            {expandedTips.has(comp.name) ? (
                              <>
                                <span>
                                  {comp.tip.substring(
                                    comp.tip.indexOf(".") + 1
                                  )}
                                </span>
                                <button
                                  onClick={() =>
                                    setExpandedTips((prev) => {
                                      const newSet = new Set(prev);
                                      newSet.delete(comp.name);
                                      return newSet;
                                    })
                                  }
                                  className="ml-2 text-cyan-400 hover:text-cyan-300 text-sm font-medium"
                                >
                                  Show less
                                </button>
                              </>
                            ) : (
                              <button
                                onClick={() =>
                                  setExpandedTips((prev) =>
                                    new Set(prev).add(comp.name)
                                  )
                                }
                                className="ml-2 text-cyan-400 hover:text-cyan-300 text-sm font-medium"
                              >
                                ...read more
                              </button>
                            )}
                          </>
                        )}
                      </div>
                    </div>

                    {/* Scores and Actions */}
                    <div className="flex flex-col gap-2 ml-6">
                      <div className="flex gap-2">
                        <div className="text-center">
                          <div className="text-xs font-medium text-purple-300 mb-1">
                            Early
                          </div>
                          <div
                            className={`px-3 py-1 rounded-lg text-sm font-bold ${
                              comp.earlyScore >= 80
                                ? "bg-green-100 text-green-700"
                                : comp.earlyScore >= 50
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            {comp.earlyScore}%
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-xs font-medium text-purple-300 mb-1">
                            Main
                          </div>
                          <div
                            className={`px-3 py-1 rounded-lg text-sm font-bold ${
                              comp.mainScore >= 80
                                ? "bg-green-100 text-green-700"
                                : comp.mainScore >= 50
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            {comp.mainScore}%
                          </div>
                        </div>
                      </div>
                      <a
                        href={comp.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 rounded-lg text-sm font-medium bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 transition-all text-center shadow-lg hover:shadow-purple-500/25"
                      >
                        View Guide
                      </a>
                    </div>
                  </div>

                  {/* Champions Section */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Early Champions */}
                    {comp.champions.filter((c) => c.priority === "early")
                      .length > 0 && (
                      <div className="bg-cyan-900/40 rounded-lg p-4 border border-cyan-500/30 backdrop-blur-sm">
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-3 h-3 bg-cyan-400 rounded-full"></div>
                          <h4 className="text-sm font-bold text-cyan-200">
                            Early Game
                          </h4>
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                          {comp.champions
                            .filter((c) => c.priority === "early")
                            .map((champion, champIndex) => {
                              const ownedChampion = ownedChampions.find(
                                (owned) => owned.name === champion.name
                              );
                              const isOwned = ownedChampion !== undefined;

                              let borderClass = "border-2 border-transparent";
                              if (isOwned) {
                                // Show border based on actual owned level (gray=1★, purple=2★, gold=3★)
                                if (ownedChampion.level === 1) {
                                  borderClass = "border-2 border-gray-400";
                                } else if (ownedChampion.level === 2) {
                                  borderClass = "border-2 border-purple-500";
                                } else if (ownedChampion.level === 3) {
                                  borderClass = "border-2 border-yellow-500"; // gold
                                }
                              }

                              return (
                                <div
                                  key={`${champion.name}-early-${champIndex}`}
                                  className={`bg-purple-800/40 rounded-lg p-2 ${borderClass} hover:shadow-lg hover:shadow-purple-500/25 transition-all backdrop-blur-sm`}
                                  title={`${champion.name} ★${champion.level}${
                                    isOwned ? " (owned)" : ""
                                  }`}
                                >
                                  <div className="relative aspect-square mb-1">
                                    <div className="w-full h-full bg-purple-700/30 rounded overflow-hidden ring-1 ring-purple-400/30">
                                      <Image
                                        src={getChampionImagePath(
                                          champion.name
                                        )}
                                        alt={champion.name}
                                        width={40}
                                        height={40}
                                        className="w-full h-full object-cover"
                                      />
                                    </div>
                                    {champion.level === 3 && (
                                      <div className="absolute -top-1 -right-1 bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
                                        3
                                      </div>
                                    )}
                                  </div>
                                  <div className="text-xs font-medium text-center text-purple-100 leading-tight">
                                    {champion.name}
                                  </div>
                                </div>
                              );
                            })}
                        </div>
                      </div>
                    )}

                    {/* Main Champions */}
                    {comp.champions.filter((c) => c.priority === "main")
                      .length > 0 && (
                      <div className="bg-pink-900/40 rounded-lg p-4 border border-pink-500/30 backdrop-blur-sm">
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-3 h-3 bg-pink-400 rounded-full"></div>
                          <h4 className="text-sm font-bold text-pink-200">
                            Main Comp
                          </h4>
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                          {comp.champions
                            .filter((c) => c.priority === "main")
                            .map((champion, champIndex) => {
                              const ownedChampion = ownedChampions.find(
                                (owned) => owned.name === champion.name
                              );
                              const isOwned = ownedChampion !== undefined;

                              let borderClass = "border-2 border-transparent";
                              if (isOwned) {
                                // Show border based on actual owned level (gray=1★, purple=2★, gold=3★)
                                if (ownedChampion.level === 1) {
                                  borderClass = "border-2 border-gray-400";
                                } else if (ownedChampion.level === 2) {
                                  borderClass = "border-2 border-purple-500";
                                } else if (ownedChampion.level === 3) {
                                  borderClass = "border-2 border-yellow-500"; // gold
                                }
                              }

                              return (
                                <div
                                  key={`${champion.name}-main-${champIndex}`}
                                  className={`bg-purple-800/40 rounded-lg p-2 ${borderClass} hover:shadow-lg hover:shadow-purple-500/25 transition-all backdrop-blur-sm`}
                                  title={`${champion.name} ★${champion.level}${
                                    isOwned ? " (owned)" : ""
                                  }`}
                                >
                                  <div className="relative aspect-square mb-1">
                                    <div className="w-full h-full bg-purple-700/30 rounded overflow-hidden ring-1 ring-purple-400/30">
                                      <Image
                                        src={getChampionImagePath(
                                          champion.name
                                        )}
                                        alt={champion.name}
                                        width={40}
                                        height={40}
                                        className="w-full h-full object-cover"
                                      />
                                    </div>
                                    {champion.level === 3 && (
                                      <div className="absolute -top-1 -right-1 bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
                                        3
                                      </div>
                                    )}
                                  </div>
                                  <div className="text-xs font-medium text-center text-purple-100 leading-tight">
                                    {champion.name}
                                  </div>
                                </div>
                              );
                            })}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-gray-500 text-center py-8">
              Add champions to your board to see recommended comps
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

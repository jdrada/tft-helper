export type TraitNames =
  | "golden_ox"
  | "anima_squad"
  | "bruiser"
  | "boombot"
  | "cyberboss"
  | "cypher"
  | "divinicorp"
  | "exotech"
  | "nitro"
  | "god_of_the_net"
  | "overlord"
  | "soul_killer"
  | "street_demon"
  | "syndicate"
  | "virus"
  | "a.m.p."
  | "bastion"
  | "dynamo"
  | "executioner"
  | "marksman"
  | "rapid_fire"
  | "slayer"
  | "strategist"
  | "techie"
  | "vanguard";

export type ChampionName =
  | "Alistar"
  | "Annie"
  | "Aphelios"
  | "Aurora"
  | "Brand"
  | "Braum"
  | "Cho'Gath"
  | "Darius"
  | "Draven"
  | "Dr.Mundo"
  | "Ekko"
  | "Elise"
  | "Fiddlesticks"
  | "Galio"
  | "Garen"
  | "Gragas"
  | "Graves"
  | "Illaoi"
  | "Jarvan IV"
  | "Jax"
  | "Jhin"
  | "Jinx"
  | "Kindred"
  | "Kobuko"
  | "Kog'Maw"
  | "LeBlanc"
  | "Leona"
  | "Miss Fortune"
  | "Mordekaiser"
  | "Morgana"
  | "Naafiri"
  | "Neeko"
  | "Nidalee"
  | "Poppy"
  | "Renekton"
  | "Rengar"
  | "Rhaast"
  | "Samira"
  | "Sejuani"
  | "Senna"
  | "Seraphine"
  | "Shaco"
  | "Shyvana"
  | "Skarner"
  | "Sylas"
  | "Twisted Fate"
  | "Urgot"
  | "Varus"
  | "Vayne"
  | "Veigar"
  | "Vex"
  | "Vi"
  | "Viego"
  | "Xayah"
  | "Yuumi"
  | "Zac"
  | "Zed"
  | "Zeri"
  | "Ziggs"
  | "Zyra";

export type ChampionsStats = {
  cost: number;
  traits: TraitNames[];
};

export interface ChampionType {
  name: ChampionName;
  cost: 1 | 2 | 3 | 4 | 5;
  traits: TraitNames[];
}

export const champions: ChampionType[] = [
  { name: "Alistar", cost: 1, traits: ["golden_ox", "bruiser"] },
  { name: "Annie", cost: 4, traits: ["golden_ox", "a.m.p."] },
  { name: "Aphelios", cost: 4, traits: ["golden_ox", "marksman"] },
  { name: "Aurora", cost: 4, traits: ["anima_squad", "dynamo"] },
  { name: "Brand", cost: 3, traits: ["street_demon", "techie"] },
  { name: "Braum", cost: 3, traits: ["syndicate", "vanguard"] },
  { name: "Cho'Gath", cost: 4, traits: ["boombot", "bruiser"] },
  { name: "Darius", cost: 2, traits: ["syndicate", "bruiser"] },
  { name: "Draven", cost: 3, traits: ["cypher", "rapid_fire"] },
  { name: "Dr.Mundo", cost: 1, traits: ["street_demon", "bruiser"] },
  { name: "Ekko", cost: 2, traits: ["street_demon", "strategist"] },
  { name: "Elise", cost: 3, traits: ["nitro", "dynamo"] },
  { name: "Fiddlesticks", cost: 3, traits: ["boombot", "techie"] },
  { name: "Galio", cost: 3, traits: ["cypher", "bastion"] },
  { name: "Garen", cost: 5, traits: ["god_of_the_net"] },
  { name: "Gragas", cost: 3, traits: ["divinicorp", "bruiser"] },
  { name: "Graves", cost: 2, traits: ["golden_ox", "executioner"] },
  { name: "Illaoi", cost: 2, traits: ["anima_squad", "bastion"] },
  { name: "Jarvan IV", cost: 3, traits: ["golden_ox", "vanguard"] },
  { name: "Jax", cost: 1, traits: ["exotech", "bastion"] },
  { name: "Jhin", cost: 2, traits: ["exotech", "marksman"] },
  { name: "Jinx", cost: 3, traits: ["street_demon", "marksman"] },
  { name: "Kindred", cost: 1, traits: ["nitro", "rapid_fire"] },
  { name: "Kobuko", cost: 5, traits: ["cyberboss", "bruiser"] },
  { name: "Kog'Maw", cost: 1, traits: ["boombot", "rapid_fire"] },
  { name: "LeBlanc", cost: 2, traits: ["cypher", "strategist"] },
  { name: "Leona", cost: 4, traits: ["anima_squad", "vanguard"] },
  { name: "Miss Fortune", cost: 4, traits: ["syndicate", "dynamo"] },
  { name: "Mordekaiser", cost: 3, traits: ["exotech", "bruiser"] },
  { name: "Morgana", cost: 1, traits: ["divinicorp", "dynamo"] },
  { name: "Naafiri", cost: 2, traits: ["exotech", "a.m.p."] },
  { name: "Neeko", cost: 4, traits: ["street_demon", "strategist"] },
  { name: "Nidalee", cost: 1, traits: ["nitro", "a.m.p."] },
  { name: "Poppy", cost: 1, traits: ["cyberboss", "bastion"] },
  { name: "Renekton", cost: 5, traits: ["overlord", "divinicorp"] },
  { name: "Rengar", cost: 3, traits: ["street_demon", "executioner"] },
  { name: "Rhaast", cost: 2, traits: ["divinicorp", "vanguard"] },
  { name: "Samira", cost: 5, traits: ["street_demon", "a.m.p."] },
  { name: "Sejuani", cost: 4, traits: ["exotech", "bastion"] },
  { name: "Senna", cost: 3, traits: ["divinicorp", "slayer"] },
  { name: "Seraphine", cost: 1, traits: ["anima_squad", "techie"] },
  { name: "Shaco", cost: 1, traits: ["syndicate", "slayer"] },
  { name: "Shyvana", cost: 2, traits: ["nitro", "bastion"] },
  { name: "Skarner", cost: 2, traits: ["boombot", "vanguard"] },
  { name: "Sylas", cost: 1, traits: ["anima_squad", "vanguard"] },
  { name: "Twisted Fate", cost: 2, traits: ["syndicate", "rapid_fire"] },
  { name: "Urgot", cost: 5, traits: ["boombot", "executioner"] },
  { name: "Varus", cost: 3, traits: ["exotech", "executioner"] },
  { name: "Vayne", cost: 2, traits: ["anima_squad", "slayer"] },
  { name: "Veigar", cost: 2, traits: ["cyberboss", "techie"] },
  { name: "Vex", cost: 4, traits: ["divinicorp", "executioner"] },
  { name: "Vi", cost: 1, traits: ["cypher", "vanguard"] },
  { name: "Viego", cost: 5, traits: ["soul_killer", "golden_ox"] },
  { name: "Xayah", cost: 4, traits: ["anima_squad", "marksman"] },
  { name: "Yuumi", cost: 3, traits: ["anima_squad", "a.m.p."] },
  { name: "Zac", cost: 5, traits: ["virus"] },
  { name: "Zed", cost: 4, traits: ["cypher", "slayer"] },
  { name: "Zeri", cost: 4, traits: ["exotech", "rapid_fire"] },
  { name: "Ziggs", cost: 4, traits: ["cyberboss", "strategist"] },
  { name: "Zyra", cost: 1, traits: ["street_demon", "techie"] },
];

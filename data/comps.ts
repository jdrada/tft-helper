import { champions, ChampionType } from "./champions";

type Priority = "early" | "main";

interface CompChampion extends ChampionType {
  level: 1 | 2 | 3;
  priority: Priority;
}

type CompType = {
  name: string;
  style: string;
  champions: CompChampion[];
  tier: "S" | "A" | "B" | "C" | "D" | "E";
  tip: string;
  url: string;
};

export const comps: CompType[] = [
  {
    name: "Strategist AMP",
    style: "fast 9",
    tier: "S",
    url: "https://tftacademy.com/tierlist/comps/set-14-strategist-amp",
    tip: "Always play 5 AMP when possible. Play when you have econ and can get lots of tears. Positioning will change every game pending on the Street Demon hexes. Leftover AD on Samira, leftover Mana / Utility / AP on Annie.",
    champions: [
      {
        ...champions.find((c) => c.name === "Nidalee")!,
        level: 2,
        priority: "early",
      },
      {
        ...champions.find((c) => c.name === "Shyvana")!,
        level: 2,
        priority: "early",
      },
      {
        ...champions.find((c) => c.name === "Nidalee")!,
        level: 2,
        priority: "main",
      },
      {
        ...champions.find((c) => c.name === "Yuumi")!,
        level: 3,
        priority: "main",
      },
      {
        ...champions.find((c) => c.name === "Neeko")!,
        level: 2,
        priority: "main",
      },
      {
        ...champions.find((c) => c.name === "Ekko")!,
        level: 2,
        priority: "main",
      },
      {
        ...champions.find((c) => c.name === "Naafiri")!,
        level: 2,
        priority: "main",
      },
      {
        ...champions.find((c) => c.name === "Annie")!,
        level: 2,
        priority: "main",
      },
      {
        ...champions.find((c) => c.name === "Viego")!,
        level: 2,
        priority: "main",
      },
      {
        ...champions.find((c) => c.name === "Samira")!,
        level: 2,
        priority: "main",
      },
      {
        ...champions.find((c) => c.name === "Zac")!,
        level: 2,
        priority: "main",
      },
    ],
  },
  {
    name: "Exotech Zeri",
    style: "fast 8",
    tier: "S",
    url: "https://tftacademy.com/tierlist/comps/set-14-exotech-zeri",
    tip: "Best on high item encounters + item augment start. You can check Team Planner to check Exotech items before you commit to an augment. 5 costs cap the board the best: Aurora > Garen/Zac/Kobuko/Viego. Varus items to aurora 2 and Exo mod on Garen to remove emblem and give 3rd item is key to high cap.",

    champions: [
      {
        ...champions.find((c) => c.name === "Jax")!,
        level: 2,
        priority: "early",
      },
      {
        ...champions.find((c) => c.name === "Naafiri")!,
        level: 2,
        priority: "early",
      },
      {
        ...champions.find((c) => c.name === "Kindred")!,
        level: 2,
        priority: "early",
      },
      {
        ...champions.find((c) => c.name === "Jhin")!,
        level: 2,
        priority: "early",
      },
      {
        ...champions.find((c) => c.name === "Jhin")!,
        level: 2,
        priority: "main",
      },
      {
        ...champions.find((c) => c.name === "Mordekaiser")!,
        level: 2,
        priority: "main",
      },
      {
        ...champions.find((c) => c.name === "Varus")!,
        level: 2,
        priority: "main",
      },
      {
        ...champions.find((c) => c.name === "Sejuani")!,
        level: 2,
        priority: "main",
      },
      {
        ...champions.find((c) => c.name === "Zeri")!,
        level: 2,
        priority: "main",
      },
      {
        ...champions.find((c) => c.name === "Aurora")!,
        level: 2,
        priority: "main",
      },
      {
        ...champions.find((c) => c.name === "Garen")!,
        level: 2,
        priority: "main",
      },
    ],
  },
  {
    name: "Dynamo Flex",
    style: "fast 8",
    tier: "S",
    url: "https://tftacademy.com/tierlist/comps/set-14-mf-dynamo-flex",
    tip: "Frontline is flexible. Play around Braum and Syndicate until you hit 5 costs. Can also play 4 Vanguards (Leona), Bruisers (Cho'Gath), or Exotech (Sejuani + Jhin). Drop Syndicate late game for the 5 costs. Aurora holds utility items / leftover AP",

    // Early Comp
    // Morgana
    // Jhin
    // Dr. Mundo
    // Gragas

    champions: [
      {
        ...champions.find((c) => c.name === "Morgana")!,
        level: 2,
        priority: "early",
      },
      {
        ...champions.find((c) => c.name === "Jhin")!,
        level: 2,
        priority: "early",
      },
      {
        ...champions.find((c) => c.name === "Dr.Mundo")!,
        level: 2,
        priority: "early",
      },
      {
        ...champions.find((c) => c.name === "Gragas")!,
        level: 2,
        priority: "early",
      },

      // Main Comp
      // Morgana
      // Poppy
      // Gragas
      // Elise - only level 3
      // Miss Fortune
      // Kobuko
      // Renekton
      // Aurora
      // Zac
      {
        ...champions.find((c) => c.name === "Morgana")!,
        level: 2,
        priority: "main",
      },
      {
        ...champions.find((c) => c.name === "Poppy")!,
        level: 2,
        priority: "main",
      },
      {
        ...champions.find((c) => c.name === "Gragas")!,
        level: 2,
        priority: "main",
      },
      {
        ...champions.find((c) => c.name === "Elise")!,
        level: 3,
        priority: "main",
      },
      {
        ...champions.find((c) => c.name === "Miss Fortune")!,
        level: 2,
        priority: "main",
      },
      {
        ...champions.find((c) => c.name === "Kobuko")!,
        level: 2,
        priority: "main",
      },
      {
        ...champions.find((c) => c.name === "Renekton")!,
        level: 2,
        priority: "main",
      },
      {
        ...champions.find((c) => c.name === "Aurora")!,
        level: 2,
        priority: "main",
      },
      {
        ...champions.find((c) => c.name === "Zac")!,
        level: 2,
        priority: "main",
      },
    ],
  },
  {
    name: "Kog-Guards",
    style: "reroll 5",
    tier: "S",
    url: "https://tftacademy.com/tierlist/comps/set-14-mf-bruiser-flex",
    tip: "Play with strong combat scaling augments so Kogmaw and Vanguards can compete in the late game. MR Shred is useful for Boom Bot magic damage. Garen with Vanguard mod caps the board.",

    champions: [
      // Early Comp
      // Kog'Maw
      // Skarner
      // Vi
      // Kindred
      {
        ...champions.find((c) => c.name === "Kog'Maw")!,
        level: 2,
        priority: "early",
      },
      {
        ...champions.find((c) => c.name === "Skarner")!,
        level: 2,
        priority: "early",
      },
      {
        ...champions.find((c) => c.name === "Vi")!,
        level: 2,
        priority: "early",
      },
      {
        ...champions.find((c) => c.name === "Kindred")!,
        level: 2,
        priority: "early",
      },

      // Kindred - all level 3 besides jarvan and leona
      // Sylas
      // Vi
      // Kog'Maw
      // Rhaast
      // Skarner
      // Jarvan IV - lvl 2
      // Leona - lvl 2

      {
        ...champions.find((c) => c.name === "Kindred")!,
        level: 3,
        priority: "main",
      },
      {
        ...champions.find((c) => c.name === "Sylas")!,
        level: 3,
        priority: "main",
      },
      {
        ...champions.find((c) => c.name === "Vi")!,
        level: 3,
        priority: "main",
      },
      {
        ...champions.find((c) => c.name === "Kog'Maw")!,
        level: 3,
        priority: "main",
      },
      {
        ...champions.find((c) => c.name === "Rhaast")!,
        level: 3,
        priority: "main",
      },
      {
        ...champions.find((c) => c.name === "Skarner")!,
        level: 3,
        priority: "main",
      },
      {
        ...champions.find((c) => c.name === "Jarvan IV")!,
        level: 2,
        priority: "main",
      },
      {
        ...champions.find((c) => c.name === "Leona")!,
        level: 2,
        priority: "main",
      },
    ],
  },
  {
    name: "6 Vanguard Marksman",
    style: "4-Cost Fast 8",
    tier: "S",
    url: "https://tftacademy.com/tierlist/comps/set-14-6-vanguard-marksman", // You can update this with the correct link
    tip: "Best with Vanguard emblem on Garen with strong mods. Mods: Golden Ox Xayah > Anima Squad Aphelios > Vanguard Backline. If no good Garen mod, consider playing another 5 cost instead.",
    champions: [
      {
        ...champions.find((c) => c.name === "Sylas")!,
        level: 2,
        priority: "main",
      },
      {
        ...champions.find((c) => c.name === "Rhaast")!,
        level: 2,
        priority: "main",
      },
      {
        ...champions.find((c) => c.name === "Braum")!,
        level: 2,
        priority: "main",
      },
      {
        ...champions.find((c) => c.name === "Jarvan IV")!,
        level: 2,
        priority: "main",
      },
      {
        ...champions.find((c) => c.name === "Aphelios")!,
        level: 2,
        priority: "main",
      },
      {
        ...champions.find((c) => c.name === "Leona")!,
        level: 2,
        priority: "main",
      },
      {
        ...champions.find((c) => c.name === "Xayah")!,
        level: 2,
        priority: "main",
      },
      {
        ...champions.find((c) => c.name === "Garen")!,
        level: 2,
        priority: "main",
      },
      // Early game options
      {
        ...champions.find((c) => c.name === "Sylas")!,
        level: 2,
        priority: "early",
      },
      {
        ...champions.find((c) => c.name === "Kindred")!,
        level: 2,
        priority: "early",
      },
      {
        ...champions.find((c) => c.name === "Vi")!,
        level: 2,
        priority: "early",
      },
      {
        ...champions.find((c) => c.name === "Jhin")!,
        level: 2,
        priority: "early",
      },
    ],
  },
  {
    name: "Anima Squad",
    style: "4-Cost Fast 8",
    tier: "A",
    url: "https://tftacademy.com/tierlist/comps/set-14-anima-squad", // Update with actual URL if available
    tip: "Prioritize true tank items on Leona instead of utility. 10 Anima Squad will win most games, but requires 2 emblems / 10 team size. Weapon scales off star level so sometimes holding random 3* units can be clutch (Illaoi, Vayne, Sylas).",
    champions: [
      // Main comp
      {
        ...champions.find((c) => c.name === "Sylas")!,
        level: 2,
        priority: "main",
      },
      {
        ...champions.find((c) => c.name === "Illaoi")!,
        level: 2,
        priority: "main",
      },
      {
        ...champions.find((c) => c.name === "Jhin")!,
        level: 2,
        priority: "main",
      },
      {
        ...champions.find((c) => c.name === "Vayne")!,
        level: 2,
        priority: "main",
      },
      {
        ...champions.find((c) => c.name === "Leona")!,
        level: 2,
        priority: "main",
      },
      {
        ...champions.find((c) => c.name === "Xayah")!,
        level: 2,
        priority: "main",
      },
      {
        ...champions.find((c) => c.name === "Viego")!,
        level: 2,
        priority: "main",
      },
      {
        ...champions.find((c) => c.name === "Renekton")!,
        level: 2,
        priority: "main",
      },
      {
        ...champions.find((c) => c.name === "Aurora")!,
        level: 2,
        priority: "main",
      },
      // Early comp
      {
        ...champions.find((c) => c.name === "Seraphine")!,
        level: 2,
        priority: "early",
      },
      {
        ...champions.find((c) => c.name === "Sylas")!,
        level: 2,
        priority: "early",
      },
      {
        ...champions.find((c) => c.name === "Illaoi")!,
        level: 2,
        priority: "early",
      },
      {
        ...champions.find((c) => c.name === "Vi")!,
        level: 2,
        priority: "early",
      },
    ],
  },
  {
    name: "Golden Graves",
    style: "2-Cost Reroll",
    tier: "S",
    url: "https://tftacademy.com/tierlist/comps/set-14-golden-graves", // Update if actual link is known
    tip: "Great with a wide variety of artifacts. Play when you have early Graves with AD items and Golden Ox. Play Aphelios / Annie for 4 Golden Ox until you hit Viego. Cap the board with Renekton or another 5 cost.",
    champions: [
      // Main comp
      {
        ...champions.find((c) => c.name === "Alistar")!,
        level: 2,
        priority: "main",
      },
      {
        ...champions.find((c) => c.name === "Rhaast")!,
        level: 2,
        priority: "main",
      },
      {
        ...champions.find((c) => c.name === "Graves")!,
        level: 3,
        priority: "main",
      },
      {
        ...champions.find((c) => c.name === "Gragas")!,
        level: 2,
        priority: "main",
      },
      {
        ...champions.find((c) => c.name === "Senna")!,
        level: 2,
        priority: "main",
      },
      {
        ...champions.find((c) => c.name === "Jarvan IV")!,
        level: 3,
        priority: "main",
      },
      {
        ...champions.find((c) => c.name === "Vex")!,
        level: 2,
        priority: "main",
      },
      {
        ...champions.find((c) => c.name === "Aphelios")!,
        level: 2,
        priority: "main",
      },
      // Early comp
      {
        ...champions.find((c) => c.name === "Graves")!,
        level: 2,
        priority: "early",
      },
      {
        ...champions.find((c) => c.name === "Alistar")!,
        level: 2,
        priority: "early",
      },
      {
        ...champions.find((c) => c.name === "Dr.Mundo")!,
        level: 2,
        priority: "early",
      },
      {
        ...champions.find((c) => c.name === "Rengar")!,
        level: 2,
        priority: "early",
      },
    ],
  },
  {
    name: "5 Cypher",
    style: "Lose Streak",
    tier: "A",
    url: "https://tftacademy.com/tierlist/comps/set-14-5-cypher", // Update if real URL is available
    tip: "Only play this comp with a Cypher cashout. Aim for an intel trade with 2-3 lives. You will mainly roll for this composition on level 8. Focus on Draven items > Zed items. Leftover AP on Leblanc, AS on Zeri, and tank items on Sejuani.",
    champions: [
      // Main comp
      {
        ...champions.find((c) => c.name === "Vi")!,
        level: 2,
        priority: "main",
      },
      {
        ...champions.find((c) => c.name === "LeBlanc")!,
        level: 2,
        priority: "main",
      },
      {
        ...champions.find((c) => c.name === "Jarvan IV")!,
        level: 2,
        priority: "main",
      },
      {
        ...champions.find((c) => c.name === "Draven")!,
        level: 3,
        priority: "main",
      },
      {
        ...champions.find((c) => c.name === "Galio")!,
        level: 3,
        priority: "main",
      },
      {
        ...champions.find((c) => c.name === "Zeri")!,
        level: 2,
        priority: "main",
      },
      {
        ...champions.find((c) => c.name === "Zed")!,
        level: 2,
        priority: "main",
      },
      {
        ...champions.find((c) => c.name === "Renekton")!,
        level: 2,
        priority: "main",
      },
      // Early comp
      {
        ...champions.find((c) => c.name === "Vi")!,
        level: 2,
        priority: "early",
      },
      {
        ...champions.find((c) => c.name === "LeBlanc")!,
        level: 2,
        priority: "early",
      },
      {
        ...champions.find((c) => c.name === "Draven")!,
        level: 2,
        priority: "early",
      },
      {
        ...champions.find((c) => c.name === "Galio")!,
        level: 2,
        priority: "early",
      },
    ],
  },
  {
    name: "Mundo Techies (Gorilla)",
    style: "1-Cost Reroll",
    tier: "S",
    url: "https://tftacademy.com/tierlist/comps/set-14-mundo-techies", // Update with correct link if available
    tip: "Play when you have high likelihood of finding early Mundo 3 with good tank items. 3* Priority: Mundo 3 > Seraphine 3 > Zyra 3 = Alistar 3. Play items on Seraphine 3 / Zyra 3 until Brand 2. Positioning may change pending on the Street Demon hexes.",
    champions: [
      // Main comp
      {
        ...champions.find((c) => c.name === "Alistar")!,
        level: 3,
        priority: "main",
      },
      {
        ...champions.find((c) => c.name === "Zyra")!,
        level: 3,
        priority: "main",
      },
      {
        ...champions.find((c) => c.name === "Seraphine")!,
        level: 3,
        priority: "main",
      },
      {
        ...champions.find((c) => c.name === "Dr.Mundo")!,
        level: 3,
        priority: "main",
      },
      {
        ...champions.find((c) => c.name === "Veigar")!,
        level: 2,
        priority: "main",
      },
      {
        ...champions.find((c) => c.name === "Mordekaiser")!,
        level: 2,
        priority: "main",
      },
      {
        ...champions.find((c) => c.name === "Brand")!,
        level: 2,
        priority: "main",
      },
      {
        ...champions.find((c) => c.name === "Kobuko")!,
        level: 2,
        priority: "main",
      },
      {
        ...champions.find((c) => c.name === "Viego")!,
        level: 2,
        priority: "main",
      },
      // Early comp
      {
        ...champions.find((c) => c.name === "Dr.Mundo")!,
        level: 2,
        priority: "early",
      },
      {
        ...champions.find((c) => c.name === "Seraphine")!,
        level: 2,
        priority: "early",
      },
      {
        ...champions.find((c) => c.name === "Alistar")!,
        level: 2,
        priority: "early",
      },
      {
        ...champions.find((c) => c.name === "Zyra")!,
        level: 2,
        priority: "early",
      },
    ],
  },
  {
    name: "Bastion Morgana",
    style: "1-Cost Reroll",
    tier: "S",
    url: "https://tftacademy.com/tierlist/comps/set-14-bastion-morgana", // Update with actual URL if available
    tip: "Can also play Jhin when tank Exotech item is good. On level 8 you can play 4 Dynamo 4 Bastion if you don't have Renekton. Play anti-heal on Morgana until you hit Elise / Aurora. Always place Galio and Sejunani on the edges same side as enemy carry.",
    champions: [
      // Main comp
      {
        ...champions.find((c) => c.name === "Jax")!,
        level: 3,
        priority: "main",
      },
      {
        ...champions.find((c) => c.name === "Morgana")!,
        level: 3,
        priority: "main",
      },
      {
        ...champions.find((c) => c.name === "Poppy")!,
        level: 3,
        priority: "main",
      },
      {
        ...champions.find((c) => c.name === "Shyvana")!,
        level: 2,
        priority: "main",
      },
      {
        ...champions.find((c) => c.name === "Elise")!,
        level: 2,
        priority: "main",
      },
      {
        ...champions.find((c) => c.name === "Galio")!,
        level: 2,
        priority: "main",
      },
      {
        ...champions.find((c) => c.name === "Sejuani")!,
        level: 2,
        priority: "main",
      },
      {
        ...champions.find((c) => c.name === "Renekton")!,
        level: 2,
        priority: "main",
      },
      {
        ...champions.find((c) => c.name === "Aurora")!,
        level: 2,
        priority: "main",
      },
      // Early comp
      {
        ...champions.find((c) => c.name === "Morgana")!,
        level: 2,
        priority: "early",
      },
      {
        ...champions.find((c) => c.name === "Poppy")!,
        level: 2,
        priority: "early",
      },
      {
        ...champions.find((c) => c.name === "Jax")!,
        level: 2,
        priority: "early",
      },
      {
        ...champions.find((c) => c.name === "Elise")!,
        level: 2,
        priority: "early",
      },
    ],
  },
  {
    name: "Cyberboss Veigar",
    style: "2-Cost Reroll",
    tier: "S",
    url: "https://tftacademy.com/tierlist/comps/set-14-cyberboss-veigar", // Update with actual link if needed
    tip: "Strongest Cyberboss = # of items > last unit fielded on the board. Best with Manazane / Fishbones + Blue Buff + JG. Don't overgreed BIS on Veigar early and focus on winstreaking Stage 3. Cap with Viego 2 with items.",
    champions: [
      // Main comp
      {
        ...champions.find((c) => c.name === "Poppy")!,
        level: 2,
        priority: "main",
      },
      {
        ...champions.find((c) => c.name === "Ekko")!,
        level: 2,
        priority: "main",
      },
      {
        ...champions.find((c) => c.name === "Shyvana")!,
        level: 2,
        priority: "main",
      },
      {
        ...champions.find((c) => c.name === "Veigar")!,
        level: 3,
        priority: "main",
      },
      {
        ...champions.find((c) => c.name === "Mordekaiser")!,
        level: 2,
        priority: "main",
      },
      {
        ...champions.find((c) => c.name === "Brand")!,
        level: 2,
        priority: "main",
      },
      {
        ...champions.find((c) => c.name === "Neeko")!,
        level: 2,
        priority: "main",
      },
      {
        ...champions.find((c) => c.name === "Ziggs")!,
        level: 2,
        priority: "main",
      },
      {
        ...champions.find((c) => c.name === "Kobuko")!,
        level: 2,
        priority: "main",
      },
      // Early comp
      {
        ...champions.find((c) => c.name === "Veigar")!,
        level: 2,
        priority: "early",
      },
      {
        ...champions.find((c) => c.name === "Poppy")!,
        level: 2,
        priority: "early",
      },
      {
        ...champions.find((c) => c.name === "Shyvana")!,
        level: 2,
        priority: "early",
      },
      {
        ...champions.find((c) => c.name === "Jax")!,
        level: 2,
        priority: "early",
      },
    ],
  },
  {
    name: "Urgot Vex Bruisers",
    style: "Fast 9",
    tier: "S",
    url: "https://tftacademy.com/tierlist/comps/set-14-urgot-vex-bruisers", // Update with actual URL if available
    tip: "This is a Fast 9 comp oriented around Bruisers and Boombot Urgot. Best from early Boombot tempo with upgraded Kogmaw and winstreak. Boombot does magic damage so full 30% Shred is nice to have. Boombot Garen mods cap the board.",
    champions: [
      // Main comp
      {
        ...champions.find((c) => c.name === "Fiddlesticks")!,
        level: 2,
        priority: "main",
      },
      {
        ...champions.find((c) => c.name === "Gragas")!,
        level: 2,
        priority: "main",
      },
      {
        ...champions.find((c) => c.name === "Vex")!,
        level: 2,
        priority: "main",
      },
      {
        ...champions.find((c) => c.name === "Cho'Gath")!,
        level: 2,
        priority: "main",
      },
      {
        ...champions.find((c) => c.name === "Garen")!,
        level: 2,
        priority: "main",
      },
      {
        ...champions.find((c) => c.name === "Kobuko")!,
        level: 2,
        priority: "main",
      },
      {
        ...champions.find((c) => c.name === "Viego")!,
        level: 2,
        priority: "main",
      },
      {
        ...champions.find((c) => c.name === "Urgot")!,
        level: 2,
        priority: "main",
      },
      {
        ...champions.find((c) => c.name === "Zac")!,
        level: 2,
        priority: "main",
      },
      // Early comp
      {
        ...champions.find((c) => c.name === "Kog'Maw")!,
        level: 2,
        priority: "early",
      },
      {
        ...champions.find((c) => c.name === "Skarner")!,
        level: 2,
        priority: "early",
      },
      {
        ...champions.find((c) => c.name === "Kindred")!,
        level: 2,
        priority: "early",
      },
      {
        ...champions.find((c) => c.name === "Vi")!,
        level: 2,
        priority: "early",
      },
    ],
  },
  {
    name: "Card Shark",
    style: "2-Cost Reroll",
    tier: "B",
    url: "https://tftacademy.com/tierlist/comps/set-14-card-shark", // Update with actual URL if available
    tip: "Play from early copies of TF and Rageblade components. Roll for this composition on level 7. Leftover carry items on Draven. Late game either Kingpin frontline or MF 2 with items.",
    champions: [
      // Main comp
      {
        ...champions.find((c) => c.name === "Shaco")!,
        level: 2,
        priority: "main",
      },
      {
        ...champions.find((c) => c.name === "Darius")!,
        level: 2,
        priority: "main",
      },
      {
        ...champions.find((c) => c.name === "Rhaast")!,
        level: 2,
        priority: "main",
      },
      {
        ...champions.find((c) => c.name === "Twisted Fate")!,
        level: 3,
        priority: "main",
      },
      {
        ...champions.find((c) => c.name === "Gragas")!,
        level: 2,
        priority: "main",
      },
      {
        ...champions.find((c) => c.name === "Draven")!,
        level: 3,
        priority: "main",
      },
      {
        ...champions.find((c) => c.name === "Braum")!,
        level: 3,
        priority: "main",
      },
      {
        ...champions.find((c) => c.name === "Miss Fortune")!,
        level: 2,
        priority: "main",
      },
      // Early comp
      {
        ...champions.find((c) => c.name === "Kog'Maw")!,
        level: 2,
        priority: "early",
      },
      {
        ...champions.find((c) => c.name === "Twisted Fate")!,
        level: 2,
        priority: "early",
      },
      {
        ...champions.find((c) => c.name === "Darius")!,
        level: 2,
        priority: "early",
      },
      {
        ...champions.find((c) => c.name === "Shaco")!,
        level: 2,
        priority: "early",
      },
    ],
  },
  {
    name: "Vexotech",
    style: "4-Cost Fast 8",
    tier: "B",
    url: "https://tftacademy.com/tierlist/comps/set-14-vexotech", // Update with actual URL if available
    tip: "Prioritize Vex items > frontline items > Varus with leftover AP / Utility. Hyperfangs and Chassis are the best Exotech items to play. 3rd item on Vex is flexible: Guardbreaker > Deathcap > Giant Slayer. Cap with 5 costs: Aurora > Renekton > Viego / Kobuko",
    champions: [
      // Main comp
      {
        ...champions.find((c) => c.name === "Morgana")!,
        level: 2,
        priority: "main",
      },
      {
        ...champions.find((c) => c.name === "Gragas")!,
        level: 2,
        priority: "main",
      },
      {
        ...champions.find((c) => c.name === "Mordekaiser")!,
        level: 3,
        priority: "main",
      },
      {
        ...champions.find((c) => c.name === "Varus")!,
        level: 3,
        priority: "main",
      },
      {
        ...champions.find((c) => c.name === "Sejuani")!,
        level: 2,
        priority: "main",
      },
      {
        ...champions.find((c) => c.name === "Vex")!,
        level: 2,
        priority: "main",
      },
      {
        ...champions.find((c) => c.name === "Aurora")!,
        level: 2,
        priority: "main",
      },
      {
        ...champions.find((c) => c.name === "Renekton")!,
        level: 2,
        priority: "main",
      },
      {
        ...champions.find((c) => c.name === "Viego")!,
        level: 2,
        priority: "main",
      },
      // Early comp
      {
        ...champions.find((c) => c.name === "Morgana")!,
        level: 2,
        priority: "early",
      },
      {
        ...champions.find((c) => c.name === "Jhin")!,
        level: 2,
        priority: "early",
      },
      {
        ...champions.find((c) => c.name === "Jax")!,
        level: 2,
        priority: "early",
      },
      {
        ...champions.find((c) => c.name === "Naafiri")!,
        level: 2,
        priority: "early",
      },
    ],
  },
  {
    name: "AMP Naafiri",
    style: "2-Cost Reroll",
    tier: "S",
    url: "https://tftacademy.com/tierlist/comps/set-14-amp-naafiri", // Update with actual link
    tip: "Not a Nitro comp. Play Nitro in the early game and drop it as we find more AMP and Strategists to make Naafiri as strong as possible. If your Exotech item is bad (no Pulse/Hyper Fangs), drop Sejuani and Jax for more Strategists too.",
    champions: [
      // Main comp
      {
        ...champions.find((c) => c.name === "Jax")!,
        level: 2,
        priority: "main",
      },
      {
        ...champions.find((c) => c.name === "Nidalee")!,
        level: 2,
        priority: "main",
      },
      {
        ...champions.find((c) => c.name === "Ekko")!,
        level: 2,
        priority: "main",
      },
      {
        ...champions.find((c) => c.name === "Naafiri")!,
        level: 3,
        priority: "main",
      },
      {
        ...champions.find((c) => c.name === "Yuumi")!,
        level: 3,
        priority: "main",
      },
      {
        ...champions.find((c) => c.name === "Annie")!,
        level: 2,
        priority: "main",
      },
      {
        ...champions.find((c) => c.name === "Sejuani")!,
        level: 2,
        priority: "main",
      },
      {
        ...champions.find((c) => c.name === "Neeko")!,
        level: 2,
        priority: "main",
      },
      {
        ...champions.find((c) => c.name === "Samira")!,
        level: 2,
        priority: "main",
      },
      // Early comp
      {
        ...champions.find((c) => c.name === "Kindred")!,
        level: 2,
        priority: "early",
      },
      {
        ...champions.find((c) => c.name === "Nidalee")!,
        level: 2,
        priority: "early",
      },
      {
        ...champions.find((c) => c.name === "Shyvana")!,
        level: 2,
        priority: "early",
      },
      {
        ...champions.find((c) => c.name === "Naafiri")!,
        level: 2,
        priority: "early",
      },
    ],
  },
];

import { Ability } from "../../types/enum/Ability"
import { Item } from "../../types/enum/Item"
import { Pkm } from "../../types/enum/Pokemon"
import { Synergy } from "../../types/enum/Synergy"

// Mega Madness game mode configuration
// Generated from the mega evolutions table, edit with care: indexes must stay unique

export type MegaEvolution = {
  mega: Pkm
  // pokemons that can mega evolve into this mega
  bases: Pkm[]
  // pokemon whose stats, ability and passive are used as a base for the mega
  template: Pkm
  // stone that triggers the mega evolution, null for Mega Rayquaza that needs none
  stone: Item | null
  // additional synergies gained when mega evolving
  addTypes: Synergy[]
  // sprite index used to generate placeholder art when the mega has no sprite yet
  placeholderSpriteSource: string | null
}

export const MegaEvolutions: MegaEvolution[] = [
  {
    mega: Pkm.MEGA_VENUSAUR,
    bases: [Pkm.VENUSAUR],
    template: Pkm.VENUSAUR,
    stone: Item.VENUSAURITE,
    addTypes: [],
    placeholderSpriteSource: "0003"
  },
  {
    mega: Pkm.MEGA_CHARIZARD_X,
    bases: [Pkm.CHARIZARD],
    template: Pkm.CHARIZARD,
    stone: Item.CHARIZARDITE_X,
    addTypes: [Synergy.DRAGON],
    placeholderSpriteSource: "0006"
  },
  {
    mega: Pkm.MEGA_CHARIZARD_Y,
    bases: [Pkm.CHARIZARD],
    template: Pkm.CHARIZARD,
    stone: Item.CHARIZARDITE_Y,
    addTypes: [],
    placeholderSpriteSource: "0006"
  },
  {
    mega: Pkm.MEGA_BLASTOISE,
    bases: [Pkm.BLASTOISE],
    template: Pkm.BLASTOISE,
    stone: Item.BLASTOISINITE,
    addTypes: [],
    placeholderSpriteSource: "0009"
  },
  {
    mega: Pkm.MEGA_ALAKAZAM,
    bases: [Pkm.ALAKAZAM],
    template: Pkm.ALAKAZAM,
    stone: Item.ALAKAZITE,
    addTypes: [],
    placeholderSpriteSource: "0065"
  },
  {
    mega: Pkm.MEGA_GENGAR,
    bases: [Pkm.GENGAR],
    template: Pkm.GENGAR,
    stone: Item.GENGARITE,
    addTypes: [],
    placeholderSpriteSource: "0094"
  },
  {
    mega: Pkm.MEGA_KANGASKHAN,
    bases: [Pkm.KANGASKHAN],
    template: Pkm.KANGASKHAN,
    stone: Item.KANGASKHANITE,
    addTypes: [],
    placeholderSpriteSource: "0115"
  },
  {
    mega: Pkm.MEGA_PINSIR,
    bases: [Pkm.PINSIR],
    template: Pkm.PINSIR,
    stone: Item.PINSIRITE,
    addTypes: [Synergy.FLYING],
    placeholderSpriteSource: "0127"
  },
  {
    mega: Pkm.MEGA_GYARADOS,
    bases: [Pkm.GYARADOS],
    template: Pkm.GYARADOS,
    stone: Item.GYARADOSITE,
    addTypes: [Synergy.DARK],
    placeholderSpriteSource: "0130"
  },
  {
    mega: Pkm.MEGA_AERODACTYL,
    bases: [Pkm.AERODACTYL],
    template: Pkm.AERODACTYL,
    stone: Item.AERODACTYLITE,
    addTypes: [],
    placeholderSpriteSource: "0142"
  },
  {
    mega: Pkm.MEGA_MEWTWO_X,
    bases: [Pkm.MEWTWO],
    template: Pkm.MEWTWO,
    stone: Item.MEWTWONITE_X,
    addTypes: [Synergy.FIGHTING],
    placeholderSpriteSource: "0150"
  },
  {
    mega: Pkm.MEGA_MEWTWO_Y,
    bases: [Pkm.MEWTWO],
    template: Pkm.MEWTWO,
    stone: Item.MEWTWONITE_Y,
    addTypes: [],
    placeholderSpriteSource: "0150"
  },
  {
    mega: Pkm.MEGA_AMPHAROS,
    bases: [Pkm.AMPHAROS],
    template: Pkm.AMPHAROS,
    stone: Item.AMPHAROSITE,
    addTypes: [Synergy.DRAGON],
    placeholderSpriteSource: "0181"
  },
  {
    mega: Pkm.MEGA_SCIZOR,
    bases: [Pkm.SCIZOR],
    template: Pkm.SCIZOR,
    stone: Item.SCIZORITE,
    addTypes: [],
    placeholderSpriteSource: "0212"
  },
  {
    mega: Pkm.MEGA_HERACROSS,
    bases: [Pkm.HERACROSS],
    template: Pkm.HERACROSS,
    stone: Item.HERACRONITE,
    addTypes: [],
    placeholderSpriteSource: "0214"
  },
  {
    mega: Pkm.MEGA_HOUNDOOM,
    bases: [Pkm.HOUNDOOM],
    template: Pkm.HOUNDOOM,
    stone: Item.HOUNDOOMINITE,
    addTypes: [],
    placeholderSpriteSource: null
  },
  {
    mega: Pkm.MEGA_TYRANITAR,
    bases: [Pkm.TYRANITAR],
    template: Pkm.TYRANITAR,
    stone: Item.TYRANITARITE,
    addTypes: [],
    placeholderSpriteSource: "0248"
  },
  {
    mega: Pkm.MEGA_BLAZIKEN,
    bases: [Pkm.BLAZIKEN],
    template: Pkm.BLAZIKEN,
    stone: Item.BLAZIKENITE,
    addTypes: [],
    placeholderSpriteSource: "0257"
  },
  {
    mega: Pkm.MEGA_GARDEVOIR,
    bases: [Pkm.GARDEVOIR],
    template: Pkm.GARDEVOIR,
    stone: Item.GARDEVOIRITE,
    addTypes: [],
    placeholderSpriteSource: "0282"
  },
  {
    mega: Pkm.MEGA_MAWILE,
    bases: [Pkm.MAWILE],
    template: Pkm.MAWILE,
    stone: Item.MAWILITE,
    addTypes: [],
    placeholderSpriteSource: "0303"
  },
  {
    mega: Pkm.MEGA_AGGRON,
    bases: [Pkm.AGGRON],
    template: Pkm.AGGRON,
    stone: Item.AGGRONITE,
    addTypes: [],
    placeholderSpriteSource: "0306"
  },
  {
    mega: Pkm.MEGA_MEDICHAM,
    bases: [Pkm.MEDICHAM],
    template: Pkm.MEDICHAM,
    stone: Item.MEDICHAMITE,
    addTypes: [],
    placeholderSpriteSource: "0308"
  },
  {
    mega: Pkm.MEGA_MANECTRIC,
    bases: [Pkm.MANECTRIC],
    template: Pkm.MANECTRIC,
    stone: Item.MANECTITE,
    addTypes: [],
    placeholderSpriteSource: null
  },
  {
    mega: Pkm.MEGA_BANETTE,
    bases: [Pkm.BANETTE],
    template: Pkm.BANETTE,
    stone: Item.BANETTITE,
    addTypes: [],
    placeholderSpriteSource: null
  },
  {
    mega: Pkm.MEGA_ABSOL,
    bases: [Pkm.ABSOL],
    template: Pkm.ABSOL,
    stone: Item.ABSOLITE,
    addTypes: [],
    placeholderSpriteSource: "0359"
  },
  {
    mega: Pkm.MEGA_GARCHOMP,
    bases: [Pkm.GARCHOMP],
    template: Pkm.GARCHOMP,
    stone: Item.GARCHOMPITE,
    addTypes: [],
    placeholderSpriteSource: "0445"
  },
  {
    mega: Pkm.MEGA_LUCARIO,
    bases: [Pkm.LUCARIO],
    template: Pkm.LUCARIO,
    stone: Item.LUCARIONITE,
    addTypes: [],
    placeholderSpriteSource: "0448"
  },
  {
    mega: Pkm.MEGA_ABOMASNOW,
    bases: [Pkm.ABOMASNOW],
    template: Pkm.ABOMASNOW,
    stone: Item.ABOMASITE,
    addTypes: [],
    placeholderSpriteSource: "0460"
  },
  {
    mega: Pkm.MEGA_BEEDRILL,
    bases: [Pkm.BEEDRILL],
    template: Pkm.BEEDRILL,
    stone: Item.BEEDRILLITE,
    addTypes: [],
    placeholderSpriteSource: "0015"
  },
  {
    mega: Pkm.MEGA_PIDGEOT,
    bases: [Pkm.PIDGEOT],
    template: Pkm.PIDGEOT,
    stone: Item.PIDGEOTITE,
    addTypes: [],
    placeholderSpriteSource: "0018"
  },
  {
    mega: Pkm.MEGA_SLOWBRO,
    bases: [Pkm.SLOWBRO],
    template: Pkm.SLOWBRO,
    stone: Item.SLOWBRONITE,
    addTypes: [],
    placeholderSpriteSource: "0080"
  },
  {
    mega: Pkm.MEGA_STEELIX,
    bases: [Pkm.STEELIX],
    template: Pkm.STEELIX,
    stone: Item.STEELIXITE,
    addTypes: [],
    placeholderSpriteSource: null
  },
  {
    mega: Pkm.MEGA_SCEPTILE,
    bases: [Pkm.SCEPTILE],
    template: Pkm.SCEPTILE,
    stone: Item.SCEPTILITE,
    addTypes: [Synergy.DRAGON],
    placeholderSpriteSource: "0254"
  },
  {
    mega: Pkm.MEGA_SWAMPERT,
    bases: [Pkm.SWAMPERT],
    template: Pkm.SWAMPERT,
    stone: Item.SWAMPERTITE,
    addTypes: [],
    placeholderSpriteSource: "0260"
  },
  {
    mega: Pkm.MEGA_SABLEYE,
    bases: [Pkm.SABLEYE],
    template: Pkm.SABLEYE,
    stone: Item.SABLENITE,
    addTypes: [],
    placeholderSpriteSource: null
  },
  {
    mega: Pkm.MEGA_SHARPEDO,
    bases: [Pkm.SHARPEDO],
    template: Pkm.SHARPEDO,
    stone: Item.SHARPEDONITE,
    addTypes: [],
    placeholderSpriteSource: "0319"
  },
  {
    mega: Pkm.MEGA_CAMERUPT,
    bases: [Pkm.CAMERUPT],
    template: Pkm.CAMERUPT,
    stone: Item.CAMERUPTITE,
    addTypes: [],
    placeholderSpriteSource: null
  },
  {
    mega: Pkm.MEGA_ALTARIA,
    bases: [Pkm.ALTARIA],
    template: Pkm.ALTARIA,
    stone: Item.ALTARIANITE,
    addTypes: [Synergy.FAIRY],
    placeholderSpriteSource: "0334"
  },
  {
    mega: Pkm.MEGA_GLALIE,
    bases: [Pkm.GLALIE],
    template: Pkm.GLALIE,
    stone: Item.GLALITITE,
    addTypes: [],
    placeholderSpriteSource: "0362"
  },
  {
    mega: Pkm.MEGA_SALAMENCE,
    bases: [Pkm.SALAMENCE],
    template: Pkm.SALAMENCE,
    stone: Item.SALAMENCITE,
    addTypes: [],
    placeholderSpriteSource: "0373"
  },
  {
    mega: Pkm.MEGA_METAGROSS,
    bases: [Pkm.METAGROSS],
    template: Pkm.METAGROSS,
    stone: Item.METAGROSSITE,
    addTypes: [],
    placeholderSpriteSource: "0376"
  },
  {
    mega: Pkm.MEGA_LATIAS,
    bases: [Pkm.LATIAS],
    template: Pkm.LATIAS,
    stone: Item.LATIASITE,
    addTypes: [],
    placeholderSpriteSource: "0380"
  },
  {
    mega: Pkm.MEGA_LATIOS,
    bases: [Pkm.LATIOS],
    template: Pkm.LATIOS,
    stone: Item.LATIOSITE,
    addTypes: [],
    placeholderSpriteSource: "0381"
  },
  {
    mega: Pkm.MEGA_RAYQUAZA,
    bases: [Pkm.RAYQUAZA],
    template: Pkm.RAYQUAZA,
    stone: null,
    addTypes: [],
    placeholderSpriteSource: null
  },
  {
    mega: Pkm.MEGA_LOPUNNY,
    bases: [Pkm.LOPUNNY],
    template: Pkm.LOPUNNY,
    stone: Item.LOPUNNITE,
    addTypes: [],
    placeholderSpriteSource: null
  },
  {
    mega: Pkm.MEGA_GALLADE,
    bases: [Pkm.GALLADE],
    template: Pkm.GALLADE,
    stone: Item.GALLADITE,
    addTypes: [],
    placeholderSpriteSource: "0475"
  },
  {
    mega: Pkm.MEGA_AUDINO,
    bases: [Pkm.AUDINO],
    template: Pkm.AUDINO,
    stone: Item.AUDINITE,
    addTypes: [Synergy.FAIRY],
    placeholderSpriteSource: "0531"
  },
  {
    mega: Pkm.MEGA_DIANCIE,
    bases: [Pkm.DIANCIE],
    template: Pkm.DIANCIE,
    stone: Item.DIANCITE,
    addTypes: [],
    placeholderSpriteSource: "0719"
  },
  {
    mega: Pkm.MEGA_CLEFABLE,
    bases: [Pkm.CLEFABLE],
    template: Pkm.CLEFABLE,
    stone: Item.CLEFABLITE,
    addTypes: [Synergy.FLYING],
    placeholderSpriteSource: "0036"
  },
  {
    mega: Pkm.MEGA_VICTREEBEL,
    bases: [Pkm.VICTREEBEL],
    template: Pkm.VICTREEBEL,
    stone: Item.VICTREEBELITE,
    addTypes: [],
    placeholderSpriteSource: "0071"
  },
  {
    mega: Pkm.MEGA_STARMIE,
    bases: [Pkm.STARMIE],
    template: Pkm.STARMIE,
    stone: Item.STARMINITE,
    addTypes: [],
    placeholderSpriteSource: "0121"
  },
  {
    mega: Pkm.MEGA_DRAGONITE,
    bases: [Pkm.DRAGONITE],
    template: Pkm.DRAGONITE,
    stone: Item.DRAGONINITE,
    addTypes: [],
    placeholderSpriteSource: "0149"
  },
  {
    mega: Pkm.MEGA_MEGANIUM,
    bases: [Pkm.MEGANIUM],
    template: Pkm.MEGANIUM,
    stone: Item.MEGANIUMITE,
    addTypes: [Synergy.FAIRY],
    placeholderSpriteSource: "0154"
  },
  {
    mega: Pkm.MEGA_FERALIGATR,
    bases: [Pkm.FERALIGATR],
    template: Pkm.FERALIGATR,
    stone: Item.FERALIGITE,
    addTypes: [Synergy.DRAGON],
    placeholderSpriteSource: "0160"
  },
  {
    mega: Pkm.MEGA_SKARMORY,
    bases: [Pkm.SKARMORY],
    template: Pkm.SKARMORY,
    stone: Item.SKARMORITE,
    addTypes: [],
    placeholderSpriteSource: "0227"
  },
  {
    mega: Pkm.MEGA_FROSLASS,
    bases: [Pkm.FROSLASS],
    template: Pkm.FROSLASS,
    stone: Item.FROSLASSITE,
    addTypes: [],
    placeholderSpriteSource: "0478"
  },
  {
    mega: Pkm.MEGA_EMBOAR,
    bases: [Pkm.EMBOAR],
    template: Pkm.EMBOAR,
    stone: Item.EMBOARITE,
    addTypes: [],
    placeholderSpriteSource: "0500"
  },
  {
    mega: Pkm.MEGA_EXCADRILL,
    bases: [Pkm.EXCADRILL],
    template: Pkm.EXCADRILL,
    stone: Item.EXCADRITE,
    addTypes: [],
    placeholderSpriteSource: "0530"
  },
  {
    mega: Pkm.MEGA_SCOLIPEDE,
    bases: [Pkm.SCOLIPEDE],
    template: Pkm.SCOLIPEDE,
    stone: Item.SCOLIPITE,
    addTypes: [],
    placeholderSpriteSource: "0545"
  },
  {
    mega: Pkm.MEGA_SCRAFTY,
    bases: [Pkm.SCRAFTY],
    template: Pkm.SCRAFTY,
    stone: Item.SCRAFTINITE,
    addTypes: [],
    placeholderSpriteSource: "0560"
  },
  {
    mega: Pkm.MEGA_EELEKTROSS,
    bases: [Pkm.EELEKTROSS],
    template: Pkm.EELEKTROSS,
    stone: Item.EELEKTROSSITE,
    addTypes: [],
    placeholderSpriteSource: "0604"
  },
  {
    mega: Pkm.MEGA_CHANDELURE,
    bases: [Pkm.CHANDELURE],
    template: Pkm.CHANDELURE,
    stone: Item.CHANDELURITE,
    addTypes: [],
    placeholderSpriteSource: "0609"
  },
  {
    mega: Pkm.MEGA_CHESNAUGHT,
    bases: [Pkm.CHESNAUGHT],
    template: Pkm.CHESNAUGHT,
    stone: Item.CHESNAUGHTITE,
    addTypes: [],
    placeholderSpriteSource: "0652"
  },
  {
    mega: Pkm.MEGA_DELPHOX,
    bases: [Pkm.DELPHOX],
    template: Pkm.DELPHOX,
    stone: Item.DELPHOXITE,
    addTypes: [],
    placeholderSpriteSource: "0655"
  },
  {
    mega: Pkm.MEGA_GRENINJA,
    bases: [Pkm.GRENINJA],
    template: Pkm.GRENINJA,
    stone: Item.GRENINJITE,
    addTypes: [],
    placeholderSpriteSource: "0658"
  },
  {
    mega: Pkm.MEGA_PYROAR,
    bases: [Pkm.PYROAR],
    template: Pkm.PYROAR,
    stone: Item.PYROARITE,
    addTypes: [],
    placeholderSpriteSource: "0668"
  },
  {
    mega: Pkm.MEGA_FLOETTE,
    bases: [
      Pkm.FLOETTE,
      Pkm.FLOETTE_YELLOW,
      Pkm.FLOETTE_ORANGE,
      Pkm.FLOETTE_BLUE,
      Pkm.FLOETTE_WHITE
    ],
    template: Pkm.FLOETTE,
    stone: Item.FLOETTITE,
    addTypes: [],
    placeholderSpriteSource: "0670"
  },
  {
    mega: Pkm.MEGA_MALAMAR,
    bases: [Pkm.MALAMAR],
    template: Pkm.MALAMAR,
    stone: Item.MALAMARITE,
    addTypes: [],
    placeholderSpriteSource: "0687"
  },
  {
    mega: Pkm.MEGA_BARBARACLE,
    bases: [Pkm.BARBARACLE],
    template: Pkm.BARBARACLE,
    stone: Item.BARBARACITE,
    addTypes: [Synergy.FIGHTING],
    placeholderSpriteSource: "0689"
  },
  {
    mega: Pkm.MEGA_DRAGALGE,
    bases: [Pkm.DRAGALGE],
    template: Pkm.DRAGALGE,
    stone: Item.DRAGALGITE,
    addTypes: [],
    placeholderSpriteSource: "0691"
  },
  {
    mega: Pkm.MEGA_HAWLUCHA,
    bases: [Pkm.HAWLUCHA],
    template: Pkm.HAWLUCHA,
    stone: Item.HAWLUCHANITE,
    addTypes: [],
    placeholderSpriteSource: "0701"
  },
  {
    mega: Pkm.MEGA_ZYGARDE,
    bases: [Pkm.ZYGARDE_10, Pkm.ZYGARDE_50],
    template: Pkm.ZYGARDE_100,
    stone: Item.ZYGARDITE,
    addTypes: [],
    placeholderSpriteSource: "0718-0002"
  },
  {
    mega: Pkm.MEGA_DRAMPA,
    bases: [Pkm.DRAMPA],
    template: Pkm.DRAMPA,
    stone: Item.DRAMPANITE,
    addTypes: [],
    placeholderSpriteSource: "0780"
  },
  {
    mega: Pkm.MEGA_FALINKS,
    bases: [Pkm.FALINKS_BRASS],
    template: Pkm.FALINKS_BRASS,
    stone: Item.FALINKSITE,
    addTypes: [],
    placeholderSpriteSource: "0870-0002"
  },
  {
    mega: Pkm.MEGA_RAICHU_X,
    bases: [Pkm.RAICHU],
    template: Pkm.RAICHU,
    stone: Item.RAICHUNITE_X,
    addTypes: [],
    placeholderSpriteSource: "0026"
  },
  {
    mega: Pkm.MEGA_RAICHU_Y,
    bases: [Pkm.RAICHU],
    template: Pkm.RAICHU,
    stone: Item.RAICHUNITE_Y,
    addTypes: [],
    placeholderSpriteSource: "0026"
  },
  {
    mega: Pkm.MEGA_CHIMECHO,
    bases: [Pkm.CHIMECHO],
    template: Pkm.CHIMECHO,
    stone: Item.CHIMECHITE,
    addTypes: [],
    placeholderSpriteSource: "0358"
  },
  {
    mega: Pkm.MEGA_ABSOL_Z,
    bases: [Pkm.ABSOL],
    template: Pkm.ABSOL,
    stone: Item.ABSOLITE_Z,
    addTypes: [Synergy.GHOST],
    placeholderSpriteSource: "0359"
  },
  {
    mega: Pkm.MEGA_STARAPTOR,
    bases: [Pkm.STARAPTOR],
    template: Pkm.STARAPTOR,
    stone: Item.STARAPTITE,
    addTypes: [Synergy.FIGHTING],
    placeholderSpriteSource: "0398"
  },
  {
    mega: Pkm.MEGA_GARCHOMP_Z,
    bases: [Pkm.GARCHOMP],
    template: Pkm.GARCHOMP,
    stone: Item.GARCHOMPITE_Z,
    addTypes: [],
    placeholderSpriteSource: "0445"
  },
  {
    mega: Pkm.MEGA_LUCARIO_Z,
    bases: [Pkm.LUCARIO],
    template: Pkm.LUCARIO,
    stone: Item.LUCARIONITE_Z,
    addTypes: [],
    placeholderSpriteSource: "0448"
  },
  {
    mega: Pkm.MEGA_HEATRAN,
    bases: [Pkm.HEATRAN],
    template: Pkm.HEATRAN,
    stone: Item.HEATRANITE,
    addTypes: [],
    placeholderSpriteSource: "0485"
  },
  {
    mega: Pkm.MEGA_DARKRAI,
    bases: [Pkm.DARKRAI],
    template: Pkm.DARKRAI,
    stone: Item.DARKRANITE,
    addTypes: [],
    placeholderSpriteSource: "0491"
  },
  {
    mega: Pkm.MEGA_GOLURK,
    bases: [Pkm.GOLURK],
    template: Pkm.GOLURK,
    stone: Item.GOLURKITE,
    addTypes: [],
    placeholderSpriteSource: "0623"
  },
  {
    mega: Pkm.MEGA_MEOWSTIC,
    bases: [Pkm.MEOWSTIC_MALE, Pkm.MEOWSTIC_FEMALE],
    template: Pkm.MEOWSTIC_MALE,
    stone: Item.MEOWSTICITE,
    addTypes: [],
    placeholderSpriteSource: "0678"
  },
  {
    mega: Pkm.MEGA_CRABOMINABLE,
    bases: [Pkm.CRABOMINABLE],
    template: Pkm.CRABOMINABLE,
    stone: Item.CRABOMINITE,
    addTypes: [],
    placeholderSpriteSource: "0740"
  },
  {
    mega: Pkm.MEGA_GOLISOPOD,
    bases: [Pkm.GOLISOPOD],
    template: Pkm.GOLISOPOD,
    stone: Item.GOLISOPITE,
    addTypes: [Synergy.STEEL],
    placeholderSpriteSource: "0768"
  },
  {
    mega: Pkm.MEGA_MAGEARNA,
    bases: [Pkm.MAGEARNA],
    template: Pkm.MAGEARNA,
    stone: Item.MAGEARNITE,
    addTypes: [],
    placeholderSpriteSource: "0801"
  },
  {
    mega: Pkm.MEGA_ZERAORA,
    bases: [Pkm.ZERAORA],
    template: Pkm.ZERAORA,
    stone: Item.ZERAORITE,
    addTypes: [],
    placeholderSpriteSource: "0807"
  },
  {
    mega: Pkm.MEGA_SCOVILLAIN,
    bases: [Pkm.SCOVILLAIN],
    template: Pkm.SCOVILLAIN,
    stone: Item.SCOVILLAINITE,
    addTypes: [],
    placeholderSpriteSource: "0952"
  },
  {
    mega: Pkm.MEGA_BAXCALIBUR,
    bases: [Pkm.BAXCALIBUR],
    template: Pkm.BAXCALIBUR,
    stone: Item.BAXCALIBRITE,
    addTypes: [],
    placeholderSpriteSource: "0998"
  },
  {
    mega: Pkm.MEGA_TATSUGIRI,
    bases: [Pkm.TATSUGIRI_CURLY, Pkm.TATSUGIRI_DROOPY, Pkm.TATSUGIRI_STRETCHY],
    template: Pkm.TATSUGIRI_CURLY,
    stone: Item.TATSUGIRINITE,
    addTypes: [],
    placeholderSpriteSource: "0978"
  },
  {
    mega: Pkm.MEGA_GLIMMORA,
    bases: [Pkm.GLIMMORA],
    template: Pkm.GLIMMORA,
    stone: Item.GLIMMORANITE,
    addTypes: [],
    placeholderSpriteSource: "0970"
  }
]

// megas that are created by the mega evolution factory (Mega Sableye and Mega Rayquaza have their own classes)
export const MegaPkms = [
  Pkm.MEGA_VENUSAUR,
  Pkm.MEGA_CHARIZARD_X,
  Pkm.MEGA_CHARIZARD_Y,
  Pkm.MEGA_BLASTOISE,
  Pkm.MEGA_ALAKAZAM,
  Pkm.MEGA_GENGAR,
  Pkm.MEGA_KANGASKHAN,
  Pkm.MEGA_PINSIR,
  Pkm.MEGA_GYARADOS,
  Pkm.MEGA_AERODACTYL,
  Pkm.MEGA_MEWTWO_X,
  Pkm.MEGA_MEWTWO_Y,
  Pkm.MEGA_AMPHAROS,
  Pkm.MEGA_SCIZOR,
  Pkm.MEGA_HERACROSS,
  Pkm.MEGA_HOUNDOOM,
  Pkm.MEGA_TYRANITAR,
  Pkm.MEGA_BLAZIKEN,
  Pkm.MEGA_GARDEVOIR,
  Pkm.MEGA_MAWILE,
  Pkm.MEGA_AGGRON,
  Pkm.MEGA_MEDICHAM,
  Pkm.MEGA_MANECTRIC,
  Pkm.MEGA_BANETTE,
  Pkm.MEGA_ABSOL,
  Pkm.MEGA_GARCHOMP,
  Pkm.MEGA_LUCARIO,
  Pkm.MEGA_ABOMASNOW,
  Pkm.MEGA_BEEDRILL,
  Pkm.MEGA_PIDGEOT,
  Pkm.MEGA_SLOWBRO,
  Pkm.MEGA_STEELIX,
  Pkm.MEGA_SCEPTILE,
  Pkm.MEGA_SWAMPERT,
  Pkm.MEGA_SHARPEDO,
  Pkm.MEGA_CAMERUPT,
  Pkm.MEGA_ALTARIA,
  Pkm.MEGA_GLALIE,
  Pkm.MEGA_SALAMENCE,
  Pkm.MEGA_METAGROSS,
  Pkm.MEGA_LATIAS,
  Pkm.MEGA_LATIOS,
  Pkm.MEGA_LOPUNNY,
  Pkm.MEGA_GALLADE,
  Pkm.MEGA_AUDINO,
  Pkm.MEGA_DIANCIE,
  Pkm.MEGA_CLEFABLE,
  Pkm.MEGA_VICTREEBEL,
  Pkm.MEGA_STARMIE,
  Pkm.MEGA_DRAGONITE,
  Pkm.MEGA_MEGANIUM,
  Pkm.MEGA_FERALIGATR,
  Pkm.MEGA_SKARMORY,
  Pkm.MEGA_FROSLASS,
  Pkm.MEGA_EMBOAR,
  Pkm.MEGA_EXCADRILL,
  Pkm.MEGA_SCOLIPEDE,
  Pkm.MEGA_SCRAFTY,
  Pkm.MEGA_EELEKTROSS,
  Pkm.MEGA_CHANDELURE,
  Pkm.MEGA_CHESNAUGHT,
  Pkm.MEGA_DELPHOX,
  Pkm.MEGA_GRENINJA,
  Pkm.MEGA_PYROAR,
  Pkm.MEGA_FLOETTE,
  Pkm.MEGA_MALAMAR,
  Pkm.MEGA_BARBARACLE,
  Pkm.MEGA_DRAGALGE,
  Pkm.MEGA_HAWLUCHA,
  Pkm.MEGA_ZYGARDE,
  Pkm.MEGA_DRAMPA,
  Pkm.MEGA_FALINKS,
  Pkm.MEGA_RAICHU_X,
  Pkm.MEGA_RAICHU_Y,
  Pkm.MEGA_CHIMECHO,
  Pkm.MEGA_ABSOL_Z,
  Pkm.MEGA_STARAPTOR,
  Pkm.MEGA_GARCHOMP_Z,
  Pkm.MEGA_LUCARIO_Z,
  Pkm.MEGA_HEATRAN,
  Pkm.MEGA_DARKRAI,
  Pkm.MEGA_GOLURK,
  Pkm.MEGA_MEOWSTIC,
  Pkm.MEGA_CRABOMINABLE,
  Pkm.MEGA_GOLISOPOD,
  Pkm.MEGA_MAGEARNA,
  Pkm.MEGA_ZERAORA,
  Pkm.MEGA_SCOVILLAIN,
  Pkm.MEGA_BAXCALIBUR,
  Pkm.MEGA_TATSUGIRI,
  Pkm.MEGA_GLIMMORA
] as const
export type MegaPkm = (typeof MegaPkms)[number]

export const AllMegaPkms: Pkm[] = MegaEvolutions.map((m) => m.mega)

export const MegaShards = [
  Item.VERDANT_MEGA_SHARD,
  Item.TIDAL_MEGA_SHARD,
  Item.HEART_MEGA_SHARD,
  Item.FROST_MEGA_SHARD,
  Item.BLAZE_MEGA_SHARD,
  Item.VOLT_MEGA_SHARD,
  Item.SHADOW_MEGA_SHARD,
  Item.MIND_MEGA_SHARD,
  Item.ANCIENT_MEGA_SHARD,
  Item.SILK_MEGA_SHARD
] as const

export const MegaStones = [
  Item.VENUSAURITE,
  Item.CHARIZARDITE_X,
  Item.CHARIZARDITE_Y,
  Item.BLASTOISINITE,
  Item.ALAKAZITE,
  Item.GENGARITE,
  Item.KANGASKHANITE,
  Item.PINSIRITE,
  Item.GYARADOSITE,
  Item.AERODACTYLITE,
  Item.MEWTWONITE_X,
  Item.MEWTWONITE_Y,
  Item.AMPHAROSITE,
  Item.SCIZORITE,
  Item.HERACRONITE,
  Item.HOUNDOOMINITE,
  Item.TYRANITARITE,
  Item.BLAZIKENITE,
  Item.GARDEVOIRITE,
  Item.MAWILITE,
  Item.AGGRONITE,
  Item.MEDICHAMITE,
  Item.MANECTITE,
  Item.BANETTITE,
  Item.ABSOLITE,
  Item.GARCHOMPITE,
  Item.LUCARIONITE,
  Item.ABOMASITE,
  Item.BEEDRILLITE,
  Item.PIDGEOTITE,
  Item.SLOWBRONITE,
  Item.STEELIXITE,
  Item.SCEPTILITE,
  Item.SWAMPERTITE,
  Item.SABLENITE,
  Item.SHARPEDONITE,
  Item.CAMERUPTITE,
  Item.ALTARIANITE,
  Item.GLALITITE,
  Item.SALAMENCITE,
  Item.METAGROSSITE,
  Item.LATIASITE,
  Item.LATIOSITE,
  Item.LOPUNNITE,
  Item.GALLADITE,
  Item.AUDINITE,
  Item.DIANCITE,
  Item.CLEFABLITE,
  Item.VICTREEBELITE,
  Item.STARMINITE,
  Item.DRAGONINITE,
  Item.MEGANIUMITE,
  Item.FERALIGITE,
  Item.SKARMORITE,
  Item.FROSLASSITE,
  Item.EMBOARITE,
  Item.EXCADRITE,
  Item.SCOLIPITE,
  Item.SCRAFTINITE,
  Item.EELEKTROSSITE,
  Item.CHANDELURITE,
  Item.CHESNAUGHTITE,
  Item.DELPHOXITE,
  Item.GRENINJITE,
  Item.PYROARITE,
  Item.FLOETTITE,
  Item.MALAMARITE,
  Item.BARBARACITE,
  Item.DRAGALGITE,
  Item.HAWLUCHANITE,
  Item.ZYGARDITE,
  Item.DRAMPANITE,
  Item.FALINKSITE,
  Item.RAICHUNITE_X,
  Item.RAICHUNITE_Y,
  Item.CHIMECHITE,
  Item.ABSOLITE_Z,
  Item.STARAPTITE,
  Item.GARCHOMPITE_Z,
  Item.LUCARIONITE_Z,
  Item.HEATRANITE,
  Item.DARKRANITE,
  Item.GOLURKITE,
  Item.MEOWSTICITE,
  Item.CRABOMINITE,
  Item.GOLISOPITE,
  Item.MAGEARNITE,
  Item.ZERAORITE,
  Item.SCOVILLAINITE,
  Item.BAXCALIBRITE,
  Item.TATSUGIRINITE,
  Item.GLIMMORANITE
] as const

// items that can be combined like components to craft mega stones
export const MegaCraftingItems: Item[] = [Item.KEY_STONE, ...MegaShards]

// two steps crafting: Key Stone + component = Mega Shard, then Mega Shard + component = Mega Stone
export const MegaItemRecipe: { [key in Item]?: Item[] } = {
  [Item.VERDANT_MEGA_SHARD]: [Item.KEY_STONE, Item.MIRACLE_SEED],
  [Item.TIDAL_MEGA_SHARD]: [Item.KEY_STONE, Item.MYSTIC_WATER],
  [Item.HEART_MEGA_SHARD]: [Item.KEY_STONE, Item.HEART_SCALE],
  [Item.FROST_MEGA_SHARD]: [Item.KEY_STONE, Item.NEVER_MELT_ICE],
  [Item.BLAZE_MEGA_SHARD]: [Item.KEY_STONE, Item.CHARCOAL],
  [Item.VOLT_MEGA_SHARD]: [Item.KEY_STONE, Item.MAGNET],
  [Item.SHADOW_MEGA_SHARD]: [Item.KEY_STONE, Item.BLACK_GLASSES],
  [Item.MIND_MEGA_SHARD]: [Item.KEY_STONE, Item.TWISTED_SPOON],
  [Item.ANCIENT_MEGA_SHARD]: [Item.KEY_STONE, Item.FOSSIL_STONE],
  [Item.SILK_MEGA_SHARD]: [Item.KEY_STONE, Item.SILK_SCARF],
  [Item.VENUSAURITE]: [Item.VERDANT_MEGA_SHARD, Item.BLACK_GLASSES],
  [Item.CHARIZARDITE_X]: [Item.BLAZE_MEGA_SHARD, Item.FOSSIL_STONE],
  [Item.CHARIZARDITE_Y]: [Item.BLAZE_MEGA_SHARD, Item.SILK_SCARF],
  [Item.BLASTOISINITE]: [Item.TIDAL_MEGA_SHARD, Item.MAGNET],
  [Item.ALAKAZITE]: [Item.MIND_MEGA_SHARD, Item.TWISTED_SPOON],
  [Item.GENGARITE]: [Item.SHADOW_MEGA_SHARD, Item.BLACK_GLASSES],
  [Item.KANGASKHANITE]: [Item.SILK_MEGA_SHARD, Item.HEART_SCALE],
  [Item.PINSIRITE]: [Item.VERDANT_MEGA_SHARD, Item.SILK_SCARF],
  [Item.GYARADOSITE]: [Item.TIDAL_MEGA_SHARD, Item.BLACK_GLASSES],
  [Item.AERODACTYLITE]: [Item.ANCIENT_MEGA_SHARD, Item.SILK_SCARF],
  [Item.MEWTWONITE_X]: [Item.MIND_MEGA_SHARD, Item.SILK_SCARF],
  [Item.MEWTWONITE_Y]: [Item.MIND_MEGA_SHARD, Item.HEART_SCALE],
  [Item.AMPHAROSITE]: [Item.VOLT_MEGA_SHARD, Item.FOSSIL_STONE],
  [Item.SCIZORITE]: [Item.VERDANT_MEGA_SHARD, Item.MAGNET],
  [Item.HERACRONITE]: [Item.VERDANT_MEGA_SHARD, Item.MIRACLE_SEED],
  [Item.HOUNDOOMINITE]: [Item.SHADOW_MEGA_SHARD, Item.CHARCOAL],
  [Item.TYRANITARITE]: [Item.ANCIENT_MEGA_SHARD, Item.BLACK_GLASSES],
  [Item.BLAZIKENITE]: [Item.BLAZE_MEGA_SHARD, Item.CHARCOAL],
  [Item.GARDEVOIRITE]: [Item.MIND_MEGA_SHARD, Item.MIRACLE_SEED],
  [Item.MAWILITE]: [Item.VOLT_MEGA_SHARD, Item.HEART_SCALE],
  [Item.AGGRONITE]: [Item.VOLT_MEGA_SHARD, Item.MAGNET],
  [Item.MEDICHAMITE]: [Item.SILK_MEGA_SHARD, Item.TWISTED_SPOON],
  [Item.MANECTITE]: [Item.VOLT_MEGA_SHARD, Item.SILK_SCARF],
  [Item.BANETTITE]: [Item.SHADOW_MEGA_SHARD, Item.MIRACLE_SEED],
  [Item.ABSOLITE]: [Item.SHADOW_MEGA_SHARD, Item.HEART_SCALE],
  [Item.GARCHOMPITE]: [Item.ANCIENT_MEGA_SHARD, Item.FOSSIL_STONE],
  [Item.LUCARIONITE]: [Item.SILK_MEGA_SHARD, Item.MAGNET],
  [Item.ABOMASITE]: [Item.FROST_MEGA_SHARD, Item.MIRACLE_SEED],
  [Item.BEEDRILLITE]: [Item.VERDANT_MEGA_SHARD, Item.MYSTIC_WATER],
  [Item.PIDGEOTITE]: [Item.SILK_MEGA_SHARD, Item.SILK_SCARF],
  [Item.SLOWBRONITE]: [Item.TIDAL_MEGA_SHARD, Item.TWISTED_SPOON],
  [Item.STEELIXITE]: [Item.VOLT_MEGA_SHARD, Item.MIRACLE_SEED],
  [Item.SCEPTILITE]: [Item.VERDANT_MEGA_SHARD, Item.FOSSIL_STONE],
  [Item.SWAMPERTITE]: [Item.TIDAL_MEGA_SHARD, Item.FOSSIL_STONE],
  [Item.SABLENITE]: [Item.SHADOW_MEGA_SHARD, Item.MYSTIC_WATER],
  [Item.SHARPEDONITE]: [Item.TIDAL_MEGA_SHARD, Item.MYSTIC_WATER],
  [Item.CAMERUPTITE]: [Item.BLAZE_MEGA_SHARD, Item.MIRACLE_SEED],
  [Item.ALTARIANITE]: [Item.ANCIENT_MEGA_SHARD, Item.HEART_SCALE],
  [Item.GLALITITE]: [Item.FROST_MEGA_SHARD, Item.BLACK_GLASSES],
  [Item.SALAMENCITE]: [Item.ANCIENT_MEGA_SHARD, Item.MIRACLE_SEED],
  [Item.METAGROSSITE]: [Item.VOLT_MEGA_SHARD, Item.TWISTED_SPOON],
  [Item.LATIASITE]: [Item.ANCIENT_MEGA_SHARD, Item.TWISTED_SPOON],
  [Item.LATIOSITE]: [Item.MIND_MEGA_SHARD, Item.FOSSIL_STONE],
  [Item.LOPUNNITE]: [Item.SILK_MEGA_SHARD, Item.MIRACLE_SEED],
  [Item.GALLADITE]: [Item.SILK_MEGA_SHARD, Item.MYSTIC_WATER],
  [Item.AUDINITE]: [Item.HEART_MEGA_SHARD, Item.SILK_SCARF],
  [Item.DIANCITE]: [Item.ANCIENT_MEGA_SHARD, Item.MYSTIC_WATER],
  [Item.CLEFABLITE]: [Item.HEART_MEGA_SHARD, Item.HEART_SCALE],
  [Item.VICTREEBELITE]: [Item.VERDANT_MEGA_SHARD, Item.HEART_SCALE],
  [Item.STARMINITE]: [Item.TIDAL_MEGA_SHARD, Item.MIRACLE_SEED],
  [Item.DRAGONINITE]: [Item.ANCIENT_MEGA_SHARD, Item.NEVER_MELT_ICE],
  [Item.MEGANIUMITE]: [Item.VERDANT_MEGA_SHARD, Item.NEVER_MELT_ICE],
  [Item.FERALIGITE]: [Item.TIDAL_MEGA_SHARD, Item.HEART_SCALE],
  [Item.SKARMORITE]: [Item.VOLT_MEGA_SHARD, Item.MYSTIC_WATER],
  [Item.FROSLASSITE]: [Item.FROST_MEGA_SHARD, Item.NEVER_MELT_ICE],
  [Item.EMBOARITE]: [Item.BLAZE_MEGA_SHARD, Item.MYSTIC_WATER],
  [Item.EXCADRITE]: [Item.ANCIENT_MEGA_SHARD, Item.MAGNET],
  [Item.SCOLIPITE]: [Item.VERDANT_MEGA_SHARD, Item.CHARCOAL],
  [Item.SCRAFTINITE]: [Item.SHADOW_MEGA_SHARD, Item.SILK_SCARF],
  [Item.EELEKTROSSITE]: [Item.VOLT_MEGA_SHARD, Item.NEVER_MELT_ICE],
  [Item.CHANDELURITE]: [Item.SHADOW_MEGA_SHARD, Item.NEVER_MELT_ICE],
  [Item.CHESNAUGHTITE]: [Item.VERDANT_MEGA_SHARD, Item.TWISTED_SPOON],
  [Item.DELPHOXITE]: [Item.BLAZE_MEGA_SHARD, Item.TWISTED_SPOON],
  [Item.GRENINJITE]: [Item.TIDAL_MEGA_SHARD, Item.NEVER_MELT_ICE],
  [Item.PYROARITE]: [Item.BLAZE_MEGA_SHARD, Item.HEART_SCALE],
  [Item.FLOETTITE]: [Item.HEART_MEGA_SHARD, Item.MIRACLE_SEED],
  [Item.MALAMARITE]: [Item.SHADOW_MEGA_SHARD, Item.TWISTED_SPOON],
  [Item.BARBARACITE]: [Item.ANCIENT_MEGA_SHARD, Item.CHARCOAL],
  [Item.DRAGALGITE]: [Item.SHADOW_MEGA_SHARD, Item.FOSSIL_STONE],
  [Item.HAWLUCHANITE]: [Item.SILK_MEGA_SHARD, Item.NEVER_MELT_ICE],
  [Item.ZYGARDITE]: [Item.TIDAL_MEGA_SHARD, Item.CHARCOAL],
  [Item.DRAMPANITE]: [Item.SILK_MEGA_SHARD, Item.FOSSIL_STONE],
  [Item.FALINKSITE]: [Item.SILK_MEGA_SHARD, Item.CHARCOAL],
  [Item.RAICHUNITE_X]: [Item.VOLT_MEGA_SHARD, Item.CHARCOAL],
  [Item.RAICHUNITE_Y]: [Item.VOLT_MEGA_SHARD, Item.BLACK_GLASSES],
  [Item.CHIMECHITE]: [Item.MIND_MEGA_SHARD, Item.MAGNET],
  [Item.ABSOLITE_Z]: [Item.SHADOW_MEGA_SHARD, Item.MAGNET],
  [Item.STARAPTITE]: [Item.SILK_MEGA_SHARD, Item.BLACK_GLASSES],
  [Item.GARCHOMPITE_Z]: [Item.TIDAL_MEGA_SHARD, Item.SILK_SCARF],
  [Item.LUCARIONITE_Z]: [Item.MIND_MEGA_SHARD, Item.MYSTIC_WATER],
  [Item.HEATRANITE]: [Item.BLAZE_MEGA_SHARD, Item.MAGNET],
  [Item.DARKRANITE]: [Item.HEART_MEGA_SHARD, Item.BLACK_GLASSES],
  [Item.GOLURKITE]: [Item.HEART_MEGA_SHARD, Item.FOSSIL_STONE],
  [Item.MEOWSTICITE]: [Item.MIND_MEGA_SHARD, Item.NEVER_MELT_ICE],
  [Item.CRABOMINITE]: [Item.FROST_MEGA_SHARD, Item.SILK_SCARF],
  [Item.GOLISOPITE]: [Item.HEART_MEGA_SHARD, Item.MAGNET],
  [Item.MAGEARNITE]: [Item.HEART_MEGA_SHARD, Item.MYSTIC_WATER],
  [Item.ZERAORITE]: [Item.HEART_MEGA_SHARD, Item.NEVER_MELT_ICE],
  [Item.SCOVILLAINITE]: [Item.BLAZE_MEGA_SHARD, Item.NEVER_MELT_ICE],
  [Item.BAXCALIBRITE]: [Item.FROST_MEGA_SHARD, Item.FOSSIL_STONE],
  [Item.TATSUGIRINITE]: [Item.HEART_MEGA_SHARD, Item.CHARCOAL],
  [Item.GLIMMORANITE]: [Item.HEART_MEGA_SHARD, Item.TWISTED_SPOON]
}

export function getMegaEvolution(pokemon: Pkm, stone: Item) {
  return MegaEvolutions.find(
    (m) => m.stone === stone && m.bases.includes(pokemon)
  )
}

// Mega Madness: Lucario's town, whose carousel is mostly Key Stones, can occur at these stages
// megas get the max tier of their ability values, but keep the sell price of their template
export const MEGA_STARS = 4
export const MegaTemplateByPkm = Object.fromEntries(
  MegaEvolutions.map((m) => [m.mega, m.template])
) as { [key in Pkm]?: Pkm }

// stat boosts of mega evolutions over their template form (Mega Sableye and Mega Rayquaza have their own stats)
export const MegaStatBoosts = {
  hpPercent: 50,
  atkPercent: 50,
  def: 5,
  speDef: 5,
  speed: 10,
  ap: 25
}

export type MegaStatBoost = typeof MegaStatBoosts

// alternative stat boosts used to set apart megas that share the same base pokemon
export const MegaStatProfiles = {
  physical: {
    hpPercent: 50,
    atkPercent: 80,
    def: 10,
    speDef: 0,
    speed: 10,
    ap: 10
  },
  special: {
    hpPercent: 35,
    atkPercent: 30,
    def: 0,
    speDef: 10,
    speed: 10,
    ap: 70
  },
  swift: {
    hpPercent: 35,
    atkPercent: 60,
    def: 0,
    speDef: 0,
    speed: 25,
    ap: 25
  },
  bulky: {
    hpPercent: 80,
    atkPercent: 40,
    def: 15,
    speDef: 15,
    speed: 0,
    ap: 25
  }
} satisfies Record<string, MegaStatBoost>

export type MegaStatProfile = keyof typeof MegaStatProfiles

export type MegaFormOverride = {
  profile: MegaStatProfile
  // replaces the ability of the template pokemon
  skill?: Ability
  range?: number
}

// megas with several forms (X/Y/Z) get a different ability or stat profile for each form
export const MegaFormOverrides: { [key in Pkm]?: MegaFormOverride } = {
  [Pkm.MEGA_CHARIZARD_X]: { profile: "physical", skill: Ability.OUTRAGE },
  [Pkm.MEGA_CHARIZARD_Y]: {
    profile: "special",
    skill: Ability.FIRE_BLAST,
    range: 3
  },
  [Pkm.MEGA_MEWTWO_X]: {
    profile: "physical",
    skill: Ability.CLOSE_COMBAT,
    range: 1
  },
  [Pkm.MEGA_MEWTWO_Y]: { profile: "special" },
  [Pkm.MEGA_RAICHU_X]: { profile: "swift", skill: Ability.VOLT_SWITCH },
  [Pkm.MEGA_RAICHU_Y]: {
    profile: "special",
    skill: Ability.ZAP_CANNON,
    range: 3
  },
  [Pkm.MEGA_ABSOL]: { profile: "physical" },
  [Pkm.MEGA_ABSOL_Z]: { profile: "swift", skill: Ability.SPECTRAL_THIEF },
  [Pkm.MEGA_GARCHOMP]: { profile: "bulky" },
  [Pkm.MEGA_GARCHOMP_Z]: { profile: "swift", skill: Ability.SCALE_SHOT },
  [Pkm.MEGA_LUCARIO]: { profile: "special" },
  [Pkm.MEGA_LUCARIO_Z]: {
    profile: "physical",
    skill: Ability.METEOR_MASH,
    range: 1
  }
}

export function getMegaStatBoost(mega: Pkm): MegaStatBoost {
  const override = MegaFormOverrides[mega]
  return override ? MegaStatProfiles[override.profile] : MegaStatBoosts
}

// many Mega Stones need a Silk Scarf: some carousels may offer extra ones, and a PvE fight always rewards one
export const MegaMadnessSilkScarfCarouselStages = [12, 17]
export const MEGA_MADNESS_SILK_SCARF_CAROUSEL_CHANCE = 1 / 2
export const MEGA_MADNESS_SILK_SCARVES_PER_CAROUSEL = 2
export const MEGA_MADNESS_SILK_SCARF_PVE_STAGE = 9

export const MegaMadnessKeyStoneTownStages = [12, 17, 22]
export const MEGA_MADNESS_KEY_STONE_TOWN_CHANCE = 1 / 5

// Mega Madness: winning this PvE stage always rewards a Key Stone
export const MEGA_MADNESS_KEY_STONE_PVE_STAGE = 14

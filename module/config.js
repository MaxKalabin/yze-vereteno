// namespace YZEVERETENO configuration values
export const YZEVERETENO = {};

YZEVERETENO.ASCII = `_______________________________
 ______   ______   ______   __   ______   __       __   ______
/\\  ___\\ /\\  __ \\ /\\  == \\ /\\ \\ /\\  __ \\ /\\ \\     /\\ \\ /\\  ___\\
\\ \\ \\____\\ \\ \\/\\ \\\\ \\  __< \\ \\ \\\\ \\ \\/\\ \\\\ \\ \\____\\ \\ \\\\ \\___  \\
 \\ \\_____\\\\ \\_____\\\\ \\_\\ \\_\\\\ \\_\\\\ \\_____\\\\ \\_____\\\\ \\_\\\\/\\_____\\
  \\/_____/ \\/_____/ \\/_/ /_/ \\/_/ \\/_____/ \\/_____/ \\/_/ \\/_____/
_______________________________`;

YZEVERETENO.maxRoll = 20;
YZEVERETENO.successesRoll = 17;
YZEVERETENO.failureRoll = 1;
YZEVERETENO.MaxEPTokensPerShip = 50; // internal use only for allocating EP token objects

YZEVERETENO.DEFAULT_PLAYER_KEY_ART =
  "systems/YZEVERETENO/css/images/unknown_player.png";
YZEVERETENO.DEFAULT_PLAYER_KEY_ART_TOKEN =
  "systems/YZEVERETENO/css/images/unknown_player_token.png";

YZEVERETENO.DEFAULT_SHIP_KEY_ART =
  "systems/YZEVERETENO/css/gods/spaceship-keyart.svg";

YZEVERETENO.attributes = {
  strength: "YZEVERETENO.AttrStrength",
  agility: "YZEVERETENO.AttrAgility",
  wits: "YZEVERETENO.AttrWits",
  empathy: "YZEVERETENO.AttrEmpathy",
};

YZEVERETENO.attributeRolls = {
  strength: "YZEVERETENO.AttrStrengthRoll",
  agility: "YZEVERETENO.AttrAgilityRoll",
  wits: "YZEVERETENO.AttrWitsRoll",
  empathy: "YZEVERETENO.AttrEmpathyRoll",
};

YZEVERETENO.crewPositions = {
  captain: "YZEVERETENO.CrewSpotCaptain",
  engineer: "YZEVERETENO.CrewSpotEngineer",
  pilot: "YZEVERETENO.CrewSpotPilot",
  sensorOperator: "YZEVERETENO.CrewSpotSensorOperator",
  gunner: "YZEVERETENO.CrewSpotGunner",
};

// maps crew positions to skill rolls
YZEVERETENO.crewRolls = {
  captain: "lidership",
  engineer: "mechanic",
  pilot: "pilot",
  sensorOperator: "cybershaman",
  gunner: "rangedcombat",
};

YZEVERETENO.skillCategories = {
  general: "YZEVERETENO.SkillCatGeneral",
  advanced: "YZEVERETENO.SkillCatAdvanced",
};

// The set of skills that can be trained in vereteno
YZEVERETENO.skills = {
  dexterity: "YZEVERETENO.SkillDexterity",
  force: "YZEVERETENO.SkillForce",
  stealth: "YZEVERETENO.SkillStealth",
  manipulation: "YZEVERETENO.SkillManipulation",
  meleecombat: "YZEVERETENO.SkillMeleeCombat",
  observation: "YZEVERETENO.SkillObservation",
  rangedcombat: "YZEVERETENO.SkillRangedCombat",
  survival: "YZEVERETENO.SkillSurvival",
  lidership: "YZEVERETENO.SkillLidership",
  culture: "YZEVERETENO.SkillCulture",
  cybershaman: "YZEVERETENO.SkillCybershaman",
  znaharstvo: "YZEVERETENO.SkillZnaharstvo",
  vedovstvo: "YZEVERETENO.SkillVedovstvo",
  pilot: "YZEVERETENO.SkillPilot",
  science: "YZEVERETENO.SkillScience",
  mechanic: "YZEVERETENO.SkillMechanic",
};

// The the statement that is used when rolling for that skill.
YZEVERETENO.skillRolls = {
  dexterity: "YZEVERETENO.SkillDexterityRoll",
  force: "YZEVERETENO.SkillForceRoll",
  stealth: "YZEVERETENO.SkillStealthRoll",
  manipulation: "YZEVERETENO.SkillManipulationRoll",
  meleecombat: "YZEVERETENO.SkillMeleeCombatRoll",
  observation: "YZEVERETENO.SkillObservationRoll",
  rangedcombat: "YZEVERETENO.SkillRangedCombatRoll",
  survival: "YZEVERETENO.SkillSurvivalRoll",
  lidership: "YZEVERETENO.SkillLidershipRoll",
  culture: "YZEVERETENO.SkillCultureRoll",
  cybershaman: "YZEVERETENO.SkillCybershamanRoll",
  znaharstvo: "YZEVERETENO.SkillZnaharstvoRoll",
  vedovstvo: "YZEVERETENO.SkillVedovstvoRoll",
  pilot: "YZEVERETENO.SkillPilotRoll",
  science: "YZEVERETENO.SkillScienceRoll",
  mechanic: "YZEVERETENO.SkillMechanicRoll",
};

YZEVERETENO.itemTypes = {
  weapon: "YZEVERETENO.Weapon",
  armor: "YZEVERETENO.Armor",
  gear: "YZEVERETENO.Gear",
  talent: "YZEVERETENO.Talent",
  injury: "YZEVERETENO.CriticalInjury",
};
YZEVERETENO.itemModifierNames = {
  itemModifierAttrStrength: "YZEVERETENO.AttrStrength",
  itemModifierAttrAgility: "YZEVERETENO.AttrAgility",
  itemModifierAttrWits: "YZEVERETENO.AttrWits",
  itemModifierAttrEmpathy: "YZEVERETENO.AttrEmpathy",
  itemModifierSkillDex: "YZEVERETENO.SkillDexterity",
  itemModifierSkillForce: "YZEVERETENO.SkillForce",
  itemModifierSkillInf: "YZEVERETENO.SkillStealth",
  itemModifierSkillMan: "YZEVERETENO.SkillManipulation",
  itemModifierSkillMelee: "YZEVERETENO.SkillMeleeCombat",
  itemModifierSkillObs: "YZEVERETENO.SkillObservation",
  itemModifierSkillRange: "YZEVERETENO.SkillRangedCombat",
  itemModifierSkillSurv: "YZEVERETENO.SkillSurvival",
  itemModifierSkillCom: "YZEVERETENO.SkillLidership",
  itemModifierSkillCult: "YZEVERETENO.SkillCulture",
  itemModifierSkillData: "YZEVERETENO.SkillCybershaman",
  itemModifierSkillMedi: "YZEVERETENO.SkillZnaharstvo",
  itemModifierSkillMys: "YZEVERETENO.SkillVedovstvo",
  itemModifierSkillPil: "YZEVERETENO.SkillPilot",
  itemModifierSkillSci: "YZEVERETENO.SkillScience",
  itemModifierSkillTech: "YZEVERETENO.SkillMechanic",
  itemModifierHP: "YZEVERETENO.HitPoints",
  itemModifierMP: "YZEVERETENO.MindPoints",
  itemModifierRad: "YZEVERETENO.Radiation",
  itemModifierEnc: "YZEVERETENO.Encumbrance",
  itemModifierMR: "YZEVERETENO.MovementRate",
};
// needed for some modules like Item Piles
CONFIG.Item.typeLabels = {
  weapon: "YZEVERETENO.Weapon",
  armor: "YZEVERETENO.Armor",
  gear: "YZEVERETENO.Gear",
  talent: "YZEVERETENO.Talent",
  injury: "YZEVERETENO.CriticalInjury",
  shipProblem: "YZEVERETENO.ShipИзъян",
  shipModule: "YZEVERETENO.Modules",
  shipFeature: "YZEVERETENO.ShipFeature",
  shipCriticalDamage: "YZEVERETENO.ShipCriticalDamage",
  shipLogbook: "YZEVERETENO.ShipLogbook",
};

// Talents

YZEVERETENO.talentCategories = {
  group: "YZEVERETENO.TalentCatGroup",
  god: "YZEVERETENO.TalentCatGod",
  general: "YZEVERETENO.TalentCatGeneral",
  humanite: "YZEVERETENO.TalentCatHumanite",
  cybernetic: "YZEVERETENO.TalentCatCybernetic",
  bionicsculpt: "YZEVERETENO.TalentCatBionicSculpt",
  mysticalpowers: "YZEVERETENO.TalentCatMysticalPowers",
};

YZEVERETENO.talentGroupConceptCategories = {
  freeTraders: "YZEVERETENO.GroupTalentCatFreeTraders",
  mercenaries: "YZEVERETENO.GroupTalentCatMercenaries",
  agents: "YZEVERETENO.GroupTalentCatAgents",
  explorers: "YZEVERETENO.GroupTalentCatExplorers",
  pilgrims: "YZEVERETENO.GroupTalentCatPilgrims",
};

YZEVERETENO.talents = {
  // free traders
  anoseforbirr: "YZEVERETENO.TalentANoseForBirr",
  everythingisforsale: "YZEVERETENO.TalentEverythingIsForSale",
  quickestroute: "YZEVERETENO.TalentQuickestRoute",
  // mercenaries
  assault: "YZEVERETENO.TalentAssault",
  charge: "YZEVERETENO.TalentCharge",
  situationalawareness: "YZEVERETENO.TalentSituationalAwareness",
  //agents
  afriendineveryport: "YZEVERETENO.TalentAFriendInEveryPort",
  assassinsguild: "YZEVERETENO.TalentAssassinsGuild",
  perunsofahlam: "YZEVERETENO.TalentPerunsOfAhlam",
  //explorers
  seasonedstribogs: "YZEVERETENO.TalentSeasonedStribogs",
  survivors: "YZEVERETENO.TalentSurvivors",
  truthseekers: "YZEVERETENO.TalentTruthSeekers",
  //pilgrims
  lastlaugh: "YZEVERETENO.TalentLastLaugh",
  mercyofthegods: "YZEVERETENO.TalentMercyOfTheGods",
  onelastbirr: "YZEVERETENO.TalentOneLastBirr",

  //god talents
  godrod: "YZEVERETENO.TalentGodRod",
  godperun: "YZEVERETENO.TalentGodPerun",
  goddajbog: "YZEVERETENO.TalentGodDajbog",
  godsvarog: "YZEVERETENO.TalentGodSvarog",
  godyrilo: "YZEVERETENO.TalentGodYrilo",
  godstribog: "YZEVERETENO.TalentGodStribog",
  godlada: "YZEVERETENO.TalentGodLada",
  godhors: "YZEVERETENO.TalentGodHors",
  godmorenaone: "YZEVERETENO.TalentGodMorenaOne",

  //general talents
  blessing: "YZEVERETENO.TalentBlessing",
  combatveteran: "YZEVERETENO.TalentCombatVeteran",
  defensive: "YZEVERETENO.TalentDefensive",
  executioner: "YZEVERETENO.TalentExecutioner",
  exospecialist: "YZEVERETENO.TalentExoSpecialist",
  factionstanding: "YZEVERETENO.TalentFactionStanding",
  fieldmedicurg: "YZEVERETENO.TalentFieldMedicurg",
  gearhead: "YZEVERETENO.TalentGearhead",
  intimidating: "YZEVERETENO.TalentIntimidating",
  horsofcharacter: "YZEVERETENO.TalentHorsOfCharacter",
  licensed: "YZEVERETENO.TalentLicensed",
  machinegunner: "YZEVERETENO.TalentMachinegunner",
  malicious: "YZEVERETENO.TalentMalicious",
  ninelives: "YZEVERETENO.TalentNineLives",
  pointblank: "YZEVERETENO.TalentPointBlank",
  rapidreload: "YZEVERETENO.TalentRapidReload",
  rugged: "YZEVERETENO.TalentRugged",
  seductive: "YZEVERETENO.TalentSeductive",
  sprinter: "YZEVERETENO.TalentSprinter",
  soothing: "YZEVERETENO.TalentSoothing",
  talismanmaker: "YZEVERETENO.TalentTalismanMaker",
  thehassassinsthrust: "YZEVERETENO.TalentTheHassassinsThrust",
  thirdeye: "YZEVERETENO.TalentThirdEye",
  tough: "YZEVERETENO.TalentTough",
  wealthyfamily: "YZEVERETENO.TalentWealthyFamily",
  zerogtraining: "YZEVERETENO.TalentZeroGTraining",

  //humanite talents
  humanitepheromones: "YZEVERETENO.TalentHumanitePheromones",
  humaniteresistant: "YZEVERETENO.TalentHumaniteResistant",
  humanitewaterbreathing: "YZEVERETENO.TalentHumaniteWaterBreathing",

  //cybernetic implants
  cyberneticacceleratedreflexes:
    "YZEVERETENO.TalentCyberneticAcceleratedReflexes",
  cyberneticactivesensors: "YZEVERETENO.TalentCyberneticActiveSensors",
  cyberneticbodyarmor: "YZEVERETENO.TalentCyberneticBodyArmor",
  cyberneticbuiltinweapon: "YZEVERETENO.TalentCyberneticBuiltInWeapon",
  cyberneticcomlink: "YZEVERETENO.TalentCyberneticComLink",
  cyberneticcyberneticmuscles: "YZEVERETENO.TalentCyberneticCyberneticMuscles",
  cyberneticendoskeleton: "YZEVERETENO.TalentCyberneticEndoSkeleton",
  cyberneticlanguagemodulator: "YZEVERETENO.TalentCyberneticLanguageModulator",
  cyberneticliedetector: "YZEVERETENO.TalentCyberneticLieDetector",
  cyberneticpassivesensors: "YZEVERETENO.TalentCyberneticPassiveSensors",
  cyberneticservolocks: "YZEVERETENO.TalentCyberneticServoLocks",
  cyberneticskinelectrodes: "YZEVERETENO.TalentCyberneticSkinElectrodes",
  cybernetictargetingscope: "YZEVERETENO.TalentCyberneticTargetingScope",
  cyberneticvoiceamplifier: "YZEVERETENO.TalentCyberneticVoiceAmplifier",
  cyberneticwaterbreathing: "YZEVERETENO.TalentCyberneticWaterBreathing",
  cyberneticweatherproof: "YZEVERETENO.TalentCyberneticWeatherproof",

  //bionic sculpts
  bionicbeautiful: "YZEVERETENO.TalentBionicBeautiful",
  bionicbuiltinweapon: "YZEVERETENO.TalentBionicBuiltInWeapon",
  bionicintelligent: "YZEVERETENO.TalentBionicIntelligent",
  bionicmorph: "YZEVERETENO.TalentBionicMorph",
  bionicnimble: "YZEVERETENO.TalentBionicNimble",
  bionicquick: "YZEVERETENO.TalentBionicQuick",
  bionicregenerate: "YZEVERETENO.TalentBionicRegenerate",

  //mystical powers
  mysticalartificer: "YZEVERETENO.TalentMysticalArtificer",
  mysticalclairvoyant: "YZEVERETENO.TalentMysticalClairvoyant",
  mysticalexorcist: "YZEVERETENO.TalentMysticalExorcist",
  mysticalintuition: "YZEVERETENO.TalentMysticalIntuition",
  mysticalmindreader: "YZEVERETENO.TalentMysticalMindReader",
  mysticalmindwalker: "YZEVERETENO.TalentMysticalMindWalker",
  mysticalprediction: "YZEVERETENO.TalentMysticalPrediction",
  mysticalpremonition: "YZEVERETENO.TalentMysticalPremonition",
  mysticalstop: "YZEVERETENO.TalentMysticalStop",
  mysticaltelekinesis: "YZEVERETENO.TalentMysticalTelekinesis",
};

YZEVERETENO.techTiers = {
  P: "YZEVERETENO.TechTierPrimitive",
  O: "YZEVERETENO.TechTierOrdinary",
  A: "YZEVERETENO.TechTierAdvanced",
  F: "YZEVERETENO.TechTierFaction",
  R: "YZEVERETENO.TechTierPortalBuilderRelic",
};

YZEVERETENO.gearWeights = {
  L: "YZEVERETENO.GearWeightLight",
  N: "YZEVERETENO.GearWeightNormal",
  H: "YZEVERETENO.GearWeightHeavy",
  T: "YZEVERETENO.GearWeightTiny",
  Z: "YZEVERETENO.GearWeightZero",
};

// We are normalizing the weight distribution so light objects aren't .5 but just 1.
YZEVERETENO.gearWeightPoints = {
  L: 1,
  N: 2,
  H: 4,
  T: 0,
  Z: 0,
};

// numeric crit types are just the flat dice successes needed to crit.
// custom typically have some custom property name that would apply to this weapon.
YZEVERETENO.critTypes = {
  numeric: "YZEVERETENO.CritTypeNumeric",
  custom: "YZEVERETENO.CritTypeCustom",
};

YZEVERETENO.ranges = {
  contact: "YZEVERETENO.ContactRange",
  short: "YZEVERETENO.ShortRange",
  close: "YZEVERETENO.CloseRange",
  medium: "YZEVERETENO.MediumRange",
  long: "YZEVERETENO.LongRange",
  extreme: "YZEVERETENO.ExtremeRange",
};

YZEVERETENO.shipWeaponRanges = {
  contact: "YZEVERETENO.ContactRange",
  short: "YZEVERETENO.ShortRange",
  medium: "YZEVERETENO.MediumRange",
  long: "YZEVERETENO.LongRange",
  extreme: "YZEVERETENO.ExtremeRange",
};

YZEVERETENO.gods = {
  rod: "YZEVERETENO.GodRod",
  perun: "YZEVERETENO.GodPerun",
  dajbog: "YZEVERETENO.GodDajbog",
  svarog: "YZEVERETENO.GodSvarog",
  yrilo: "YZEVERETENO.GodYrilo",
  stribog: "YZEVERETENO.GodStribog",
  lada: "YZEVERETENO.GodLada",
  hors: "YZEVERETENO.GodHors",
  morena: "YZEVERETENO.GodMorena",
  ediniy: "YZEVERETENO.GodEdiniy",
};

YZEVERETENO.skillGods = {
  dexterity: "stribog",
  force: "perun",
  stealth: "stribog",
  manipulation: "ediniy",
  meleecombat: "perun",
  observation: "rod",
  rangedcombat: "yrilo",
  survival: "dajbog",
  lidership: "rod",
  culture: "ediniy",
  cybershaman: "yrilo",
  znaharstvo: "dajbog",
  vedovstvo: "morena",
  pilot: "svarog",
  science: "hors",
  mechanic: "hors",
};

// General types are just either required or optional modules.
// Weapon types are a sub-category of modules that actually house weaponry.
YZEVERETENO.shipModuleCategories = {
  required: "YZEVERETENO.ShipModuleRequired",
  optional: "YZEVERETENO.ShipModuleOptional",
  weapon: "YZEVERETENO.ShipModuleWeapon",
};

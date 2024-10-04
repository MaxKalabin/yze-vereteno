// namespace yzevereteno configuration values
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
  "systems/yzevereteno/css/images/unknown_player.png";
YZEVERETENO.DEFAULT_PLAYER_KEY_ART_TOKEN =
  "systems/yzevereteno/css/images/unknown_player_token.png";

YZEVERETENO.DEFAULT_SHIP_KEY_ART =
  "systems/yzevereteno/css/icons/spaceship-keyart.svg";

YZEVERETENO.attributes = {
  strength: "yzevereteno.AttrStrength",
  agility: "yzevereteno.AttrAgility",
  wits: "yzevereteno.AttrWits",
  empathy: "yzevereteno.AttrEmpathy",
};

YZEVERETENO.attributeRolls = {
  strength: "yzevereteno.AttrStrengthRoll",
  agility: "yzevereteno.AttrAgilityRoll",
  wits: "yzevereteno.AttrWitsRoll",
  empathy: "yzevereteno.AttrEmpathyRoll",
};

YZEVERETENO.crewPositions = {
  captain: "yzevereteno.CrewSpotCaptain",
  engineer: "yzevereteno.CrewSpotEngineer",
  pilot: "yzevereteno.CrewSpotPilot",
  sensorOperator: "yzevereteno.CrewSpotSensorOperator",
  gunner: "yzevereteno.CrewSpotGunner",
};

// maps crew positions to skill rolls
YZEVERETENO.crewRolls = {
  captain: "command",
  engineer: "technology",
  pilot: "pilot",
  sensorOperator: "datadjinn",
  gunner: "rangedcombat",
};

YZEVERETENO.skillCategories = {
  general: "yzevereteno.SkillCatGeneral",
  advanced: "yzevereteno.SkillCatAdvanced",
};

// The set of skills that can be trained in vereteno
YZEVERETENO.skills = {
  dexterity: "yzevereteno.SkillDexterity",
  force: "yzevereteno.SkillForce",
  infiltration: "yzevereteno.SkillInfiltration",
  manipulation: "yzevereteno.SkillManipulation",
  meleecombat: "yzevereteno.SkillMeleeCombat",
  observation: "yzevereteno.SkillObservation",
  rangedcombat: "yzevereteno.SkillRangedCombat",
  survival: "yzevereteno.SkillSurvival",
  command: "yzevereteno.SkillCommand",
  culture: "yzevereteno.SkillCulture",
  datadjinn: "yzevereteno.SkillDataDjinn",
  medicurgy: "yzevereteno.SkillMedicurgy",
  mysticpowers: "yzevereteno.SkillMysticPowers",
  pilot: "yzevereteno.SkillPilot",
  science: "yzevereteno.SkillScience",
  technology: "yzevereteno.SkillTechnology",
};

// The the statement that is used when rolling for that skill.
YZEVERETENO.skillRolls = {
  dexterity: "yzevereteno.SkillDexterityRoll",
  force: "yzevereteno.SkillForceRoll",
  infiltration: "yzevereteno.SkillInfiltrationRoll",
  manipulation: "yzevereteno.SkillManipulationRoll",
  meleecombat: "yzevereteno.SkillMeleeCombatRoll",
  observation: "yzevereteno.SkillObservationRoll",
  rangedcombat: "yzevereteno.SkillRangedCombatRoll",
  survival: "yzevereteno.SkillSurvivalRoll",
  command: "yzevereteno.SkillCommandRoll",
  culture: "yzevereteno.SkillCultureRoll",
  datadjinn: "yzevereteno.SkillDataDjinnRoll",
  medicurgy: "yzevereteno.SkillMedicurgyRoll",
  mysticpowers: "yzevereteno.SkillMysticPowersRoll",
  pilot: "yzevereteno.SkillPilotRoll",
  science: "yzevereteno.SkillScienceRoll",
  technology: "yzevereteno.SkillTechnologyRoll",
};

YZEVERETENO.itemTypes = {
  weapon: "yzevereteno.Weapon",
  armor: "yzevereteno.Armor",
  gear: "yzevereteno.Gear",
  talent: "yzevereteno.Talent",
  injury: "yzevereteno.CriticalInjury",
};
YZEVERETENO.itemModifierNames = {
  itemModifierAttrStrength: "yzevereteno.AttrStrength",
  itemModifierAttrAgility: "yzevereteno.AttrAgility",
  itemModifierAttrWits: "yzevereteno.AttrWits",
  itemModifierAttrEmpathy: "yzevereteno.AttrEmpathy",
  itemModifierSkillDex: "yzevereteno.SkillDexterity",
  itemModifierSkillForce: "yzevereteno.SkillForce",
  itemModifierSkillInf: "yzevereteno.SkillInfiltration",
  itemModifierSkillMan: "yzevereteno.SkillManipulation",
  itemModifierSkillMelee: "yzevereteno.SkillMeleeCombat",
  itemModifierSkillObs: "yzevereteno.SkillObservation",
  itemModifierSkillRange: "yzevereteno.SkillRangedCombat",
  itemModifierSkillSurv: "yzevereteno.SkillSurvival",
  itemModifierSkillCom: "yzevereteno.SkillCommand",
  itemModifierSkillCult: "yzevereteno.SkillCulture",
  itemModifierSkillData: "yzevereteno.SkillDataDjinn",
  itemModifierSkillMedi: "yzevereteno.SkillMedicurgy",
  itemModifierSkillMys: "yzevereteno.SkillMysticPowers",
  itemModifierSkillPil: "yzevereteno.SkillPilot",
  itemModifierSkillSci: "yzevereteno.SkillScience",
  itemModifierSkillTech: "yzevereteno.SkillTechnology",
  itemModifierHP: "yzevereteno.HitPoints",
  itemModifierMP: "yzevereteno.MindPoints",
  itemModifierRad: "yzevereteno.Radiation",
  itemModifierEnc: "yzevereteno.Encumbrance",
  itemModifierMR: "yzevereteno.MovementRate",
};
// needed for some modules like Item Piles
CONFIG.Item.typeLabels = {
  weapon: "yzevereteno.Weapon",
  armor: "yzevereteno.Armor",
  gear: "yzevereteno.Gear",
  talent: "yzevereteno.Talent",
  injury: "yzevereteno.CriticalInjury",
  shipProblem: "yzevereteno.ShipProblem",
  shipModule: "yzevereteno.Modules",
  shipFeature: "yzevereteno.ShipFeature",
  shipCriticalDamage: "yzevereteno.ShipCriticalDamage",
  shipLogbook: "yzevereteno.ShipLogbook",
};

// Talents

YZEVERETENO.talentCategories = {
  group: "yzevereteno.TalentCatGroup",
  icon: "yzevereteno.TalentCatIcon",
  general: "yzevereteno.TalentCatGeneral",
  humanite: "yzevereteno.TalentCatHumanite",
  cybernetic: "yzevereteno.TalentCatCybernetic",
  bionicsculpt: "yzevereteno.TalentCatBionicSculpt",
  mysticalpowers: "yzevereteno.TalentCatMysticalPowers",
};

YZEVERETENO.talentGroupConceptCategories = {
  freeTraders: "yzevereteno.GroupTalentCatFreeTraders",
  mercenaries: "yzevereteno.GroupTalentCatMercenaries",
  agents: "yzevereteno.GroupTalentCatAgents",
  explorers: "yzevereteno.GroupTalentCatExplorers",
  pilgrims: "yzevereteno.GroupTalentCatPilgrims",
};

YZEVERETENO.talents = {
  // free traders
  anoseforbirr: "yzevereteno.TalentANoseForBirr",
  everythingisforsale: "yzevereteno.TalentEverythingIsForSale",
  quickestroute: "yzevereteno.TalentQuickestRoute",
  // mercenaries
  assault: "yzevereteno.TalentAssault",
  charge: "yzevereteno.TalentCharge",
  situationalawareness: "yzevereteno.TalentSituationalAwareness",
  //agents
  afriendineveryport: "yzevereteno.TalentAFriendInEveryPort",
  assassinsguild: "yzevereteno.TalentAssassinsGuild",
  dancersofahlam: "yzevereteno.TalentDancersOfAhlam",
  //explorers
  seasonedtravelers: "yzevereteno.TalentSeasonedTravelers",
  survivors: "yzevereteno.TalentSurvivors",
  truthseekers: "yzevereteno.TalentTruthSeekers",
  //pilgrims
  lastlaugh: "yzevereteno.TalentLastLaugh",
  mercyoftheicons: "yzevereteno.TalentMercyOfTheIcons",
  onelastbirr: "yzevereteno.TalentOneLastBirr",

  //icon talents
  iconladyoftears: "yzevereteno.TalentIconLadyOfTears",
  icondancer: "yzevereteno.TalentIconDancer",
  icongambler: "yzevereteno.TalentIconGambler",
  iconmerchant: "yzevereteno.TalentIconMerchant",
  icondeckhand: "yzevereteno.TalentIconDeckhand",
  icontraveler: "yzevereteno.TalentIconTraveler",
  iconmessenger: "yzevereteno.TalentIconMessenger",
  iconjudge: "yzevereteno.TalentIconJudge",
  iconfacelessone: "yzevereteno.TalentIconFacelessOne",

  //general talents
  blessing: "yzevereteno.TalentBlessing",
  combatveteran: "yzevereteno.TalentCombatVeteran",
  defensive: "yzevereteno.TalentDefensive",
  executioner: "yzevereteno.TalentExecutioner",
  exospecialist: "yzevereteno.TalentExoSpecialist",
  factionstanding: "yzevereteno.TalentFactionStanding",
  fieldmedicurg: "yzevereteno.TalentFieldMedicurg",
  gearhead: "yzevereteno.TalentGearhead",
  intimidating: "yzevereteno.TalentIntimidating",
  judgeofcharacter: "yzevereteno.TalentJudgeOfCharacter",
  licensed: "yzevereteno.TalentLicensed",
  machinegunner: "yzevereteno.TalentMachinegunner",
  malicious: "yzevereteno.TalentMalicious",
  ninelives: "yzevereteno.TalentNineLives",
  pointblank: "yzevereteno.TalentPointBlank",
  rapidreload: "yzevereteno.TalentRapidReload",
  rugged: "yzevereteno.TalentRugged",
  seductive: "yzevereteno.TalentSeductive",
  sprinter: "yzevereteno.TalentSprinter",
  soothing: "yzevereteno.TalentSoothing",
  talismanmaker: "yzevereteno.TalentTalismanMaker",
  thehassassinsthrust: "yzevereteno.TalentTheHassassinsThrust",
  thirdeye: "yzevereteno.TalentThirdEye",
  tough: "yzevereteno.TalentTough",
  wealthyfamily: "yzevereteno.TalentWealthyFamily",
  zerogtraining: "yzevereteno.TalentZeroGTraining",

  //humanite talents
  humanitepheromones: "yzevereteno.TalentHumanitePheromones",
  humaniteresistant: "yzevereteno.TalentHumaniteResistant",
  humanitewaterbreathing: "yzevereteno.TalentHumaniteWaterBreathing",

  //cybernetic implants
  cyberneticacceleratedreflexes:
    "yzevereteno.TalentCyberneticAcceleratedReflexes",
  cyberneticactivesensors: "yzevereteno.TalentCyberneticActiveSensors",
  cyberneticbodyarmor: "yzevereteno.TalentCyberneticBodyArmor",
  cyberneticbuiltinweapon: "yzevereteno.TalentCyberneticBuiltInWeapon",
  cyberneticcomlink: "yzevereteno.TalentCyberneticComLink",
  cyberneticcyberneticmuscles: "yzevereteno.TalentCyberneticCyberneticMuscles",
  cyberneticendoskeleton: "yzevereteno.TalentCyberneticEndoSkeleton",
  cyberneticlanguagemodulator: "yzevereteno.TalentCyberneticLanguageModulator",
  cyberneticliedetector: "yzevereteno.TalentCyberneticLieDetector",
  cyberneticpassivesensors: "yzevereteno.TalentCyberneticPassiveSensors",
  cyberneticservolocks: "yzevereteno.TalentCyberneticServoLocks",
  cyberneticskinelectrodes: "yzevereteno.TalentCyberneticSkinElectrodes",
  cybernetictargetingscope: "yzevereteno.TalentCyberneticTargetingScope",
  cyberneticvoiceamplifier: "yzevereteno.TalentCyberneticVoiceAmplifier",
  cyberneticwaterbreathing: "yzevereteno.TalentCyberneticWaterBreathing",
  cyberneticweatherproof: "yzevereteno.TalentCyberneticWeatherproof",

  //bionic sculpts
  bionicbeautiful: "yzevereteno.TalentBionicBeautiful",
  bionicbuiltinweapon: "yzevereteno.TalentBionicBuiltInWeapon",
  bionicintelligent: "yzevereteno.TalentBionicIntelligent",
  bionicmorph: "yzevereteno.TalentBionicMorph",
  bionicnimble: "yzevereteno.TalentBionicNimble",
  bionicquick: "yzevereteno.TalentBionicQuick",
  bionicregenerate: "yzevereteno.TalentBionicRegenerate",

  //mystical powers
  mysticalartificer: "yzevereteno.TalentMysticalArtificer",
  mysticalclairvoyant: "yzevereteno.TalentMysticalClairvoyant",
  mysticalexorcist: "yzevereteno.TalentMysticalExorcist",
  mysticalintuition: "yzevereteno.TalentMysticalIntuition",
  mysticalmindreader: "yzevereteno.TalentMysticalMindReader",
  mysticalmindwalker: "yzevereteno.TalentMysticalMindWalker",
  mysticalprediction: "yzevereteno.TalentMysticalPrediction",
  mysticalpremonition: "yzevereteno.TalentMysticalPremonition",
  mysticalstop: "yzevereteno.TalentMysticalStop",
  mysticaltelekinesis: "yzevereteno.TalentMysticalTelekinesis",
};

YZEVERETENO.techTiers = {
  P: "yzevereteno.TechTierPrimitive",
  O: "yzevereteno.TechTierOrdinary",
  A: "yzevereteno.TechTierAdvanced",
  F: "yzevereteno.TechTierFaction",
  R: "yzevereteno.TechTierPortalBuilderRelic",
};

YZEVERETENO.gearWeights = {
  L: "yzevereteno.GearWeightLight",
  N: "yzevereteno.GearWeightNormal",
  H: "yzevereteno.GearWeightHeavy",
  T: "yzevereteno.GearWeightTiny",
  Z: "yzevereteno.GearWeightZero",
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
  numeric: "yzevereteno.CritTypeNumeric",
  custom: "yzevereteno.CritTypeCustom",
};

YZEVERETENO.ranges = {
  contact: "yzevereteno.ContactRange",
  short: "yzevereteno.ShortRange",
  close: "yzevereteno.CloseRange",
  medium: "yzevereteno.MediumRange",
  long: "yzevereteno.LongRange",
  extreme: "yzevereteno.ExtremeRange",
};

YZEVERETENO.shipWeaponRanges = {
  contact: "yzevereteno.ContactRange",
  short: "yzevereteno.ShortRange",
  medium: "yzevereteno.MediumRange",
  long: "yzevereteno.LongRange",
  extreme: "yzevereteno.ExtremeRange",
};

YZEVERETENO.icons = {
  ladyOfTears: "yzevereteno.IconLadyOfTears",
  dancer: "yzevereteno.IconDancer",
  gambler: "yzevereteno.IconGambler",
  merchant: "yzevereteno.IconMerchant",
  deckhand: "yzevereteno.IconDeckhand",
  traveler: "yzevereteno.IconTraveler",
  messenger: "yzevereteno.IconMessenger",
  judge: "yzevereteno.IconJudge",
  faceless: "yzevereteno.IconFaceless",
};

YZEVERETENO.skillIcons = {
  dexterity: "dancer",
  force: "deckhand",
  infiltration: "faceless",
  manipulation: "merchant",
  meleecombat: "dancer",
  observation: "gambler",
  rangedcombat: "judge",
  survival: "traveler",
  command: "judge",
  culture: "traveler",
  datadjinn: "messenger",
  medicurgy: "ladyOfTears",
  mysticpowers: "faceless",
  pilot: "gambler",
  science: "messenger",
  technology: "messenger",
};

// General types are just either required or optional modules.
// Weapon types are a sub-category of modules that actually house weaponry.
YZEVERETENO.shipModuleCategories = {
  required: "yzevereteno.ShipModuleRequired",
  optional: "yzevereteno.ShipModuleOptional",
  weapon: "yzevereteno.ShipModuleWeapon",
};

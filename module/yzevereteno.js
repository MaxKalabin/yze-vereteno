// Import Modules
import { YZEVERETENO } from "./config.js";
import { registerSystemSettings } from "./settings.js";
import { yzeveretenoActor } from "./actor/actor.js";
import { yzeveretenoActorSheet } from "./actor/actor-sheet.js";
import { yzeveretenoShipSheet } from "./actor/ship-sheet.js";
import { yzeveretenoItem } from "./item/item.js";
import { yzeveretenoItemSheet } from "./item/item-sheet.js";
import { veretenoChatListeners } from "./vereteno-roll.js";
import {
  getAttributeKeyForWeaponType,
  getSkillKeyForWeaponType,
} from "./item/item.js";
import * as migrations from "./migration.js";
import { preloadHandlerbarsTemplates } from "./templates.js";
import {
  addDarknessPoints,
  spendDarknessPoints,
  displayDarknessPoints,
} from "./darkness-points.js";
import { getActorDataById } from "./util.js";
import {
  importShipSheetTutorial,
  showOnboardingMessage,
} from "./onboarding.js";
import { veretenoJournalSheet } from "./veretenoJournal.js";
import { DarknessPointDisplay } from "./darkness-points.js";

Hooks.once("init", async function () {
  console.log(`vereteno | Initializing vereteno\n${YZEVERETENO.ASCII}`);
  game.yzevereteno = {
    yzeveretenoActor,
    yzeveretenoItem,
    rollItemMacro,
    config: YZEVERETENO,
    migrations: migrations,
  };

  // Setup TinyMCE stylings
  CONFIG.TinyMCE.content_css = "systems/yzevereteno/css/yzeveretenomce.css";

  DocumentSheetConfig.registerSheet(
    JournalEntry,
    "yzevereteno",
    veretenoJournalSheet,
    { makeDefault: true }
  );

  preloadHandlerbarsTemplates();

  // Define custom Entity classes
  CONFIG.Actor.documentClass = yzeveretenoActor;
  CONFIG.Item.documentClass = yzeveretenoItem;
  CONFIG.YZEvereteno = YZEVERETENO;

  //Register system settings
  registerSystemSettings();

  // Register sheet application classes
  Actors.unregisterSheet("core", ActorSheet);
  Actors.registerSheet("yzevereteno", yzeveretenoActorSheet, {
    types: ["character"],
    makeDefault: true,
    label: "YZEvereteno.SheetClassCharacter",
  });
  Actors.registerSheet("yzevereteno", yzeveretenoActorSheet, {
    types: ["npc"],
    makeDefault: true,
    label: "YZEvereteno.SheetClassNPC",
  });
  Actors.registerSheet("yzevereteno", yzeveretenoShipSheet, {
    types: ["ship"],
    makeDefault: true,
    label: "YZEvereteno.SheetClassShip",
  });

  Items.unregisterSheet("core", ItemSheet);
  Items.registerSheet("yzevereteno", yzeveretenoItemSheet, {
    makeDefault: true,
    label: "SheetClassItem",
  });

  /**
   * Set an initiative formula for the system
   * @type {String}
   */
  CONFIG.Combat.initiative = {
    formula: "1d6+(1d6*0.1)",
    decimals: 1,
  };

  // register turn order changes. Currently it's sorting from high->low so no need to edit atm.
  //Combat.prototype.setupTurns = setupveretenoTurns;

  // Initialize Darkness Point Display
  DarknessPointDisplay.initialize();

  Handlebars.registerHelper("concat", function () {
    var outStr = "";
    for (var arg in arguments) {
      if (typeof arguments[arg] != "object") {
        outStr += arguments[arg];
      }
    }
    return outStr;
  });

  Handlebars.registerHelper("toLowerCase", function (str) {
    return str.toLowerCase();
  });

  Handlebars.registerHelper("if_eq", function (a, b, opts) {
    if (a === b) {
      return opts.fn(this);
    } else {
      return opts.inverse(this);
    }
  });

  Handlebars.registerHelper("if_gt", function (a, b, opts) {
    if (a > b) {
      return opts.fn(this);
    } else {
      return opts.inverse(this);
    }
  });

  Handlebars.registerHelper("if_notEmptyString", function (a, opts) {
    if (a !== "") {
      return opts.fn(this);
    } else {
      return opts.inverse(this);
    }
  });

  Handlebars.registerHelper("if_objectNotEmpty", function (obj, opts) {
    if (typeof obj === 'object' && obj !== null) {
      if (Object.keys(obj).length > 0) {
        return opts.fn(this);
      } else {
        return opts.inverse(this);
      }
    } else {
      return opts.inverse(this);
    }
    
  });

  Handlebars.registerHelper("getSkillName", function (skillkey) {
    return CONFIG.YZEvereteno.skills[skillkey];
  });
  Handlebars.registerHelper("getSkillRollName", function (skillkey) {
    return CONFIG.YZEvereteno.skillRolls[skillkey];
  });

  Handlebars.registerHelper("getSkillCategoryName", function (skillkey) {
    return CONFIG.YZEvereteno.skillCategories[skillkey];
  });

  Handlebars.registerHelper("getAttributeName", function (attributeKey) {
    return CONFIG.YZEvereteno.attributes[attributeKey];
  });

  Handlebars.registerHelper("getAttributeRollName", function (attributeKey) {
    return CONFIG.YZEvereteno.attributeRolls[attributeKey];
  });

  Handlebars.registerHelper("getItemTypeName", function (itemTypeKey) {
    return CONFIG.YZEvereteno.itemTypes[itemTypeKey];
  });

  Handlebars.registerHelper(
    "getTalentCategoryName",
    function (talentCategoryKey) {
      return CONFIG.YZEvereteno.talentCategories[talentCategoryKey];
    }
  );

  Handlebars.registerHelper("getGearWeightName", function (gearWeight) {
    return CONFIG.YZEvereteno.gearWeights[gearWeight];
  });

  Handlebars.registerHelper("getGearName", function (gearName) {
    return CONFIG.YZEvereteno.gearNames[gearName];
  });

  Handlebars.registerHelper("getTechTierName", function (tier) {
    return CONFIG.YZEvereteno.techTiers[tier];
  });

  Handlebars.registerHelper("getWeightName", function (weight) {
    return CONFIG.YZEvereteno.gearWeights[weight];
  });

  Handlebars.registerHelper("getRangeName", function (range) {
    return CONFIG.YZEvereteno.ranges[range];
  });

  Handlebars.registerHelper("getShipRangeName", function (range) {
    return CONFIG.YZEvereteno.shipWeaponRanges[range];
  });

  Handlebars.registerHelper("getWeaponCritDisplay", function (critObj) {
    if (critObj.numericValue > 0 && critObj.customValue !== "") {
      return `${critObj.numericValue}/${critObj.customValue}`;
    }
    if (critObj.numericValue > 0) {
      return `${critObj.numericValue}`;
    }
    if (critObj.customValue !== "") {
      return `${critObj.customValue}`;
    }
    return "";
  });

  Handlebars.registerHelper("percentcss", function (a, b) {
    if (b <= 0) {
      return 0;
    }
    return (a / b) * 100;
  });

  Handlebars.registerHelper("talentHasCost", function (talentCategory, opts) {
    if (talentCategory === "cybernetic" || talentCategory === "bionicsculpt") {
      return opts.fn(this);
    } else {
      return opts.inverse(this);
    }
  });

  Handlebars.registerHelper("getSkillKeyForWeaponType", function (isMelee) {
    return getSkillKeyForWeaponType(isMelee);
  });

  Handlebars.registerHelper("getAttributeKeyForWeaponType", function (isMelee) {
    return getAttributeKeyForWeaponType(isMelee);
  });

  // returns just the position without the ship name.
  Handlebars.registerHelper(
    "getCrewPositionNameBasic",
    function (crewPosition) {
      let positionName =
        CONFIG.YZEvereteno.crewPositions[crewPosition.position];
      // for non associated crew, just return position name
      if (!crewPosition.shipId) {
        return positionName;
      }
      // search for ship and grab "ship - crewPosition"
      let ship = game.actors.get(crewPosition.shipId);
      if (!ship) {
        console.warn("failed to find ship", crewPosition);
        return positionName;
      }
      return `${positionName}`;
    }
  );

  Handlebars.registerHelper(
    "getShipRollNameForPosition",
    function (crewPosition) {
      const skill = CONFIG.YZEvereteno.crewRolls[crewPosition.position];
      return CONFIG.YZEvereteno.skills[skill];
    }
  );

  Handlebars.registerHelper("getShipRollValueForPosition", function (crewId) {
    const crew = getActorDataById(crewId);
    const crewPosition = crew.system.bio.crewPosition;
    const skillKey = CONFIG.YZEvereteno.crewRolls[crewPosition.position];
    const skillValue = crew.system.skills[skillKey].value;
    const attribKey = crew.system.skills[skillKey].attribute;
    const attribValue = crew.system.attributes[attribKey].value;
    return attribValue + skillValue;
  });

  Handlebars.registerHelper("isNotEmpty", (obj) => {
    return Object.keys(obj).length > 0;
  });

  Handlebars.registerHelper("ShowFeatures", function () {
    return game.settings.get("yzevereteno", "AlwaysShowFeatures");
  });

  Handlebars.registerHelper("AdditionalRollInfos", function () {
    return game.settings.get("yzevereteno", "AdditionalRollInfos");
  });

  Handlebars.registerHelper("getItemModifierName", function (mod) {
    return CONFIG.YZEvereteno.itemModifierNames[mod];
  });

  Handlebars.registerHelper("subtract", function (a, b) {
    return parseInt(a)-parseInt(b);
  });
});

// called after game data is loaded from severs. entities exist
Hooks.once("setup", function () {
  // Localize CONFIG objects once up-front
  const toLocalize = [
    "attributes",
    "attributeRolls",
    "skillCategories",
    "skills",
    "skillRolls",
    "talentCategories",
    "talentGroupConceptCategories",
    "talents",
    "techTiers",
    "gearWeights",
    "critTypes",
    "ranges",
    "icons",
    "crewPositions",
    "shipModuleCategories",
    "shipWeaponRanges",
  ];

  // exclude sorting from some config values where the order matters.
  const noSort = [
    "talentCategories",
    "shipModuleCategories",
    "techTiers",
    "gearWeights",
    "critTypes",
    "ranges",
    "icons",
    "shipWeaponRanges",
  ];

  for (let o of toLocalize) {
    const localized = Object.entries(CONFIG.YZEvereteno[o]).map((e) => {
      return [e[0], game.i18n.localize(e[1])];
    });
    if (!noSort.includes(o)) localized.sort((a, b) => a[1].localeCompare(b[1]));
    CONFIG.YZEvereteno[o] = localized.reduce((obj, e) => {
      obj[e[0]] = e[1];
      return obj;
    }, {});
  }
});

// Activate chat listeners for vereteno
// eslint-disable-next-line no-unused-vars
Hooks.on("renderChatLog", (log, html, data) => {
  veretenoChatListeners(html);
});

Hooks.on("renderChatMessage", (app, html, msg) => {
  // Do not display "Blind" chat cards to non-gm
  if (html.hasClass("blind") && !game.user.isGM) {
    // since the header has timestamp content we'll remove the content instead.
    // this avoids an NPE when foundry tries to update the timestamps.
    html.find(".message-content").remove();
  }
  // remove push option from non-authors
  if (!game.user.isGM && msg.message.user !== game.user.id) {
    html.find(".dice-push").remove();
  }
});

Hooks.on("getSceneControlButtons", (controls) => {
  let group = controls.find((b) => b.name == "token");
  group.tools.push(
    {
      name: "add",
      title: "YZEvereteno.DarknessPointsAdd",
      icon: "fas fa-plus",
      buttons: true,
      visible: game.user.isGM,
      onClick: () => {
        addDarknessPoints(1);
      },
    },
    {
      name: "substract",
      title: "YZEvereteno.DarknessPointsRemove",
      icon: "fas fa-minus",
      buttons: true,
      visible: game.user.isGM,
      onClick: () => {
        spendDarknessPoints(1);
      },
    },
    {
      name: "inspect",
      title: "YZEvereteno.DarknessPoints",
      icon: "fas fa-question",
      buttons: true,
      visible: game.user.isGM,
      onClick: () => {
        displayDarknessPoints();
      },
    },
    {
      name: "display",
      title: "YZEvereteno.DarknessPointsControls",
      icon: "fas fa-moon",
      buttons: true,
      visible: game.settings.get("yzevereteno", "DarknessPointsVisibility")
        ? true
        : game.user.isGM,
      onClick: () => {
        DarknessPointDisplay.render();
      },
    }
  );
});

Hooks.once("ready", async function () {
  // Determine whether a system migration is required and feasible
  const currentVersion = game.system.version;
  const lastMigratedToVersion = game.settings.get(
    "yzevereteno",
    "systemMigrationVersion"
  );

  const NEEDS_MIGRATION_AFTER_VERSION = "3.1.0";
  const COMPATIBLE_MIGRATION_VERSION = "1.4.7";

  let needMigration =
    isNewerVersion(currentVersion, NEEDS_MIGRATION_AFTER_VERSION) &&
    isNewerVersion(NEEDS_MIGRATION_AFTER_VERSION, lastMigratedToVersion);

  // Perform the migration
  if (needMigration && game.user.isGM) {
    if (
      currentVersion &&
      isNewerVersion(COMPATIBLE_MIGRATION_VERSION, currentVersion)
    ) {
      ui.notifications.error(game.i18n.localize("ErrorsOldFoundryVersion"), {
        permanent: true,
      });
    }
    await migrations.migrateWorld();
  }

  //bootstrapTalentCompendium();
  //bootstrapGearCompendium();

  // wait to register hotbar drop hook on ready so that modules could register earlier if they want to
  Hooks.on("hotbarDrop", (bar, data, slot) => {
    createYzeveretenoMacro(data, slot);
    if (data.type === "Item") {
      return false;
    }
  });

  await importShipSheetTutorial();
  await showOnboardingMessage();
});

Hooks.on("updateUser", async () => {
  DarknessPointDisplay.update();
});

Hooks.once("diceSoNiceReady", (dice3d) => {
  dice3d.addSystem(
    { id: "yzevereteno", name: "vereteno: Third Horizon" },
    true
  );
  dice3d.addDicePreset({
    type: "d20",
    labels: [
      "systems/yzevereteno/css/images/dice-1.png",
      "systems/yzevereteno/css/images/dice-2.png",
      "systems/yzevereteno/css/images/dice-3.png",
      "systems/yzevereteno/css/images/dice-4.png",
      "systems/yzevereteno/css/images/dice-5.png",
      "systems/yzevereteno/css/images/dice-6.png",
    ],
    // bumpMaps: [, , , , , , , , , , , , , , , , , , ,
    //   "systems/archmage/images/nat20_BUMP.png"
    // ],
    system: "yzevereteno",
  });
  dice3d.addColorset(
    {
      name: "yzevereteno",
      description: "vereteno",
      category: "Colors",
      foreground: "#FFFFFF",
      background: "#000000",
      outline: "gray",
      texture: "none",
    },
    "force"
  );
});

/**
 * Create a macro from an Item drop
 * @param  {} documentData
 * @param  {} slot
 */
async function createYzeveretenoMacro(documentData, slot) {
  if (documentData.type !== "Item") return;
  if (!("uuid" in documentData))
    return ui.notifications.warn(
      game.i18n.localize("YZEvereteno.ErrorsNotOwnedItemForMacro")
    );
  const item = await fromUuid(documentData.uuid, false);
  if (!item || (item.type !== "weapon" && item.type !== "armor")) {
    return ui.notifications.warn(
      game.i18n.localize("YZEvereteno.ErrorsNoItemForMacro")
    );
  }
  // create the macro command.  Get an existing item macro if it exists.
  // Otherwise create a new one.
  const command = `game.yzevereteno.rollItemMacro("${item.name}");`;
  let macro = game.macros.contents.find(
    (m) => m.name === item.name && m.command === command
  );
  if (!macro) {
    macro = await Macro.create({
      name: item.name,
      type: "script",
      img: item.img,
      command: command,
      scope: "actor",
      flags: { "yzevereteno.itemMacro": true },
    });
  }
  game.user.assignHotbarMacro(macro, slot);
  return;
}

/**
 * Roll a macro item.
 * @param  {} itemName
 */
function rollItemMacro(itemName) {
  const speaker = ChatMessage.getSpeaker();
  let actor;
  if (speaker.token) actor = game.actors.tokens[speaker.token];
  if (!actor) actor = game.actors.get(speaker.actor);
  if (!actor) {
    return ui.notifications.warn(
      game.i18n.localize("YZEvereteno.ErrorsNoActorSelectedForMacro")
    );
  }
  // Get matching items
  const items = actor ? actor.items.filter((i) => i.name === itemName) : [];
  if (items.length > 1) {
    ui.notifications.warn(
      game.i18n.localize("YZEvereteno.ErrorsActorHasDuplicateItemsForMacro")
    );
  } else if (items.length === 0) {
    return ui.notifications.warn(
      game.i18n.localize("YZEvereteno.ErrorsActorNotHasItemForMacro")
    );
  }
  const item = items[0];

  // Trigger the item roll
  return item.roll();
}

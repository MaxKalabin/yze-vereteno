import {
  migrateActorKeyArtIfNeeded,
  migrateTalentBonus,
} from "../migration.js";
/**
 * Extend the base Actor entity by defining a custom roll data structure which is ideal for the Simple system.
 * @extends {Actor}
 */
export class YZEVERETENOActor extends Actor {
  /**
   * Augment the basic actor data with additional dynamic data.
   */
  prepareData() {
    super.prepareData();

    const actorData = this;

    // Make separate methods for each Actor type (character, npc, etc.) to keep
    // things organized.
    if (actorData.type === "character")
      this._prepareCharacterData(actorData, true);
    if (actorData.type === "npc") this._prepareCharacterData(actorData, false);
  }

  async _preCreate(initData, options, user) {
    await super._preCreate(initData, options, user);
    //setup default images for ships
    if (
      initData.type === "ship" &&
      ((hasProperty(initData, "img") && initData.img === Actor.DEFAULT_ICON) ||
        !hasProperty(initData, "img"))
    ) {
      this.updateSource({ img: CONFIG.YZEVERETENO.DEFAULT_SHIP_KEY_ART });
    }

    // we check the incoming data to make sure we aren't overriding a 'cloning'
    // operation.
    if (
      !hasProperty(initData, "img") &&
      (initData.type === "character" || initData.type === "npc")
    ) {
      this.updateSource({
        img: CONFIG.YZEVERETENO.DEFAULT_PLAYER_KEY_ART,
        prototypeToken: {
          texture: {
            src: CONFIG.YZEVERETENO.DEFAULT_PLAYER_KEY_ART_TOKEN,
          },
        },
      });
    }
  }

  async _onCreate(data, ...args) {
    await super._onCreate(data, ...args);
  }

  async _preUpdate(updateData, options, user) {
    await super._preUpdate(updateData, options, user);
  }

  static migrateData(source) {
    migrateActorKeyArtIfNeeded(source);
    if (source.items) {
      for (let item of source.items) {
        if (item.type !== "talent") {
          continue;
        }
        migrateTalentBonus(item);
      }
    }
    return super.migrateData(source);
  }
  /**
   * Prepare Character type specific data
   */
  _prepareCharacterData(actorData, capCharPoints) {
    const sysData = actorData.system;

    if (capCharPoints) {
      // Cap attribute scores
      Object.keys(sysData.attributes).forEach((k) => {
        let attr = sysData.attributes[k];
        if (attr.value > attr.max) {
          attr.value = attr.max;
        }
        if (attr.value < attr.min) {
          attr.value = attr.min;
        }
      });

      //Cap Skill scores
      Object.keys(sysData.skills).forEach((k) => {
        let skl = sysData.skills[k];
        if (skl.value > skl.max) {
          skl.value = skl.max;
        }
        if (skl.value < skl.min) {
          skl.value = skl.min;
        }
      });
    }

    let hpModifcations = this._prepHPModifications();
    let mpModifcations = this._prepMPModifications();
    let radiationModifcations = this._prepRadiationModifications();
    let encumbranceModifcations = this._prepEncumbranceModifications();
    let movementRateModifcations = this._prepMovementRateModifications();
    sysData.hitPoints.max =
      sysData.attributes.strength.value +
      sysData.attributes.agility.value +
      hpModifcations;
    sysData.mindPoints.max =
      sysData.attributes.wits.value +
      sysData.attributes.empathy.value +
      mpModifcations;
    sysData.radiation.max = sysData.radiation.max + radiationModifcations;
    sysData.movementRateMods = movementRateModifcations;
    sysData.encumbranceMods = encumbranceModifcations;

    if (sysData.hitPoints.value > sysData.hitPoints.max) {
      sysData.hitPoints.value = sysData.hitPoints.max;
    }
    if (sysData.mindPoints.value > sysData.mindPoints.max) {
      sysData.mindPoints.value = sysData.mindPoints.max;
    }

    // get the different modifiers and sort them into their attributes/skills
    sysData.itemModifiers = {
      strength: {},
      agility: {},
      wits: {},
      empathy: {},
      dexterity: {},
      force: {},
      stealth: {},
      manipulation: {},
      meleecombat: {},
      observation: {},
      rangedcombat: {},
      survival: {},
      lidership: {},
      culture: {},
      cybershaman: {},
      znaharstvo: {},
      vedovstvo: {},
      pilot: {},
      science: {},
      mechanic: {},
      armor: {},
    };
    for (let item of this.items) {
      for (let key in item.system.itemModifiers) {
        // everything with the strength-attribute
        if (item.system.itemModifiers[key].mod === "itemModifierAttrStrength") {
          sysData.itemModifiers.strength[`${key}|${item._id}`] = {
            id: `${key}|${item._id}`,
            name: item.name,
            attribute: game.i18n.localize("YZEVERETENO.AttrStrength"),
            skill: null,
            type: game.i18n.localize(CONFIG.YZEVERETENO.itemTypes[item.type]),
            value: item.system.itemModifiers[key].value,
            checked: false,
            prayer: false,
          };
          sysData.itemModifiers.force[`${key}|${item._id}`] = {
            id: `${key}|${item._id}`,
            name: item.name,
            attribute: game.i18n.localize("YZEVERETENO.AttrStrength"),
            skill: null,
            type: game.i18n.localize(CONFIG.YZEVERETENO.itemTypes[item.type]),
            value: item.system.itemModifiers[key].value,
            checked: false,
            prayer: false,
          };
          sysData.itemModifiers.meleecombat[`${key}|${item._id}`] = {
            id: `${key}|${item._id}`,
            name: item.name,
            attribute: game.i18n.localize("YZEVERETENO.AttrStrength"),
            skill: null,
            type: game.i18n.localize(CONFIG.YZEVERETENO.itemTypes[item.type]),
            value: item.system.itemModifiers[key].value,
            checked: false,
            prayer: false,
          };
        }
        if (item.system.itemModifiers[key].mod === "itemModifierSkillForce") {
          sysData.itemModifiers.force[`${key}|${item._id}`] = {
            id: `${key}|${item._id}`,
            name: item.name,
            attribute: game.i18n.localize("YZEVERETENO.AttrStrength"),
            skill: game.i18n.localize("YZEVERETENO.SkillForce"),
            type: game.i18n.localize(CONFIG.YZEVERETENO.itemTypes[item.type]),
            value: item.system.itemModifiers[key].value,
            checked: false,
            prayer: false,
          };
        }
        if (item.system.itemModifiers[key].mod === "itemModifierSkillMelee") {
          sysData.itemModifiers.meleecombat[`${key}|${item._id}`] = {
            id: `${key}|${item._id}`,
            name: item.name,
            attribute: game.i18n.localize("YZEVERETENO.AttrStrength"),
            skill: game.i18n.localize("YZEVERETENO.SkillMeleeCombat"),
            type: game.i18n.localize(CONFIG.YZEVERETENO.itemTypes[item.type]),
            value: item.system.itemModifiers[key].value,
            checked: false,
            prayer: false,
          };
        }
        // everything with the agility-attribute
        if (item.system.itemModifiers[key].mod === "itemModifierAttrAgility") {
          sysData.itemModifiers.agility[`${key}|${item._id}`] = {
            id: `${key}|${item._id}`,
            name: item.name,
            attribute: game.i18n.localize("YZEVERETENO.AttrAgility"),
            skill: null,
            type: game.i18n.localize(CONFIG.YZEVERETENO.itemTypes[item.type]),
            value: item.system.itemModifiers[key].value,
            checked: false,
            prayer: false,
          };
          sysData.itemModifiers.dexterity[`${key}|${item._id}`] = {
            id: `${key}|${item._id}`,
            name: item.name,
            attribute: game.i18n.localize("YZEVERETENO.AttrAgility"),
            skill: null,
            type: game.i18n.localize(CONFIG.YZEVERETENO.itemTypes[item.type]),
            value: item.system.itemModifiers[key].value,
            checked: false,
            prayer: false,
          };
          sysData.itemModifiers.stealth[`${key}|${item._id}`] = {
            id: `${key}|${item._id}`,
            name: item.name,
            attribute: game.i18n.localize("YZEVERETENO.AttrAgility"),
            skill: null,
            type: game.i18n.localize(CONFIG.YZEVERETENO.itemTypes[item.type]),
            value: item.system.itemModifiers[key].value,
            checked: false,
            prayer: false,
          };
          sysData.itemModifiers.rangedcombat[`${key}|${item._id}`] = {
            id: `${key}|${item._id}`,
            name: item.name,
            attribute: game.i18n.localize("YZEVERETENO.AttrAgility"),
            skill: null,
            type: game.i18n.localize(CONFIG.YZEVERETENO.itemTypes[item.type]),
            value: item.system.itemModifiers[key].value,
            checked: false,
            prayer: false,
          };
          sysData.itemModifiers.pilot[`${key}|${item._id}`] = {
            id: `${key}|${item._id}`,
            name: item.name,
            attribute: game.i18n.localize("YZEVERETENO.AttrAgility"),
            skill: null,
            type: game.i18n.localize(CONFIG.YZEVERETENO.itemTypes[item.type]),
            value: item.system.itemModifiers[key].value,
            checked: false,
            prayer: false,
          };
        }
        if (item.system.itemModifiers[key].mod === "itemModifierSkillDex") {
          sysData.itemModifiers.dexterity[`${key}|${item._id}`] = {
            id: `${key}|${item._id}`,
            name: item.name,
            attribute: game.i18n.localize("YZEVERETENO.AttrAgility"),
            skill: game.i18n.localize("YZEVERETENO.SkillDexterity"),
            type: game.i18n.localize(CONFIG.YZEVERETENO.itemTypes[item.type]),
            value: item.system.itemModifiers[key].value,
            checked: false,
            prayer: false,
          };
        }
        if (item.system.itemModifiers[key].mod === "itemModifierSkillInf") {
          sysData.itemModifiers.stealth[`${key}|${item._id}`] = {
            id: `${key}|${item._id}`,
            name: item.name,
            attribute: game.i18n.localize("YZEVERETENO.AttrAgility"),
            skill: game.i18n.localize("YZEVERETENO.SkillStealth"),
            type: game.i18n.localize(CONFIG.YZEVERETENO.itemTypes[item.type]),
            value: item.system.itemModifiers[key].value,
            checked: false,
            prayer: false,
          };
        }
        if (item.system.itemModifiers[key].mod === "itemModifierSkillRange") {
          sysData.itemModifiers.rangedcombat[`${key}|${item._id}`] = {
            id: `${key}|${item._id}`,
            name: item.name,
            attribute: game.i18n.localize("YZEVERETENO.AttrAgility"),
            skill: game.i18n.localize("YZEVERETENO.SkillRangedCombat"),
            type: game.i18n.localize(CONFIG.YZEVERETENO.itemTypes[item.type]),
            value: item.system.itemModifiers[key].value,
            checked: false,
            prayer: false,
          };
        }
        if (item.system.itemModifiers[key].mod === "itemModifierSkillPil") {
          sysData.itemModifiers.pilot[`${key}|${item._id}`] = {
            id: `${key}|${item._id}`,
            name: item.name,
            attribute: game.i18n.localize("YZEVERETENO.AttrAgility"),
            skill: game.i18n.localize("YZEVERETENO.SkillPilot"),
            type: game.i18n.localize(CONFIG.YZEVERETENO.itemTypes[item.type]),
            value: item.system.itemModifiers[key].value,
            checked: false,
            prayer: false,
          };
        }
        // everything with the wits-attribute
        if (item.system.itemModifiers[key].mod === "itemModifierAttrWits") {
          sysData.itemModifiers.wits[`${key}|${item._id}`] = {
            id: `${key}|${item._id}`,
            name: item.name,
            attribute: game.i18n.localize("YZEVERETENO.AttrWits"),
            skill: null,
            type: game.i18n.localize(CONFIG.YZEVERETENO.itemTypes[item.type]),
            value: item.system.itemModifiers[key].value,
            checked: false,
            prayer: false,
          };
          sysData.itemModifiers.observation[`${key}|${item._id}`] = {
            id: `${key}|${item._id}`,
            name: item.name,
            attribute: game.i18n.localize("YZEVERETENO.AttrWits"),
            skill: null,
            type: game.i18n.localize(CONFIG.YZEVERETENO.itemTypes[item.type]),
            value: item.system.itemModifiers[key].value,
            checked: false,
            prayer: false,
          };
          sysData.itemModifiers.survival[`${key}|${item._id}`] = {
            id: `${key}|${item._id}`,
            name: item.name,
            attribute: game.i18n.localize("YZEVERETENO.AttrWits"),
            skill: null,
            type: game.i18n.localize(CONFIG.YZEVERETENO.itemTypes[item.type]),
            value: item.system.itemModifiers[key].value,
            checked: false,
            prayer: false,
          };
          sysData.itemModifiers.cybershaman[`${key}|${item._id}`] = {
            id: `${key}|${item._id}`,
            name: item.name,
            attribute: game.i18n.localize("YZEVERETENO.AttrWits"),
            skill: null,
            type: game.i18n.localize(CONFIG.YZEVERETENO.itemTypes[item.type]),
            value: item.system.itemModifiers[key].value,
            checked: false,
            prayer: false,
          };
          sysData.itemModifiers.znaharstvo[`${key}|${item._id}`] = {
            id: `${key}|${item._id}`,
            name: item.name,
            attribute: game.i18n.localize("YZEVERETENO.AttrWits"),
            skill: null,
            type: game.i18n.localize(CONFIG.YZEVERETENO.itemTypes[item.type]),
            value: item.system.itemModifiers[key].value,
            checked: false,
            prayer: false,
          };
          sysData.itemModifiers.science[`${key}|${item._id}`] = {
            id: `${key}|${item._id}`,
            name: item.name,
            attribute: game.i18n.localize("YZEVERETENO.AttrWits"),
            skill: null,
            type: game.i18n.localize(CONFIG.YZEVERETENO.itemTypes[item.type]),
            value: item.system.itemModifiers[key].value,
            checked: false,
            prayer: false,
          };
          sysData.itemModifiers.mechanic[`${key}|${item._id}`] = {
            id: `${key}|${item._id}`,
            name: item.name,
            attribute: game.i18n.localize("YZEVERETENO.AttrWits"),
            skill: null,
            type: game.i18n.localize(CONFIG.YZEVERETENO.itemTypes[item.type]),
            value: item.system.itemModifiers[key].value,
            checked: false,
            prayer: false,
          };
        }
        if (item.system.itemModifiers[key].mod === "itemModifierSkillObs") {
          sysData.itemModifiers.observation[`${key}|${item._id}`] = {
            id: `${key}|${item._id}`,
            name: item.name,
            attribute: game.i18n.localize("YZEVERETENO.AttrWits"),
            skill: game.i18n.localize("YZEVERETENO.SkillObservation"),
            type: game.i18n.localize(CONFIG.YZEVERETENO.itemTypes[item.type]),
            value: item.system.itemModifiers[key].value,
            checked: false,
            prayer: false,
          };
        }
        if (item.system.itemModifiers[key].mod === "itemModifierSkillSurv") {
          sysData.itemModifiers.survival[`${key}|${item._id}`] = {
            id: `${key}|${item._id}`,
            name: item.name,
            attribute: game.i18n.localize("YZEVERETENO.AttrWits"),
            skill: game.i18n.localize("YZEVERETENO.SkillSurvival"),
            type: game.i18n.localize(CONFIG.YZEVERETENO.itemTypes[item.type]),
            value: item.system.itemModifiers[key].value,
            checked: false,
            prayer: false,
          };
        }
        if (item.system.itemModifiers[key].mod === "itemModifierSkillData") {
          sysData.itemModifiers.cybershaman[`${key}|${item._id}`] = {
            id: `${key}|${item._id}`,
            name: item.name,
            attribute: game.i18n.localize("YZEVERETENO.AttrWits"),
            skill: game.i18n.localize("YZEVERETENO.SkillCybershaman"),
            type: game.i18n.localize(CONFIG.YZEVERETENO.itemTypes[item.type]),
            value: item.system.itemModifiers[key].value,
            checked: false,
            prayer: false,
          };
        }
        if (item.system.itemModifiers[key].mod === "itemModifierSkillMedi") {
          sysData.itemModifiers.znaharstvo[`${key}|${item._id}`] = {
            id: `${key}|${item._id}`,
            name: item.name,
            attribute: game.i18n.localize("YZEVERETENO.AttrWits"),
            skill: game.i18n.localize("YZEVERETENO.SkillZnaharstvo"),
            type: game.i18n.localize(CONFIG.YZEVERETENO.itemTypes[item.type]),
            value: item.system.itemModifiers[key].value,
            checked: false,
            prayer: false,
          };
        }
        if (item.system.itemModifiers[key].mod === "itemModifierSkillSci") {
          sysData.itemModifiers.science[`${key}|${item._id}`] = {
            id: `${key}|${item._id}`,
            name: item.name,
            attribute: game.i18n.localize("YZEVERETENO.AttrWits"),
            skill: game.i18n.localize("YZEVERETENO.SkillScience"),
            type: game.i18n.localize(CONFIG.YZEVERETENO.itemTypes[item.type]),
            value: item.system.itemModifiers[key].value,
            checked: false,
            prayer: false,
          };
        }
        if (item.system.itemModifiers[key].mod === "itemModifierSkillTech") {
          sysData.itemModifiers.mechanic[`${key}|${item._id}`] = {
            id: `${key}|${item._id}`,
            name: item.name,
            attribute: game.i18n.localize("YZEVERETENO.AttrWits"),
            skill: game.i18n.localize("YZEVERETENO.SkillMechanic"),
            type: game.i18n.localize(CONFIG.YZEVERETENO.itemTypes[item.type]),
            value: item.system.itemModifiers[key].value,
            checked: false,
            prayer: false,
          };
        }
        // everything with the empathy-attribute
        if (item.system.itemModifiers[key].mod === "itemModifierAttrEmpathy") {
          sysData.itemModifiers.empathy[`${key}|${item._id}`] = {
            id: `${key}|${item._id}`,
            name: item.name,
            attribute: game.i18n.localize("YZEVERETENO.AttrEmpathy"),
            skill: null,
            type: game.i18n.localize(CONFIG.YZEVERETENO.itemTypes[item.type]),
            value: item.system.itemModifiers[key].value,
            checked: false,
            prayer: false,
          };
          sysData.itemModifiers.manipulation[`${key}|${item._id}`] = {
            id: `${key}|${item._id}`,
            name: item.name,
            attribute: game.i18n.localize("YZEVERETENO.AttrEmpathy"),
            skill: null,
            type: game.i18n.localize(CONFIG.YZEVERETENO.itemTypes[item.type]),
            value: item.system.itemModifiers[key].value,
            checked: false,
            prayer: false,
          };
          sysData.itemModifiers.lidership[`${key}|${item._id}`] = {
            id: `${key}|${item._id}`,
            name: item.name,
            attribute: game.i18n.localize("YZEVERETENO.AttrEmpathy"),
            skill: null,
            type: game.i18n.localize(CONFIG.YZEVERETENO.itemTypes[item.type]),
            value: item.system.itemModifiers[key].value,
            checked: false,
            prayer: false,
          };
          sysData.itemModifiers.culture[`${key}|${item._id}`] = {
            id: `${key}|${item._id}`,
            name: item.name,
            attribute: game.i18n.localize("YZEVERETENO.AttrEmpathy"),
            skill: null,
            type: game.i18n.localize(CONFIG.YZEVERETENO.itemTypes[item.type]),
            value: item.system.itemModifiers[key].value,
            checked: false,
            prayer: false,
          };
          sysData.itemModifiers.vedovstvo[`${key}|${item._id}`] = {
            id: `${key}|${item._id}`,
            name: item.name,
            attribute: game.i18n.localize("YZEVERETENO.AttrEmpathy"),
            skill: null,
            type: game.i18n.localize(CONFIG.YZEVERETENO.itemTypes[item.type]),
            value: item.system.itemModifiers[key].value,
            checked: false,
            prayer: false,
          };
        }
        if (item.system.itemModifiers[key].mod === "itemModifierSkillMan") {
          sysData.itemModifiers.manipulation[`${key}|${item._id}`] = {
            id: `${key}|${item._id}`,
            name: item.name,
            attribute: game.i18n.localize("YZEVERETENO.AttrEmpathy"),
            skill: game.i18n.localize("YZEVERETENO.SkillManipulation"),
            type: game.i18n.localize(CONFIG.YZEVERETENO.itemTypes[item.type]),
            value: item.system.itemModifiers[key].value,
            checked: false,
            prayer: false,
          };
        }
        if (item.system.itemModifiers[key].mod === "itemModifierSkillCom") {
          sysData.itemModifiers.lidership[`${key}|${item._id}`] = {
            id: `${key}|${item._id}`,
            name: item.name,
            attribute: game.i18n.localize("YZEVERETENO.AttrEmpathy"),
            skill: game.i18n.localize("YZEVERETENO.SkillLidership"),
            type: game.i18n.localize(CONFIG.YZEVERETENO.itemTypes[item.type]),
            value: item.system.itemModifiers[key].value,
            checked: false,
            prayer: false,
          };
        }
        if (item.system.itemModifiers[key].mod === "itemModifierSkillCult") {
          sysData.itemModifiers.culture[`${key}|${item._id}`] = {
            id: `${key}|${item._id}`,
            name: item.name,
            attribute: game.i18n.localize("YZEVERETENO.AttrEmpathy"),
            skill: game.i18n.localize("YZEVERETENO.SkillCulture"),
            type: game.i18n.localize(CONFIG.YZEVERETENO.itemTypes[item.type]),
            value: item.system.itemModifiers[key].value,
            checked: false,
            prayer: false,
          };
        }
        if (item.system.itemModifiers[key].mod === "itemModifierSkillMys") {
          sysData.itemModifiers.vedovstvo[`${key}|${item._id}`] = {
            id: `${key}|${item._id}`,
            name: item.name,
            attribute: game.i18n.localize("YZEVERETENO.AttrEmpathy"),
            skill: game.i18n.localize("YZEVERETENO.SkillVedovstvo"),
            type: game.i18n.localize(CONFIG.YZEVERETENO.itemTypes[item.type]),
            value: item.system.itemModifiers[key].value,
            checked: false,
            prayer: false,
          };
        }
        // other roll related modifiers
        if (item.system.itemModifiers[key].mod === "itemModifierArmor") {
          sysData.itemModifiers.armor[`${key}|${item._id}`] = {
            id: `${key}|${item._id}`,
            name: item.name,
            attribute: null,
            skill: null,
            type: game.i18n.localize(CONFIG.YZEVERETENO.itemTypes[item.type]),
            value: item.system.itemModifiers[key].value,
            checked: false,
            prayer: false,
          };
        }
        // all attributes
        if (item.system.itemModifiers[key].mod === "itemModifierAttrAll") {
          sysData.itemModifiers.strength[`${key}|${item._id}`] = {
            id: `${key}|${item._id}`,
            name: item.name,
            attribute: game.i18n.localize("YZEVERETENO.AttrAll"),
            skill: null,
            type: game.i18n.localize(CONFIG.YZEVERETENO.itemTypes[item.type]),
            value: item.system.itemModifiers[key].value,
            checked: false,
            prayer: false,
          };
          sysData.itemModifiers.agility[`${key}|${item._id}`] = {
            id: `${key}|${item._id}`,
            name: item.name,
            attribute: game.i18n.localize("YZEVERETENO.AttrAll"),
            skill: null,
            type: game.i18n.localize(CONFIG.YZEVERETENO.itemTypes[item.type]),
            value: item.system.itemModifiers[key].value,
            checked: false,
            prayer: false,
          };
          sysData.itemModifiers.wits[`${key}|${item._id}`] = {
            id: `${key}|${item._id}`,
            name: item.name,
            attribute: game.i18n.localize("YZEVERETENO.AttrAll"),
            skill: null,
            type: game.i18n.localize(CONFIG.YZEVERETENO.itemTypes[item.type]),
            value: item.system.itemModifiers[key].value,
            checked: false,
            prayer: false,
          };
          sysData.itemModifiers.empathy[`${key}|${item._id}`] = {
            id: `${key}|${item._id}`,
            name: item.name,
            attribute: game.i18n.localize("YZEVERETENO.AttrAll"),
            skill: null,
            type: game.i18n.localize(CONFIG.YZEVERETENO.itemTypes[item.type]),
            value: item.system.itemModifiers[key].value,
            checked: false,
            prayer: false,
          };
          // all attributes - general skills
          sysData.itemModifiers.dexterity[`${key}|${item._id}`] = {
            id: `${key}|${item._id}`,
            name: item.name,
            attribute: game.i18n.localize("YZEVERETENO.AttrAll"),
            skill: null,
            type: game.i18n.localize(CONFIG.YZEVERETENO.itemTypes[item.type]),
            value: item.system.itemModifiers[key].value,
            checked: false,
            prayer: false,
          };
          sysData.itemModifiers.force[`${key}|${item._id}`] = {
            id: `${key}|${item._id}`,
            name: item.name,
            attribute: game.i18n.localize("YZEVERETENO.AttrAll"),
            skill: null,
            type: game.i18n.localize(CONFIG.YZEVERETENO.itemTypes[item.type]),
            value: item.system.itemModifiers[key].value,
            checked: false,
            prayer: false,
          };
          sysData.itemModifiers.stealth[`${key}|${item._id}`] = {
            id: `${key}|${item._id}`,
            name: item.name,
            attribute: game.i18n.localize("YZEVERETENO.AttrAll"),
            skill: null,
            type: game.i18n.localize(CONFIG.YZEVERETENO.itemTypes[item.type]),
            value: item.system.itemModifiers[key].value,
            checked: false,
            prayer: false,
          };
          sysData.itemModifiers.manipulation[`${key}|${item._id}`] = {
            id: `${key}|${item._id}`,
            name: item.name,
            attribute: game.i18n.localize("YZEVERETENO.AttrAll"),
            skill: null,
            type: game.i18n.localize(CONFIG.YZEVERETENO.itemTypes[item.type]),
            value: item.system.itemModifiers[key].value,
            checked: false,
            prayer: false,
          };
          sysData.itemModifiers.meleecombat[`${key}|${item._id}`] = {
            id: `${key}|${item._id}`,
            name: item.name,
            attribute: game.i18n.localize("YZEVERETENO.AttrAll"),
            skill: null,
            type: game.i18n.localize(CONFIG.YZEVERETENO.itemTypes[item.type]),
            value: item.system.itemModifiers[key].value,
            checked: false,
            prayer: false,
          };
          sysData.itemModifiers.observation[`${key}|${item._id}`] = {
            id: `${key}|${item._id}`,
            name: item.name,
            attribute: game.i18n.localize("YZEVERETENO.AttrAll"),
            skill: null,
            type: game.i18n.localize(CONFIG.YZEVERETENO.itemTypes[item.type]),
            value: item.system.itemModifiers[key].value,
            checked: false,
            prayer: false,
          };
          sysData.itemModifiers.rangedcombat[`${key}|${item._id}`] = {
            id: `${key}|${item._id}`,
            name: item.name,
            attribute: game.i18n.localize("YZEVERETENO.AttrAll"),
            skill: null,
            type: game.i18n.localize(CONFIG.YZEVERETENO.itemTypes[item.type]),
            value: item.system.itemModifiers[key].value,
            checked: false,
            prayer: false,
          };
          sysData.itemModifiers.survival[`${key}|${item._id}`] = {
            id: `${key}|${item._id}`,
            name: item.name,
            attribute: game.i18n.localize("YZEVERETENO.AttrAll"),
            skill: null,
            type: game.i18n.localize(CONFIG.YZEVERETENO.itemTypes[item.type]),
            value: item.system.itemModifiers[key].value,
            checked: false,
            prayer: false,
          };
          // all attributes - advanced skills
          sysData.itemModifiers.lidership[`${key}|${item._id}`] = {
            id: `${key}|${item._id}`,
            name: item.name,
            attribute: game.i18n.localize("YZEVERETENO.AttrAll"),
            skill: null,
            type: game.i18n.localize(CONFIG.YZEVERETENO.itemTypes[item.type]),
            value: item.system.itemModifiers[key].value,
            checked: false,
            prayer: false,
          };
          sysData.itemModifiers.culture[`${key}|${item._id}`] = {
            id: `${key}|${item._id}`,
            name: item.name,
            attribute: game.i18n.localize("YZEVERETENO.AttrAll"),
            skill: null,
            type: game.i18n.localize(CONFIG.YZEVERETENO.itemTypes[item.type]),
            value: item.system.itemModifiers[key].value,
            checked: false,
            prayer: false,
          };
          sysData.itemModifiers.cybershaman[`${key}|${item._id}`] = {
            id: `${key}|${item._id}`,
            name: item.name,
            attribute: game.i18n.localize("YZEVERETENO.AttrAll"),
            skill: null,
            type: game.i18n.localize(CONFIG.YZEVERETENO.itemTypes[item.type]),
            value: item.system.itemModifiers[key].value,
            checked: false,
            prayer: false,
          };
          sysData.itemModifiers.znaharstvo[`${key}|${item._id}`] = {
            id: `${key}|${item._id}`,
            name: item.name,
            attribute: game.i18n.localize("YZEVERETENO.AttrAll"),
            skill: null,
            type: game.i18n.localize(CONFIG.YZEVERETENO.itemTypes[item.type]),
            value: item.system.itemModifiers[key].value,
            checked: false,
            prayer: false,
          };
          sysData.itemModifiers.vedovstvo[`${key}|${item._id}`] = {
            id: `${key}|${item._id}`,
            name: item.name,
            attribute: game.i18n.localize("YZEVERETENO.AttrAll"),
            skill: null,
            type: game.i18n.localize(CONFIG.YZEVERETENO.itemTypes[item.type]),
            value: item.system.itemModifiers[key].value,
            checked: false,
            prayer: false,
          };
          sysData.itemModifiers.pilot[`${key}|${item._id}`] = {
            id: `${key}|${item._id}`,
            name: item.name,
            attribute: game.i18n.localize("YZEVERETENO.AttrAll"),
            skill: null,
            type: game.i18n.localize(CONFIG.YZEVERETENO.itemTypes[item.type]),
            value: item.system.itemModifiers[key].value,
            checked: false,
            prayer: false,
          };
          sysData.itemModifiers.science[`${key}|${item._id}`] = {
            id: `${key}|${item._id}`,
            name: item.name,
            attribute: game.i18n.localize("YZEVERETENO.AttrAll"),
            skill: null,
            type: game.i18n.localize(CONFIG.YZEVERETENO.itemTypes[item.type]),
            value: item.system.itemModifiers[key].value,
            checked: false,
            prayer: false,
          };
          sysData.itemModifiers.mechanic[`${key}|${item._id}`] = {
            id: `${key}|${item._id}`,
            name: item.name,
            attribute: game.i18n.localize("YZEVERETENO.AttrAll"),
            skill: null,
            type: game.i18n.localize(CONFIG.YZEVERETENO.itemTypes[item.type]),
            value: item.system.itemModifiers[key].value,
            checked: false,
            prayer: false,
          };
        }
        // all general skills
        if (
          item.system.itemModifiers[key].mod ===
          "itemModifierSkillCatGeneralAll"
        ) {
          sysData.itemModifiers.dexterity[`${key}|${item._id}`] = {
            id: `${key}|${item._id}`,
            name: item.name,
            attribute: null,
            skill: game.i18n.localize("YZEVERETENO.SkillCatGeneralAll"),
            type: game.i18n.localize(CONFIG.YZEVERETENO.itemTypes[item.type]),
            value: item.system.itemModifiers[key].value,
            checked: false,
            prayer: false,
          };
          sysData.itemModifiers.force[`${key}|${item._id}`] = {
            id: `${key}|${item._id}`,
            name: item.name,
            attribute: null,
            skill: game.i18n.localize("YZEVERETENO.SkillCatGeneralAll"),
            type: game.i18n.localize(CONFIG.YZEVERETENO.itemTypes[item.type]),
            value: item.system.itemModifiers[key].value,
            checked: false,
            prayer: false,
          };
          sysData.itemModifiers.stealth[`${key}|${item._id}`] = {
            id: `${key}|${item._id}`,
            name: item.name,
            attribute: null,
            skill: game.i18n.localize("YZEVERETENO.SkillCatGeneralAll"),
            type: game.i18n.localize(CONFIG.YZEVERETENO.itemTypes[item.type]),
            value: item.system.itemModifiers[key].value,
            checked: false,
            prayer: false,
          };
          sysData.itemModifiers.manipulation[`${key}|${item._id}`] = {
            id: `${key}|${item._id}`,
            name: item.name,
            attribute: null,
            skill: game.i18n.localize("YZEVERETENO.SkillCatGeneralAll"),
            type: game.i18n.localize(CONFIG.YZEVERETENO.itemTypes[item.type]),
            value: item.system.itemModifiers[key].value,
            checked: false,
            prayer: false,
          };
          sysData.itemModifiers.meleecombat[`${key}|${item._id}`] = {
            id: `${key}|${item._id}`,
            name: item.name,
            attribute: null,
            skill: game.i18n.localize("YZEVERETENO.SkillCatGeneralAll"),
            type: game.i18n.localize(CONFIG.YZEVERETENO.itemTypes[item.type]),
            value: item.system.itemModifiers[key].value,
            checked: false,
            prayer: false,
          };
          sysData.itemModifiers.observation[`${key}|${item._id}`] = {
            id: `${key}|${item._id}`,
            name: item.name,
            attribute: null,
            skill: game.i18n.localize("YZEVERETENO.SkillCatGeneralAll"),
            type: game.i18n.localize(CONFIG.YZEVERETENO.itemTypes[item.type]),
            value: item.system.itemModifiers[key].value,
            checked: false,
            prayer: false,
          };
          sysData.itemModifiers.rangedcombat[`${key}|${item._id}`] = {
            id: `${key}|${item._id}`,
            name: item.name,
            attribute: null,
            skill: game.i18n.localize("YZEVERETENO.SkillCatGeneralAll"),
            type: game.i18n.localize(CONFIG.YZEVERETENO.itemTypes[item.type]),
            value: item.system.itemModifiers[key].value,
            checked: false,
            prayer: false,
          };
          sysData.itemModifiers.survival[`${key}|${item._id}`] = {
            id: `${key}|${item._id}`,
            name: item.name,
            attribute: null,
            skill: game.i18n.localize("YZEVERETENO.SkillCatGeneralAll"),
            type: game.i18n.localize(CONFIG.YZEVERETENO.itemTypes[item.type]),
            value: item.system.itemModifiers[key].value,
            checked: false,
            prayer: false,
          };
        }
        // all advanced skills
        if (
          item.system.itemModifiers[key].mod ===
          "itemModifierSkillCatAdvancedAll"
        ) {
          sysData.itemModifiers.lidership[`${key}|${item._id}`] = {
            id: `${key}|${item._id}`,
            name: item.name,
            attribute: null,
            skill: game.i18n.localize("YZEVERETENO.SkillCatAdvancedAll"),
            type: game.i18n.localize(CONFIG.YZEVERETENO.itemTypes[item.type]),
            value: item.system.itemModifiers[key].value,
            checked: false,
            prayer: false,
          };
          sysData.itemModifiers.culture[`${key}|${item._id}`] = {
            id: `${key}|${item._id}`,
            name: item.name,
            attribute: null,
            skill: game.i18n.localize("YZEVERETENO.SkillCatAdvancedAll"),
            type: game.i18n.localize(CONFIG.YZEVERETENO.itemTypes[item.type]),
            value: item.system.itemModifiers[key].value,
            checked: false,
            prayer: false,
          };
          sysData.itemModifiers.cybershaman[`${key}|${item._id}`] = {
            id: `${key}|${item._id}`,
            name: item.name,
            attribute: null,
            skill: game.i18n.localize("YZEVERETENO.SkillCatAdvancedAll"),
            type: game.i18n.localize(CONFIG.YZEVERETENO.itemTypes[item.type]),
            value: item.system.itemModifiers[key].value,
            checked: false,
            prayer: false,
          };
          sysData.itemModifiers.znaharstvo[`${key}|${item._id}`] = {
            id: `${key}|${item._id}`,
            name: item.name,
            attribute: null,
            skill: game.i18n.localize("YZEVERETENO.SkillCatAdvancedAll"),
            type: game.i18n.localize(CONFIG.YZEVERETENO.itemTypes[item.type]),
            value: item.system.itemModifiers[key].value,
            checked: false,
            prayer: false,
          };
          sysData.itemModifiers.vedovstvo[`${key}|${item._id}`] = {
            id: `${key}|${item._id}`,
            name: item.name,
            attribute: null,
            skill: game.i18n.localize("YZEVERETENO.SkillCatAdvancedAll"),
            type: game.i18n.localize(CONFIG.YZEVERETENO.itemTypes[item.type]),
            value: item.system.itemModifiers[key].value,
            checked: false,
            prayer: false,
          };
          sysData.itemModifiers.pilot[`${key}|${item._id}`] = {
            id: `${key}|${item._id}`,
            name: item.name,
            attribute: null,
            skill: game.i18n.localize("YZEVERETENO.SkillCatAdvancedAll"),
            type: game.i18n.localize(CONFIG.YZEVERETENO.itemTypes[item.type]),
            value: item.system.itemModifiers[key].value,
            checked: false,
            prayer: false,
          };
          sysData.itemModifiers.science[`${key}|${item._id}`] = {
            id: `${key}|${item._id}`,
            name: item.name,
            attribute: null,
            skill: game.i18n.localize("YZEVERETENO.SkillCatAdvancedAll"),
            type: game.i18n.localize(CONFIG.YZEVERETENO.itemTypes[item.type]),
            value: item.system.itemModifiers[key].value,
            checked: false,
            prayer: false,
          };
          sysData.itemModifiers.mechanic[`${key}|${item._id}`] = {
            id: `${key}|${item._id}`,
            name: item.name,
            attribute: null,
            skill: game.i18n.localize("YZEVERETENO.SkillCatAdvancedAll"),
            type: game.i18n.localize(CONFIG.YZEVERETENO.itemTypes[item.type]),
            value: item.system.itemModifiers[key].value,
            checked: false,
            prayer: false,
          };
        }
        // all blessings
        if (item.system.itemModifiers[key].mod === "itemModifierBlessingsAll") {
          // all blessings - general skills
          sysData.itemModifiers.dexterity[`${key}|${item._id}`] = {
            id: `${key}|${item._id}`,
            name: item.name,
            attribute: null,
            skill: game.i18n.localize("YZEVERETENO.BlessingsAll"),
            type: game.i18n.localize(CONFIG.YZEVERETENO.itemTypes[item.type]),
            value: item.system.itemModifiers[key].value,
            checked: false,
            prayer: false,
          };
          sysData.itemModifiers.force[`${key}|${item._id}`] = {
            id: `${key}|${item._id}`,
            name: item.name,
            attribute: null,
            skill: game.i18n.localize("YZEVERETENO.BlessingsAll"),
            type: game.i18n.localize(CONFIG.YZEVERETENO.itemTypes[item.type]),
            value: item.system.itemModifiers[key].value,
            checked: false,
            prayer: false,
          };
          sysData.itemModifiers.stealth[`${key}|${item._id}`] = {
            id: `${key}|${item._id}`,
            name: item.name,
            attribute: null,
            skill: game.i18n.localize("YZEVERETENO.BlessingsAll"),
            type: game.i18n.localize(CONFIG.YZEVERETENO.itemTypes[item.type]),
            value: item.system.itemModifiers[key].value,
            checked: false,
            prayer: false,
          };
          sysData.itemModifiers.manipulation[`${key}|${item._id}`] = {
            id: `${key}|${item._id}`,
            name: item.name,
            attribute: null,
            skill: game.i18n.localize("YZEVERETENO.BlessingsAll"),
            type: game.i18n.localize(CONFIG.YZEVERETENO.itemTypes[item.type]),
            value: item.system.itemModifiers[key].value,
            checked: false,
            prayer: false,
          };
          sysData.itemModifiers.meleecombat[`${key}|${item._id}`] = {
            id: `${key}|${item._id}`,
            name: item.name,
            attribute: null,
            skill: game.i18n.localize("YZEVERETENO.BlessingsAll"),
            type: game.i18n.localize(CONFIG.YZEVERETENO.itemTypes[item.type]),
            value: item.system.itemModifiers[key].value,
            checked: false,
            prayer: false,
          };
          sysData.itemModifiers.observation[`${key}|${item._id}`] = {
            id: `${key}|${item._id}`,
            name: item.name,
            attribute: null,
            skill: game.i18n.localize("YZEVERETENO.BlessingsAll"),
            type: game.i18n.localize(CONFIG.YZEVERETENO.itemTypes[item.type]),
            value: item.system.itemModifiers[key].value,
            checked: false,
            prayer: false,
          };
          sysData.itemModifiers.rangedcombat[`${key}|${item._id}`] = {
            id: `${key}|${item._id}`,
            name: item.name,
            attribute: null,
            skill: game.i18n.localize("YZEVERETENO.BlessingsAll"),
            type: game.i18n.localize(CONFIG.YZEVERETENO.itemTypes[item.type]),
            value: item.system.itemModifiers[key].value,
            checked: false,
            prayer: false,
          };
          sysData.itemModifiers.survival[`${key}|${item._id}`] = {
            id: `${key}|${item._id}`,
            name: item.name,
            attribute: null,
            skill: game.i18n.localize("YZEVERETENO.BlessingsAll"),
            type: game.i18n.localize(CONFIG.YZEVERETENO.itemTypes[item.type]),
            value: item.system.itemModifiers[key].value,
            checked: false,
            prayer: false,
          };
          // all blessings - advanced skills
          sysData.itemModifiers.lidership[`${key}|${item._id}`] = {
            id: `${key}|${item._id}`,
            name: item.name,
            attribute: null,
            skill: game.i18n.localize("YZEVERETENO.BlessingsAll"),
            type: game.i18n.localize(CONFIG.YZEVERETENO.itemTypes[item.type]),
            value: item.system.itemModifiers[key].value,
            checked: false,
            prayer: false,
          };
          sysData.itemModifiers.culture[`${key}|${item._id}`] = {
            id: `${key}|${item._id}`,
            name: item.name,
            attribute: null,
            skill: game.i18n.localize("YZEVERETENO.BlessingsAll"),
            type: game.i18n.localize(CONFIG.YZEVERETENO.itemTypes[item.type]),
            value: item.system.itemModifiers[key].value,
            checked: false,
            prayer: false,
          };
          sysData.itemModifiers.cybershaman[`${key}|${item._id}`] = {
            id: `${key}|${item._id}`,
            name: item.name,
            attribute: null,
            skill: game.i18n.localize("YZEVERETENO.BlessingsAll"),
            type: game.i18n.localize(CONFIG.YZEVERETENO.itemTypes[item.type]),
            value: item.system.itemModifiers[key].value,
            checked: false,
            prayer: false,
          };
          sysData.itemModifiers.znaharstvo[`${key}|${item._id}`] = {
            id: `${key}|${item._id}`,
            name: item.name,
            attribute: null,
            skill: game.i18n.localize("YZEVERETENO.BlessingsAll"),
            type: game.i18n.localize(CONFIG.YZEVERETENO.itemTypes[item.type]),
            value: item.system.itemModifiers[key].value,
            checked: false,
            prayer: false,
          };
          sysData.itemModifiers.vedovstvo[`${key}|${item._id}`] = {
            id: `${key}|${item._id}`,
            name: item.name,
            attribute: null,
            skill: game.i18n.localize("YZEVERETENO.BlessingsAll"),
            type: game.i18n.localize(CONFIG.YZEVERETENO.itemTypes[item.type]),
            value: item.system.itemModifiers[key].value,
            checked: false,
            prayer: false,
          };
          sysData.itemModifiers.pilot[`${key}|${item._id}`] = {
            id: `${key}|${item._id}`,
            name: item.name,
            attribute: null,
            skill: game.i18n.localize("YZEVERETENO.BlessingsAll"),
            type: game.i18n.localize(CONFIG.YZEVERETENO.itemTypes[item.type]),
            value: item.system.itemModifiers[key].value,
            checked: false,
            prayer: false,
          };
          sysData.itemModifiers.science[`${key}|${item._id}`] = {
            id: `${key}|${item._id}`,
            name: item.name,
            attribute: null,
            skill: game.i18n.localize("YZEVERETENO.BlessingsAll"),
            type: game.i18n.localize(CONFIG.YZEVERETENO.itemTypes[item.type]),
            value: item.system.itemModifiers[key].value,
            checked: false,
            prayer: false,
          };
          sysData.itemModifiers.mechanic[`${key}|${item._id}`] = {
            id: `${key}|${item._id}`,
            name: item.name,
            attribute: null,
            skill: game.i18n.localize("YZEVERETENO.BlessingsAll"),
            type: game.i18n.localize(CONFIG.YZEVERETENO.itemTypes[item.type]),
            value: item.system.itemModifiers[key].value,
            checked: false,
            prayer: false,
          };
        }
        // blessing - lada
        if (
          item.system.itemModifiers[key].mod ===
          "itemModifierBlessingsLada"
        ) {
          sysData.itemModifiers.cybershaman[`${key}|${item._id}`] = {
            id: `${key}|${item._id}`,
            name: item.name,
            attribute: null,
            skill: `${game.i18n.localize(
              "YZEVERETENO.Blessing"
            )}: ${game.i18n.localize("YZEVERETENO.GodLada")}`,
            type: game.i18n.localize(CONFIG.YZEVERETENO.itemTypes[item.type]),
            value: item.system.itemModifiers[key].value,
            checked: false,
            prayer: false,
          };
          sysData.itemModifiers.science[`${key}|${item._id}`] = {
            id: `${key}|${item._id}`,
            name: item.name,
            attribute: null,
            skill: `${game.i18n.localize(
              "YZEVERETENO.Blessing"
            )}: ${game.i18n.localize("YZEVERETENO.GodLada")}`,
            type: game.i18n.localize(CONFIG.YZEVERETENO.itemTypes[item.type]),
            value: item.system.itemModifiers[key].value,
            checked: false,
            prayer: false,
          };
          sysData.itemModifiers.mechanic[`${key}|${item._id}`] = {
            id: `${key}|${item._id}`,
            name: item.name,
            attribute: null,
            skill: `${game.i18n.localize(
              "YZEVERETENO.Blessing"
            )}: ${game.i18n.localize("YZEVERETENO.GodLada")}`,
            type: game.i18n.localize(CONFIG.YZEVERETENO.itemTypes[item.type]),
            value: item.system.itemModifiers[key].value,
            checked: false,
            prayer: false,
          };
        }
        // blessing - perun
        if (
          item.system.itemModifiers[key].mod === "itemModifierBlessingsPerun"
        ) {
          sysData.itemModifiers.dexterity[`${key}|${item._id}`] = {
            id: `${key}|${item._id}`,
            name: item.name,
            attribute: null,
            skill: `${game.i18n.localize(
              "YZEVERETENO.Blessing"
            )}: ${game.i18n.localize("YZEVERETENO.GodPerun")}`,
            type: game.i18n.localize(CONFIG.YZEVERETENO.itemTypes[item.type]),
            value: item.system.itemModifiers[key].value,
            checked: false,
            prayer: false,
          };
          sysData.itemModifiers.meleecombat[`${key}|${item._id}`] = {
            id: `${key}|${item._id}`,
            name: item.name,
            attribute: null,
            skill: `${game.i18n.localize(
              "YZEVERETENO.Blessing"
            )}: ${game.i18n.localize("YZEVERETENO.GodPerun")}`,
            type: game.i18n.localize(CONFIG.YZEVERETENO.itemTypes[item.type]),
            value: item.system.itemModifiers[key].value,
            checked: false,
            prayer: false,
          };
        }
        // blessing - dajbog
        if (
          item.system.itemModifiers[key].mod === "itemModifierBlessingsDajbog"
        ) {
          sysData.itemModifiers.observation[`${key}|${item._id}`] = {
            id: `${key}|${item._id}`,
            name: item.name,
            attribute: null,
            skill: `${game.i18n.localize(
              "YZEVERETENO.Blessing"
            )}: ${game.i18n.localize("YZEVERETENO.GodDajbog")}`,
            type: game.i18n.localize(CONFIG.YZEVERETENO.itemTypes[item.type]),
            value: item.system.itemModifiers[key].value,
            checked: false,
            prayer: false,
          };
          sysData.itemModifiers.pilot[`${key}|${item._id}`] = {
            id: `${key}|${item._id}`,
            name: item.name,
            attribute: null,
            skill: `${game.i18n.localize(
              "YZEVERETENO.Blessing"
            )}: ${game.i18n.localize("YZEVERETENO.GodDajbog")}`,
            type: game.i18n.localize(CONFIG.YZEVERETENO.itemTypes[item.type]),
            value: item.system.itemModifiers[key].value,
            checked: false,
            prayer: false,
          };
        }
        // blessing - yrilo
        if (
          item.system.itemModifiers[key].mod === "itemModifierBlessingsYrilo"
        ) {
          sysData.itemModifiers.force[`${key}|${item._id}`] = {
            id: `${key}|${item._id}`,
            name: item.name,
            attribute: null,
            skill: `${game.i18n.localize(
              "YZEVERETENO.Blessing"
            )}: ${game.i18n.localize("YZEVERETENO.GodYrilo")}`,
            type: game.i18n.localize(CONFIG.YZEVERETENO.itemTypes[item.type]),
            value: item.system.itemModifiers[key].value,
            checked: false,
            prayer: false,
          };
        }
        // blessing - svarog
        if (
          item.system.itemModifiers[key].mod === "itemModifierBlessingsSvarog"
        ) {
          sysData.itemModifiers.manipulation[`${key}|${item._id}`] = {
            id: `${key}|${item._id}`,
            name: item.name,
            attribute: null,
            skill: `${game.i18n.localize(
              "YZEVERETENO.Blessing"
            )}: ${game.i18n.localize("YZEVERETENO.GodSvarog")}`,
            type: game.i18n.localize(CONFIG.YZEVERETENO.itemTypes[item.type]),
            value: item.system.itemModifiers[key].value,
            checked: false,
            prayer: false,
          };
        }
        // blessing - hors
        if (
          item.system.itemModifiers[key].mod === "itemModifierBlessingsHors"
        ) {
          sysData.itemModifiers.rangedcombat[`${key}|${item._id}`] = {
            id: `${key}|${item._id}`,
            name: item.name,
            attribute: null,
            skill: `${game.i18n.localize(
              "YZEVERETENO.Blessing"
            )}: ${game.i18n.localize("YZEVERETENO.GodHors")}`,
            type: game.i18n.localize(CONFIG.YZEVERETENO.itemTypes[item.type]),
            value: item.system.itemModifiers[key].value,
            checked: false,
            prayer: false,
          };
          sysData.itemModifiers.lidership[`${key}|${item._id}`] = {
            id: `${key}|${item._id}`,
            name: item.name,
            attribute: null,
            skill: `${game.i18n.localize(
              "YZEVERETENO.Blessing"
            )}: ${game.i18n.localize("YZEVERETENO.GodHors")}`,
            type: game.i18n.localize(CONFIG.YZEVERETENO.itemTypes[item.type]),
            value: item.system.itemModifiers[key].value,
            checked: false,
            prayer: false,
          };
        }
        // blessing - stribog
        if (
          item.system.itemModifiers[key].mod === "itemModifierBlessingsStribog"
        ) {
          sysData.itemModifiers.survival[`${key}|${item._id}`] = {
            id: `${key}|${item._id}`,
            name: item.name,
            attribute: null,
            skill: `${game.i18n.localize(
              "YZEVERETENO.Blessing"
            )}: ${game.i18n.localize("YZEVERETENO.GodStribog")}`,
            type: game.i18n.localize(CONFIG.YZEVERETENO.itemTypes[item.type]),
            value: item.system.itemModifiers[key].value,
            checked: false,
            prayer: false,
          };
          sysData.itemModifiers.culture[`${key}|${item._id}`] = {
            id: `${key}|${item._id}`,
            name: item.name,
            attribute: null,
            skill: `${game.i18n.localize(
              "YZEVERETENO.Blessing"
            )}: ${game.i18n.localize("YZEVERETENO.GodStribog")}`,
            type: game.i18n.localize(CONFIG.YZEVERETENO.itemTypes[item.type]),
            value: item.system.itemModifiers[key].value,
            checked: false,
            prayer: false,
          };
        }
        // blessing - lady of tears
        if (
          item.system.itemModifiers[key].mod ===
          "itemModifierBlessingsrod"
        ) {
          sysData.itemModifiers.znaharstvo[`${key}|${item._id}`] = {
            id: `${key}|${item._id}`,
            name: item.name,
            attribute: null,
            skill: `${game.i18n.localize(
              "YZEVERETENO.Blessing"
            )}: ${game.i18n.localize("YZEVERETENO.GodRod")}`,
            type: game.i18n.localize(CONFIG.YZEVERETENO.itemTypes[item.type]),
            value: item.system.itemModifiers[key].value,
            checked: false,
            prayer: false,
          };
        }
        // blessing - morena one
        if (
          item.system.itemModifiers[key].mod ===
          "itemModifierBlessingsMorenaOne"
        ) {
          sysData.itemModifiers.stealth[`${key}|${item._id}`] = {
            id: `${key}|${item._id}`,
            name: item.name,
            attribute: null,
            skill: `${game.i18n.localize(
              "YZEVERETENO.Blessing"
            )}: ${game.i18n.localize("YZEVERETENO.GodMorena")}`,
            type: game.i18n.localize(CONFIG.YZEVERETENO.itemTypes[item.type]),
            value: item.system.itemModifiers[key].value,
            checked: false,
            prayer: false,
          };
          sysData.itemModifiers.vedovstvo[`${key}|${item._id}`] = {
            id: `${key}|${item._id}`,
            name: item.name,
            attribute: null,
            skill: `${game.i18n.localize(
              "YZEVERETENO.Blessing"
            )}: ${game.i18n.localize("YZEVERETENO.GodMorena")}`,
            type: game.i18n.localize(CONFIG.YZEVERETENO.itemTypes[item.type]),
            value: item.system.itemModifiers[key].value,
            checked: false,
            prayer: false,
          };
        }
        // all prayers
        if (item.system.itemModifiers[key].mod === "itemModifierPrayersAll") {
          // all prayers - general skills
          sysData.itemModifiers.dexterity[`${key}|${item._id}`] = {
            id: `${key}|${item._id}`,
            name: item.name,
            attribute: null,
            skill: game.i18n.localize("YZEVERETENO.PrayersAll"),
            type: game.i18n.localize(CONFIG.YZEVERETENO.itemTypes[item.type]),
            value: item.system.itemModifiers[key].value,
            checked: false,
            prayer: true,
          };
          sysData.itemModifiers.force[`${key}|${item._id}`] = {
            id: `${key}|${item._id}`,
            name: item.name,
            attribute: null,
            skill: game.i18n.localize("YZEVERETENO.PrayersAll"),
            type: game.i18n.localize(CONFIG.YZEVERETENO.itemTypes[item.type]),
            value: item.system.itemModifiers[key].value,
            checked: false,
            prayer: true,
          };
          sysData.itemModifiers.stealth[`${key}|${item._id}`] = {
            id: `${key}|${item._id}`,
            name: item.name,
            attribute: null,
            skill: game.i18n.localize("YZEVERETENO.PrayersAll"),
            type: game.i18n.localize(CONFIG.YZEVERETENO.itemTypes[item.type]),
            value: item.system.itemModifiers[key].value,
            checked: false,
            prayer: true,
          };
          sysData.itemModifiers.manipulation[`${key}|${item._id}`] = {
            id: `${key}|${item._id}`,
            name: item.name,
            attribute: null,
            skill: game.i18n.localize("YZEVERETENO.PrayersAll"),
            type: game.i18n.localize(CONFIG.YZEVERETENO.itemTypes[item.type]),
            value: item.system.itemModifiers[key].value,
            checked: false,
            prayer: true,
          };
          sysData.itemModifiers.meleecombat[`${key}|${item._id}`] = {
            id: `${key}|${item._id}`,
            name: item.name,
            attribute: null,
            skill: game.i18n.localize("YZEVERETENO.PrayersAll"),
            type: game.i18n.localize(CONFIG.YZEVERETENO.itemTypes[item.type]),
            value: item.system.itemModifiers[key].value,
            checked: false,
            prayer: true,
          };
          sysData.itemModifiers.observation[`${key}|${item._id}`] = {
            id: `${key}|${item._id}`,
            name: item.name,
            attribute: null,
            skill: game.i18n.localize("YZEVERETENO.PrayersAll"),
            type: game.i18n.localize(CONFIG.YZEVERETENO.itemTypes[item.type]),
            value: item.system.itemModifiers[key].value,
            checked: false,
            prayer: true,
          };
          sysData.itemModifiers.rangedcombat[`${key}|${item._id}`] = {
            id: `${key}|${item._id}`,
            name: item.name,
            attribute: null,
            skill: game.i18n.localize("YZEVERETENO.PrayersAll"),
            type: game.i18n.localize(CONFIG.YZEVERETENO.itemTypes[item.type]),
            value: item.system.itemModifiers[key].value,
            checked: false,
            prayer: true,
          };
          sysData.itemModifiers.survival[`${key}|${item._id}`] = {
            id: `${key}|${item._id}`,
            name: item.name,
            attribute: null,
            skill: game.i18n.localize("YZEVERETENO.PrayersAll"),
            type: game.i18n.localize(CONFIG.YZEVERETENO.itemTypes[item.type]),
            value: item.system.itemModifiers[key].value,
            checked: false,
            prayer: true,
          };
          // all prayers - advanced skills
          sysData.itemModifiers.lidership[`${key}|${item._id}`] = {
            id: `${key}|${item._id}`,
            name: item.name,
            attribute: null,
            skill: game.i18n.localize("YZEVERETENO.PrayersAll"),
            type: game.i18n.localize(CONFIG.YZEVERETENO.itemTypes[item.type]),
            value: item.system.itemModifiers[key].value,
            checked: false,
            prayer: true,
          };
          sysData.itemModifiers.culture[`${key}|${item._id}`] = {
            id: `${key}|${item._id}`,
            name: item.name,
            attribute: null,
            skill: game.i18n.localize("YZEVERETENO.PrayersAll"),
            type: game.i18n.localize(CONFIG.YZEVERETENO.itemTypes[item.type]),
            value: item.system.itemModifiers[key].value,
            checked: false,
            prayer: true,
          };
          sysData.itemModifiers.cybershaman[`${key}|${item._id}`] = {
            id: `${key}|${item._id}`,
            name: item.name,
            attribute: null,
            skill: game.i18n.localize("YZEVERETENO.PrayersAll"),
            type: game.i18n.localize(CONFIG.YZEVERETENO.itemTypes[item.type]),
            value: item.system.itemModifiers[key].value,
            checked: false,
            prayer: true,
          };
          sysData.itemModifiers.znaharstvo[`${key}|${item._id}`] = {
            id: `${key}|${item._id}`,
            name: item.name,
            attribute: null,
            skill: game.i18n.localize("YZEVERETENO.PrayersAll"),
            type: game.i18n.localize(CONFIG.YZEVERETENO.itemTypes[item.type]),
            value: item.system.itemModifiers[key].value,
            checked: false,
            prayer: true,
          };
          sysData.itemModifiers.vedovstvo[`${key}|${item._id}`] = {
            id: `${key}|${item._id}`,
            name: item.name,
            attribute: null,
            skill: game.i18n.localize("YZEVERETENO.PrayersAll"),
            type: game.i18n.localize(CONFIG.YZEVERETENO.itemTypes[item.type]),
            value: item.system.itemModifiers[key].value,
            checked: false,
            prayer: true,
          };
          sysData.itemModifiers.pilot[`${key}|${item._id}`] = {
            id: `${key}|${item._id}`,
            name: item.name,
            attribute: null,
            skill: game.i18n.localize("YZEVERETENO.PrayersAll"),
            type: game.i18n.localize(CONFIG.YZEVERETENO.itemTypes[item.type]),
            value: item.system.itemModifiers[key].value,
            checked: false,
            prayer: true,
          };
          sysData.itemModifiers.science[`${key}|${item._id}`] = {
            id: `${key}|${item._id}`,
            name: item.name,
            attribute: null,
            skill: game.i18n.localize("YZEVERETENO.PrayersAll"),
            type: game.i18n.localize(CONFIG.YZEVERETENO.itemTypes[item.type]),
            value: item.system.itemModifiers[key].value,
            checked: false,
            prayer: true,
          };
          sysData.itemModifiers.mechanic[`${key}|${item._id}`] = {
            id: `${key}|${item._id}`,
            name: item.name,
            attribute: null,
            skill: game.i18n.localize("YZEVERETENO.PrayersAll"),
            type: game.i18n.localize(CONFIG.YZEVERETENO.itemTypes[item.type]),
            value: item.system.itemModifiers[key].value,
            checked: false,
            prayer: true,
          };
        }
        // prayer - lada
        if (
          item.system.itemModifiers[key].mod === "itemModifierPrayersLada"
        ) {
          sysData.itemModifiers.cybershaman[`${key}|${item._id}`] = {
            id: `${key}|${item._id}`,
            name: item.name,
            attribute: null,
            skill: `${game.i18n.localize(
              "YZEVERETENO.Prayer"
            )}: ${game.i18n.localize("YZEVERETENO.GodLada")}`,
            type: game.i18n.localize(CONFIG.YZEVERETENO.itemTypes[item.type]),
            value: item.system.itemModifiers[key].value,
            checked: false,
            prayer: true,
          };
          sysData.itemModifiers.science[`${key}|${item._id}`] = {
            id: `${key}|${item._id}`,
            name: item.name,
            attribute: null,
            skill: `${game.i18n.localize(
              "YZEVERETENO.Prayer"
            )}: ${game.i18n.localize("YZEVERETENO.GodLada")}`,
            type: game.i18n.localize(CONFIG.YZEVERETENO.itemTypes[item.type]),
            value: item.system.itemModifiers[key].value,
            checked: false,
            prayer: true,
          };
          sysData.itemModifiers.mechanic[`${key}|${item._id}`] = {
            id: `${key}|${item._id}`,
            name: item.name,
            attribute: null,
            skill: `${game.i18n.localize(
              "YZEVERETENO.Prayer"
            )}: ${game.i18n.localize("YZEVERETENO.GodLada")}`,
            type: game.i18n.localize(CONFIG.YZEVERETENO.itemTypes[item.type]),
            value: item.system.itemModifiers[key].value,
            checked: false,
            prayer: true,
          };
        }
        // prayer - perun
        if (
          item.system.itemModifiers[key].mod === "itemModifierPrayersPerun"
        ) {
          sysData.itemModifiers.dexterity[`${key}|${item._id}`] = {
            id: `${key}|${item._id}`,
            name: item.name,
            attribute: null,
            skill: `${game.i18n.localize(
              "YZEVERETENO.Prayer"
            )}: ${game.i18n.localize("YZEVERETENO.GodPerun")}`,
            type: game.i18n.localize(CONFIG.YZEVERETENO.itemTypes[item.type]),
            value: item.system.itemModifiers[key].value,
            checked: false,
            prayer: true,
          };
          sysData.itemModifiers.meleecombat[`${key}|${item._id}`] = {
            id: `${key}|${item._id}`,
            name: item.name,
            attribute: null,
            skill: `${game.i18n.localize(
              "YZEVERETENO.Prayer"
            )}: ${game.i18n.localize("YZEVERETENO.GodPerun")}`,
            type: game.i18n.localize(CONFIG.YZEVERETENO.itemTypes[item.type]),
            value: item.system.itemModifiers[key].value,
            checked: false,
            prayer: true,
          };
        }
        // prayer - dajbog
        if (
          item.system.itemModifiers[key].mod === "itemModifierPrayersDajbog"
        ) {
          sysData.itemModifiers.observation[`${key}|${item._id}`] = {
            id: `${key}|${item._id}`,
            name: item.name,
            attribute: null,
            skill: `${game.i18n.localize(
              "YZEVERETENO.Prayer"
            )}: ${game.i18n.localize("YZEVERETENO.GodDajbog")}`,
            type: game.i18n.localize(CONFIG.YZEVERETENO.itemTypes[item.type]),
            value: item.system.itemModifiers[key].value,
            checked: false,
            prayer: true,
          };
          sysData.itemModifiers.pilot[`${key}|${item._id}`] = {
            id: `${key}|${item._id}`,
            name: item.name,
            attribute: null,
            skill: `${game.i18n.localize(
              "YZEVERETENO.Prayer"
            )}: ${game.i18n.localize("YZEVERETENO.GodDajbog")}`,
            type: game.i18n.localize(CONFIG.YZEVERETENO.itemTypes[item.type]),
            value: item.system.itemModifiers[key].value,
            checked: false,
            prayer: true,
          };
        }
        // prayer - yrilo
        if (
          item.system.itemModifiers[key].mod === "itemModifierPrayersYrilo"
        ) {
          sysData.itemModifiers.force[`${key}|${item._id}`] = {
            id: `${key}|${item._id}`,
            name: item.name,
            attribute: null,
            skill: `${game.i18n.localize(
              "YZEVERETENO.Prayer"
            )}: ${game.i18n.localize("YZEVERETENO.GodYrilo")}`,
            type: game.i18n.localize(CONFIG.YZEVERETENO.itemTypes[item.type]),
            value: item.system.itemModifiers[key].value,
            checked: false,
            prayer: true,
          };
        }
        // prayer - svarog
        if (
          item.system.itemModifiers[key].mod === "itemModifierPrayersSvarog"
        ) {
          sysData.itemModifiers.manipulation[`${key}|${item._id}`] = {
            id: `${key}|${item._id}`,
            name: item.name,
            attribute: null,
            skill: `${game.i18n.localize(
              "YZEVERETENO.Prayer"
            )}: ${game.i18n.localize("YZEVERETENO.GodSvarog")}`,
            type: game.i18n.localize(CONFIG.YZEVERETENO.itemTypes[item.type]),
            value: item.system.itemModifiers[key].value,
            checked: false,
            prayer: true,
          };
        }
        // prayer - hors
        if (item.system.itemModifiers[key].mod === "itemModifierPrayersHors") {
          sysData.itemModifiers.rangedcombat[`${key}|${item._id}`] = {
            id: `${key}|${item._id}`,
            name: item.name,
            attribute: null,
            skill: `${game.i18n.localize(
              "YZEVERETENO.Prayer"
            )}: ${game.i18n.localize("YZEVERETENO.GodHors")}`,
            type: game.i18n.localize(CONFIG.YZEVERETENO.itemTypes[item.type]),
            value: item.system.itemModifiers[key].value,
            checked: false,
            prayer: true,
          };
          sysData.itemModifiers.lidership[`${key}|${item._id}`] = {
            id: `${key}|${item._id}`,
            name: item.name,
            attribute: null,
            skill: `${game.i18n.localize(
              "YZEVERETENO.Prayer"
            )}: ${game.i18n.localize("YZEVERETENO.GodHors")}`,
            type: game.i18n.localize(CONFIG.YZEVERETENO.itemTypes[item.type]),
            value: item.system.itemModifiers[key].value,
            checked: false,
            prayer: true,
          };
        }
        // prayer - stribog
        if (
          item.system.itemModifiers[key].mod === "itemModifierPrayersStribog"
        ) {
          sysData.itemModifiers.survival[`${key}|${item._id}`] = {
            id: `${key}|${item._id}`,
            name: item.name,
            attribute: null,
            skill: `${game.i18n.localize(
              "YZEVERETENO.Prayer"
            )}: ${game.i18n.localize("YZEVERETENO.GodStribog")}`,
            type: game.i18n.localize(CONFIG.YZEVERETENO.itemTypes[item.type]),
            value: item.system.itemModifiers[key].value,
            checked: false,
            prayer: true,
          };
          sysData.itemModifiers.culture[`${key}|${item._id}`] = {
            id: `${key}|${item._id}`,
            name: item.name,
            attribute: null,
            skill: `${game.i18n.localize(
              "YZEVERETENO.Prayer"
            )}: ${game.i18n.localize("YZEVERETENO.GodStribog")}`,
            type: game.i18n.localize(CONFIG.YZEVERETENO.itemTypes[item.type]),
            value: item.system.itemModifiers[key].value,
            checked: false,
            prayer: true,
          };
        }
        // prayer - lady of tears
        if (
          item.system.itemModifiers[key].mod ===
          "itemModifierPrayersrod"
        ) {
          sysData.itemModifiers.znaharstvo[`${key}|${item._id}`] = {
            id: `${key}|${item._id}`,
            name: item.name,
            attribute: null,
            skill: `${game.i18n.localize(
              "YZEVERETENO.Prayer"
            )}: ${game.i18n.localize("YZEVERETENO.GodRod")}`,
            type: game.i18n.localize(CONFIG.YZEVERETENO.itemTypes[item.type]),
            value: item.system.itemModifiers[key].value,
            checked: false,
            prayer: true,
          };
        }
        // prayer - morena one
        if (
          item.system.itemModifiers[key].mod ===
          "itemModifierPrayersMorenaOne"
        ) {
          sysData.itemModifiers.stealth[`${key}|${item._id}`] = {
            id: `${key}|${item._id}`,
            name: item.name,
            attribute: null,
            skill: `${game.i18n.localize(
              "YZEVERETENO.Prayer"
            )}: ${game.i18n.localize("YZEVERETENO.GodMorena")}`,
            type: game.i18n.localize(CONFIG.YZEVERETENO.itemTypes[item.type]),
            value: item.system.itemModifiers[key].value,
            checked: false,
            prayer: true,
          };
          sysData.itemModifiers.vedovstvo[`${key}|${item._id}`] = {
            id: `${key}|${item._id}`,
            name: item.name,
            attribute: null,
            skill: `${game.i18n.localize(
              "YZEVERETENO.Prayer"
            )}: ${game.i18n.localize("YZEVERETENO.GodMorena")}`,
            type: game.i18n.localize(CONFIG.YZEVERETENO.itemTypes[item.type]),
            value: item.system.itemModifiers[key].value,
            checked: false,
            prayer: true,
          };
        }
      }
    }
  }

  _prepareChatRollOptions(template, title) {
    let chatOptions = {
      speaker: {
        alias: this.prototypeToken.name,
        actor: this._id,
      },
      title: title,
      template: template,
      rollMode: game.settings.get("core", "rollMode"),
      sound: CONFIG.sounds.dice,
      flags: {
        img: this.prototypeToken.randomImg
          ? this.img
          : this.prototypeToken.texture.src,
      },
      // img to be displayed next to the name on the test card - if it's a wildcard img, use the actor image
    };

    // If the test is coming from a token sheet
    if (this.token) {
      chatOptions.speaker.alias = this.token.name; // Use the token name instead of the actor name
      chatOptions.speaker.token = this.token._id;
      chatOptions.speaker.scene = canvas.scene._id;
      chatOptions.flags.img = this.token.texture.src; // Use the token image instead of the actor image
    } // If a linked actor - use the currently selected token's data if the actor id matches
    else {
      let speaker = ChatMessage.getSpeaker();
      if (speaker.actor == this._id) {
        chatOptions.speaker.alias = speaker.alias;
        chatOptions.speaker.token = speaker.token;
        chatOptions.speaker.scene = speaker.scene;
        chatOptions.flags.img = speaker.token
          ? canvas.tokens.get(speaker.token).document.texture.src
          : chatOptions.flags.img;
      }
    }

    return chatOptions;
  }

  _prepHPModifications() {
    // look through items for any HP-Modifications
    let bonus = 0;
    for (let t of this.items) {
      const tData = t.system.itemModifiers;
      if (tData) {
        bonus += Number(
          Object.keys(tData).reduce((counter, x) => {
            counter +=
              tData[x].mod === "itemModifierHP" &&
              (t.type === "injury" ||
                t.type === "talent" ||
                t.system.equipped === true)
                ? tData[x].value
                : 0;
            return counter;
          }, 0)
        );
      }
    }
    return bonus;
  }

  _prepMPModifications() {
    // look through items for any MP-Modifications
    let bonus = 0;
    for (let t of this.items) {
      const tData = t.system.itemModifiers;
      if (tData) {
        bonus += Number(
          Object.keys(tData).reduce((counter, x) => {
            counter +=
              tData[x].mod === "itemModifierMP" &&
              (t.type === "injury" ||
                t.type === "talent" ||
                t.system.equipped === true)
                ? tData[x].value
                : 0;
            return counter;
          }, 0)
        );
      }
    }
    return bonus;
  }

  _prepRadiationModifications() {
    // look through items for any Radiation-Modifications
    let bonus = 0;
    for (let t of this.items) {
      const tData = t.system.itemModifiers;
      if (tData) {
        bonus += Number(
          Object.keys(tData).reduce((counter, x) => {
            counter +=
              tData[x].mod === "itemModifierRad" &&
              (t.type === "injury" ||
                t.type === "talent" ||
                t.system.equipped === true)
                ? tData[x].value
                : 0;
            return counter;
          }, 0)
        );
      }
    }
    return bonus;
  }

  _prepEncumbranceModifications() {
    // look through items for any Encumbrance-Modifications
    let bonus = 0;
    for (let t of this.items) {
      const tData = t.system.itemModifiers;
      if (tData) {
        bonus += Number(
          Object.keys(tData).reduce((counter, x) => {
            counter +=
              tData[x].mod === "itemModifierEnc" &&
              (t.type === "injury" ||
                t.type === "talent" ||
                t.system.equipped === true)
                ? tData[x].value
                : 0;
            return counter;
          }, 0)
        );
      }
    }
    return bonus;
  }

  _prepMovementRateModifications() {
    // look through items for any MovementRate-Modifications
    let bonus = 0;
    for (let t of this.items) {
      const tData = t.system.itemModifiers;
      if (tData) {
        bonus += Number(
          Object.keys(tData).reduce((counter, x) => {
            counter +=
              tData[x].mod === "itemModifierMR" &&
              (t.type === "injury" ||
                t.type === "talent" ||
                t.system.equipped === true)
                ? tData[x].value
                : 0;
            return counter;
          }, 0)
        );
      }
    }
    return bonus;
  }

  /** @override */
  static async create(initData, options = {}) {
    initData.prototypeToken = initData.prototypeToken || {};
    if (initData.type === "character" || initData.type === "npc") {
      foundry.utils.mergeObject(
        initData.prototypeToken,
        {
          actorLink: true,
        },
        { overwrite: false }
      );
    }
    return super.create(initData, options);
  }
}

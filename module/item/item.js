import { veretenoModifierDialog } from "../veretenoRollModifier.js";
import { migrateBlastPower, migrateTalentBonus } from "../migration.js";
/**
 * Extend the basic Item with some very simple modifications.
 * @extends {Item}
 */
export class YZEVERETENOItem extends Item {
  /**
   * Augment the basic Item data model with additional dynamic data.
   */
  prepareData() {
    // setup a token before calling prepare because the token is also setup
    // lazily inside.
    super.prepareData();

    // Get the Item's data
    const itemData = this;
    if (itemData.type === "talent") this._prepareTalentData(itemData);

    // Migrate wrong blastPower-values
    if (itemData.type === "weapon" && itemData.system.explosive) {
      // TODO: move this to migrateData
      migrateBlastPower(itemData);
    }
  }

  // eslint-disable-next-line no-unused-vars
  _prepareTalentData(itemData) {
    // TODO: prep talent data
  }

  static migrateData(source) {
    migrateTalentBonus(source);
    return super.migrateData(source);
  }

  async _preCreate(initData, options, user) {
    await super._preCreate(initData, options, user);
    // for cloning operations just keep the image. this is a brittle hack. Would
    // like to find a way to override item gods on create, but ignore it on
    // cloning and imports from compendiums.
    if (hasProperty(initData, "img") && initData.img !== Item.DEFAULT_ICON) {
      return;
    }
    let itemType = initData.type;
    let isExplosive = this.system.explosive;
    const tokenPath = getDefaultItemGod(itemType, isExplosive);
    this.updateSource({ img: tokenPath });
  }

  async roll() {
    //TODO: Should refactor this a bit so both sheet and macros share the same
    //code path.
    const item = this;
    const actorData = this.actor ? this.actor.system : {};
    const itemData = item.system;
    const skillKey = getSkillKeyForWeaponType(itemData.melee);
    const attributeKey = getAttributeKeyForWeaponType(itemData.melee);
    const rollType = getRollType(item.type);

    let bonus = itemData.bonus ? Number(itemData.bonus) : 0;
    if (rollType === "armor") {
      bonus = itemData.armorRating;
    }

    let itemModifiers = {};
    if (rollType === "armor") {
      itemModifiers = actorData.itemModifiers.armor;
    } else {
      if (actorData.itemModifiers[skillKey]) {
        itemModifiers = actorData.itemModifiers[skillKey];
      } else {
        itemModifiers = actorData.itemModifiers[attributeKey];
      }
    }

    const rollData = {
      rollType: rollType,
      actorType: this.actor.type,
      skillKey: skillKey,
      attributeKey: attributeKey,
      attribute: attributeKey ? actorData.attributes[attributeKey].value : 0,
      skill: skillKey ? actorData.skills[skillKey].value : 0,
      modifier: 0,
      bonus: bonus,
      rollTitle: item.name,
      pushed: false,
      isAutomatic: itemData.automatic,
      isExplosive: itemData.explosive,
      blastPower: itemData.blastPower,
      blastRadius: itemData.blastRadius,
      damage: itemData.damage,
      damageText: itemData.damageText,
      range: itemData.range,
      crit: itemData.crit?.numericValue,
      critText: itemData.crit?.customValue,
      features: itemData.special
        ? Object.values(itemData.special).join(", ")
        : "",
      itemModifiers: itemModifiers,
    };
    const chatOptions = this.actor._prepareChatRollOptions(
      "systems/YZEVERETENO/templates/sidebar/roll.html",
      rollType
    );
    new veretenoModifierDialog(rollData, chatOptions).render(true);
  }

  async getChatData(htmlOptions) {
    const sysData = foundry.utils.deepClone(this.system);
    const labels = this.labels;
    // Rich text description
    sysData.description = await TextEditor.enrichHTML(
      sysData.description,
      htmlOptions
    );

    // Item type specific properties
    const props = [];
    const fn = this[`_${this.type}ChatData`];
    if (fn) fn.bind(this)(sysData, labels, props);

    //TODO: toggle equipped status for normal items.

    // Filter properties and return
    sysData.properties = props.filter((p) => !!p);
    return sysData;
  }

  async sendToChat() {
    const imgPath = this.img
      ? this.img
      : getDefaultItemGod(this.type, this.system.explosive);
    const templateData = {
      item: foundry.utils.deepClone(this),
      god: imgPath,
      itemModifiers: this.system.itemModifiers
        ? Object.values(this.system.itemModifiers)
        : "",
    };
    const html = await renderTemplate(
      `systems/YZEVERETENO/templates/sidebar/item.html`,
      templateData
    );
    const msg = {
      content: html,
    };
    await ChatMessage.create(msg);
  }

  _weaponChatData(data, labels, props) {
    for (let p of Object.values(this.system.special)) {
      props.push(p);
    }
  }

  _armorChatData(data, labels, props) {
    for (let p of Object.values(this.system.special)) {
      props.push(p);
    }
  }
}

export const getSkillKeyForWeaponType = (isMelee) => {
  if (isMelee) {
    return "meleecombat";
  } else {
    return "rangedcombat";
  }
};

export const getAttributeKeyForWeaponType = (isMelee) => {
  if (isMelee) {
    return "strength";
  } else {
    return "agility";
  }
};

export const getRollType = (itemType) => {
  if (itemType === "weapon") {
    return "weapon";
  } else if (itemType === "armor") {
    return "armor";
  }
  return "weapon";
};

export const getDefaultItemGod = (itemType, isExplosive) => {
  let tokenPath = CONST.DEFAULT_TOKEN;
  switch (itemType) {
    case "weapon":
      tokenPath = "systems/YZEVERETENO/css/gods/weapons-god.svg";
      if (isExplosive) {
        tokenPath = "systems/YZEVERETENO/css/gods/explosion-god.svg";
      }
      break;
    case "armor":
      tokenPath = "systems/YZEVERETENO/css/gods/armor-god.svg";
      break;
    case "gear":
      tokenPath = "systems/YZEVERETENO/css/gods/gear-god.svg";
      break;
    case "talent":
      tokenPath = "systems/YZEVERETENO/css/gods/talent-god.svg";
      break;
    case "injury":
      tokenPath = "systems/YZEVERETENO/css/gods/injury-god.svg";
      break;
  }
  return tokenPath;
};

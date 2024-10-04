export const registerSystemSettings = function () {
  /*
   * reloads the sheet after a certain setting is applied
   */
  const debouncedReload = foundry.utils.debounce(
    () => window.location.reload(),
    100
  );

  /**
   * Track the system version upon which point a migration was last applied
   */
  game.settings.register("yzevereteno", "systemMigrationVersion", {
    name: "System Migration Version",
    scope: "world",
    config: false,
    type: String,
    default: "0",
  });

  // register the darkness points for the world
  game.settings.register("yzevereteno", "darknessPoints", {
    name: game.i18n.localize("YZEvereteno.DarknessPoints"),
    scope: "world",
    config: false,
    type: Number,
    default: 0,
  });

  game.settings.register("yzevereteno", "maxEPTokensAllowed", {
    name: game.i18n.localize("YZEvereteno.SettingMaxEnergyPoints"),
    scope: "world",
    config: true,
    type: Number,
    default: 10,
  });

  game.settings.register("yzevereteno", "firstLaunch", {
    name: "Onboarding",
    scope: "world",
    config: false,
    type: Boolean,
    default: false,
  });

  game.settings.register("yzevereteno", "AlwaysShowFeatures", {
    name: game.i18n.localize("YZEvereteno.SettingAlwaysShowFeatures"),
    hint: game.i18n.localize("YZEvereteno.SettingAlwaysShowFeaturesHint"),
    scope: "world",
    config: true,
    type: Boolean,
    default: false,
    onChange: debouncedReload,
  });

  game.settings.register("yzevereteno", "AdditionalRollInfos", {
    name: game.i18n.localize("YZEvereteno.SettingAdditionalRollInfos"),
    hint: game.i18n.localize("YZEvereteno.SettingAdditionalRollInfosHint"),
    scope: "world",
    config: true,
    type: String,
    choices: {
      no: game.i18n.localize("YZEvereteno.SettingAdditionalRollInfosNo"),
      pc: game.i18n.localize("YZEvereteno.SettingAdditionalRollInfosPC"),
      npc: game.i18n.localize("YZEvereteno.SettingAdditionalRollInfosNPC"),
      all: game.i18n.localize("YZEvereteno.SettingAdditionalRollInfosAll"),
    },
    default: "all",
  });

  game.settings.register("yzevereteno", "DarknessPointsVisibility", {
    name: game.i18n.localize("YZEvereteno.SettingDarknessPointsVisibility"),
    hint: game.i18n.localize("YZEvereteno.SettingDarknessPointsVisibilityHint"),
    scope: "world",
    config: true,
    type: Boolean,
    default: false,
    onChange: debouncedReload,
  });

  game.settings.register("yzevereteno", "RollVisibility", {
    name: game.i18n.localize("YZEvereteno.SettingRollVisibility"),
    hint: game.i18n.localize("YZEvereteno.SettingRollVisibilityHint"),
    scope: "world",
    config: true,
    type: Boolean,
    default: true,
    onChange: debouncedReload,
  });
};

export async function showOnboardingMessage() {
  const triggered = game.settings.get("yzevereteno", "firstLaunch");
  if (triggered) {
    return;
  }
  const path = "systems/yzevereteno/data/firstlaunch.html";
  const response = await $.get(path);
  ChatMessage.create({
    speaker: ChatMessage.getSpeaker({ alias: "vereteno" }),
    whisper: [game.user],
    content: response,
  });

  await game.settings.set("yzevereteno", "firstLaunch", true);
}

export async function importShipSheetTutorial() {
  if (game.user.isGM) {
    try {
      const newVer = "1";
      const journalName = "Ship Sheet Instructions";
      const journal = game.journal.getName(journalName);
      if (journal) {
        if (
          journal.getFlag("yzevereteno", "ver") < newVer ||
          journal.getFlag("yzevereteno", "ver") === undefined
        ) {
          await journal.delete();
          const pack = game.packs.get("yzevereteno.ship_sheet_instructions");
          await game.journal.importFromCompendium(pack, `0QlMn9tJBwKSZ9a6`);
          await game.journal
            .getName(journalName)
            .setFlag("yzevereteno", "ver", newVer);
          console.log("New version of vereteno Ship Sheet Instructions.");
        }
      } else {
        const pack = game.packs.get("yzevereteno.ship_sheet_instructions");
        await game.journal.importFromCompendium(pack, `0QlMn9tJBwKSZ9a6`);
        game.journal.getName(journalName).setFlag("yzevereteno", "ver", newVer);
      }
    } catch (error) {
      console.warn("failed to load up ship sheet instructions", error);
    }
  }
}

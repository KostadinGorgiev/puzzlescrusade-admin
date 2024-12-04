import levelConfig from "../config/config.json";

export function coinsNeedLevelUp(level_point) {
  let nextLevel = levelConfig.level.find(
    (level) => level.from <= level_point && level.to > level_point
  );

  if (nextLevel) {
    return nextLevel.to - level_point;
  }
  return 0;
}

export function userLevel(level_point) {
  let currentLevelIndex = levelConfig.level.findIndex(
    (level) => level.from <= level_point && level.to > level_point
  );
  return {
    ...levelConfig.level[currentLevelIndex],
    index: currentLevelIndex,
  };
}

export function userEnergySize(energy_size_level) {
  return levelConfig.energySize[energy_size_level].to;
}

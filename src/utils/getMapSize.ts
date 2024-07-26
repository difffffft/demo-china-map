export function getMapSize() {
  // 1. 获取屏幕宽度
  const screenW = window.innerWidth;

  // 2. 计算 6vh * 2
  const vh = window.innerHeight / 100;
  const sixVhTimesTwo = 6 * vh * 2;

  // 3. 获取 boxW
  let boxW = 0;
  const boxElement = document.querySelector(".info-box");
  if (boxElement) {
    boxW = boxElement.getBoundingClientRect().width;
  }

  // 4. 计算 boxW * 2
  const boxWTimesTwo = boxW * 2;

  const marginWidth = 64 * 2;

  // 5. 计算结果
  const mapWidth = screenW - (sixVhTimesTwo + boxWTimesTwo + marginWidth);
  const mapHeight = (mapWidth * 3) / 4;
  return [mapWidth, mapHeight];
}

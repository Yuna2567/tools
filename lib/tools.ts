export type Tool = {
  href: string;
  emoji: string;
  name: string;
  en: string;
  blurb: string;
  detail: string;
};

export const TOOLS: Tool[] = [
  {
    href: "/lottery",
    emoji: "🎡",
    name: "抽獎轉盤",
    en: "Spin to Win",
    blurb: "把名字丟進去，讓轉盤決定今天的幸運兒。",
    detail:
      "貼上參加者或獎項清單，轉盤會自動分格上色。支援中獎後移除、保留每一次的抽獎紀錄。",
  },
  {
    href: "/pomodoro",
    emoji: "🍅",
    name: "蕃茄鐘",
    en: "Focus Timer",
    blurb: "專注 25 分鐘，休息 5 分鐘，一輪一輪把事情做完。",
    detail:
      "專注 / 短休 / 長休三段循環，能記下每一輪在做什麼、看今天累積了多少專注時間。",
  },
  {
    href: "/omikuji",
    emoji: "🎋",
    name: "好運抽籤",
    en: "Daily Fortune",
    blurb: "搖一支籤，看看今天的運氣是超大吉還是大凶。",
    detail:
      "九種吉凶籤詩，附上戀愛、事業、財運等面向建議與幸運色。每天一支，隔日再抽。",
  },
];

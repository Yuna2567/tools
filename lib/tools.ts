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
      "貼上參加者或獎項清單，轉盤自動分格上色。支援中獎後移除、保留每一次的抽獎紀錄。",
  },
  {
    href: "/pomodoro",
    emoji: "🍅",
    name: "蕃茄鐘",
    en: "Focus Timer",
    blurb: "專注 25 分鐘，休息 5 分鐘，一輪一輪把事情做完。",
    detail:
      "專注 / 短休 / 長休三段循環，記下每一輪在做什麼，看今天累積了多少專注時間。",
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
  {
    href: "/worldclock",
    emoji: "🕰️",
    name: "世界時間",
    en: "World Clock",
    blurb: "以台北時間為準，看世界各地此刻幾點、誰還醒著。",
    detail:
      "把城市依「適合聯絡 / 剛起床 / 深夜」分組，附時差、日夜與日期差；也能假設一個台北時間來換算。",
  },
  {
    href: "/gacha",
    emoji: "🥚",
    name: "扭蛋機",
    en: "Gachapon",
    blurb: "輸入項目，扭一下轉蛋，看看蛋裡裝著什麼。",
    detail:
      "把選項當成扭蛋，轉動旋鈕、蛋殼喀一聲彈開，隨機抽出一個結果。可保留剛剛轉到的紀錄。",
  },
];

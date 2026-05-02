import fs from "node:fs/promises";

const outHtml = new URL("../macau-navigation-routes.html", import.meta.url);

const images = {
  hengqin: ["横琴口岸", "images/hengqin.jpg", "Wikimedia Commons 本地压缩副本"],
  cotai: ["路氹外景", "images/cotai.jpg", "Wikimedia Commons 本地压缩副本"],
  londoner: ["伦敦人", "images/londoner.jpg", "Wikimedia Commons 本地压缩副本"],
  venetian: ["威尼斯人", "images/venetian.jpg", "Wikimedia Commons 本地压缩副本"],
  taipa: ["官也街/氹仔旧城", "images/taipa.jpg", "Wikimedia Commons 本地压缩副本"],
  ama: ["妈阁庙", "images/ama.jpg", "Wikimedia Commons 本地压缩副本"],
  mandarin: ["郑家大屋", "images/mandarin.jpg", "Wikimedia Commons 本地压缩副本"],
  lilau: ["亚婆井前地", "images/lilau.jpg", "Wikimedia Commons 本地压缩副本"],
  senado: ["议事亭前地", "images/senado.jpg", "Wikimedia Commons 本地压缩副本"],
  felicidade: ["福隆新街", "images/felicidade.jpg", "Wikimedia Commons 本地压缩副本"],
  stdominic: ["玫瑰堂", "images/stdominic.jpg", "Wikimedia Commons 本地压缩副本"],
  stpaul: ["大三巴", "images/stpaul.jpg", "Wikimedia Commons 本地压缩副本"],
  natcha: ["哪吒庙", "images/natcha.jpg", "Wikimedia Commons 本地压缩副本"],
  margaret: ["玛嘉烈蛋挞", "images/margaret.jpg", "Wikimedia Commons 本地压缩副本"],
  lisboa: ["新葡京", "images/lisboa.jpg", "Wikimedia Commons 本地压缩副本"],
  wynn: ["永利澳门", "images/wynn.jpg", "Wikimedia Commons 本地压缩副本"],
  ferry: ["氹仔码头", "images/ferry.jpg", "Wikimedia Commons 本地压缩副本"],
  wynnPalace: ["永利皇宫", "images/wynnPalace.jpg", "Wikimedia Commons 本地压缩副本"],
  mgmCotai: ["美狮美高梅", "images/mgmCotai.jpg", "Wikimedia Commons 本地压缩副本"],
  parisianTower: ["巴黎人埃菲尔铁塔", "images/parisianTower.jpg", "Wikimedia Commons 本地压缩副本"],
  venetianCanal: ["威尼斯人大运河", "images/venetianCanal.jpg", "Wikimedia Commons 本地压缩副本"],
  sands: ["澳门金沙", "images/sands.jpg", "Wikimedia Commons 本地压缩副本"],
  mgmMacau: ["澳门美高梅", "images/mgmMacau.jpg", "Wikimedia Commons 本地压缩副本"]
};

const points = {
  hengqin: { name: "横琴口岸", lat: 22.1405453, lng: 113.5429628, img: "hengqin" },
  cotai: { name: "路氹外景", lat: 22.14495, lng: 113.5632, img: "cotai" },
  londoner: { name: "伦敦人外立面", lat: 22.1458115, lng: 113.5653355, img: "londoner" },
  venetian: { name: "威尼斯人外景", lat: 22.1476526, lng: 113.559014, img: "venetian" },
  taipa: { name: "氹仔旧城区/官也街", lat: 22.1535855, lng: 113.5569741, img: "taipa" },
  ama: { name: "妈阁庙", lat: 22.1861086, lng: 113.5312671, img: "ama" },
  mandarinLilau: { name: "亚婆井/郑家大屋", lat: 22.18855, lng: 113.53475, img: "mandarin" },
  senado: { name: "议事亭前地", lat: 22.1938271, lng: 113.5399903, img: "senado" },
  felicidade: { name: "福隆新街午餐", lat: 22.1948212, lng: 113.5374884, img: "felicidade" },
  stdominic: { name: "玫瑰堂", lat: 22.1948416, lng: 113.5403642, img: "stdominic" },
  stpaul: { name: "大三巴/哪吒庙", lat: 22.19758, lng: 113.54075, img: "stpaul" },
  margaret: { name: "玛嘉烈蛋挞", lat: 22.1918018, lng: 113.5417871, img: "margaret" },
  lisboaWynn: { name: "新葡京/永利外景", lat: 22.18965, lng: 113.54525, img: "lisboa" },
  ferry: { name: "氹仔客运码头", lat: 22.1630017, lng: 113.5741204, img: "ferry" },
  cotaiEast: { name: "轻轨路氹东站", lat: 22.14955, lng: 113.57325, img: "wynnPalace" },
  wynnPalace: { name: "永利皇宫喷泉/缆车", lat: 22.1480986, lng: 113.571403, img: "wynnPalace" },
  mgmCotai: { name: "美狮美高梅", lat: 22.1458804, lng: 113.5680093, img: "mgmCotai" },
  londonerClock: { name: "伦敦人大本钟", lat: 22.1458115, lng: 113.5653355, img: "londoner" },
  parisianTower: { name: "巴黎人埃菲尔铁塔", lat: 22.1436317, lng: 113.5616812, img: "parisianTower" },
  venetianCanal: { name: "威尼斯人大运河", lat: 22.1476526, lng: 113.559014, img: "venetianCanal" },
  sandsMacao: { name: "澳门金沙", lat: 22.1916944, lng: 113.5547926, img: "sands" },
  mgmMacau: { name: "澳门美高梅", lat: 22.1857992, lng: 113.5480486, img: "mgmMacau" }
};

const lrt = {
  hengqinToCotai: [
    [22.1405453, 113.5429628],
    [22.1409, 113.5507],
    [22.1427, 113.5572],
    [22.14495, 113.5632]
  ],
  taipaToBarra: [
    [22.1535855, 113.5569741],
    [22.1527, 113.5532],
    [22.1602, 113.5459],
    [22.1743, 113.5366],
    [22.1861086, 113.5312671]
  ],
  hengqinToBarra: [
    [22.1405453, 113.5429628],
    [22.1409, 113.5507],
    [22.1452, 113.5618],
    [22.1527, 113.5532],
    [22.1602, 113.5459],
    [22.1743, 113.5366],
    [22.1861086, 113.5312671]
  ],
  taipaToCotai: [
    [22.1535855, 113.5569741],
    [22.1504, 113.5586],
    [22.14495, 113.5632]
  ],
  cotaiToFerry: [
    [22.14495, 113.5632],
    [22.1518, 113.5644],
    [22.1586, 113.5708],
    [22.1630017, 113.5741204]
  ],
  hengqinToCotaiEast: [
    [22.1405453, 113.5429628],
    [22.1409, 113.5507],
    [22.1427, 113.5572],
    [22.1452, 113.5618],
    [22.14955, 113.57325]
  ]
};

const routeDefs = {
  A: {
    title: "方案 A：经典均衡线（推荐）",
    color: "#2563eb",
    summary: "横琴入境后先扫路氹/氹仔，再从妈阁进入半岛，最后由新葡京/永利方向打车去氹仔码头。覆盖完整，第一次去澳门最稳。",
    stops: [
      ["A1", "hengqin", "07:00-07:45", "过关后接轻轨/公交交通节点。"],
      ["A2", "cotai", "08:10-08:35", "巴黎人、伦敦人、威尼斯人外景短停，不进商场深逛。"],
      ["A3", "taipa", "08:45-09:35", "早餐：猪扒包、茶餐厅奶茶、通粉或面。"],
      ["A4", "ama", "10:10-10:40", "澳门地名源头之一，早上安排更顺。"],
      ["A5", "mandarinLilau", "10:45-11:20", "从妈阁往议事亭方向自然上行，保留老澳门街巷感。"],
      ["A6", "senado", "11:35-12:00", "历史城区中心点，之后顺路进福隆新街吃午餐。"],
      ["A7", "felicidade", "12:10-13:10", "午餐：祥记面家/周边茶餐厅，避免专门绕去排长队网红店。"],
      ["A8", "stdominic", "13:20-13:35", "从福隆新街回到主步行轴，往大三巴方向走。"],
      ["A9", "stpaul", "13:50-14:35", "经典地标和旁边哪吒庙、旧城墙。"],
      ["A10", "lisboaWynn", "15:00-15:35", "往东南方向收束，方便打车或转交通去氹仔码头。"],
      ["A11", "ferry", "16:20 前", "17:15 开船。到达后直接办登船/安检。"]
    ],
    segments: [
      ["lrt", "hengqin", "cotai", lrt.hengqinToCotai],
      ["walk", "cotai", "taipa"],
      ["lrt", "taipa", "ama", lrt.taipaToBarra],
      ["walk", "ama", "mandarinLilau"],
      ["walk", "mandarinLilau", "senado"],
      ["walk", "senado", "felicidade"],
      ["walk", "felicidade", "stdominic"],
      ["walk", "stdominic", "stpaul"],
      ["walk", "stpaul", "lisboaWynn"],
      ["taxi", "lisboaWynn", "ferry"]
    ]
  },
  B: {
    title: "方案 B：历史城区优先线",
    color: "#059669",
    summary: "先直奔妈阁，从南往北扫历史城区；下午回到氹仔/路氹，最后离码头更近，返程容错最高。",
    stops: [
      ["B1", "hengqin", "07:00-07:45", "过关后直接用轨道/交通切入妈阁方向。"],
      ["B2", "ama", "08:35-09:05", "先打历史城区南端，避开中午后的旅行团高峰。"],
      ["B3", "mandarinLilau", "09:15-09:40", "顺妈阁向北进入老城，不折返。"],
      ["B4", "senado", "10:00-10:30", "主轴中心，继续往北走大三巴。"],
      ["B5", "stpaul", "10:45-11:35", "上午完成最拥挤的经典点。"],
      ["B6", "felicidade", "11:50-12:50", "午餐：祥记面家或附近茶餐厅。"],
      ["B7", "margaret", "13:05-13:30", "如果排队长，直接跳过，不影响主线。"],
      ["B8", "taipa", "14:05-14:50", "下午回到码头所在岛，吃小食或买手信。"],
      ["B9", "cotai", "15:05-15:35", "巴黎人/伦敦人/威尼斯人外景短停。"],
      ["B10", "ferry", "16:20 前", "从路氹/氹仔去码头距离更近，容错最高。"]
    ],
    segments: [
      ["lrt", "hengqin", "ama", lrt.hengqinToBarra],
      ["walk", "ama", "mandarinLilau"],
      ["walk", "mandarinLilau", "senado"],
      ["walk", "senado", "stpaul"],
      ["walk", "stpaul", "felicidade"],
      ["walk", "felicidade", "margaret"],
      ["taxi", "margaret", "taipa"],
      ["walk", "taipa", "cotai"],
      ["lrt", "cotai", "ferry", lrt.cotaiToFerry]
    ]
  },
  C: {
    title: "方案 C：少折腾舒适线",
    color: "#f97316",
    summary: "缩短历史城区步行，把早餐、路氹外景和半岛经典点压成半天多一点。天气热、口岸慢、体力一般时用这一条。",
    stops: [
      ["C1", "hengqin", "07:00-07:45", "过关后先留在氹仔/路氹一侧，不急着进半岛。"],
      ["C2", "taipa", "08:15-09:05", "早餐：茶餐厅/猪扒包，吃完再看路氹外景。"],
      ["C3", "cotai", "09:20-09:55", "巴黎人、伦敦人、威尼斯人外立面。"],
      ["C4", "ama", "10:40-11:10", "轻轨到妈阁，作为半岛入口。"],
      ["C5", "senado", "11:35-12:05", "直接进入核心区，不安排亚婆井支线。"],
      ["C6", "felicidade", "12:15-13:15", "午餐：面家/茶餐厅，坐下休息。"],
      ["C7", "stpaul", "13:35-14:20", "只做大三巴和旁边小点，不继续扩展。"],
      ["C8", "lisboaWynn", "14:45-15:35", "喝东西/室内休息，15:45 必须往码头移动。"],
      ["C9", "ferry", "16:20 前", "17:15 开船。此方案机动时间最多。"]
    ],
    segments: [
      ["taxi", "hengqin", "taipa"],
      ["walk", "taipa", "cotai"],
      ["lrt", "cotai", "ama", [...lrt.cotaiToFerry.slice(0, 2), [22.1602, 113.5459], [22.1743, 113.5366], [22.1861086, 113.5312671]]],
      ["walk", "ama", "senado"],
      ["walk", "senado", "felicidade"],
      ["walk", "felicidade", "stpaul"],
      ["walk", "stpaul", "lisboaWynn"],
      ["taxi", "lisboaWynn", "ferry"]
    ]
  },
  D: {
    title: "方案 D：朋友推荐路氹娱乐城线",
    color: "#db2777",
    summary: "轻轨到路氹东，先看永利皇宫喷泉和缆车，再去美狮美高梅，接着顺路打卡伦敦人大本钟、巴黎人铁塔、威尼斯人大运河。最后看哪个发财车排队少：威尼斯人/巴黎人/伦敦人去澳门金沙，或美狮美高梅去澳门美高梅。",
    stops: [
      ["D1", "hengqin", "07:00-07:45", "横琴口岸过关后，轻轨/交通接路氹东。"],
      ["D2", "cotaiEast", "08:10-08:20", "到路氹东后开始步行扫路氹娱乐城。"],
      ["D3", "wynnPalace", "08:20-08:55", "看永利皇宫喷泉和缆车；缆车开放和排队情况以现场为准。"],
      ["D4", "mgmCotai", "09:05-09:35", "按朋友建议去美狮美高梅；免费网红奶茶以现场活动/排队为准。"],
      ["D5", "londonerClock", "09:45-10:10", "伦敦人大本钟和外立面拍照。"],
      ["D6", "parisianTower", "10:15-10:35", "巴黎人埃菲尔铁塔拍照。"],
      ["D7", "venetianCanal", "10:45-11:25", "威尼斯人大运河和室内街景。"],
      ["D8", "sandsMacao", "发财车选择 A", "从威尼斯人/巴黎人/伦敦人看哪边人少，坐穿梭巴士去澳门金沙。"],
      ["D9", "mgmMacau", "发财车选择 B", "如果美狮美高梅往澳门美高梅排队更少，也可以改坐这一条。"]
    ],
    segments: [
      ["lrt", "hengqin", "cotaiEast", lrt.hengqinToCotaiEast],
      ["walk", "cotaiEast", "wynnPalace"],
      ["walk", "wynnPalace", "mgmCotai"],
      ["walk", "mgmCotai", "londonerClock"],
      ["walk", "londonerClock", "parisianTower"],
      ["walk", "parisianTower", "venetianCanal"],
      ["shuttle", "venetianCanal", "sandsMacao"],
      ["shuttle", "mgmCotai", "mgmMacau"]
    ]
  }
};

async function osrm(profile, a, b) {
  const baseUrl = profile === "foot" ? "https://routing.openstreetmap.de/routed-foot" : "https://router.project-osrm.org";
  const url = `${baseUrl}/route/v1/${profile}/${a.lng},${a.lat};${b.lng},${b.lat}?overview=full&geometries=geojson`;
  const res = await fetch(url, { headers: { "User-Agent": "Codex Macau personal route map/1.0" } });
  const data = await res.json();
  if (data.code !== "Ok" || !data.routes?.[0]) throw new Error(`OSRM failed ${profile} ${a.name} -> ${b.name}: ${data.code}`);
  return {
    distance: Math.round(data.routes[0].distance),
    duration: Math.round(data.routes[0].duration),
    coords: data.routes[0].geometry.coordinates.map(([lng, lat]) => [lat, lng])
  };
}

async function enrich() {
  const output = structuredClone(routeDefs);
  for (const route of Object.values(output)) {
    route.segmentData = [];
    for (const segment of route.segments) {
      const [mode, fromKey, toKey, manual] = segment;
      const from = points[fromKey];
      const to = points[toKey];
      let data;
      if (mode === "walk" || mode === "taxi" || mode === "shuttle") {
        data = await osrm(mode === "walk" ? "foot" : "driving", from, to);
        await new Promise(resolve => setTimeout(resolve, 300));
      } else {
        data = { distance: null, duration: null, coords: manual };
      }
      route.segmentData.push({ mode, fromKey, toKey, ...data, displayMinutes: estimateMinutes(mode, data) });
    }
  }
  return output;
}

function estimateMinutes(mode, data) {
  if (mode === "walk" && data.distance) {
    const walkingMetersPerMinute = 70;
    return Math.max(3, Math.ceil(data.distance / walkingMetersPerMinute));
  }
  if (mode === "taxi" && data.duration) {
    const movingMinutes = Math.ceil(data.duration / 60);
    return Math.max(10, Math.ceil(movingMinutes * 1.35) + 4);
  }
  if (mode === "shuttle" && data.duration) {
    const movingMinutes = Math.ceil(data.duration / 60);
    return Math.max(20, Math.ceil(movingMinutes * 1.4) + 8);
  }
  return null;
}

const routes = await enrich();

function html() {
  return `<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>澳门导航式单笔画路线图</title>
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
  <style>
    :root { --ink:#172033; --muted:#607086; --line:#d9e2ec; --paper:#f6f8fb; --panel:#fff; --a:#2563eb; --b:#059669; --c:#f97316; --d:#db2777; --warn:#dc2626; --walk:#111827; --lrt:#7c3aed; --taxi:#0f766e; --shuttle:#db2777; }
    * { box-sizing:border-box; }
    body { margin:0; font-family:-apple-system,BlinkMacSystemFont,"Segoe UI","PingFang SC","Microsoft YaHei",sans-serif; color:var(--ink); background:var(--paper); }
    .app { min-height:100vh; display:grid; grid-template-columns:minmax(390px,460px) 1fr; }
    aside { background:var(--panel); border-right:1px solid var(--line); padding:22px; overflow-y:auto; max-height:100vh; }
    h1 { margin:0 0 8px; font-size:25px; line-height:1.2; letter-spacing:0; }
    .subtitle { margin:0 0 14px; color:var(--muted); line-height:1.55; font-size:14px; }
    .warning { border:1px solid #fecaca; background:#fff1f2; color:#991b1b; padding:10px 12px; margin:14px 0 16px; border-radius:8px; font-size:14px; line-height:1.5; }
    .tabs { display:grid; grid-template-columns:repeat(4,minmax(0,1fr)); gap:8px; margin:12px 0 16px; }
    button { min-width:0; border:1px solid var(--line); background:#fff; color:var(--ink); border-radius:8px; padding:9px 8px; font:inherit; font-size:13px; cursor:pointer; }
    button.active { color:#fff; border-color:transparent; font-weight:700; }
    button[data-route="A"].active { background:var(--a); } button[data-route="B"].active { background:var(--b); } button[data-route="C"].active { background:var(--c); } button[data-route="D"].active { background:var(--d); }
    .route-card, .mode-card { border:1px solid var(--line); border-radius:8px; padding:14px; margin:0 0 14px; background:#fff; }
    .route-card h2 { margin:0 0 6px; font-size:17px; line-height:1.25; letter-spacing:0; }
    .route-card p, .mode-card { color:var(--muted); font-size:13px; line-height:1.55; }
    .mode-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:8px; margin-top:8px; }
    .mode { border:1px solid var(--line); border-radius:8px; padding:8px; background:#fbfcfe; }
    .mode b { display:block; color:var(--ink); font-size:12px; margin-bottom:4px; }
    .mode-line { width:100%; height:5px; border-radius:99px; margin-bottom:6px; }
    .mode-line.walk { background:repeating-linear-gradient(90deg,var(--walk),var(--walk) 7px,transparent 7px,transparent 12px); }
    .mode-line.lrt { background:var(--lrt); }
    .mode-line.taxi { background:var(--taxi); }
    .mode-line.shuttle { background:repeating-linear-gradient(90deg,var(--shuttle),var(--shuttle) 11px,transparent 11px,transparent 16px); }
    .timeline { display:grid; gap:10px; margin:12px 0 18px; }
    .stop { border-left:3px solid var(--line); padding-left:11px; }
    .stop .top { display:flex; gap:8px; align-items:baseline; justify-content:space-between; }
    .stop .name { font-weight:750; font-size:14px; }
    .stop .time { color:var(--muted); font-size:12px; white-space:nowrap; }
    .stop .note { margin-top:3px; color:var(--muted); line-height:1.45; font-size:12.5px; }
    .sources { border-top:1px solid var(--line); padding-top:13px; color:var(--muted); font-size:12px; line-height:1.5; }
    .sources a { color:#2563eb; text-decoration:none; }
    #map { min-height:100vh; height:100vh; }
    .marker-label { width:32px; height:32px; border-radius:50%; color:#fff; border:2px solid #fff; box-shadow:0 2px 9px rgba(15,23,42,.28); display:grid; place-items:center; font-weight:850; font-size:12px; }
    .marker-label.a { background:var(--a); } .marker-label.b { background:var(--b); } .marker-label.c { background:var(--c); } .marker-label.d { background:var(--d); } .marker-label.warn { background:var(--warn); width:35px; height:35px; }
    .leaflet-popup-content { min-width:270px; margin:12px 14px; line-height:1.45; }
    .popup-img { width:100%; height:150px; object-fit:cover; border-radius:8px; margin-bottom:9px; background:#eef2f7; }
    .popup-title { font-weight:800; margin-bottom:4px; font-size:15px; }
    .popup-meta, .popup-credit { color:var(--muted); font-size:12px; margin-bottom:7px; }
    .popup-note { font-size:13px; }
    .route-tag { display:inline-block; padding:2px 7px; border-radius:99px; color:#fff; font-weight:750; font-size:11px; margin-right:6px; }
    .route-tag.a { background:var(--a); } .route-tag.b { background:var(--b); } .route-tag.c { background:var(--c); } .route-tag.d { background:var(--d); }
    .arrow { font-size:22px; font-weight:900; text-shadow:0 1px 3px white; }
    @media (max-width:900px) {
      html, body { width:100%; overflow-x:hidden; }
      body { background:#fff; }
      .app { width:100%; min-width:0; display:flex; flex-direction:column; min-height:100vh; }
      #map { order:1; height:64vh; min-height:430px; width:100%; }
      aside { width:100%; min-width:0; order:2; max-height:none; border-right:0; border-top:1px solid var(--line); border-bottom:0; padding:16px; overflow-x:hidden; }
      h1 { font-size:21px; }
      .subtitle { font-size:13px; margin-bottom:10px; }
      .warning { margin:10px 0 12px; padding:9px 10px; font-size:13px; }
      .tabs { position:sticky; top:0; z-index:500; background:#fff; padding:8px 0; margin:0 0 12px; width:100%; max-width:358px; grid-template-columns:repeat(2,minmax(0,1fr)); gap:6px; }
      button { padding:10px 6px; font-size:13px; white-space:nowrap; }
      .route-card, .mode-card { padding:12px; margin-bottom:12px; }
      .mode-grid { grid-template-columns:1fr 1fr; gap:6px; }
      .mode { padding:7px; font-size:12px; }
      .timeline { gap:9px; }
      .stop .top { align-items:flex-start; }
      .stop .name { font-size:13px; }
      .stop .time { font-size:11px; }
      .leaflet-popup-content { min-width:230px; max-width:260px; }
      .popup-img { height:110px; }
    }
  </style>
</head>
<body>
<main class="app">
  <aside>
    <h1>澳门导航式单笔画路线图</h1>
    <p class="subtitle">这版不再用直线连接，而是把步行、打车尽量贴到道路；轻轨段用站点轨迹近似，并单独标色。点开每个打卡点可看图片和说明。</p>
    <div class="warning"><strong>返程警戒：</strong>15:45 开始往氹仔码头移动；16:20 前到码头。你的船是 17:15。</div>
    <div class="tabs"><button class="active" data-route="A">A 推荐</button><button data-route="B">B 历史优先</button><button data-route="C">C 舒适</button><button data-route="D">D 朋友线</button></div>
    <section class="route-card" id="route-summary"></section>
    <section class="mode-card">
      <strong>线型说明</strong>
      <div class="mode-grid">
        <div class="mode"><div class="mode-line walk"></div><b>步行</b>贴道路路径</div>
        <div class="mode"><div class="mode-line lrt"></div><b>轻轨</b>站点轨迹近似</div>
        <div class="mode"><div class="mode-line taxi"></div><b>打车</b>道路驾车路径</div>
        <div class="mode"><div class="mode-line shuttle"></div><b>发财车</b>酒店穿梭巴士</div>
      </div>
    </section>
    <section class="timeline" id="timeline"></section>
    <section class="sources">
      <strong>依据：</strong>道路几何来自 OSRM/OpenStreetMap；轻轨段按澳门轻轨官方站点关系近似；图片已下载为本地压缩副本，来源为 Wikimedia Commons；交通和开放时间参考
      <a href="https://www.mlm.com.mo/en/route.html">澳门轻轨官方路线</a>、
      <a href="https://www.wh.gov.mo/en/site/detail/1">澳门世界遗产官方页</a>、
      <a href="https://guide.michelin.com/sg/en/macau-region/macau/restaurant/cheong-kei">MICHELIN 祥记面家</a>。
    </section>
  </aside>
  <div id="map"></div>
</main>
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
<script>
const points = ${JSON.stringify(points)};
const images = ${JSON.stringify(images)};
const routes = ${JSON.stringify(routes)};
const warningStops = [
  ["W1", "15:45", "开始往码头移动", 22.1856, 113.5486, "无论在哪个方案，这个时间都应结束游览并叫车/进站。"],
  ["W2", "16:20", "前到氹仔码头", 22.1630017, 113.5741204, "给 17:15 船班预留安检、排队和登船时间。"]
];
const modeStyle = {
  walk: { color:"#111827", weight:4, opacity:.9, dashArray:"8 8" },
  lrt: { color:"#7c3aed", weight:5, opacity:.88 },
  taxi: { color:"#0f766e", weight:5, opacity:.86 },
  shuttle: { color:"#db2777", weight:5, opacity:.88, dashArray:"12 8" }
};
const map = L.map("map", { zoomControl:true, preferCanvas:true }).setView([22.169,113.553], 13);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", { maxZoom:19, attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>' }).addTo(map);
const layers = {};
function icon(label, key) {
  return L.divIcon({ className:"", html:\`<div class="marker-label \${key.toLowerCase()}">\${label}</div>\`, iconSize:[32,32], iconAnchor:[16,16], popupAnchor:[0,-14] });
}
function bearing(from, to) {
  const lat1 = from[0] * Math.PI / 180, lat2 = to[0] * Math.PI / 180, dLon = (to[1] - from[1]) * Math.PI / 180;
  const y = Math.sin(dLon) * Math.cos(lat2);
  const x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon);
  return (Math.atan2(y, x) * 180 / Math.PI + 360) % 360;
}
function addArrow(group, coords, color) {
  if (coords.length < 2) return;
  const midIndex = Math.floor(coords.length / 2);
  const from = coords[Math.max(0, midIndex - 1)], to = coords[Math.min(coords.length - 1, midIndex + 1)];
  const angle = bearing(from, to);
  L.marker(coords[midIndex], {
    icon: L.divIcon({ className:"", html:\`<div class="arrow" style="transform:rotate(\${angle}deg); color:\${color};">➤</div>\`, iconSize:[24,24], iconAnchor:[12,12] }),
    interactive:false
  }).addTo(group);
}
function popupHtml(stop, key) {
  const [label, pointKey, time, note] = stop;
  const p = points[pointKey], img = images[p.img];
  return \`
    <img class="popup-img" src="\${img[1]}" alt="\${img[0]}">
    <div class="popup-title"><span class="route-tag \${key.toLowerCase()}">\${label}</span>\${p.name}</div>
    <div class="popup-meta">\${time}</div>
    <div class="popup-note">\${note}</div>
    <div class="popup-credit">图片：\${img[2]}</div>
  \`;
}
function addRoute(key) {
  const route = routes[key];
  const group = L.layerGroup();
  route.segmentData.forEach(seg => {
    const style = modeStyle[seg.mode];
    const line = L.polyline(seg.coords, { ...style, lineCap:"round", lineJoin:"round" }).addTo(group);
    addArrow(group, seg.coords, style.color);
    const from = points[seg.fromKey], to = points[seg.toKey];
    const modeName = seg.mode === "walk" ? "步行" : seg.mode === "taxi" ? "打车" : seg.mode === "shuttle" ? "发财车/穿梭巴士" : "轻轨";
    const meta = seg.distance ? \`\${(seg.distance / 1000).toFixed(1)} km · 约 \${seg.displayMinutes} 分钟\` : "站点轨迹近似";
    line.bindTooltip(\`\${modeName}：\${from.name} → \${to.name}｜\${meta}\`, { sticky:true });
  });
  route.stops.forEach(stop => {
    const p = points[stop[1]];
    L.marker([p.lat, p.lng], { icon: icon(stop[0], key) }).addTo(group).bindPopup(popupHtml(stop, key));
  });
  layers[key] = group;
}
Object.keys(routes).forEach(addRoute);
warningStops.forEach(stop => {
  L.marker([stop[3], stop[4]], { icon: icon(stop[0], "warn") }).addTo(map).bindPopup(\`<div class="popup-title">\${stop[1]} \${stop[2]}</div><div class="popup-note">\${stop[5]}</div>\`);
});
function render(key) {
  const route = routes[key];
  document.querySelectorAll("button[data-route]").forEach(btn => btn.classList.toggle("active", btn.dataset.route === key));
  document.getElementById("route-summary").innerHTML = \`<h2>\${route.title}</h2><p>\${route.summary}</p>\`;
  document.getElementById("timeline").innerHTML = route.stops.map(stop => {
    const p = points[stop[1]];
    return \`<div class="stop" style="border-left-color:\${route.color}"><div class="top"><div class="name">\${stop[0]} · \${p.name}</div><div class="time">\${stop[2]}</div></div><div class="note">\${stop[3]}</div></div>\`;
  }).join("");
  Object.entries(layers).forEach(([routeKey, layer]) => {
    if (routeKey === key && !map.hasLayer(layer)) layer.addTo(map);
    if (routeKey !== key && map.hasLayer(layer)) map.removeLayer(layer);
  });
  const bounds = L.latLngBounds([]);
  route.segmentData.forEach(seg => seg.coords.forEach(c => bounds.extend(c)));
  warningStops.forEach(stop => bounds.extend([stop[3], stop[4]]));
  map.fitBounds(bounds, { padding:[38,38] });
}
document.querySelectorAll("button[data-route]").forEach(btn => btn.addEventListener("click", () => {
  history.replaceState(null, "", "#" + btn.dataset.route);
  render(btn.dataset.route);
}));
L.control.scale({ imperial:false }).addTo(map);
const requestedRoute = new URLSearchParams(location.search).get("route") || location.hash.replace("#", "");
render(routes[requestedRoute] ? requestedRoute : "A");
</script>
</body>
</html>`;
}

await fs.writeFile(outHtml, html(), "utf8");
console.log(`wrote ${outHtml.pathname}`);

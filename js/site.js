const works = [
  {
    "title": "一生に一度は見たい絶景 TOP 10",
    "category": "Travel",
    "format": "バナー・SNS",
    "medium": "SNS",
    "image": "assets/works/japan-views.png",
    "alt": "夕日が差す海岸を背景に白と金の文字を配置した旅行画像",
    "description": "夕日の橙と海の青を背景に、白い明朝体と金色の数字を重ねた旅のビジュアルです。"
  },
  {
    "title": "ピンクのガネーシャとどこへ行く？",
    "category": "Travel",
    "format": "アイキャッチ画像",
    "image": "assets/works/pink-ganesha.png",
    "alt": "ピンクのガネーシャ像と周辺の観光地を組み合わせたアイキャッチ画像",
    "description": "ガネーシャ像を中心に観光地の写真を丸く切り抜き、点線で旅のルートを描いています。"
  },
  {
    "title": "大人の肌に、若見えツヤ肌。",
    "category": "Beauty",
    "image": "assets/works/skincare.png",
    "alt": "ピンクの背景にクリーム容器と商品の特徴を配した化粧品デザイン",
    "description": "淡いピンクの光と透明感のある円で、クリームの質感と商品の特徴を一枚にまとめています。"
  },
  {
    "title": "和食創作居酒屋「和」1",
    "category": "Food & Drink",
    "format": "バナー・SNS",
    "medium": "バナー",
    "image": "assets/works/nagomi-ivory.png",
    "alt": "生成りの和紙調背景と暖簾の写真を使った開店告知バナー",
    "description": "暖簾のかかった店先と和紙調の地に、金の円相を合わせた開店告知です。"
  },
  {
    "title": "和食創作居酒屋「和」2",
    "category": "Food & Drink",
    "format": "バナー・SNS",
    "medium": "バナー",
    "image": "assets/works/nagomi-black.png",
    "alt": "墨色の背景に店内と刺身の写真を配した開店告知バナー",
    "description": "墨色と金を基調に、カウンターの灯りと刺身の盛り合わせを配した開店告知です。"
  },
  {
    "title": "タイ・バンコク 社員旅行完全ガイド",
    "category": "Travel",
    "format": "アイキャッチ画像",
    "image": "assets/works/bangkok-guide.png",
    "alt": "寺院と集合写真に旅行案内を重ねたバンコクのアイキャッチ画像",
    "description": "寺院と集合写真に、旅のスタンプや交通案内のピクトグラムを重ねた旅行ガイドのビジュアルです。"
  }
];
for (const work of works) {
  const card = document.createElement("details");
  card.innerHTML = '<summary><span class="thumb"></span><small></small><strong></strong></summary><p></p>';
  const thumb = card.querySelector(".thumb");
  const image = new Image();
  image.alt = work.alt || "";
  image.loading = "lazy";
  image.src = work.image;
  thumb.append(image);
  card.dataset.format = work.format || "";
  card.querySelector("small").textContent = [work.category, work.medium || work.format].filter(Boolean).join(" / ");
  card.querySelector("strong").textContent = work.title;
  card.querySelector("p").textContent = work.description;
  const metadata = document.createElement("dl");
  for (const [key, label] of Object.entries({purpose:"制作目的", scope:"担当範囲", tools:"使用ツール", notes:"工夫した点"})) {
    if (!work[key]) continue;
    const term = document.createElement("dt");
    const value = document.createElement("dd");
    term.textContent = label;
    value.textContent = work[key];
    metadata.append(term, value);
  }
  if (metadata.childElementCount) card.append(metadata);
  document.querySelector("#gallery").append(card);
}
const filters = document.querySelector(".filters");
const cards = [...document.querySelectorAll("#gallery details")];
for (const label of ["All（すべて）", "LP", "Webサイト", "バナー・SNS", "アイキャッチ画像", "チラシ・印刷物"]) {
  const button = document.createElement("button");
  button.type = "button";
  button.textContent = label;
  const all = filters.childElementCount === 0;
  button.setAttribute("aria-pressed", String(all));
  button.addEventListener("click", () => {
    for (const item of filters.children) item.setAttribute("aria-pressed", String(item === button));
    for (const card of cards) card.hidden = !all && card.dataset.format !== label;
    const count = cards.filter(card => !card.hidden).length;
    document.querySelector("#work-status").textContent = count ? count + "件の作品" : "このカテゴリーの掲載作品はまだありません。";
  });
  filters.append(button);
}
const links = [...document.querySelectorAll("nav a")];
const toggle = document.querySelector(".nav-toggle");
const menu = document.getElementById("main-nav");
const mobile = matchMedia("(max-width: 768px)");

function setMenu(open) {
  toggle.setAttribute("aria-expanded", String(open));
  toggle.setAttribute("aria-label", open ? "メニューを閉じる" : "メニューを開く");
  menu.inert = mobile.matches && !open;
}

function syncMenu() {
  toggle.hidden = !mobile.matches;
  if (mobile.matches && menu.contains(document.activeElement)) toggle.focus();
  setMenu(false);
}

toggle.addEventListener("click", () => setMenu(toggle.getAttribute("aria-expanded") !== "true"));
menu.addEventListener("click", event => {
  if (mobile.matches && event.target.closest("a")) {
    toggle.focus({ preventScroll: true });
    setMenu(false);
  }
});
document.addEventListener("keydown", event => {
  if (event.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
    toggle.focus();
    setMenu(false);
  }
});
mobile.addEventListener("change", syncMenu);
syncMenu();

function updateNavigation() {
  let active = links[0];
  for (const link of links.slice(1)) {
    if (document.querySelector(link.hash).getBoundingClientRect().top <= innerHeight * 0.4) active = link;
  }
  if (innerHeight + scrollY >= document.documentElement.scrollHeight - 2) active = links.at(-1);
  for (const link of links) {
    if (link === active) link.setAttribute("aria-current", "location");
    else link.removeAttribute("aria-current");
  }
}
addEventListener("scroll", updateNavigation, { passive: true });
updateNavigation();
const contactForm = document.querySelector("#contact form");
const contactStatus = document.getElementById("status");
const contactFields = contactForm.querySelector("fieldset");
const sendButton = contactForm.querySelector('[type="submit"]');

contactForm.addEventListener("submit", async event => {
  event.preventDefault();
  if (contactFields.disabled || !contactForm.reportValidity()) return;

  const data = new FormData(contactForm);
  for (const name of ["name", "message"]) {
    if (!String(data.get(name)).trim()) {
      contactStatus.textContent = name === "name" ? "お名前をご入力ください。" : "お問い合わせ内容をご入力ください。";
      contactForm.elements.namedItem(name).focus();
      return;
    }
  }

  contactFields.disabled = true;
  contactForm.setAttribute("aria-busy", "true");
  sendButton.textContent = "送信中…";
  contactStatus.textContent = "お問い合わせを送信しています。";
  try {
    const response = await fetch(contactForm.action, {
      method: "POST",
      headers: { Accept: "application/json" },
      body: data
    });
    if (!response.ok) throw new Error("Submission failed");
    contactForm.reset();
    contactStatus.textContent = "お問い合わせを受け付けました。ありがとうございます。";
  } catch {
    contactStatus.textContent = "送信に失敗しました。入力内容は保持されています。時間をおいてもう一度お試しください。";
  } finally {
    contactFields.disabled = false;
    contactForm.removeAttribute("aria-busy");
    sendButton.textContent = "送信する";
  }
});







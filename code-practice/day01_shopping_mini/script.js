const foodInput = document.getElementById("foodInput");
const result = document.getElementById("result");

function escapeHTML(text) {
  return text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function showPlan() {
  const foodText = foodInput.value.trim();

  if (foodText === "") {
    result.innerHTML = `
      <p class="error-message">家にある食材を入力してください。</p>
    `;
    return;
  }

  const foods = foodText
    .split(/[、,，]/)
    .map(item => item.trim())
    .filter(item => item !== "");

  if (foods.length === 0) {
    result.innerHTML = `
      <p class="error-message">食材名を入力してください。</p>
    `;
    return;
  }

  const foodItems = foods
    .map(item => `<li><span class="home-food">${escapeHTML(item)}</span></li>`)
    .join("");

  const food1 = escapeHTML(foods[0]);
  const food2 = escapeHTML(foods[1] || foods[0]);
  const food3 = escapeHTML(foods[2] || foods[0]);
  const extraFoods = foods
  .slice(3)
  .map(item => `<li><span class="home-food">${escapeHTML(item)}</span></li>`)
  .join("");

const extraFoodCard =
  extraFoods === ""
    ? ""
    : `
      <div class="card">
        <h2>予備の食材</h2>
        <p>献立には使っていない予備の食材です。</p>
        <ul>
          ${extraFoods}
        </ul>
      </div>
    `;

 const shoppingCandidates = ["卵", "牛乳", "きのこ", "冷凍野菜"];

const shoppingList = shoppingCandidates
  .filter(item => !foods.includes(item));

const shoppingItems = shoppingList
  .map(item => `<li>${escapeHTML(item)}</li>`)
  .join("");

const shoppingCountText = `候補 ${shoppingList.length}個`;

  const shoppingMessage =
    shoppingItems === ""
      ? "<li>今ある食材を先に使えそうです。</li>"
      : shoppingItems;

  result.innerHTML = `
  <div class="card plan-overview">
  <h2>今回のプランまとめ</h2>
  <p>家にある食材・買い足し候補・3日分の献立をまとめて確認できます。</p>
    <ul class="overview-list">
    <li>入力した食材：${foods.length}個</li>
    <li>買い足し候補：${shoppingList.length}個</li>
    <li>献立：3日分</li>
  </ul>

  <div class="overview-point">
  <p class="overview-point-title">確認する順番</p>
  <ul>
    <li>1. 家にある食材を確認</li>
    <li>2. 買い足し候補を確認</li>
    <li>3. 3日分の献立を確認</li>
  </ul>
</div>
</div>
    <div class="card">
      <h2>家にある食材</h2>
      <p>入力した食材はこちらです。</p>
      <ul>
        ${foodItems}
      </ul>
    </div>
    ${extraFoodCard}
    
    <div class="card shopping-card">
      <h2>買い足しメモ <span class="count-label">${shoppingCountText}</span> <span class="status-badge">買い足し確認OK</span></h2>
      <p>家にある食材に足すと使いやすい、仮の買い足し候補です。</p>
      <ul>
        ${shoppingMessage}
      </ul>
    </div>

    <div class="card info-card">
      <h2>買う前の確認メモ <span class="status-badge">買い物確認OK</span></h2>
      <p>家にある食材を先に使ってから、必要なものを買い足しましょう。</p>
    </div>

 <div class="card day-card">
  <h2>3日分の献立 <span class="status-badge">献立確認OK</span></h2>
  <p class="plan-summary">家にある食材を使って、3日分の献立を日ごとに確認できます。</p>

  <div class="menu-day">
    <h3 class="menu-title">1日目</h3>
<p class="menu-name"><span class="card-label">メニュー：</span>${food1}のメインおかず</p>
<p class="used-food"><span class="card-label">使う食材：</span><span class="menu-food">${food1}</span></p>
<p class="menu-rating">おすすめ度：★★★</p>
<p class="rating-note">家にある食材を使いやすいメニューです。</p>
<p class="menu-description"><span class="description-label">説明：</span>家にある<span class="menu-food">${food1}</span>を使って、食べごたえのある1品にします。</p>
<p class="shopping-note"><span class="shopping-note-label">買い物メモ：</span>足りない食材を確認</p>
  </div>

  <div class="menu-day">
    <h3 class="menu-title">2日目</h3>
    <p class="menu-name"><span class="card-label">メニュー：</span>${food2}と野菜の炒め物</p>
<p class="used-food"><span class="card-label">使う食材：</span><span class="menu-food">${food2}</span></p>
<p class="menu-rating">おすすめ度：★★☆</p>
<p class="rating-note">野菜と合わせやすいメニューです。</p>
<p class="menu-description"><span class="description-label">説明：</span><span class="menu-food">${food2}</span>と野菜を合わせて、手早く作れるおかずにします。</p>
<p class="shopping-note"><span class="shopping-note-label">買い物メモ：</span>野菜を確認</p>
  </div>

  <div class="menu-day">
    <h3 class="menu-title">3日目</h3>
    <p class="menu-name"><span class="card-label">メニュー：</span>${food3}のあったかスープ</p>
<p class="used-food"><span class="card-label">使う食材：</span><span class="menu-food">${food3}</span></p>
<p class="menu-rating">おすすめ度：★★☆</p>
<p class="rating-note">あたたかい汁物にしやすいメニューです。</p>
<p class="menu-description"><span class="description-label">説明：</span><span class="menu-food">${food3}</span>を使って、あたたかいスープにします。</p>
<p class="shopping-note"><span class="shopping-note-label">買い物メモ：</span>スープ具材を確認</p>
  </div>
</div>
`;
}
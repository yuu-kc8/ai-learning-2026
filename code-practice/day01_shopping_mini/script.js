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
    <div class="card">
      <h2>家にある食材</h2>
      <p>入力した食材はこちらです。</p>
      <ul>
        ${foodItems}
      </ul>
    </div>
    ${extraFoodCard}
    
    <div class="card shopping-card">
      <h2>買い足しメモ <span class="count-label">${shoppingCountText}</span></h2>
      <p>家にある食材に足すと使いやすい、仮の買い足し候補です。</p>
      <ul>
        ${shoppingMessage}
      </ul>
    </div>

    <div class="card info-card">
      <h2>買う前の確認メモ</h2>
      <p>家にある食材を先に使ってから、必要なものを買い足しましょう。</p>
    </div>

 <div class="card day-card">
  <h2>3日分の献立</h2>

  <div class="menu-day">
    <h3 class="menu-title">1日目</h3>
    <p><span class="menu-food">${food1}</span>を使ったメインおかず</p>
  </div>

  <div class="menu-day">
    <h3 class="menu-title">2日目</h3>
    <p><span class="menu-food">${food2}</span>と野菜の炒め物</p>
  </div>

  <div class="menu-day">
    <h3 class="menu-title">3日目</h3>
    <p><span class="menu-food">${food3}</span>のあったかスープ</p>
  </div>
</div>
`;
}
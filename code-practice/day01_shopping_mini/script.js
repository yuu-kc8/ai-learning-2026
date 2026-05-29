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

  const shoppingItems = shoppingCandidates
    .filter(item => !foods.includes(item))
    .map(item => `<li>${escapeHTML(item)}</li>`)
    .join("");

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
      <h2>買い足しメモ</h2>
      <p>家にある食材に足すと使いやすいものです。</p>
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

      <h3 class="menu-title">1日目</h3>
      <p>${food1}を使ったメインおかず</p>

      <h3 class="menu-title">2日目</h3>
      <p>${food2}と野菜の炒め物</p>

      <h3 class="menu-title">3日目</h3>
      <p>${food3}のあったかスープ</p>
    </div>
  `;
}
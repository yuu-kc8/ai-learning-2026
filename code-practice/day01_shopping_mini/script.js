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

  result.innerHTML = `
    <div class="card">
      <h2>家にある食材</h2>
      <p>入力した食材はこちらです。</p>
      <ul>
        ${foodItems}
      </ul>
    </div>

    <div class="card shopping-card">
      <h2>買い物リスト</h2>
      <ul>
        <li>卵</li>
        <li>牛乳</li>
        <li>きのこ</li>
        <li>冷凍野菜</li>
      </ul>
    </div>

    <div class="card info-card">
      <h2>買う前の確認メモ</h2>
      <p>家にある食材を先に使えるか確認してから買い足しましょう。</p>
    </div>

    <div class="card day-card">
      <h2>3日分の献立</h2>

      <h3 class="menu-title">1日目</h3>
      <p>家にある食材を使った炒め物</p>

      <h3 class="menu-title">2日目</h3>
      <p>卵と野菜を足した簡単メニュー</p>

      <h3 class="menu-title">3日目</h3>
      <p>残った食材を使ったスープ</p>
    </div>
  `;
}
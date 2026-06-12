function escapeHTML(text) {
  return text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function showPlan() {
  const input = document.getElementById("foodInput");
  const result = document.getElementById("result");

  const foods = input.value
    .split(/[、,，]/)
    .map((food) => food.trim())
    .filter((food) => food !== "")
    .map((food) => escapeHTML(food));

  if (foods.length === 0) {
    result.innerHTML = `
      <div class="card error-card">
        <h2>入力エラー</h2>
        <p>食材を1つ以上入力してください。例：鶏肉、豆腐、キャベツ</p>
      </div>
    `;
    return;
  }

  const foodItems = foods.map((food) => `<li>${food}</li>`).join("");

  const mainFood = foods[0];

  const shoppingItems = ["卵", "牛乳", "きのこ", "冷凍野菜"];
  const shoppingMessage = shoppingItems
    .map((item) => `<li>${item}</li>`)
    .join("");

  const extraFoodCard =
    foods.length === 1
      ? ""
      : `
        <div class="card extra-food-card">
          <h2>ほかに使えそうな食材</h2>
          <p>入力された食材の中から、追加で使えそうなものです。</p>
          <ul>
            ${foods.slice(1).map((food) => `<li>${food}</li>`).join("")}
          </ul>
        </div>
      `;

  result.innerHTML = `
    <div id="planOverview" class="card plan-overview">
      <h2>今回のプランまとめ <span id="planOverviewStatus" class="status-badge">プラン作成完了</span></h2>
      <p>家にある食材・買い足し候補・3日分の献立をまとめて確認できます。</p>

      <p id="planOverviewText" class="overview-status">このプランは入力された食材をもとに作成されています。</p>

      <ul class="overview-list">
        <li>入力した食材：${foods.length}個</li>
        <li>買い足し候補：${shoppingItems.length}個</li>
        <li>献立：3日分</li>
        <li>確認の流れ：4ステップ</li>
      </ul>

      <div class="overview-point">
        <p class="overview-point-title">確認する順番</p>
        <ol>
          <li>家にある食材を確認する</li>
          <li>買い足しメモを確認する</li>
          <li>買う前の最終チェックをする</li>
          <li>3日分の献立を見る</li>
        </ol>
      </div>

      <button id="planOverviewButton" class="next-action" onclick="scrollToHomeFoods()">家にある食材へ進む</button>
    </div>

    <div id="homeFoods" class="card home-card">
      <h2>家にある食材 <span id="homeFoodsStatus" class="status-badge">食材確認OK</span></h2>
      <p id="homeFoodsText">入力した食材はこちらです。</p>
      <ul>
        ${foodItems}
      </ul>
      <button id="homeFoodsButton" class="check-done" onclick="markHomeFoodsDone()">食材を確認しました</button>
      <p id="homeFoodsMessage" class="check-message"></p>
    </div>

    ${extraFoodCard}

    <div id="shoppingMemo" class="card shopping-card">
      <h2>買い足しメモ <span class="count-label">候補 ${shoppingItems.length}個</span> <span id="shoppingMemoStatus" class="status-badge">買い足し確認OK</span></h2>
      <p id="shoppingMemoText">家にある食材に足すと使いやすい、仮の買い足し候補です。</p>
      <ul>
        ${shoppingMessage}
      </ul>
      <button id="shoppingMemoButton" class="check-done" onclick="markShoppingMemoDone()">買い足しを確認しました</button>
      <p id="shoppingMemoMessage" class="check-message"></p>
    </div>

    <div id="shoppingCheck" class="card info-card">
      <h2>買う前の最終チェック <span id="shoppingCheckStatus" class="status-badge">最終チェックOK</span></h2>
      <p id="shoppingCheckText">家にある食材を先に使ってから、必要なものを買い足しましょう。</p>
      <ul id="shoppingCheckList" class="check-list">
        <li>家にある食材を先に使う</li>
        <li>足りない食材だけを買い足す</li>
        <li>買いすぎないように確認する</li>
      </ul>
      <button id="shoppingCheckButton" class="check-done" onclick="markShoppingCheckDone()">最終チェックしました</button>
      <p id="shoppingCheckMessage" class="check-message"></p>
    </div>

    <div id="mealPlan" class="card day-card">
      <h2>3日分の献立 <span id="mealPlanStatus" class="status-badge">献立確認OK</span></h2>
      <p class="plan-summary">家にある食材を使って、3日分の献立を日ごとに確認できます。</p>

      <div class="menu-day">
        <h3 class="menu-title">1日目</h3>
        <p class="menu-name"><span class="card-label">メニュー：</span>${mainFood}のメインおかず</p>
        <p class="used-food"><span class="card-label">使う食材：</span>${mainFood}</p>
        <p class="menu-rating">おすすめ度：★★★</p>
        <p class="rating-note">家にある食材を使いやすいメニューです。</p>
        <p class="menu-description"><span class="description-label">説明：</span>家にある${mainFood}を使って、食べごたえのある1品にします。</p>
        <p class="shopping-note"><span class="shopping-note-label">買い物メモ：</span>足りない食材を確認</p>
      </div>

      <div class="menu-day">
        <h3 class="menu-title">2日目</h3>
        <p class="menu-name"><span class="card-label">メニュー：</span>${mainFood}と野菜の炒め物</p>
        <p class="used-food"><span class="card-label">使う食材：</span>${mainFood}</p>
        <p class="menu-rating">おすすめ度：★★☆</p>
        <p class="rating-note">野菜と合わせやすいメニューです。</p>
        <p class="menu-description"><span class="description-label">説明：</span>${mainFood}と野菜を合わせて、手早く作れるおかずにします。</p>
        <p class="shopping-note"><span class="shopping-note-label">買い物メモ：</span>野菜が足りるか確認</p>
      </div>

      <div class="menu-day">
        <h3 class="menu-title">3日目</h3>
        <p class="menu-name"><span class="card-label">メニュー：</span>${mainFood}のスープ</p>
        <p class="used-food"><span class="card-label">使う食材：</span>${mainFood}</p>
        <p class="menu-rating">おすすめ度：★★☆</p>
        <p class="rating-note">残った食材を使いやすいメニューです。</p>
        <p class="menu-description"><span class="description-label">説明：</span>残った${mainFood}を使って、あたたかいスープにします。</p>
        <p class="shopping-note"><span class="shopping-note-label">買い物メモ：</span>汁物に使う食材を確認</p>
      </div>

      <button id="mealPlanButton" class="check-done" onclick="markMealPlanDone()">献立を確認しました</button>
      <p id="mealPlanMessage" class="check-message"></p>
      <button class="next-action" onclick="scrollToShoppingMemo()">買い足しメモを見直す</button>
    </div>
  `;
}

function scrollToHomeFoods() {
  const homeFoods = document.getElementById("homeFoods");

  if (!homeFoods) {
    return;
  }

  homeFoods.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });

  homeFoods.classList.add("highlight-card");

  setTimeout(() => {
    homeFoods.classList.remove("highlight-card");
  }, 1500);
}

function scrollToShoppingMemo() {
  const shoppingMemo = document.getElementById("shoppingMemo");

  if (!shoppingMemo) {
    return;
  }

  shoppingMemo.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });

  shoppingMemo.classList.add("highlight-card");

  setTimeout(() => {
    shoppingMemo.classList.remove("highlight-card");
  }, 1500);
}

function scrollToShoppingCheck() {
  const shoppingCheck = document.getElementById("shoppingCheck");

  if (!shoppingCheck) {
    return;
  }

  shoppingCheck.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });

  shoppingCheck.classList.add("highlight-card");

  setTimeout(() => {
    shoppingCheck.classList.remove("highlight-card");
  }, 1500);
}

function scrollToMealPlan() {
  const mealPlan = document.getElementById("mealPlan");

  if (!mealPlan) {
    return;
  }

  mealPlan.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });

  mealPlan.classList.add("highlight-card");

  setTimeout(() => {
    mealPlan.classList.remove("highlight-card");
  }, 1500);
}

function scrollToPlanOverview() {
  const planOverview = document.getElementById("planOverview");

  if (!planOverview) {
    return;
  }

  planOverview.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });

  planOverview.classList.add("highlight-card");

  setTimeout(() => {
    planOverview.classList.remove("highlight-card");
  }, 1500);
}

function markHomeFoodsDone() {
  const homeFoods = document.getElementById("homeFoods");
  const homeFoodsStatus = document.getElementById("homeFoodsStatus");
  const homeFoodsText = document.getElementById("homeFoodsText");
  const homeFoodsMessage = document.getElementById("homeFoodsMessage");
  const homeFoodsButton = document.getElementById("homeFoodsButton");

  if (homeFoods) {
    homeFoods.classList.add("checked-card");
  }

  if (homeFoodsStatus) {
    homeFoodsStatus.textContent = "確認済み";
    homeFoodsStatus.classList.add("done-label");
  }

  if (homeFoodsText) {
    homeFoodsText.textContent = "家にある食材を確認しました。次に買い足しメモを見ましょう。";
  }

  if (homeFoodsMessage) {
    homeFoodsMessage.innerHTML = `
      <div class="check-message-title">✅ 家にある食材の確認完了</div>
      <p>入力した食材を確認できました。</p>
      <button class="next-action" onclick="scrollToShoppingMemo()">買い足しメモへ進む</button>
    `;
  }

  if (homeFoodsButton) {
    homeFoodsButton.textContent = "確認済み";
    homeFoodsButton.classList.add("checked");
    homeFoodsButton.disabled = true;
  }
}

function markShoppingMemoDone() {
  const shoppingMemo = document.getElementById("shoppingMemo");
  const shoppingMemoStatus = document.getElementById("shoppingMemoStatus");
  const shoppingMemoText = document.getElementById("shoppingMemoText");
  const shoppingMemoMessage = document.getElementById("shoppingMemoMessage");
  const shoppingMemoButton = document.getElementById("shoppingMemoButton");

  if (shoppingMemo) {
    shoppingMemo.classList.add("checked-card");
  }

  if (shoppingMemoStatus) {
    shoppingMemoStatus.textContent = "確認済み";
    shoppingMemoStatus.classList.add("done-label");
  }

  if (shoppingMemoText) {
    shoppingMemoText.textContent = "買い足し候補を確認しました。必要なものだけ買いましょう。";
  }

  if (shoppingMemoMessage) {
    shoppingMemoMessage.innerHTML = `
      <div class="check-message-title">✅ 買い足しメモ確認完了</div>
      <p>買うものを増やしすぎないように確認できました。</p>
      <button class="next-action" onclick="scrollToShoppingCheck()">買う前の最終チェックへ進む</button>
    `;
  }

  if (shoppingMemoButton) {
    shoppingMemoButton.textContent = "確認済み";
    shoppingMemoButton.classList.add("checked");
    shoppingMemoButton.disabled = true;
  }
}

function markShoppingCheckDone() {
  const checkCard = document.getElementById("shoppingCheck");
  const checkStatus = document.getElementById("shoppingCheckStatus");
  const checkText = document.getElementById("shoppingCheckText");
  const checkList = document.getElementById("shoppingCheckList");
  const checkMessage = document.getElementById("shoppingCheckMessage");
  const checkButton = document.getElementById("shoppingCheckButton");

  if (checkCard) {
    checkCard.classList.add("checked-card");
  }

  if (checkStatus) {
    checkStatus.textContent = "確認完了";
    checkStatus.classList.add("done-label");
  }

  if (checkText) {
    checkText.textContent = "買い物前チェックは完了しました。必要なものだけを買いましょう。";
  }

  if (checkList) {
    checkList.classList.add("checked-list");
  }

  if (checkMessage) {
    checkMessage.innerHTML = `
      <div class="check-message-title">✅ 買い物チェック完了</div>
      <p>買い物リストを見て、必要なものだけ買いましょう。</p>
      <button class="next-action" onclick="scrollToMealPlan()">3日分の献立を見る</button>
    `;
  }

  if (checkButton) {
    checkButton.textContent = "確認済み";
    checkButton.classList.add("checked");
    checkButton.disabled = true;
  }
}

function markMealPlanDone() {
 const planOverview = document.getElementById("planOverview");
const planOverviewStatus = document.getElementById("planOverviewStatus");
const planOverviewText = document.getElementById("planOverviewText");
const planOverviewButton = document.getElementById("planOverviewButton");

  const mealPlan = document.getElementById("mealPlan");
  const mealPlanStatus = document.getElementById("mealPlanStatus");
  const mealPlanMessage = document.getElementById("mealPlanMessage");
  const mealPlanButton = document.getElementById("mealPlanButton");

  if (mealPlan) {
    mealPlan.classList.add("checked-card");
  }

  if (mealPlanStatus) {
    mealPlanStatus.textContent = "確認済み";
    mealPlanStatus.classList.add("done-label");
  }

  if (mealPlanMessage) {
    mealPlanMessage.innerHTML = `
      <div class="check-message-title">✅ 献立確認完了</div>
      <p>3日分の献立を確認できました。</p>
      <button class="next-action" onclick="scrollToPlanOverview()">今回のプランまとめへ戻る</button>
    `;
  }

  if (mealPlanButton) {
    mealPlanButton.textContent = "確認済み";
    mealPlanButton.classList.add("checked");
    mealPlanButton.disabled = true;
  }

  if (planOverview) {
    planOverview.classList.add("checked-card");
  }

  if (planOverviewStatus) {
    planOverviewStatus.textContent = "確認完了";
    planOverviewStatus.classList.add("done-label");
  }

  if (planOverviewText) {
  planOverviewText.textContent = "4つの確認ステップが完了しました。買い物に進める状態です。";
}

if (planOverviewButton) {
  planOverviewButton.textContent = "もう一度確認する";
}
}

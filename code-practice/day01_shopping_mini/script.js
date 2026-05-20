function showPlan() {
  const food = document.getElementById("foodInput").value;
  const result = document.getElementById("result");
  
  if (food.trim() === "") {
  result.innerHTML = `<p class="error-message">先に使う食材を入力してください。</p>`;
  return;
}

  result.innerHTML = `
  <h2>3日分の買い物プラン</h2>

<div class="shopping-card">
 <p class="section-title">買い物リスト</p>
<p class="small-desc">家にないものだけ買い足しましょう。</p>

<ul>
    <li class="main-item">先に使う食材：${food}</li>
    <li>卵 1パック</li>
    <li>カット野菜 1袋</li>
    <li>味噌汁の具材</li>
  </ul>
</div>

  <p>今日は、家にある食材を先に使うプランです。</p>

  <<div class="info-card">
  <p><strong>おすすめ：</strong>家にあるものを優先して使いましょう。</p>
  <p class="memo"><strong>買い物メモ：</strong>候補を見て、家にないものだけ買いましょう。</p>
  <p class="note"><strong>注意：</strong>買う前に、家に残っているものを確認しましょう。</p>
</div>

<p class="section-title">3日分の献立</p>
<p class="small-desc">先に使う食材を中心に、3日分の献立を考えます。</p>

<div class="day-card">
  <h3>1日目</h3>
    <p class="menu-title">献立：${food}を使ったメインおかず</p>
    <p class="menu-desc">${food}を中心に献立を作る日</p>
  </div>

  <div class="day-card">
    <h3>2日目</h3>
    <p class="menu-title">献立：卵とカット野菜の炒めもの</p>
    <p class="menu-desc">卵・カット野菜・味噌汁の具材を使って作る日</p>
  </div>

  <div class="day-card">
    <h3>3日目</h3>
    <p class="menu-title">献立：${food}と味噌汁の具材で使い切りメニュー</p>
    <p class="menu-desc">${food}と買い足した食材を使い切る日</p>
  </div>
  `;
}
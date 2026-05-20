function showPlan() {
  const food = document.getElementById("foodInput").value;
  const result = document.getElementById("result");
  
  if (food.trim() === "") {
  result.innerHTML = `<p class="error-message">先に使う食材を入力してください。</p>`;
  return;
}

  result.innerHTML = `
    <h2>3日分の買い物プラン</h2>
    <p>先に使う食材：${food}</p>
    <h3>買い足すもの候補（家にないものだけ）</h3>
<ul>
  <li>卵 1パック</li>
  <li>カット野菜 1袋</li>
  <li>味噌汁の具材</li>
</ul>
    <p>今日は、家にある食材を先に使うプランです。</p>
    <p><strong>おすすめ：</strong>家にあるものを優先して使いましょう。</p>
<p class="memo"><strong>買い物メモ：</strong>候補を見て、家にないものだけ買いましょう。</p>
<p class="note">注意：買う前に、家に残っているものを確認しましょう。</p>

    <h3>1日目</h3>
<p class="menu-title"><strong>献立：</strong>${food}を使ったメインおかず</p>
<p>${food}を中心に献立を作る日</p>

<h3>2日目</h3>
<p class="menu-title"><strong>献立：</strong>卵とカット野菜の炒めもの</p>
<p>卵・カット野菜・味噌汁の具材を使って作る日</p>

<h3>3日目</h3>
<p class="menu-title"><strong>献立：</strong>${food}と味噌汁の具材で使い切りメニュー</p>
<p>${food}と買い足した食材を使い切る日</p>
  `;
}

function showPlan() {
  const food = document.getElementById("foodInput").value;
  const result = document.getElementById("result");
  
  if (food.trim() === "") {
  result.innerHTML = "<p>食材を入力してください。</p>";
  return;
}

  result.innerHTML = `
    <h2>今日の買い物プラン</h2>
    <p>家にあるもの：${food}</p>
    <h3>買い足すもの候補（足りないもの）</h3>
<ul>
  <li>卵</li>
  <li>野菜</li>
  <li>味噌汁</li>
</ul>
    <p>今日は、家にある食材を先に使うプランです。</p>
    <p><strong>おすすめ：</strong>家にあるものを優先して使いましょう。</p>
<p class="memo"><strong>買い物メモ：</strong>必要なものだけ買い足しましょう。</p>
<p class="note">注意：買い物前に在庫を確認しましょう。</p>

    <h3>1日目</h3>
<p>家にある食材を中心に使う日</p>

<h3>2日目</h3>
<p>足りない食材だけを買い足す日</p>

<h3>3日目</h3>
<p>残った食材を使い切る日</p>
  `;
}

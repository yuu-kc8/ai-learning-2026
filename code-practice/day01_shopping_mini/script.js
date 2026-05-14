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
  <li>卵 1パック</li>
  <li>カット野菜 1袋</li>
  <li>味噌汁の具材</li>
</ul>
    <p>今日は、家にある食材を先に使うプランです。</p>
    <p><strong>おすすめ：</strong>家にあるものを優先して使いましょう。</p>
<p class="memo"><strong>買い物メモ：</strong>候補を見て、家にないものだけ買いましょう。</p>
<p class="note">注意：買う前に、家に残っているものを確認しましょう。</p>

    <h3>1日目</h3>
<p>家にある食材を中心に献立を作る日</p>

<h3>2日目</h3>
<p>足りない食材だけを買い足して作る日</p>

<h3>3日目</h3>
<p>残った食材を使い切る献立の日</p>
  `;
}

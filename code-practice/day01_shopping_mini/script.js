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
    <h3>買い足すもの候補</h3>
<ul>
  <li>卵</li>
  <li>野菜</li>
  <li>味噌汁</li>
</ul>
    <p>今日は、入力した食材をもとに3日分の献立を考えます。</p>
    <p>おすすめ：家にある食材を先に使い、足りないものだけ買い足しましょう。</p>
    <p>注意：買い物前に家の在庫をもう一度確認しましょう。</p>

    <h3>1日目</h3>
<p>家にある食材を使う日</p>

<h3>2日目</h3>
<p>足りないものを少し買い足す日</p>

<h3>3日目</h3>
<p>残った食材を使い切る日</p>
  `;
}

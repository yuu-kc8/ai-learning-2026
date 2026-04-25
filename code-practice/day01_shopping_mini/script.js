function showPlan() {
  const food = document.getElementById("foodInput").value;
  const result = document.getElementById("result");

  result.innerHTML = `
    <h2>今日の買い物プラン</h2>
    <p>家にあるもの：${food}</p>
    <p>今日は、入力した食材をもとに3日分の献立を考えます。</p>
  `;
}

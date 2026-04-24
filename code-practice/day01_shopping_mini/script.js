function showPlan() {
  const food = document.getElementById("foodInput").value;
  const result = document.getElementById("result");

  result.innerHTML = `
    <h2>今日の買い物プラン</h2>
    <p>家にあるもの：${food}</p>
    <p>まずは、家にあるものを使って献立を考えます。</p>
  `;
}

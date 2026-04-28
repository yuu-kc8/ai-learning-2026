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
    <p>今日は、入力した食材をもとに3日分の献立を考えます。</p>
    <p>おすすめ：まずは冷蔵庫の食材から使いましょう。</p>
  `;
}

export const calculateRisk = (answers) => {
    const score = answers.filter((answer) => answer === 1).length;
  
    if (score >= 7) return { text: "เสี่ยงสูง", className: "high" };
    if (score >= 1) return { text: "ปานกลาง", className: "medium" };
    return { text: "ต่ำ", className: "low" };
  };
  
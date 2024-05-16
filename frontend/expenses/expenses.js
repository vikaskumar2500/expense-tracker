async function addExpense(e) {
  e.preventDefault();
  const amount = e.target.amount.value;
  const description = e.target.description.value;
  const category = e.target.category.value;
  const token = localStorage.getItem("jwt_token");
  if (!token) return alert("Something went wrong, Please login again!");
  try {
    const res = await axios.post("http://localhost:3000/expenses/add-expense", {
      amount,
      description,
      category,
      token,
    });
    if (res.status !== 200) throw new Error(res.data.message);
    e.target.amount.value = "";
    e.target.description.value = "";
    e.target.category.value = "";
    alert(res.data.message);
  } catch (error) {
    console.error(error.message);
  }
}

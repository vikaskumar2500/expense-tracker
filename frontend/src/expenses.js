document.addEventListener("DOMContentLoaded", async () => {
  // No need to prevent default action for DOMContentLoaded event
  try {
    const state = history.state;
    console.log("state", state);

    // Example: Make an axios POST request
    // const res = await axios.post("http://localhost:3000/expenses", { userId });
    // console.log(res.data);
  } catch (error) {
    console.error(error);
  }
});

// Add event listener for the popstate event
window.addEventListener("popstate", function(event) {
  // No need to prevent default action for popstate event
  const state = event.state;
  console.log("state", state);

  // Check if state object exists and contains the desired data
  if (state && state.name === "vikas") {
    // Access the data
    const name = state.name;
    console.log("Name:", name); // Outputs: Name: vikas
  }
});

async function addExpense(e) {
  e.preventDefault();
  const amount = e.target.amount.value;
  const description = e.target.description.value;
  const category = e.target.category.value;
  try {
    const res = await axios.post("http://localhost:3000/expenses/add-expense", {
      amount,
      description,
      category,
    });
    if (res.status !== 200) throw new Error(res.statusText);
    e.target.amount.value = "";
    e.target.description.value = "";
    e.target.category.value = "";
    alert(res.statusText);
  } catch (error) {
    console.error(error);
  }
}

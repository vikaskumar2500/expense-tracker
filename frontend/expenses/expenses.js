addEventListener("DOMContentLoaded", async () => {
  try {
    const token = localStorage.getItem("jwt_token");
    console.log("token", token);
    if (!token) {
      window.location.href = "../signin/signin.html";
      return;
    }

    const res = await axios("http://localhost:3000/expenses", {
      headers: { Authorization: token },
    });
    console.log("res", res.data);
    const data = res.data.expenses;
    const isPremium = res.data.isPremium;

    const premiumButton = document.getElementById("rzp-button1");
    if (isPremium) premiumButton.style = "display:none;";

    const list = document.getElementById("expense-list");
    list.style =
      "display:flex; flex-direction:column; align-items:start; gap:5px";

    for (let i = 0; i < data.length; i++) {
      const li = addLiItem(data[i]);
      list.appendChild(li);
    }
  } catch (e) {
    alert(e.message);
  }
});

async function addExpense(e) {
  e.preventDefault();
  const amount = e.target.amount.value;
  const description = e.target.description.value;
  const category = e.target.category.value;
  const token = localStorage.getItem("jwt_token");
  if (!token) {
    alert("Something went wrong, Please login again!");
    window.location.href = "../signin/signin.js";
    return;
  }
  try {
    const res = await axios.post("http://localhost:3000/expenses/add-expense", {
      amount,
      description,
      category,
      token,
    });
    if (res.status !== 200) throw new Error(res.data.message);

    const list = document.getElementById("expense-list");

    const li = addLiItem({ category, description, amount });
    list.appendChild(li);

    e.target.amount.value = "";
    e.target.description.value = "";
    e.target.category.value = "";
  } catch (error) {
    console.error(error.message);
  }
}

const addLiItem = ({ category, description, amount }) => {
  const li = document.createElement("li");
  li.style =
    "display:flex; align-items: center; justify-content:space-between; width:30rem; border:1px solid whitesmoke; border-radius:8px;  padding:0px 20px 0px 20px";
  li.innerHTML = `
		<div style="display:flex; flex-direction:column; align-items:start; justify-content: center; padding:10px">
			<div style="font-size:18px; font-weight:500;">${category}</div>
			<p style="font-size:12px; font-weight:300; ">${description} </p>
		</div>
		
		<span style="font-weight:600;">${amount} Rs</span>
	`;

  return li;
};

document.getElementById("rzp-button1").onclick = async (e) => {
  e.preventDefault();
  try {
    const token = localStorage.getItem("jwt_token");
    const res = await axios.post("http://localhost:3000/expenses/orders", {
      amount: 2500,
      currency: "INR",
      token,
    });

    const data = res.data;

    var options = {
      key: data.keyId,
      name: "Expense Tracker",
      description: "Get Premium for better use!",
      order_id: data.orderId,
      handler: async (response) => {
        try {
          await axios.post("http://localhost:3000/expenses/payment-captured", {
            orderId: data.orderId,
            paymentId: response.razorpay_payment_id,
            token: token,
          });
        } catch (e) {
          console.log("successful error?", e.message);
        }
      },
    };
    var rzp = new Razorpay(options);
    rzp.open();

    rzp.on("payment.failed", async () => {
      try {
        await axios.post("http://localhost:3000/expenses/payment-failed", {
          orderId: data.orderId,
          token: token,
        });
      } catch (e) {
        console.log(e.message);
      }
    });
  } catch (e) {
    console.log(e);
  }
};
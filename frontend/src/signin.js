async function signin(e) {
  e.preventDefault();
  const email = e.target.email.value;
  const password = e.target.password.value;

  console.log(email, password);
  try {
    const res = await axios.post(
      "http://localhost:3000/user/signin",
      {
        email,
        password,
      },
      {
        headers: {
          Authorization: "Vikas",
        },
      }
    );

    if (res.status !== 200) throw new Error(res.statusText);
    e.target.email.value = "";
    e.target.password.value = "";
    window.location.href =
      "file:///D:/Sharpener/Backend(node.js)/expense-tracker/frontend/html/expenses.html";
  } catch (e) {
    console.log("frontedn index", e);
    const error = document.getElementById("error");
    error.innerText = e.message;
  }
}

async function signin(e) {
  e.preventDefault();
  const email = e.target.email.value;
  const password = e.target.password.value;

  try {
    const res = await axios.post("http://localhost:3000/user/signin", {
      email,
      password,
    });

    console.log("res", res);
    if (res.status !== 200) throw new Error(res.statusText);
    e.target.email.value = "";
    e.target.password.value = "";
    window.location.href = "/frontend/html/expenses.html";
  } catch (e) {
    console.log("frontedn index", e);
    const error = document.getElementById("error");
    error.innerText = e.message;
  }
}

async function signin(e) {
  e.preventDefault();
  const email = e.target.email.value;
  const password = e.target.password.value;

  try {
    const res = await axios.post("http://localhost:3000/user/signin", {
      email,
      password,
    });

    if (res.status !== 200) throw new Error(res.message);
    const data = res.data;
    if (data.password !== password) throw new Error("Password does not match");
    e.target.email.value = "";
    e.target.password.value = "";
    alert("Login successful");
  } catch (e) {
    const error = document.getElementById("error");
    error.innerText = e.message;
    setTimeout(() => {
      error.innerText = "";
    }, 5000);
  }
}

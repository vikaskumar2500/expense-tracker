const signup = async (event) => {
  event.preventDefault();
  const name = event.target.name.value;
  const email = event.target.email.value;
  const password = event.target.password.value;
  console.log("name", name, email, password);

  try {
    const res = await axios.post(
      "http://localhost:3000/user/signup",
      {
        name,
        email,
        password,
      },
      { headers: { Authorization: "Vikas" } }
    );
    if (res.status !== 200) throw new Error("Failed to signup");
    event.target.name.value = "";
    event.target.email.value = "";
    event.target.password.value = "";
    window.location.href = "../signin/signin.html";
  } catch (e) {
    const error = document.getElementById("error");
    error.innerText = e.message;
  }
};

const signup = async (e) => {
  e.preventDefault();
  const name = e.target.name.value;
  const email = e.target.email.value;
  const password = e.target.password.value;

  try {
    const res = await axios.post("http://localhost:3000/user/signup", {
      name,
      email,
      password,
    });
    console.log("res", res.info);
    if (res.affectedRows !== 1) throw new Error("Failed to signup");

    // console.log(res.data);
    e.target.name.value = "";
    e.target.email.value = "";
    e.target.password.value = "";
  } catch (e) {
    
    const error = document.getElementById("error");
    error.innerText = e.message;
    setTimeout(() => {
      error.innerText = "";
    }, 5000);
  }
};

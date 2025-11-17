const email = "vicenzo@email.com";
const senha = "123456";

const response = await fetch(`https://projeto-sa-buscreen.onrender.com/api/login?email=${encodeURIComponent(email)}&senha=${encodeURIComponent(senha)}`, {
  method: "GET"
});

const data = await response.json();
console.log(data);
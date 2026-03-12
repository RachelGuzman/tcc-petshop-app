function cadastrar() {
  const tutor = document.getElementById("tutor").value;
  const telefone = document.getElementById("telefone").value;
  const email = document.getElementById("email").value;
  const endereco = document.getElementById("endereco").value;

  if (!tutor || !telefone || !email || !endereco) {
    alert("Preencha todos os campos!");
    return;
  }

  alert("Cliente cadastrado com sucesso! 🐾");

  // limpar campos
  document.getElementById("tutor").value = "";
  document.getElementById("telefone").value = "";
  document.getElementById("email").value = "";
  document.getElementById("endereco").value = "";
}
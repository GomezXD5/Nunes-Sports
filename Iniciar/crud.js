var selectedRow = null;

// Mostrar Alertas
function showAlert(message, className) {
  const div = document.createElement("div");
  div.className = `alert alert-${className}`;

  div.appendChild(document.createTextNode(message));
  const container = document.querySelector(".container");
  const main = document.querySelector(".main");
  container.insertBefore(div, main);
  setTimeout(() => document.querySelector(".alert").remove(), 3000);
}

//Limpar todos os Campos
function clearFields() {
  document.querySelector("#nome").value = "";
  document.querySelector("#codigo").value = "";
  document.querySelector("#descricao").value = "";
  document.querySelector("#valor").value = "";

}

// Add Dados
document.querySelector("#product-form").addEventListener("submit", (e) => {
  e.preventDefault();

  //pegando os Valores do Formulario
  const nomeProduto = document.querySelector("#nome").value;
  const codigoProduto = document.querySelector("#codigo").value;
  const descProduto = document.querySelector("#descricao").value;
  const valorProduto = document.querySelector("#valor").value;

  //Validação
  if (nomeProduto == "" || codigoProduto == "" || descProduto == "" || valorProduto == "") {
    showAlert("Preencha todos os Campos", "danger");
  }
  else {
    if (selectedRow == null) {
      const list = document.querySelector("#product-list");
      const row = document.createElement("tr");

      row.innerHTML = `
        <td>${nomeProduto}</td>
        <td>${codigoProduto}</td>
        <td>${descProduto}</td>
        <td>${valorProduto}</td>
        <td>
        <a href="#" class="btn btn-warning btn-sm edit">Edit</a>
        <a href="#" class="btn btn-danger btn-sm delete">Delete</a>
       `;
      list.appendChild(row);
      selectedRow = null;
      showAlert("Produto Adicionado com Sucesso", "success");
    }
    else {
      selectedRow.children[0].textContent = nomeProduto;
      selectedRow.children[1].textContent = codigoProduto;
      selectedRow.children[2].textContent = descProduto;
      selectedRow.children[3].textContent = valorProduto;
      selectedRow = null;
      showAlert("Informação do Produto Editada", "info");

    }

    clearFields();

  }
});

//Editar Informações

document.querySelector("#product-list").addEventListener("click", (e) => {
  target = e.target;
  if (target.classList.contains("edit")) {
    selectedRow = target.parentElement.parentElement;
    document.querySelector("#nome").value = selectedRow.children[0].textContent;
    document.querySelector("#codigo").value = selectedRow.children[1].textContent;
    document.querySelector("#descricao").value = selectedRow.children[2].textContent;
    document.querySelector("#valor").value = selectedRow.children[3].textContent;
  }
})


// Delete Data

document.querySelector("#product-list").addEventListener("click", (e) => {
  target = e.target;
  if (target.classList.contains("delete")) {
    target.parentElement.parentElement.remove();
    showAlert("Produto Deletado", "danger")
  }


})
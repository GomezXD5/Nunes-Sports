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
 document.querySelector("#preco").value = "";

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
     <td>${nome}</td>
     <td>${codigo}</td>
     <td>${descricao}</td>
     <td>${valor}</td>
     <td>
     <a href="#" class="btn btn-warning btn-sm edit">Edit</a>
     <a href="#" class="btn btn-danger btn-sm delete">Delete</a>
     `;
     list.appendChild(row);
     selectedRow = null;
     showAlert("Produto Adicionado com Sucesso", "success")
  }
 }
});


// Delete Data

document.querySelector("#product-list").addEventListener("click", (e) => {
 target = e.target;
 if (target.classList.contains("delete")) {
  target.parentElement.parentElement.remove();
  showAlert("Produto Deletado", "danger")
 }


})
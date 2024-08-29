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

// Limpar todos os Campos
function clearFields() {
  document.querySelector("#nome").value = "";
  document.querySelector("#codigo").value = "";
  document.querySelector("#descricao").value = "";
  document.querySelector("#valor").value = "";
}

// Carregar Produtos do localStorage
function loadProducts() {
  const products = JSON.parse(localStorage.getItem("products")) || [];
  const list = document.querySelector("#product-list");
  list.innerHTML = "";

  products.forEach(product => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${product.nome}</td>
      <td>${product.codigo}</td>
      <td>${product.descricao}</td>
      <td>${product.valor}</td>
      <td>
        <a href="#" class="btn btn-warning btn-sm edit">Edit</a>
        <a href="#" class="btn btn-danger btn-sm delete">Delete</a>
      </td>
    `;
    list.appendChild(row);
  });
}

// Salvar Produtos no localStorage
function saveProducts(products) {
  localStorage.setItem("products", JSON.stringify(products));
}

// Add Dados
document.querySelector("#product-form").addEventListener("submit", (e) => {
  e.preventDefault();

  // Pegando os Valores do Formulário
  const nomeProduto = document.querySelector("#nome").value;
  const codigoProduto = document.querySelector("#codigo").value;
  const descProduto = document.querySelector("#descricao").value;
  const valorProduto = document.querySelector("#valor").value;

  // Validação
  if (nomeProduto == "" || codigoProduto == "" || descProduto == "" || valorProduto == "") {
    showAlert("Preencha todos os Campos", "danger");
    return;
  }

  const products = JSON.parse(localStorage.getItem("products")) || [];

  if (selectedRow == null) {
    // Adicionar Novo Produto
    const product = {
      nome: nomeProduto,
      codigo: codigoProduto,
      descricao: descProduto,
      valor: valorProduto
    };
    products.push(product);
    saveProducts(products);
    loadProducts();
    showAlert("Produto Adicionado com Sucesso", "success");
  } else {
    // Editar Produto Existente
    const index = Array.from(document.querySelector("#product-list").children).indexOf(selectedRow);
    products[index] = {
      nome: nomeProduto,
      codigo: codigoProduto,
      descricao: descProduto,
      valor: valorProduto
    };
    saveProducts(products);
    loadProducts();
    showAlert("Informação do Produto Editada", "info");
  }

  clearFields();
  selectedRow = null;
});

// Editar Informações
document.querySelector("#product-list").addEventListener("click", (e) => {
  const target = e.target;
  if (target.classList.contains("edit")) {
    selectedRow = target.parentElement.parentElement;
    document.querySelector("#nome").value = selectedRow.children[0].textContent;
    document.querySelector("#codigo").value = selectedRow.children[1].textContent;
    document.querySelector("#descricao").value = selectedRow.children[2].textContent;
    document.querySelector("#valor").value = selectedRow.children[3].textContent;
  }
});

// Delete Data
document.querySelector("#product-list").addEventListener("click", (e) => {
  const target = e.target;
  if (target.classList.contains("delete")) {
    const row = target.parentElement.parentElement;
    const index = Array.from(document.querySelector("#product-list").children).indexOf(row);
    const products = JSON.parse(localStorage.getItem("products")) || [];
    products.splice(index, 1);
    saveProducts(products);
    loadProducts();
    showAlert("Produto Deletado", "danger");
  }
});

// Carregar Produtos ao Iniciar
document.addEventListener("DOMContentLoaded", loadProducts);
   
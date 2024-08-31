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
  const loggedInUser = JSON.parse(sessionStorage.getItem("loggedInUser"));
  if (loggedInUser) {
    const products =
      JSON.parse(localStorage.getItem(loggedInUser.email + "_products")) || [];
    const list = document.querySelector("#product-list");
    list.innerHTML = "";

    products.forEach((product) => {
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
  } else {
    alert("Você não está logado!");
    window.location.href = "/index.html"; // Redirecionar para a página de login se o usuário não estiver logado
  }
}
// Salvar Produtos no localStorage
function saveProducts(products) {
  const loggedInUser = JSON.parse(sessionStorage.getItem("loggedInUser"));
  if (loggedInUser) {
    localStorage.setItem(
      loggedInUser.email + "_products",
      JSON.stringify(products)
    );
  } else {
    alert("Você não está logado!");
    window.location.href = "/index.html";
  }
}

// Add Dados
document.querySelector("#product-form").addEventListener("submit", (e) => {
  e.preventDefault();

  // Pegando os Valores do Formulário
  const nomeProduto = document.querySelector("#nome").value;
  const codigoProduto = document.querySelector("#codigo").value;
  const descProduto = document.querySelector("#descricao").value;
  const valorProduto = parseFloat(document.querySelector("#valor").value);

  // Validação
  if (
    nomeProduto == "" ||
    codigoProduto == "" ||
    descProduto == "" ||
    isNaN(valorProduto)
  ) {
    showAlert("Preencha todos os Campos", "danger");
    return;
  }

  const products =
    JSON.parse(
      localStorage.getItem(
        JSON.parse(sessionStorage.getItem("loggedInUser")).email + "_products"
      )
    ) || [];

  if (selectedRow == null) {
    // Adicionar Novo Produto
    const product = {
      nome: nomeProduto,
      codigo: codigoProduto,
      descricao: descProduto,
      valor: formatCurrency(valorProduto),
    };
    products.push(product);
    saveProducts(products);
    loadProducts();
    showAlert("Produto Adicionado com Sucesso", "success");
  } else {
    // Editar Produto Existente
    const index = Array.from(
      document.querySelector("#product-list").children
    ).indexOf(selectedRow);
    products[index] = {
      nome: nomeProduto,
      codigo: codigoProduto,
      descricao: descProduto,
      valor: formatCurrency(valorProduto),
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
    // Remover a formatação para permitir a edição
    const valorFormatted = selectedRow.children[3].textContent;
    document.querySelector("#valor").value = parseFloat(valorFormatted.replace('R$', '').replace('.', '').replace(',', '.')).toFixed(2);
  }
});

// Deletar Produto
document.querySelector("#product-list").addEventListener("click", (e) => {
  const target = e.target;
  if (target.classList.contains("delete")) {
    const row = target.parentElement.parentElement;
    const index = Array.from(
      document.querySelector("#product-list").children
    ).indexOf(row);
    const products =
      JSON.parse(
        localStorage.getItem(
          JSON.parse(sessionStorage.getItem("loggedInUser")).email + "_products"
        )
      ) || [];
    products.splice(index, 1);
    saveProducts(products);
    loadProducts();
    showAlert("Produto Deletado", "danger");
  }
});

// Carregar Produtos ao Iniciar
document.addEventListener("DOMContentLoaded", loadProducts);

// Botão Logout
document.addEventListener("DOMContentLoaded", () => {
  const logoutBtn = document.getElementById("logout-btn");

  logoutBtn.addEventListener("click", () => {
    sessionStorage.removeItem("loggedInUser");
    window.location.href = "/index.html"; // Redirecionar para a página de login
  });

  const loggedInUser = JSON.parse(sessionStorage.getItem("loggedInUser"));
  if (!loggedInUser) {
    alert("Você não está logado!");
    window.location.href = "/index.html";
  }
});

// Função para formatar valores em reais
function formatCurrency(value) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
}

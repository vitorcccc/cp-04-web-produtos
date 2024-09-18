let listaProdutos = document.querySelector("#lista-produtos");

function adicionarProduto(id, nome, valor, quantidade) {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    carrinho.push({ id, nome, valor, quantidade });
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    exibirCarrinho();
}

function removerProduto(id) {
    let carrinho = JSON.parse(localStorage.getItem('carrinho'));
    carrinho = carrinho.filter(produto => produto.id !== id);
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    exibirCarrinho();
}

function exibirCarrinho() {
    let listaProdutos = document.querySelector("#lista-produtos");
    let carrinho = JSON.parse(localStorage.getItem('carrinho'));
    listaProdutos.innerHTML = ''; 

    if (carrinho && carrinho.length > 0) {
        carrinho.forEach(produto => {
            const li = document.createElement('li');
            li.innerHTML = `${produto.nome} - Quantidade: ${produto.quantidade} - Valor: R$ ${produto.valor.toFixed(2)}
                            <button class="remover" onclick="removerProduto(${produto.id})">Remover</button>`;
            listaProdutos.appendChild(li);
        });
    } else {
        listaProdutos.innerHTML = 'O carrinho está vazio!';
    }
}

function adicionarDeFormaDiferente() {
    const input = document.getElementById("produtos-input").value;
    const ids = input.split(',').map(id => id.trim()).filter(id => id !== '');

    const produtos = [
        { id: 1, nome: 'Camiseta', valor: 29.99, quantidade: 2 },
        { id: 2, nome: 'Calça Jeans', valor: 99.90, quantidade: 1 },
        { id: 3, nome: 'Tênis', valor: 149.90, quantidade: 1 }
    ];

    ids.forEach(id => {
        const produto = produtos.find(p => p.id == id);
        if (produto) {
            adicionarProduto(produto.id, produto.nome, produto.valor, produto.quantidade);
        }
    });
}

exibirCarrinho();
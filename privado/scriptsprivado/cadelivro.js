document.addEventListener('DOMContentLoaded', function() {
    buscarLivros();
    document.getElementById('cadastrar_livro').addEventListener('submit', validarFormularioLivro);
});

let modoEdicao = false;
let isbnEditando = null;

function validarFormularioLivro(event) {
    event.preventDefault();
    const form = event.target;
    if (form.checkValidity()) {
        const livro = {
            isbn: form.isbn.value,
            nomedolivro: form.nomedolivro.value,
            descricao: form.descricao.value,
            autor: form.autor.value,
            anodepublicacao: form.anodepublicacao.value,
            genero: form.genero.value
        };

        if (modoEdicao) {
            fetch(`http://localhost:4000/livros/${isbnEditando}`, {
                method: 'PUT', 
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(livro)
            })
            .then(response => response.json())
            .then(data => {
                mostrarMensagem(data.mensagem, data.status);
                buscarLivros(); 
                modoEdicao = false; 
                isbnEditando = null; 
                form.reset(); 
                document.querySelector("input[type='submit']").value = "Cadastrar Livro";
            });
        } else {
            fetch('http://localhost:4000/livros', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(livro)
            })
            .then(response => response.json())
            .then(data => {
                mostrarMensagem(data.mensagem, data.status);
                buscarLivros(); 
                form.reset(); 
            });
        }
    } else {
        form.classList.add('was-validated');
    }
}

function buscarLivros() {
    fetch('http://localhost:4000/livros')
    .then(response => response.json())
    .then(dados => exibirTabelaLivros(dados))
    .catch(erro => console.error('Falha ao buscar livros:', erro));
}


function mostrarMensagem(mensagem, sucesso) {
    const divMensagem = document.getElementById('mensagem');
    divMensagem.innerHTML = sucesso
        ? `<div class="alert alert-success" role="alert">${mensagem}</div>`
        : `<div class="alert alert-danger" role="alert">${mensagem}</div>`;
    setTimeout(() => {
        divMensagem.innerHTML = '';
    }, 5000);
}

function exibirTabelaLivros(livros) {
    const espacoTabela = document.getElementById('espacoTabela');
    espacoTabela.innerHTML = '';
    if (livros.length > 0) {
        const tabela = document.createElement('table');
        tabela.classList.add('table', 'table-striped', 'table-hover');
        const cabecalho = document.createElement('thead');
        cabecalho.innerHTML = `
            <tr>
                <th>ISBN</th>
                <th>Nome</th>
                <th>Descrição</th>
                <th>Autor</th>
                <th>Ano de Publicação</th>
                <th>Gênero</th>
                <th>Ações</th>
            </tr>`;
        tabela.appendChild(cabecalho);
        const corpo = document.createElement('tbody');
        livros.forEach((livro) => {
            const linha = document.createElement('tr');
            linha.innerHTML = `
                <td>${livro.isbn}</td>
                <td>${livro.nomedolivro}</td>
                <td>${livro.descricao}</td>
                <td>${livro.autor}</td>
                <td>${livro.anodepublicacao}</td>
                <td>${livro.genero}</td>
                <td>
                <button class="btn-excluir" data-isbn="${livro.isbn}">Excluir</button>
                <button onclick="editarLivro(${JSON.stringify(livro).replace(/"/g, '&quot;')})">Editar</button>
                </td>`;
            corpo.appendChild(linha);
        });
        tabela.appendChild(corpo);
        espacoTabela.appendChild(tabela);
        espacoTabela.querySelectorAll('.btn-editar').forEach(button => {
            button.addEventListener('click', (event) => {
                const index = event.target.dataset.index;
                editarLivro(livros[index]);
            });
        });

        espacoTabela.querySelectorAll('.btn-excluir').forEach(button => {
            button.addEventListener('click', (event) => {
                const isbn = event.target.dataset.isbn;
                excluirLivro(isbn);
            });
        });
    } else {
        espacoTabela.innerHTML = '<p>Nenhum livro encontrado!</p>';
    }
}
function excluirLivro(isbn) {
    if (confirm('Tem certeza que deseja excluir este livro?')) {
        
        fetch(`http://localhost:4000/livros/${isbn}`, {
            method: 'DELETE'
        })
        .then(response => response.json())
        .then(dados => {
            mostrarMensagem(dados.mensagem, dados.status);
            if (dados.status) {
                buscarLivros(); 
            }
        })
        .catch(erro => {
            mostrarMensagem(erro.message, false);
        });
    }

}


function editarLivro(livro) {
    document.getElementById('isbn').value = livro.isbn;
    document.getElementById('nomedolivro').value = livro.nomedolivro;
    document.getElementById('descricao').value = livro.descricao;
    document.getElementById('autor').value = livro.autor;
    document.getElementById('anodepublicacao').value = livro.anodepublicacao;
    document.getElementById('genero').value = livro.genero;
    modoEdicao = true;
    isbnEditando = livro.isbn;
    document.querySelector("input[type='submit']").value = "Atualizar Livro";
}

function mostrarMensagem(mensagem, sucesso) {
    const divMensagem = document.getElementById('mensagem');
    divMensagem.innerHTML = sucesso ? `<div class="alert alert-success">${mensagem}</div>` : `<div class="alert alert-danger">${mensagem}</div>`;
    setTimeout(() => {
        divMensagem.innerHTML = '';
    }, 5000);
}

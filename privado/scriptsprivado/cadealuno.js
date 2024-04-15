document.getElementById('cadastrar_aluno').addEventListener('submit', validarFormulario);
window.onload=buscarAlunos();
document.addEventListener('DOMContentLoaded', function() {
    buscarAlunos();
});
function validarFormulario(event) {
    event.preventDefault();
    const form = event.target;
    if (form.checkValidity()) {
        const nomeAluno = document.getElementById('nome').value;
        const radoAluno = document.getElementById('ra').value;
        const classeAluno = document.getElementById('classe').value;
        const contatoAluno = document.getElementById('contato').value;
        const emailAluno = document.getElementById('email').value;

        const aluno = {
            nomeAluno,
            radoAluno,
            classeAluno,
            contatoAluno,
            emailAluno
        };

        formularioAluno(aluno);
    } else {
        form.classList.add('was-validated');
    }
}

function formularioAluno(aluno) {
    fetch('http://localhost:5000/alunos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(aluno)
    })
    .then(response => response.json())
    .then(dados => {
        mostrarMensagem(dados.mensagem, dados.status);
        if (dados.status) {
            buscarAlunos();
        }
    })
    .catch(erro => {
        mostrarMensagem(erro.message, false);
    });
}

function buscarAlunos() {
    fetch('http://localhost:5000/alunos')
    .then(response => response.json())
    .then(dados => exibirTabelaAlunos(dados))
    .catch(erro => console.error('Falha ao buscar alunos:', erro));
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

function exibirTabelaAlunos(alunos) {
    const espacoTabela = document.getElementById('espacoTabela');
    espacoTabela.innerHTML = '';
    if (alunos.length > 0) {
        const tabela = document.createElement('table');
        tabela.classList.add('table', 'table-striped', 'table-hover');
        const cabecalho = document.createElement('thead');
        cabecalho.innerHTML = `
            <tr>
                <th>#</th>
                <th>Nome</th>
                <th>RA</th>
                <th>Classe</th>
                <th>Telefone</th>
                <th>E-mail</th>
                <th>Ações</th>
            </tr>`;
        tabela.appendChild(cabecalho);
        const corpo = document.createElement('tbody');
        alunos.forEach((aluno, index) => {
            const linha = document.createElement('tr');
            linha.innerHTML = `
                <td>${index + 1}</td>
                <td>${aluno.nomeAluno}</td>
                <td>${aluno.radoAluno}</td>
                <td>${aluno.classeAluno}</td>
                <td>${aluno.contatoAluno}</td>
                <td>${aluno.emailAluno}</td>
                <td>
                    <!-- Botões de ação aqui, como editar e excluir -->
                </td>`;
            corpo.appendChild(linha);
        });
        tabela.appendChild(corpo);
        espacoTabela.appendChild(tabela);
    } else {
        espacoTabela.innerHTML = '<p>Nenhum aluno encontrado!</p>';
    }
}




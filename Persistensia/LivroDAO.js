import conectar from "./Conexao.js";
import Livro from "../Modelos/Livros.js";


export default class LivroDAO {

    async gravar(livro) {
        if (livro instanceof Livro) {
            const conexao = await conectar();
            const sql = `INSERT INTO livro (nome_do_livro, descricao, autor, ano_de_publicacao, genero)
                         VALUES (?, ?, ?, ?, ?)`;
            const parametros = [
                livro.nomedolivro,
                livro.descricao,
                livro.autor,
                livro.anodepublicacao,
                livro.genero,
            ];
            const [resultados] = await conexao.execute(sql, parametros);
            livro.codigo = resultados.insertId;
        }
    }


    async atualizar(livro) {
        if (livro instanceof Livro) {
            const conexao = await conectar();
            const sql = `UPDATE livro SET nome_do_livro = ?, descricao = ?, autor = ?, ano_de_publicacao = ?, genero = ?
                         WHERE isbn = ?`;
            const parametros = [
                livro.nomedolivro,
                livro.descricao,
                livro.autor,
                livro.anodepublicacao,
                livro.genero,
                livro.isbn
            ];
            await conexao.execute(sql, parametros);
        }
    }
async excluir(livro) {
        if (livro instanceof Livro) {
            const conexao = await conectar();
            const sql = `DELETE FROM livro WHERE isbn = ?`;
            const parametros = [livro.isbn];
            await conexao.execute(sql, parametros);
        }
    }

    async consultar(termoDePesquisa = "") {
        let sql = "";
        const conexao = await conectar();
        if (isNaN(parseInt(termoDePesquisa))) { 
            sql = `SELECT * FROM livro WHERE nome_do_livro LIKE ?`;
            termoDePesquisa = '%' + termoDePesquisa + '%';
        } else {
            sql = `SELECT * FROM livro WHERE isbn = ?`;
        }
        const [registros] = await conexao.execute(sql, [termoDePesquisa]);
        let listaLivros = registros.map(registro => new Livro(
            registro.isbn,
            registro.nome_do_livro,
            registro.descricao,
            registro.autor,
            registro.ano_de_publicacao,
            registro.genero,
        ));
        return listaLivros;
    }
}

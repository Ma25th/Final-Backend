import conectar from "./Conexao.js";
import Livro from "../Modelos/Livros.js";

export default class LivroDAO {

    async gravar(livro) {
        if (livro instanceof Livro) {
            const conexao = await conectar();
            const sql = `INSERT INTO livro (isbn,nomedolivro, descricao, autor, anodepublicacao, genero)
                         VALUES (?, ?, ?, ?, ?,?)`;
            const parametros = [
                livro.isbn,
                livro.nomedolivro,
                livro.descricao,
                livro.autor,
                livro.anodepublicacao,
                livro.genero,
            ];
            const [resultados] = await conexao.execute(sql, parametros);
            livro.isbn = resultados.insertI;
        }
    }

    async atualizar(livro) {
        if (livro instanceof Livro) {
            const conexao = await conectar();
            const sql = `UPDATE livro SET nomedolivro = ?, descricao = ?, autor = ?, anodepublicacao = ?, genero = ?
                         WHERE isbn = ?`;
            const parametros = [
                livro.nomedolivro,
                livro.descricao,
                livro.autor,
                livro.anodepublicacao,
                livro.genero,
                livro.isbn,
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

    async consultar(termoDePesquisa) {
        const conexao = await conectar();
        let sql = "SELECT * FROM livro";  
        let parametros = [];

        if (termoDePesquisa) {
            if (isNaN(parseInt(termoDePesquisa))) {
                sql += " WHERE nomedolivro LIKE ?";
                parametros = [`%${termoDePesquisa}%`];
            } else {
                sql += " WHERE isbn = ?";
                parametros = [termoDePesquisa];
            }
        }

        const [registros] = await conexao.execute(sql, parametros);
        return registros.map(registro => new Livro(
            registro.isbn,
            registro.nomedolivro,
            registro.descricao,
            registro.autor,
            registro.anodepublicacao,
            registro.genero,
        ));
    }
}

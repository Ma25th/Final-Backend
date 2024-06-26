import conectar from "./Conexao.js";
import Aluno from "../Modelos/Alunos.js";

export default class AlunoDAO {
    
    async gravar(aluno) {
        if (aluno instanceof Aluno) {
            const conexao = await conectar();
            const sql = `INSERT INTO aluno (nomeAluno, radoAluno, classeAluno, contatoAluno, emailAluno) 
                         VALUES (?, ?, ?, ?, ?)`;
            const parametros = [
                aluno.nomeAluno,
                aluno.radoAluno,
                aluno.classeAluno,
                aluno.contatoAluno,
                aluno.emailAluno,
            ];
            await conexao.execute(sql, parametros);
        }
    }

    
    async atualizar(aluno) {
        if (aluno instanceof Aluno) {
            const conexao = await conectar();
            const sql = `UPDATE aluno SET nomeAluno = ?, classeAluno = ?, contatoAluno = ?, emailAluno = ?
                         WHERE radoAluno = ?`;
            const parametros = [
                aluno.nomeAluno,
                aluno.classeAluno,
                aluno.contatoAluno,
                aluno.emailAluno,
                aluno.radoAluno
            ];
            await conexao.execute(sql, parametros);
        }
    }

  
    async excluir(aluno) {
        if (aluno instanceof Aluno) {
            const conexao = await conectar();
            const sql = `DELETE FROM aluno WHERE radoAluno = ?`;
            const parametros = [aluno.radoAluno];
            await conexao.execute(sql, parametros);
        }
    }

    
    async consultar(termoDePesquisa) {
        const conexao = await conectar();
        let sql = "";
        let parametros = [];

        if (isNaN(parseInt(termoDePesquisa))) { 
            sql = `SELECT * FROM aluno WHERE nomeAluno LIKE ?`;
            parametros = ['%' + termoDePesquisa + '%'];
        } else { 
            sql = `SELECT * FROM aluno WHERE radoAluno = ?`;
            parametros = [termoDePesquisa];
        }

        const [registros] = await conexao.execute(sql, parametros);
        let listaAlunos = registros.map(registro => new Aluno(
            registro.nomeAluno,
            registro.radoAluno,
            registro.classeAluno,
            registro.contatoAluno,
            registro.emailAluno
        ));
        return listaAlunos;
    }
}

import Aluno from "../Modelos/Alunos.js";

export default class AlunoCtrl {
    gravar(requisicao, resposta) {
        resposta.type('application/json');

        if (requisicao.method === "POST" && requisicao.is('application/json')) {
            const { nomeAluno, radoAluno, classeAluno, contatoAluno, emailAluno } = requisicao.body; // Nomes dos campos ajustados

            if (nomeAluno && radoAluno && classeAluno && contatoAluno && emailAluno) {
                // A ordem dos parâmetros deve corresponder à ordem do construtor de Aluno.
                const aluno = new Aluno(nomeAluno, radoAluno, classeAluno, contatoAluno, emailAluno); 
                aluno.gravar().then(() => {
                    resposta.status(201);
                    resposta.json({
                        "status": true,
                        "mensagem": "Aluno gravado com sucesso!",
                        "ra_aluno": aluno.radoAluno // Atenção para o uso da propriedade correta aqui.
                    });
                }).catch((erro) => {
                    resposta.status(500);
                    resposta.json({
                        "status": false,
                        "mensagem": "Não foi possível armazenar o aluno! " + erro.message
                    });
                });
            } else {
                resposta.status(400);
                resposta.json({
                    "status": false,
                    "mensagem": "Por favor, informe todos os dados do aluno, conforme documentação da API"
                });
            }
        } else {
            resposta.status(405);
            resposta.json({
                "status": false,
                "mensagem": "Requisição inválida! Esperando o método POST e dados no formato JSON para gravar um aluno!"
            });
        }
    }


    atualizar(requisicao, resposta) {
        resposta.type('application/json');

        if ((requisicao.method === "PATCH" || requisicao.method === "PUT") && requisicao.is('application/json')) {
            const { nomeAluno, radoAluno, classeAluno, contatoAluno, emailAluno } = requisicao.body; // Nomes dos campos ajustados
            const raAluno = requisicao.params.raAluno;

            if (raAluno && raAluno > 0 && nomeAluno && radoAluno && classeAluno && contatoAluno && emailAluno) {
                const aluno = new Aluno(nomeAluno, radoAluno, classeAluno, contatoAluno, emailAluno);
                aluno.atualizar().then(() => {
                    resposta.status(200);
                    resposta.json({
                        "status": true,
                        "mensagem": "Aluno atualizado com sucesso!"
                    });
                }).catch((erro) => {
                    resposta.status(500);
                    resposta.json({
                        "status": false,
                        "mensagem": "Não foi possível atualizar o aluno! " + erro.message
                    });
                });
            } else {
                resposta.status(400);
                resposta.json({
                    "status": false,
                    "mensagem": "Por favor, informe todos os dados do aluno, conforme documentação da API"
                });
            }
        } else {
            resposta.status(405);
            resposta.json({
                "status": false,
                "mensagem": "Requisição inválida! Esperando o método PATCH ou PUT e dados no formato JSON para atualizar um aluno!"
            });
        }
    }


    excluir(requisicao, resposta) {
        resposta.type('application/json');

        if (requisicao.method === "DELETE") {
            const raAluno = requisicao.params.raAluno;

            if (raAluno && raAluno > 0) {
                const aluno = new Aluno(raAluno);
                aluno.excluir().then(() => {
                    resposta.status(200);
                    resposta.json({
                        "status": true,
                        "mensagem": "Aluno excluído com sucesso!"
                    });
                }).catch((erro) => {
                    resposta.status(500);
                    resposta.json({
                        "status": false,
                        "mensagem": "Não foi possível excluir o aluno! " + erro.message
                    });
                });
            } else {
                resposta.status(400);
                resposta.json({
                    "status": false,
                    "mensagem": "Por favor, informe o RA do aluno que deseja excluir, conforme documentação da API"
                });
            }
        } else {
            resposta.status(405);
            resposta.json({
                "status": false,
                "mensagem": "Requisição inválida! Esperando o método DELETE para excluir um aluno!"
            });
        }
    }

    consultar(requisicao, resposta) {
        resposta.type('application/json');

        if (requisicao.method === "GET") {
            const termoDePesquisa = requisicao.query.termo;

            const aluno = new Aluno();
            aluno.consultar(termoDePesquisa).then((alunos) => {
                resposta.status(200);
                resposta.json(alunos);
            }).catch((erro) => {
                resposta.status(500);
                resposta.json({
                    "status": false,
                    "mensagem": "Não foi possível consultar os alunos! " + erro.message
                });
            });
        } else {
            resposta.status(405);
            resposta.json({
                "status": false,
                "mensagem": "Requisição inválida! Esperando o método GET para consultar os alunos!"
            });
        }
    }
}

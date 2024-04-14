import Livro from "../Modelos/Livros.js";

export default class livroCtrl{

    gravar(requisicao, resposta){

        resposta.type('application/json');

       
        
        if(requisicao.method === "POST" && requisicao.is('application/json')){
            const dados = requisicao.body; 
            const isbn = dados.isbn;
            const nomedolivro = dados.nomedolivro;
            const descricao = dados.descricao;
            const autor = dados.autor;
            const anodepublicacao = dados.anodepublicacao;
            const genero = dados.genero;
            

    
            if (isbn && nomedolivro&& descricao && autor && anodepublicacao && genero){
                const livro = new Livro(0, isbn, nomedolivro, descricao, autor, anodepublicacao, genero);
                livro.gravar().then(()=>{
                    resposta.status(201);
                    resposta.json({
                        "status":true,
                        "mensagem": "livro gravado com sucesso!",
                        "isbn_livro": livro.isbn
                    });
                }).catch((erro) =>{
                    resposta.status(500);
                    resposta.json({
                        "status":false,
                        "mensagem": "Não foi possível armazenar o livro! " + erro.message
                    })
                });
            }
            else{
                resposta.status(400);
                resposta.json({
                    "status":false,
                    "mensagem": "Por favor, informe todos os dados do livro!"
                });
            }
        }
        else{
            resposta.status(405);
            resposta.json({
                "status":false,
                "mensagem": "Requisição inválida! Esperando o método POST e dados no formato JSON para gravar um livro!"
            })
        }
    }

    atualizar(requisicao, resposta){
        resposta.type('application/json');
        if ((requisicao.method === "PATCH" || requisicao.method === "PUT") && requisicao.is('application/json')){
            const dados = requisicao.body; 
            const isbn = requisicao.params.isbn;
            const nomedolivro = dados.nomedolivro;
            const descricao = dados.descricao;
            const autor = dados.autor;
            const anodepublicacao = dados.anodepublicacao;
            const genero = dados.genero;
            
            if (isbn && isbn > 0 && nomedolivro && descricao && autor && anodepublicacao && genero)
            {
                const livro = new Livro( isbn, nomedolivro, descricao, autor, anodepublicacao, genero);
                livro.atualizar()
                .then(()=>{
                    resposta.status(200);
                    resposta.json({
                        "status":true,
                        "mensagem": "Livro atualizado com sucesso!",
                    })
                })
                .catch((erro) =>{
                    resposta.status(500);
                    resposta.json({
                        "status":false,
                        "mensagem": "Não foi possível atualizar o livro! " + erro.message
                    })
                });
            }
            else{
                resposta.status(400);
                resposta.json({
                    "status":false,
                    "mensagem": "Por favor, informe todos os dados do livro!"
                })
            }
        }
        else{
            resposta.status(405);
            resposta.json({
                "status":false,
                "mensagem": "Requisição inválida! Esperando o método PATCH, PUT e dados no formato JSON para atualizar um cliente!"
            })
        }
    }

    excluir(requisicao, resposta){
        resposta.type('application/json');
        if (requisicao.method === "DELETE"){

            const isbn = requisicao.params.isbn;
            if (isbn && isbn > 0){
                const livro = new Livro(isbn);
                livro.excluir()
                .then(()=>{
                    resposta.status(200);
                    resposta.json({
                        "status":true,
                        "mensagem": "Livro excluído com sucesso!",
                    })
                })
                .catch((erro) =>{
                    resposta.status(500);
                    resposta.json({
                        "status":false,
                        "mensagem": "Não foi possível excluir o livro! " + erro.message
                    })
                })
            }
            else{
                resposta.status(400);
                resposta.json({
                    "status":false,
                    "mensagem": "Por favor, informe o código do livro que deseja excluir, conforme documentação da API"
                })
            }
        }
        else{
            resposta.status(405);
            resposta.json({
                "status":false,
                "mensagem": "Requisição inválida! Esperando o método DELETE para excluir um livro!"
            })
        }
    }

    consultar(requisicao, resposta){
        resposta.type('application/json');
        if (requisicao.method === "GET"){
            const termoDePesquisa = requisicao.params.termo;
            const livro = new Livro(0);
            livro.consultar(termoDePesquisa)
            .then((livros)=>{
                resposta.status(200);
                resposta.json(livros);
            })
            .catch((erro) =>{
                resposta.status(500);
                resposta.json({
                    "status":false,
                    "mensagem": "Não foi possível consultar os livros! " + erro.message
                })
            })
        }
        else{
            
            resposta.status(405);
            resposta.json({
                "status":false,
                "mensagem": "Requisição inválida! Esperando o método GET para consultar os livros!"
            })
        }
    }

}
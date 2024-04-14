import LivroDAO from "../Persistensia/LivroDAO.js";
export default class Livro {
    #isbn;
    #nomedolivro;
    #descricao;
    #autor;
    #anodepublicacao;
    #genero;

    constructor(isbn= 0, nomedolivro="", descricao="", autor="", anodepublicacao="", genero="") {
        this.#isbn = isbn;
        this.#nomedolivro = nomedolivro;
        this.#descricao = descricao;
        this.#autor = autor;
        this.#anodepublicacao = anodepublicacao;
        this.#genero = genero;
    }

    get isbn(){
        return this.#isbn;
    }

    set isbn(novoIsbn){
        this.#isbn = novoIsbn;
    }

    get nomedolivro(){
        return this.#nomedolivro;
    }

    set nomedolivro(novoNomedolivro){
        this.#nomedolivro = novoNomedolivro;
    }

    get descricao(){
        return this.#descricao;
    }

    set descricao(novoDescricao){
        this.#descricao = novoDescricao;
    }

    get autor(){
        return this.#autor;
    }

    set autor(novoAutor){
        this.#autor = novoAutor;
    }

    get anodepublicacao(){
        return this.#anodepublicacao;
    }

    set anodepublicacao(novoAnodepublicacao){
        this.#anodepublicacao = novoAnodepublicacao;
    }

    get genero(){
        return this.#genero;
    }

    set genero(novaGenero){
        this.#genero = novaGenero;
    }

async gravar(){
        const dao = new LivroDAO();
        await dao.gravar(this);
    }

    async atualizar(){
        const dao = new LivroDAO();
        await dao.atualizar(this);
    }

    async excluir(){
        const dao = new LivroDAO();
        await dao.excluir(this);
    }

    async consultar(termoDePesquisa){
        const dao = new LivroDAO();
        return await dao.consultar(termoDePesquisa);
    }
    toString(){
        return `Livro return Livro código: ${this.#isbn} -  nome: ${this.#isbn}`;
    }

    toJSON(){
        return {
            "isbn": this.#isbn,
            "Nome do livro": this.#nomedolivro,
            "Descrição": this.#descricao,
            "Autor": this.#autor,
            "Ano de publicacao": this.#anodepublicacao,
            "Ano de publicacao": this.#anodepublicacao,
            "Genero": this.#genero
        }
    }

    async gravar(){
    const dao = new LivroDAO();
    await dao.gravar(this);
}

async atualizar(){
    const dao = new LivroDAO();
    await dao.atualizar(this);
}

async excluir(){
    const dao = new LivroDAO();
    await dao.excluir(this);
}

async consultar(termoDePesquisa){
    const dao = new LivroDAO();
    return await dao.consultar(termoDePesquisa);
}
toString(){
    return `Livro codigo: ${this.#isbn} -  nome: ${this.#isbn}`;
}

toJSON(){
    return {
        "isbn": this.#isbn,
        "Nome do livro": this.#nomedolivro,
        "Descrição": this.#descricao,
        "Autor": this.#autor,
        "Ano de publicacao": this.#anodepublicacao,
        "Ano de publicacao": this.#anodepublicacao,
        "Genero": this.#genero
    }
}
}
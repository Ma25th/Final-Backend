import AlunoDAO from "../Persistensia/AlunoDAO.js";
export default class Aluno {
    #nomeAluno;
    #radoAluno;
    #classeAluno;
    #contatoAluno;
    #emailAluno;

    constructor(nomeAluno, radoAluno, classeAluno, contatoAluno, emailAluno) {
        this.#nomeAluno = nomeAluno;
        this.#radoAluno = radoAluno;
        this.#classeAluno = classeAluno;
        this.#contatoAluno = contatoAluno;
        this.#emailAluno = emailAluno;
    }

    // Getters
    get nomeAluno() {
        return this.#nomeAluno;
    }

    get radoAluno() {
        return this.#radoAluno;
    }

    get classeAluno() {
        return this.#classeAluno;
    }

    get contatoAluno() {
        return this.#contatoAluno;
    }

    get emailAluno() {
        return this.#emailAluno;
    }

    // Setters
    set nomeAluno(novoNomeAluno) {
        this.#nomeAluno = novoNomeAluno;
    }

    set radoAluno(novoRadoAluno) {
        this.#radoAluno = novoRadoAluno;
    }

    set classeAluno(novaClasseAluno) {
        this.#classeAluno = novaClasseAluno;
    }

    set contatoAluno(novoContatoAluno) {
        this.#contatoAluno = novoContatoAluno;
    }

    set emailAluno(novoEmailAluno) {
        this.#emailAluno = novoEmailAluno;
    }

    // Métodos para interação com o banco de dados
    async gravar() {
        const dao = new AlunoDAO();
        return await dao.gravar(this);
    }

    async atualizar() {
        const dao = new AlunoDAO();
        return await dao.atualizar(this);
    }

    async excluir() {
        const dao = new AlunoDAO();
        return await dao.excluir(this);
    }

    async consultar(termoDePesquisa) {
        const dao = new AlunoDAO();
        return await dao.consultar(termoDePesquisa);
    }

    // Métodos utilitários
    toString() {
        return `Nome do Aluno: ${this.#nomeAluno}, RA: ${this.#radoAluno}`;
    }

    toJSON() {
        return {
            nomeAluno: this.#nomeAluno,
            radoAluno: this.#radoAluno,
            classeAluno: this.#classeAluno,
            contatoAluno: this.#contatoAluno,
            emailAluno: this.#emailAluno,
        };
    }
}

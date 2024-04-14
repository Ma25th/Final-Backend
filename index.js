import express from "express";
import rotaLivro from "./Rotas/rotaLivros.js";
import rotaAlunos from "./Rotas/rotaAlunos.js";
import process from 'process';
import path from 'path';
import session from 'express-session';
import autenticar from './seguranca/autenticar.js';
import cors from "cors";
const host='localhost'; 
const porta = 3000;  
const corsOptions= {
    origin: 'http://localhost:3000'
}
const app = express();
app.use(cors({
    origin: 'http://localhost:3000'  // Permitir apenas requisições do frontend no localhost:3000
}));
app.use(express.urlencoded({extended: true})); 
app.use(session({
    secret: 'M1nH4Ch4v3S3cr3t4',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 60 * 1000 * 15
    }
}))
app.post('/login', (requisicao, resposta)=>{
    const usuario = requisicao.body.usuario;
    const senha   = requisicao.body.senha;
    if (usuario && senha && usuario === 'MMMMD' && senha === '12345'){
        requisicao.session.usuarioLogado = true;
        resposta.redirect('/index.html');
    }
    else{
        resposta.redirect('/login.html');
    }
})
app.use(express.static(path.join(process.cwd(), 'publico')));
app.use(autenticar, express.static(path.join(process.cwd(), 'privado')));
app.listen(porta, host, ()=>{
    console.log(`Servidor escutando em http://${host}:${porta}`);

})

const host1 = '0.0.0.0';
const porta1 = 4000;
const app1 = express();
app1.use(cors(corsOptions));
app1.use(express.json());
app1.use(express.urlencoded({ extended: true }));
app1.use('/livros', rotaLivro);
app1.listen(porta1, host1, () => {
    console.log(`Servidor rodando em http://${host1}:${porta1}`);
});
const host2 = '0.0.0.0';
const porta2 = 5000;
const app2 = express();
app2.use(cors(corsOptions));
app2.use(express.json());
app2.use(express.urlencoded({ extended: true }));
app2.use('/alunos', rotaAlunos);
app2.listen(porta2, host2, () => {
    console.log(`Servidor rodando em http://${host2}:${porta2}`);
});



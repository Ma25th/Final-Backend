import { Router } from 'express';
import livroCtrl from '../Controles/livroCtrl.js';

const rotaLivro = new Router();
const liCtrl = new livroCtrl();

rotaLivro
.get('/', liCtrl.consultar)
.get('/:termo', liCtrl.consultar)
.post('/', liCtrl.gravar)
.put('/:codigo', liCtrl.atualizar)
.patch('/:codigo', liCtrl.atualizar)
.delete('/:isbn', liCtrl.excluir);


export default rotaLivro;
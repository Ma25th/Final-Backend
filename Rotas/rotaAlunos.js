import { Router } from 'express';
import AlunoCtrl from '../Controles/alunoCtrl.js';

const rotaAluno = new Router();
const aluCtrl = new AlunoCtrl();

rotaAluno
.get('/', aluCtrl.consultar)
.get('/:termo', aluCtrl.consultar)
.post('/', aluCtrl.gravar)
.put('/:ra', aluCtrl.atualizar)
.patch('/:ra', aluCtrl.atualizar)
.delete('/:ra', aluCtrl.excluir);
export default rotaAluno;
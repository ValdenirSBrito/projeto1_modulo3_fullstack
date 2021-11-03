const express = require('express');
// inicializar as rotas do express
const router = express.Router();

const filmes = [
    {
        id: 1,
        nome: 'Velozes e Furiosos 9',
        imagem: 'https://br.web.img3.acsta.net/c_310_420/pictures/21/04/14/19/06/3385237.jpg',
        genero: 'Ação',
        nota: 7,
        descricao: 'Em Velozes & Furiosos 9, Dominic Toretto (Vin Diesel) e Letty (Michelle Rodriguez) vivem uma vida pacata ao lado de seu filho Brian. Mas eles logo são ameaçados quando o irmão desaparecido de Dom retorna. Jakob (John Cena), um assassino habilidoso e excelente motorista, está trabalhando ao lado de Cipher (Charlize Theron), vilã de Velozes & Furiosos 8. Para enfrentá-los, Toretto vai precisar reunir sua equipe novamente, inclusive Han (Sung Kang), que todos acreditavam estar morto.',
        assistido: false
    },
]

// [GET] /vagas - Retornar uma lista de vagas
router.get('/', (req, res) => {
    res.send(filmes);
})

// [GET] /vagas/{id} - Retornar uma unica vaga por id.
router.get('/:id', (req, res) => {
    const idParam = req.params.id;
    const filme = filmes.find(filme => filme.id == idParam);

    // verifica se a vaga nao foi encontrada
    if(!filme) {
        res.status(404).send({error: 'Filme não encontrado.'});
        return;
    }

    res.send(filme);
})

// [POST] /vagas/add - Cadastro de uma nova vaga
router.post('/add', (req, res) => {
    // recebi o objeto da vaga para cadastar vinda do cliente (via requisicao http POST)
    const filme = req.body;

    // validacao se existe os campos

    if(!filme || !filme.nome || !filme.imagem || !filme.genero || !filme.nota || !filme.descricao) {
        res.status(400).send({
            message: 'Filme inválido, está faltando os campos titulo e imagem'
        })
        return;
    }
    
    filme.id = filmes[filmes.length -1].id + 1;
    filmes.push(filme);
    res.status(201).send({
        message: 'Filme Cadastrado com sucesso!',
        data: filme
    });
})

// [PUT] /vagas/edit/{id} - Edita uma vaga de acordo com o seu id e objeto recebido
router.put('/edit/:id', (req, res) => {
    // o objeto que veio do front para atualizar a vaga com o id recebido
    const filmeEdit = req.body;
    // o id recebido via parametro
    const idParam = req.params.id;
    // procura o indice da vaga pre cadastrada na lista de acordo com o id recebido para atualizala
    let index = filmes.findIndex(filme => filme.id == idParam);

    if(index < 0) {
        res.status(404).send({
            error: 'O Filme que voce está tentando editar nao foi encontrado.'
        })
        return;
    }

    // spread operator ...
    // faz um espelho do item na lista e um espelho do objeto atualizado e junta os 2
    filmes[index] = {
        ...filmes[index],
        ...filmeEdit
    }

    res.send({
        message: `Filme ${filmes[index].nome} atualizado com sucesso!`,
        data: filmes[index]
    })
})

// [DELETE] /vagas/delete/{id} = exclui um item da lista de acordo com o seu id

router.delete('/delete/:id', (req, res) => {
    // acessamos o id recebido via parametro
    const idParam = req.params.id;

    const index = filmes.findIndex(filme => filme.id == idParam);
    const nome = filmes[index];
    //excluimos a vaga da lista de acordo com o seu indice.
    filmes.splice(index, 1);
    res.send({
        message: `Filme ${nome.nome} excluido com sucesso!`,
    })
})

// exporta as rotas para serem usadas no index.
module.exports = router;
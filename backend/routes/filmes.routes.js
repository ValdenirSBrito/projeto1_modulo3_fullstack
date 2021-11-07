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

    {
        id: 2,
        nome: 'Velozes e Furiosos 7',
        imagem: 'https://br.web.img3.acsta.net/c_310_420/pictures/15/03/30/21/19/054397.jpg',
        genero: 'Ação',
        nota: 8,
        descricao: 'Velozes e Furiosos 7 acompanha Dom (Vin Diesel), Brian (Paul Walker), Letty (Michelle Rodriguez) e o resto da equipe após os acontecimentos em Londres. Apesar de terem suas chances de voltar para os Estados Unidos e recomeçarem suas vidas, a tranquilidade do grupo é destruída quando Deckard Shaw (Jason Statham), um assassino profissional, quer vingança pela morte de seu irmão. Agora, a equipe tem que se reunir para impedir este novo vilão. Mas dessa vez, não é só sobre ser veloz. A luta é pela sobrevivência.',
        assistido: false
    },

    {
        id: 3,
        nome: 'Jurassic World - O Mundo dos Dinossauros',
        imagem: 'https://br.web.img2.acsta.net/c_310_420/pictures/15/04/22/16/28/291371.jpg',
        genero: 'Ação',
        nota: 7,
        descricao: 'O Jurassic Park, localizado na ilha Nublar, enfim está aberto ao público. Com isso, as pessoas podem conferir shows acrobáticos com dinossauros e até mesmo fazer passeios bem perto deles, já que agora estão domesticados. Entretanto, a equipe chefiada pela doutora Claire (Bryce Dallas Howard) passa a fazer experiências genéticas com estes seres, de forma a criar novas espécies. Uma delas logo adquire inteligência bem mais alta, logo se tornando uma grande ameaça para a existência humana.',
        assistido: false
    },

    {
        id: 4,
        nome: 'Viagem 2 - A Ilha Misteriosa',
        imagem: 'https://br.web.img3.acsta.net/c_310_420/medias/nmedia/18/87/93/38/20028857.jpg',
        genero: 'Ação',
        nota: 5,
        descricao: 'Em Viagem 2 - A Ilha Misteriosa, Sean Anderson (Josh Hutcherson) descobre uma misteriosa mensagem de rádio, que ele acredita que tenha sido enviada por seu avô (Michael Caine) desaparecido há dois anos. Ele não gosta muito de seu padrasto Hank Parsons (Dwayne Johnson), mas o cara consegue ajudá-lo a decifrar os códigos do texto e juntos eles descobrem o paradeiro do coroa aventureiro numa ilha misteriosa. Para chegar lá, a dupla contrata o piloto de helicóptero Gabato (Luis Guzman) e sua filha Kailani (Vanessa Hudgens), mas muitos perigos aguardam os viajantes e sobreviver implicará numa série de incríveis aventuras.',
        assistido: false
    },

    {
        id: 5,
        nome: 'Venom - Tempo de Carnificina',
        imagem: 'https://br.web.img3.acsta.net/c_310_420/pictures/21/05/10/15/32/2425639.png',
        genero: 'Ação',
        nota: 8,
        descricao: 'Em Venom - Tempo de Carnificina, depois de um ano dos acontecimentos do primeiro filme, Eddie Brock (Tom Hardy) está com problemas para se acostumar na vida com o symbiote Venom. Eddie tenta se restabelecer como jornalista ao entrevistar o serial killer Cletus Kasady, também portando um symbiote chamado Carnage e que acaba escapando da prisão após sua execução falhada.',
        assistido: false
    },

    {
        id: 6,
        nome: 'Alerta Vermelho',
        imagem: 'https://br.web.img3.acsta.net/c_310_420/pictures/21/10/28/20/55/0671708.jpg',
        genero: 'Ação',
        nota: 6,
        descricao: 'Em Alerta Vermelho, num mundo de crimes internacionais, quando a Interpol emite o alerta vermelho, o melhor investigador do FBI, John Hartley (Dwayne Johnson) entra em cena para localizar e capturar um dos criminosos mais procurados do mundo, "O Bispo" (Gal Gadot), a ladra mais bem sucedida em roubos de obras de arte do mundo inteiro e a mais procurada também. Para isso, Hartley precisará se unir com o pior dos piores, Nolan Booth (Ryan Reynolds), para se colocar em um ousado plano de assalto para capturar O Bispo. Esta grande aventura vai levar o trio ao redor do mundo, desde selvas até pistas de dança e prisão isolada, mas para isso terão que aguentar o pior de tudo constantemente um na companhia do outro. Mas quando se junta um investigador e dois ladrões tudo pode acontecer.',
        assistido: false
    },
]

// [GET] /filmes - Retornar uma lista de filmes
router.get('/', (req, res) => {
    res.send(filmes);
})

// [GET] /filmes/{id} - Retornar um unico filmes por id.
router.get('/:id', (req, res) => {
    const idParam = req.params.id;
    const filme = filmes.find(filme => filme.id == idParam);

    // verifica se o filme nao foi encontrado
    if(!filme) {
        res.status(404).send({error: 'Filme não encontrado.'});
        return;
    }

    res.send(filme);
})

// [POST] /filmes/add - Cadastro de um novo filme
router.post('/add', (req, res) => {
    // recebi o objeto do filme para cadastar vindo do cliente (via requisicao http POST)
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

// [PUT] /filmes/edit/{id} - Edita um filme de acordo com o seu id e objeto recebido
router.put('/edit/:id', (req, res) => {
    // o objeto que veio do front para atualizar o filme com o id recebido
    const filmeEdit = req.body;
    // o id recebido via parametro
    const idParam = req.params.id;
    // procura o indice do filme pre cadastrado na lista de acordo com o id recebido para atualizalo
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

router.put('/:status/:id',(req,res) =>{
    const idParam = req.params.id;
    const okParams = req.params.status;
    let okParamsBolean = (okParams == 'true'); 
    let index = filmes.findIndex(filme => filme.id == idParam);
    filmes[index].assistido = okParamsBolean;
    const statusEditado = filmes[index];    
    res.send({
        statusEditado
    })
        
});

// [DELETE] /filmes/delete/{id} = exclui um item da lista de acordo com o seu id

router.delete('/delete/:id', (req, res) => {
    // acessamos o id recebido via parametro
    const idParam = req.params.id;

    const index = filmes.findIndex(filme => filme.id == idParam);
    const nome = filmes[index];
    //excluimos o filme da lista de acordo com o seu indice.
    filmes.splice(index, 1);
    res.send({
        message: `Filme ${nome.nome} excluido com sucesso!`,
    })
})

// exporta as rotas para serem usadas no index.
module.exports = router;
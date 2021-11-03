const lista = document.getElementById('lista')
const apiUrl = 'http://localhost:3000/filmes';

let edicao = false;
let idEdit = 0;

let titulo = document.getElementById('titulo');
let ano = document.getElementById('ano');
let poster = document.getElementById('poster');
let genero = document.getElementById('genero');
let duracao = document.getElementById('duracao');

const getFilme = async () => {
    const response = await fetch(apiUrl)
    const filmes = await response.json();
    console.log(filmes);
    filmes.map((filme) => {
        lista.insertAdjacentHTML('beforeend', `
        <div class="col">
            <div class="card">
            <img src="${filme.poster}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${filme.titulo} - ${filme.duracao}</h5>
                <span class="badge bg-primary">${filme.genero}</span>
                <p class="card-text"></p>
                <p class="card-text">${filme.ano}</p>
                <div>
                    <button class="btn btn-primary" onclick="putFilme('${filme.id}')">Editar</button>
                    <button class="btn btn-danger" onclick="deleteFilme('{'${filme.id}')">Excluir</button>
                </div>
            </div>
            </div>
        </div>
        `)
    })
}

const submitForm = (event) => {
    event.preventDefault();

    const filme = {
        titulo: titulo.value,
        ano: ano.value,
        poster: poster.value,
        genero: genero.value,
        duracao: duracao.value
    }

    if(edicao){
        putFilme(filme, idEdit);
    } else{
        createFilme(filme);
    }

    clearFields();
    lista.innerHTML = '';

};

const createFilme = async(filme) => {
    const request = new Request(`${apiUrl}/add`, {
        method: 'POST',
        body: JSON.stringify(filme),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    })

    const response = await fetch(request);
    const result = await response.json();
    alert(result.message);
    getFilme();
}

const putFilme = async(filme, id) => {
    const request = new Request(`${apiUrl}/edit/${id}`,{
        method: 'PUT',
        body: JSON.stringify(filme),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    })

    const response = await fetch(request);
    const result = await response.json();
    alert(result.message)
    edicao = false;
    idEdit = 0;
    getFilme();
}

const deleteFilme = async (id) =>{
    const request = new Request(`${apiUrl}/apagar/${id}`, {
        method: 'DELETE'
    })

    const response = await fetch(request);
    const result = await response.json();
    alert(result.message);

    lista.innerHTML = '';
    getFilme();
}

const getFIlmeById = async (id) => {
    const response = await fetch(`${apiUrl}/${id}`);
    return await response.json();
}

const editFilme = async(id) => {
    edicao = true;
    idEdit = id;

    const filme = await getFilmeById(id);

    titulo.value = filme.titulo;
    ano.value = filme.ano;
    poster.value = filme.poster;
    genero.value = filme.genero;
    duracao.value = filme.duracao;
}

const clearFields = () =>{
    titulo.value = '';
    ano.value = '';
    poster.value = '';
    genero.value = '';
    duracao.value = '';
}

getFilme();
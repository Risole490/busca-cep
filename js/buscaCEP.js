(() => {
/*  ------------------------------------------
> Esta versão de script cria a tabela de resultado do CEP junto da função assíncrona.
> Diferente da versão 'buscaCEP', que apenas substitui os valores dos campos(<td>) da tabela já existente no HTML.
> O código de criação da tabela e inserção de dados estão extensos, eu sei disso. Por enquanto é o modo com que eu aprendi a fazer o site funcionar.
    ------------------------------------------ */
    const mq600 = window.matchMedia("(max-width: 600px)");


    // 1. Capturo os componentes do HTML
    const containerBuscaCEP = document.getElementById('buscaCEP-containerr');
    var cep = document.getElementById('input-cep');
    var btnBuscarCEP = document.getElementById('submit');
    var mostraResultado = document.getElementById('cep-resultado');
    const inserirAqui = document.getElementById('table-cep');
    
    // 2. Crio uma funçao assíncrona recebendo o valor do campo cep como parâmetro
    async function buscaCEP(cep){

        try {// 4. Faço uma requisição à API passando o cep do parâmetro
            var consultaCEP = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
            // 5. Converto a promise para json e ver ~melhor os dados
            var consultaCEpconvertida = await consultaCEP.json();
            // 6. Se não for encontrado um CEP válido, irá retornar esta mensagem de erro
            if(consultaCEpconvertida.erro) {
                throw Error('Nenhum resultado! Veifique se o CEP está correto.');
            }

        } catch(erro) {
            alert(erro);
            btnBuscarCEP.style.display = "inline-block";
        }

            // 9. Chamo a função para criar a tabela

            if(mq600.matches){
                criaDivMQ(consultaCEpconvertida);
            } else 
                criaTabela(consultaCEpconvertida);

            // 10. Chamo a função para criar o botao de nova busca
            criaBotaoNovabusca();
        
    }
    // 7. Crio uma função para criar uma tabela com os dados do json
    function criaTabela(cepzin){

        inserirAqui.innerHTML = `
        <tr>
            <th>Logradouro</th>
            <th>Complemento</th>
            <th>Bairro</th>
            <th>Cidade/UF</th>
            <th>DDD</th>
            <th>CEP</th>
        </tr>
        <tr>
            <td>${cepzin.logradouro}</td>
            <td>${cepzin.complemento}</td>
            <td>${cepzin.bairro}</td>
            <td>${cepzin.uf}</td>
            <td>${cepzin.ddd}</td>
            <td>${cepzin.cep}</td>
        </tr>`

        mostraResultado.style.display = "block";
        inserirAqui.style.display = "block";
    }

    function criaDivMQ(cepzin){
        mostraResultado.innerHTML = `
        <div class="resultado-MQ600">
            <h3>Logradouro</h3>
            <p>${cepzin.logradouro}</p>
            <h3>Complemento</h3>
            <p>${cepzin.complemento}</p>
            <h3>Bairro</h3>
            <p>${cepzin.bairro}</p>
            <h3>Cidade/UF</h3>
            <p>${cepzin.uf}</p>
            <h3>DDD</h3>
            <p>${cepzin.ddd}</p>
            <h3>CEP</h3>
            <p>${cepzin.cep}</p>
        </div>
        `

        mostraResultado.style.display = "block";
    }

    // 8. Crio uma função para criar o botao de nova busca
    function criaBotaoNovabusca(){    
        // 8.1 Crio o elemento <button>
        const btnNovaBuscaCEP = document.createElement('button');
        // 8.2 Adiciono um id à ele
        btnNovaBuscaCEP.classList.add('btnNovaBuscaCEP');
        // 8.3 Adiciono um texto ao botão
        btnNovaBuscaCEP.innerHTML = "Nova busca";
            // 8.4 Adiciono o botão à div, logo após a <table> 
            mostraResultado.appendChild(btnNovaBuscaCEP);
        // 8.5 Crio um evento onde ao clicar neste botão, a div some do display E é limpada para fazer uma nova busca
        btnNovaBuscaCEP.addEventListener("click", () => {
            location.reload();
            btnBuscarCEP.style.display = "block";
        })
    }

    // 3. Crio uma ação pra quando o botao de Busca for clicado, ele chamar a função e limpar o campo do CEP depois que ela for concluída
    btnBuscarCEP.addEventListener("click", () => {
        if (cep.value == ""){
            alert('Campo está vazio!')
            location.reload();
        } else 
        buscaCEP(cep.value);
        cep.value = "";
        btnBuscarCEP.style.display = "none";
        containerBuscaCEP.style.display = "none";
    })
})()
(() => {
    // 1. Capturo os componentes do HTML
    var cep = document.getElementById('cep');
    var botaoBuscar = document.getElementById('submit');
    var dadoLogradouro = document.getElementById('td-logradouro');
    var dadoComplemento = document.getElementById('td-complemento');
    var dadoBairro = document.getElementById('td-bairro');
    var dadoUF = document.getElementById('td-uf');
    var dadoDDD = document.getElementById('td-ddd');
    var dadoCEP = document.getElementById('td-cep');
    var mostraResultado = document.getElementById('conteudo-resultado');
    var mostraBusca = document.getElementById('mostra-busca');
    var botaoNovaBusca = document.getElementById('nova-busca');
    
    // 2. Crio uma funçao assíncrona recebendo o valor do campo cep como parâmetro
    async function buscaCEP(cep){

        
        try {// 3. Faço uma requisição à API passando o cep do parâmetro
            var consultaCEP = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
            // 4. Converto a promise para json e ver ~melhor os dados
            var consultaCEpconvertida = await consultaCEP.json();
            // 5. Se não for encontrado um CEP válido, irá retornar esta mensagem de erro
            if(consultaCEpconvertida.erro) {
                throw Error('Este CEP não existe!');
            }

            dadoLogradouro.innerHTML = consultaCEpconvertida.logradouro;
            dadoComplemento.innerHTML = consultaCEpconvertida.complemento;
            dadoBairro.innerHTML = consultaCEpconvertida.bairro;
            dadoUF.innerHTML = consultaCEpconvertida.uf;
            dadoDDD.innerHTML = consultaCEpconvertida.ddd;
            dadoCEP.innerHTML = consultaCEpconvertida.cep;

            mostraResultado.style.display = "block";
            mostraBusca.style.display = "none";
        
        } catch(erro) {
            console.log(erro)
        }
    }

    botaoBuscar.addEventListener("click", () => {
        buscaCEP(cep.value);
    })

    botaoNovaBusca.addEventListener("click", () => {
        mostraResultado.style.display = "none";
        mostraBusca.style.display = "block";
        cep.value = "";
    })
})()
(() => {
/*  ------------------------------------------
> Esta versão de script cria a tabela de resultado do CEP junto da função assíncrona.
> Diferente da versão 'buscaCEP', que apenas substitui os valores dos campos(<td>) da tabela já existente no HTML.
> O código de criação da tabela e inserção de dados estão extensos, eu sei disso. Por enquanto é o modo com que eu aprendi a fazer o site funcionar.
    ------------------------------------------ */

    // 1. Capturo os componentes do HTML
    var cep = document.getElementById('cep');
    var btnBuscarCEP = document.getElementById('submit');
    var mostraResultado = document.getElementById('cep-resultado');
    
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
            
            // 7. Crio uma função para criar uma tabela com os dados do json
            function criaTabela() {

                // 7.1 Crio uma elemento com a tag <table> no HTML
                const tabela = document.createElement('table');
                tabela.classList.add('tabela-resultado')
                // 7.2 Crio a estrutura do cabecalho da <table> no HTML
                const trow = document.createElement('tr');
                const theader = document.createElement('th');
                const theader1 = document.createElement('th');
                const theader2 = document.createElement('th');
                const theader3 = document.createElement('th');
                const theader4 = document.createElement('th');
                const theader5 = document.createElement('th');
                // 7.3 Crio a estrutura da segunda linha da <table>, que irão os dados do JSON
                const trow1 = document.createElement('tr');
                const tdlog = document.createElement('td');
                const tdcomp = document.createElement('td');
                const tdbairro = document.createElement('td');
                const tduf = document.createElement('td');
                const tdddd = document.createElement('td');
                const tdcep = document.createElement('td');
                // 7.4 Insiro um título em cada item do cabeçalho
                theader.innerHTML = "Logradouro";
                theader1.innerHTML = "Complemento";
                theader2.innerHTML = "Bairro/Distrito";
                theader3.innerHTML = "Localidade/UF";
                theader4.innerHTML = "DDD";
                theader5.innerHTML = "CEP";
                // 7.5 Começo a ir montando/adicionando os elementos em ordem como se fosse montar uma <table> no HTML
                tabela.appendChild(trow) // adiciono a primeira linha
                tabela.appendChild(trow1) // adiciono a segunda linha
                // 7.6 Vou adicionando em ordem os itens do cabeçalho
                trow.appendChild(theader)
                trow.appendChild(theader1)
                trow.appendChild(theader2)
                trow.appendChild(theader3)
                trow.appendChild(theader4)
                trow.appendChild(theader5)
                // 7.7 Vou adicionando em ordem a segunda linha da tabela
                trow1.appendChild(tdlog)
                trow1.appendChild(tdcomp)
                trow1.appendChild(tdbairro)
                trow1.appendChild(tduf)
                trow1.appendChild(tdddd)
                trow1.appendChild(tdcep)
                //7.8 Começo a colocar os dados do JSON em seus respectivos lugares(td) na <table>
                tdlog.innerHTML = consultaCEpconvertida.logradouro;
                tdcomp.innerHTML = consultaCEpconvertida.complemento;
                tdbairro.innerHTML = consultaCEpconvertida.bairro;
                tduf.innerHTML = consultaCEpconvertida.uf;
                tdddd.innerHTML = consultaCEpconvertida.ddd;
                tdcep.innerHTML = consultaCEpconvertida.cep;
                // 7.9 No final da montagem, adiciono a <table> na div 'conteudo-resultado'
                mostraResultado.appendChild(tabela);
            }
            // 8. Crio uma função para criar o botao de nova busca
            function criaBotaoNovabusca(){    
                // 8.1 Crio o elemento <button>
                const btnNovaBuscaCEP = document.createElement('button');
                // 8.2 Adiciono um id à ele
                btnNovaBuscaCEP.id = 'nova-buscaCEP';
                btnNovaBuscaCEP.classList.add('btnNovaBuscaCEP');
                // 8.3 Adiciono um texto ao botão
                btnNovaBuscaCEP.innerHTML = "Nova busca";
                    // 8.4 Adiciono o botão à div, logo após a <table> 
                    mostraResultado.appendChild(btnNovaBuscaCEP);
                // 8.5 Crio um evento onde ao clicar neste botão, a div some do display E é limpada para fazer uma nova busca
                btnNovaBuscaCEP.addEventListener("click", () => {
                    location.reload();
                    btnBuscarCEP.style.display = "inline-block";
                })
            }

            // 9. Chamo a função para criar a tabela
            criaTabela();
            // 10. Chamo a função para criar o botao de nova busca
            criaBotaoNovabusca();

            // 11. Após os dados serem preenchidos na tabela, eu mostro o container que está a tabela, no display block, que estava como "none"
            mostraResultado.style.display = "block";

        } catch(erro) {
            alert(erro);
            btnBuscarCEP.style.display = "inline-block";
        }
        
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
    })
})()
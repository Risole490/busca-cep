(() => {
/*  ------------------------------------------
> Esta versão de script cria a tabela de resultado do endereço junto da função assíncrona.
> O código de criação da tabela e inserção de dados estão extensos, eu sei disso. Por enquanto é o modo com que eu aprendi a fazer o site funcionar.
    ------------------------------------------ */

    const mqdiv = window.matchMedia("(max-width: 701px)");

    // 1. Referencio os elementos do HTML que serão usados
    var titulo_endereco = document.getElementById('endereco-title');
    var endereco = document.getElementById('input-endereco');
    var cidade = document.getElementById('input-cidade');
    var uf = document.getElementById('input-uf');
    var btnBuscarEndereco = document.getElementById('submit-endereco');
    var mostraResult = document.getElementById('end-resultado');
    const inserirEnd = document.getElementById('table-end');
    const campoBuscarEndereco = document.getElementById('campo-busca-endereco');

    async function buscaEndereco(end,cid,uf){

        try{
            var consultaEndereco = await fetch(`https://viacep.com.br/ws/${uf}/${cid}/${end}/json/`);
            var consultaEndConvertido = await consultaEndereco.json();

          // Caso o usuário tente fazer uma busca com menos de 3 caracteres em algum campo, o erro é mostrado na tela. 
        } catch(erro) { 
            alert('Insira ao menos 3 caracteres nos campos Endereço e Cidade!');
            btnBuscarEndereco.style.display = "block";
        }

        // Faço uma validação e verifico se a consulta retornou algum endereço como resultado no array. Se for true, vai executar as funções. Se for false, vai mostrar o erro na tela
        if(consultaEndConvertido.length > 0){
            if(mqdiv.matches){
                criaDivsMQ(consultaEndConvertido);
                criaBotaoNovabusca();
            } else {
                criaTabela(consultaEndConvertido);
                criaBotaoNovabusca();
            }
        } else {
            alert('Nenhum endereço localizado.');
            location.reload();
            endereco.focus();
        }
    }

    function criaTabela(enderecos) {

        inserirEnd.innerHTML = `
        <tr>
            <th>Logradouro</th>
            <th>Complemento</th>
            <th>Bairro</th>
            <th>Cidade/UF</th>
            <th>DDD</th>
            <th>CEP</th>
        </tr>`

        enderecos.forEach((endereco) =>  {
            inserirEnd.innerHTML += `
            <tr>
                <td>${endereco.logradouro}</td>
                <td>${endereco.complemento}</td>
                <td>${endereco.bairro}</td>
                <td>${endereco.uf}</td>
                <td>${endereco.ddd}</td>
                <td>${endereco.cep}</td>
            </tr>            `        
        })

        mostraResult.style.display = "block";
        inserirEnd.style.display = "block";
    }

    function criaDivsMQ(enderecos){

        enderecos.forEach( endereco => {
            mostraResult.innerHTML += `
            <div class="resultado-MQEND">
            <h3>Logradouro</h3>
            <p>${endereco.logradouro}</p>
            <h3>Complemento</h3>
            <p>${endereco.complemento}</p>
            <h3>Bairro</h3>
            <p>${endereco.bairro}</p>
            <h3>Cidade/UF</h3>
            <p>${endereco.uf}</p>
            <h3>DDD</h3>
            <p>${endereco.ddd}</p>
            <h3>CEP</h3>
            <p>${endereco.cep}</p>
        </div> 
        `
        })
        
        mostraResult.style.display = "flex";
    }

    function criaBotaoNovabusca(){    
        // 8.1 Crio o elemento <button>
        const btnNovaBuscaEND = document.createElement('button');
        // 8.2 Adiciono um id à ele
        btnNovaBuscaEND.classList.add('btnNovaBuscaEND')
        // 8.3 Adiciono um texto ao botão
        btnNovaBuscaEND.innerHTML = "Nova busca";
            // 8.4 Adiciono o botão à div, logo após a <table> 
            mostraResult.appendChild(btnNovaBuscaEND);
        // 8.5 Crio um evento onde ao clicar neste botão, a div some do display E é limpada para fazer uma nova busca
        btnNovaBuscaEND.addEventListener("click", () => {
            location.reload();
            btnBuscarEndereco.style.display = "block";
            endereco.focus();
        })
    }

    btnBuscarEndereco.addEventListener("click", () => {
        buscaEndereco(endereco.value,cidade.value,uf.value);
        btnBuscarEndereco.style.display = "none";
        campoBuscarEndereco.style.display = "none";
        titulo_endereco.innerHTML = 'Resultado da busca:'
    })

})()
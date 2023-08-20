(() => {
    var endereco = document.getElementById('endereco');
    var cidade = document.getElementById('cidade');
    var uf = document.getElementById('ufs');
    var mostraResult = document.getElementById('end-resultado')
    var btnBuscarEndereco = document.getElementById('submit-endereco');

    async function buscaEndereco(end,cid,uf){

        try{
            var consultaEndereco = await fetch(`https://viacep.com.br/ws/${uf}/${cid}/${end}/json/`);
            var consultaEndConvertido = await consultaEndereco.json();
            
                function criaTabela() {
                    const containerTabela = document.createElement('table');
                    containerTabela.classList.add('tabela-resultado')
                    const trow = document.createElement('tr');
                    const theader = document.createElement('th');
                    const theader1 = document.createElement('th');
                    const theader2 = document.createElement('th');
                    const theader3 = document.createElement('th');
                    const theader4 = document.createElement('th');
                    const theader5 = document.createElement('th');
                    containerTabela.appendChild(trow)
                    trow.appendChild(theader)
                    trow.appendChild(theader1)
                    trow.appendChild(theader2)
                    trow.appendChild(theader3)
                    trow.appendChild(theader4)
                    trow.appendChild(theader5)
                    theader.innerHTML = "Logradouro";
                    theader1.innerHTML = "Complemento";
                    theader2.innerHTML = "Bairro/Distrito";
                    theader3.innerHTML = "Localidade/UF";
                    theader4.innerHTML = "DDD";
                    theader5.innerHTML = "CEP";
        
                    // Para cada resultado encontrado na Promise, vai criar um <tr> e campos <td> na table, preenchendo os campos <td> com os dados do elemento. No final, vai acrescentar cada elemento em seu respectivo pai
                    consultaEndConvertido.forEach((elemento) =>  {
                        const trow1 = document.createElement('tr')
                        const campoLog = document.createElement('td')
                        const campoComp = document.createElement('td')
                        const campoBairro = document.createElement('td')
                        const campoUF = document.createElement('td')
                        const campoDDD = document.createElement('td')
                        const campoCEP = document.createElement('td')
        
                        campoLog.innerHTML = elemento.logradouro
                        campoComp.innerHTML = elemento.complemento
                        campoBairro.innerHTML = elemento.bairro
                        campoUF.innerHTML = elemento.uf
                        campoDDD.innerHTML = elemento.ddd
                        campoCEP.innerHTML = elemento.cep
                        trow1.appendChild(campoLog)
                        trow1.appendChild(campoComp)
                        trow1.appendChild(campoBairro)
                        trow1.appendChild(campoUF)
                        trow1.appendChild(campoDDD)
                        trow1.appendChild(campoCEP)
                        containerTabela.appendChild(trow1)
                    })
        
                    mostraResult.appendChild(containerTabela)
                }

                function criaBotaoNovabusca(){    
                    // 8.1 Crio o elemento <button>
                    const btnNovaBusca = document.createElement('button');
                    // 8.2 Adiciono um id à ele
                    btnNovaBusca.id = 'nova-busca';
                    btnNovaBusca.classList.add('btnNovaBusca')
                    // 8.3 Adiciono um texto ao botão
                    btnNovaBusca.innerHTML = "Nova busca";
                        // 8.4 Adiciono o botão à div, logo após a <table> 
                        mostraResult.appendChild(btnNovaBusca);
                    // 8.5 Crio um evento onde ao clicar neste botão, a div some do display E é limpada para fazer uma nova busca
                    btnNovaBusca.addEventListener("click", () => {
                        mostraResult.style.display = "none";
                        mostraResult.innerHTML = "";
                        endereco.value = "";
                        cidade.value = "";
                        uf.value = "";
                    })
                }

          // Caso o usuário tente fazer uma busca com menos de 3 caracteres em algum campo, o erro é mostrado na tela. 
        } catch(erro) { 
            alert('Insira ao menos 3 caracteres nos campos Endereço e Cidade!');
        }
         // Faço uma validação e verifico se a consulta retornou algum endereço como resultado no array. Se for true, vai executar as funções. Se for false, vai mostrar o erro na tela
        if(consultaEndConvertido.length > 0){
            criaTabela();
            criaBotaoNovabusca();
            mostraResult.style.display ="block";
        } else {
            alert('Nenhum endereço localizado.');
            endereco.value = "";
            cidade.value ="";
        }
    }

    btnBuscarEndereco.addEventListener("click", () => {
        buscaEndereco(endereco.value,cidade.value,uf.value);
    })

})()
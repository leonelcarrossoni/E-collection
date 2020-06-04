function populateUFs() {
    const ufSelect = document /*cria uma variável com o nome ufSelect*/
    .querySelector("select[name=uf] ") /* Eu faço uma procura por uma variavel select que tenha o name=uf .*/

    /* o fetch é uma função que irá acessar o site e ENTÂO irá buscar uma resposta que RETURN uma promessa de resposta no formato json*/
    fetch ("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then((res) => {return res.json()}) /* transforma a resposta obtida pelo fetch no formato json da resposta*/
    /*then(res => res.json())   /// possível utilizar a versão simplificada neste caso porque só há um res e está retornando apenas um retorno */
    .then( states => { /*o state é o data. recebe todos os dados obtidos pela resposta, neste caso os estados (poderia colocar qualquer nome) */

        for( const state of states){    /*repete a função colocando o states na variavel state*/     
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>` /*o inner habilita uma propriedade de elementos HTML para ser modificado na variavel UFSelect (select name=uf) /// 
            que possibilita que você enre dentro do próprio HTML e substitua/acrescente o valor ///
            += pega você mesmo e concatena com o outro valor, no caso inner html + o state id e state.nome */
            
        }   

    } )

}

/* Executar função */
populateUFs()


function getCities(event) { /*pegará o evento de mudança */
    const citySelect = document.querySelector("select[name=city] ")
    /* suporte para alterar o valor do estado na barra de endereço, facilitando backend*/
    const stateInput = document.querySelector("input[name=state] ")

    /* criamos a variavel ufValue, onde sempre que haver uma mudança no evento, ela irá alterar também.*/
    const ufValue = event.target.value /* o objeto evento (change) irá trazer diversas informações e o target irá dizer onde foi executado
    neste caso no "select [name=uf] /// o value irá dizer o nome do valor do target (SP, Rio,etc) "*/

     /* toda vez que for chamado o getCities o input de name=state será alterado*/
    const indexOfSlectedState = event.target.selectedIndex /*diz qual o index do estado */
    stateInput.value = event.target.options[indexOfSlectedState].text /* pega o texto do index selecionado e coloca no value */

    /* url dinamica com a lista de cidades */
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    /* irá limpar o campo de cidades. Caso seja selecionado um estado e depois outro, 
    este campo garantirá que só aparecerá as cidades do último estado. */
    citySelect.innerHTML ="<option value>Seleciona a Cidade </option> "
    citySelect.disabled = true

    fetch (url)
    .then((res) => {return res.json()})
    /*then(res => res.json())   /// possível utilizar a versão simplificada neste caso porque só há um res e está retornando apenas um retorno */
    .then( cities => {

        for( const city of cities){        
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>` /*uma propriedade de elementos HTML do elemnto Select /// 
        += pega você mesmo e concatena com o outro valor */
        }   

        citySelect.disabled = false /* habilita o campo cidade*/

    } )

}

document /* Dentro do documento... */
    .querySelector("select[name=uf] ") /* Eu faço uma procura por uma variavel select que tenha o name=uf .*/
    
    /* É um ouvidor de eventos. Sempre vai ficar procurando um evento acontecer
    e quando ocorrer um evento de mudança na variavel name=uf ele roda a função getCities */
    .addEventListener("change", getCities) /* Não abre parenteses porque se não estariamos dizendo para executar imediatamente, e queremos que execute apenas após o evento change */ 
    
 /* Itens de coleta */
 
 /* pegar todos os li's dentro de items-grid*/
 const itemsToCollect = document.querySelectorAll(".items-grid li") 
 
 for(const item of itemsToCollect) {/* para cada item dentro de itemsToCollect */
    item.addEventListener("click", handleSelectedItem) /*adiciona um ouvidor de eventos monitorando quando ocorre um click e roda a função handleSelectedItem*/
    }



// atualizar o campo escondido com os itens selecionados pela função HandleSlectedItens
const collectedItems = document.querySelector("input[name=items]")
let selectedItems = [] /* se fosse const não daria para sobescrever estees valor pq const é constante. let é variavel, pode mudar valor depois */

function handleSelectedItem(event) {/*toda vez que dispara a função ele captura um evento */
    const itemLi = event.target
        /* adicionar ou remover uma classe em javascript */
        /*classList permite acessar algumas funcionalidades */
    itemLi.classList.toggle("selected") /*poderia ser add, remove e o toggle permite add ou remover */
    const itemID = itemLi.dataset.id /* irá capturar o nª do ID do que o usuário clicar*/ 
    
        // verificar se existem itens selecionados, se sim, 
    

        //pegar os itens selecionados
    const alreadySelected = selectedItems.findIndex( item => { /*recebe como parametro uma outra função anonima*/
        /* precisa receber como retorno um verdadeiro ou falso. se for verdadeiro, ele achou o index e vai colocar na variavel alreadySelected*/
        /* o itemID é o item selecionado. A função irá pegar cada id da lista selectedItens, até encontrar o ID selecionado, então retornará verdadeiro e a variávei itemFound se tornará a ID do item que o usuario clicou. */    
        const itemFound = item == itemID // isso será True or False
        return itemFound
    } ) 
        //versão resumida da função acima
    // const alreadySelected = selectedItems.findIndex(item => item == itemID) 
 

        // se já estiver selecionado, tirar da seleção

        if(alreadySelected != -1){ /*o already selected retornará o ID da lista (0 a 5). Se for diferente de menos 1*/
            //tirear da seleção
            const filteredItems = selectedItems.filter( item => { // irá entrar no selected, filtrar e adicionar no array filteredItems
                const itemIsDifferent = item != itemID /*Quando o item selecionado é diferente do itemID, adiciona ele no novo array filteredItems, se é igual, retira */
                return itemIsDifferent
            } )

            selectedItems = filteredItems /* adicionará o item ao selected */
        } else {

            // se não estiver selecionado, adicionar à seleção

            selectedItems.push(itemID)
        }
    
        // atualizar o campo escondido com os itens selecionados pela função HandleSlectedItens
        collectedItems.value = selectedItems

    }

    
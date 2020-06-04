const buttonSearch = document.querySelector("#page-home main a") //buscar pelo botão
const modal = document.querySelector("#modal")
const close = document.querySelector("#modal .header a")
// procurar pelo evento de clicar no botão e então remover a classe "hide"
buttonSearch.addEventListener("click", () => {
    modal.classList.remove("hide")
})

// quando clicar no a vai executar a função anonima que vai pegar o model e addicionar a classe hide
close.addEventListener("click", () =>{
    modal.classList.add("hide") 
} )
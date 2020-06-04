
// comments
// document.write("Hello")

// variaveis, tipos de dados
var myvar = "Hello"
const myconst = "He"

document.write(myconst + myvar)

//string
const s1 = " Isto é uma string "

document.write(s1)


// number
const n1 =1
const n2 =12

document.write(n1 + n2)

// boolean True or False
const bTrue = true
const bFalse = false
document.write(bTrue)


// objeto possuem propriedades e funcionalidade

const pessoa = {
  altura: "1,80m",
  idade: 24,
  solteiro: true,
  correr(){
    return "Run Forest"
  }
}

document.write(pessoa.correr())

// Array - Vetores - Coleção de Dados
const colectionDeBolinhas = ["blue", "green", 1,{name: "My Name"}]

document.write(colectionDeBolinhas[3].name)

//Funções -Funcionalidades - Atalhos - Reuso de código

//Registrar função
function sayMyName(name) {
  document.write(name)
}

//executar
sayMyName("Leo")
sayMyName("nel")

// condicionais

const notaFinal = 7

if(notaFinal < 5) {
  //caminho 1
  document.write("Reprovado")
} 
else {
  //caminho 2
  document.write("Aprovado")
}

// loop repteições

for (i=5; i < 10; i++){
  document.write(`<p>${i}</p>`) // só é possível print i utilizando o crase 
}
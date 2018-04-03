Invest-Now
==============

Um simulador de investimento utilizando o modelo matemático de valor futuro com valor inicial e depósitos mensais.

> *Você pode optar por  informar o depósito mensal zero(0) e a fórmula aplicará o modelo padrão de valor futuro com juros compostos*

Modelo Matemático Utilizado
==============
### Valor Futuro Simples
[![Cálculo Tabela Price](https://www.renatrader.com.br/images/aprender/matematica-financeira/image012.gif "Juros Compostos")](https://www.renatrader.com.br/images/aprender/matematica-financeira/image012.gif "Juros Compostos")

### Valor Futuro com Depósitos Periódicos
dM = Depósito Mensal(Periódico) | i = taxa de juros(ao mês) | n = períodos(meses)
> VF = dM x ( 1 + i ) x &#91; ( ( 1 + i )<SUP>n</SUP> - 1 ) / i &#93;

### Valor Futuro com Valor Inicial e Depósitos Periódicos
vP = Valor Presente ( Inicial )  |  dM = Depósito Mensal | i = taxa(ao mês) | n = períodos(meses)
> VF = vP x ( 1 + i ) + dM x &#91; ( ( 1 + i )<SUP>n</SUP> - 1 ) / i &#93;

Transformando em Javascript
==============
```
vF = vP * Math.pow( ( 1 + i ), n ) + dM * ( ( ( Math.pow( ( 1 + i ), n )  ) -1) / i );
```

Onde as variáveis representam:
==============
```
let vF; /* [ VF ] Valor Futuro ( Valor final, acrescido os juros, resgatado )*/
let vP; /* [ PV ] Valor Presente (Valor inicial que  a pessoa possui ) */
let dM; /* Depósitos Mensais Periódicos */
let i ; /* Taxa de Juros % ( ao mês ) */
let n ; /* Tempo de Investimento ( Período em meses )*/
```
### Instalação

1. Faça o download ou clone do projeto com `git clone https://github.com/danielsidev/invest-now.git`
2. Entre na pasta do projeto e instale as dependências com `npm install`
3. Instale o Browserify globalmente e rode: browserify ./view/investirView.js -o ./bundle.js

### Testando a aplicação

- Abra o arquivo index.html no navegador
- Preencha o formulário com o valor( com ou sem máscara ), taxa(com ou sem máscara) e  o tempo de investimento ( em meses).
- Clique no botão simular

#### Para Alterações

- O modelo foi feito utilizando alguns recursos do ES6, por isso usei o Browserify, logo a cada alteração na view ou no controller é necessário rodar o comando no terminal novamente para empacotar o código em bundle.js
```
browserify ./view/investirView.js -o ./bundle.js
```

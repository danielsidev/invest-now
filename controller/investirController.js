"use strict"
class investir{
    constructor(vP, dM='0', i, n){
        this.vF         = 0;  /* Valor Futuro  a ser resgatado */
        this.vP         = vP; /* Valor Presente(Valor do Financiamento) */
        this.dM         = dM; /* Depósito Mensail(Periódico) => Pode ser zero(0)*/
        this.i          = i;  /* Taxa de Juros ( ao mês)*/
        this.n          = n;  /* Número de Parcelas(Período)*/
    }
    tratarMascaraReal(){
        let vp  = this.vP.replace(".","");
            vp  = vp.replace(",",".");
        this.vP = vp;

        let i = this.i.replace(".","");
            i = i.replace(",",".");
       this.i = i;

       if(this.dM.length >1){
        let dm = this.dM.replace(".","");
            dm = dm.replace(",",".");
       this.dM = dm;
       }
    }
    formataDados(){
        this.vP = parseFloat(this.vP); /* Convertemos para float/decimal (valor monetário) */
        this.i  = (parseFloat(this.i))/100;/* A taxa é dada em %, logo precisamos dividir por 100(pr cento) */
        this.n  = parseInt(this.n); /*Convertemos o número de parcelas para inteiro */
        this.dM = parseFloat(this.dM);/*Convertemos o Depósito mensal para float/decimal*/
    }
    formataMascara(label, valor){
      let formato = { minimumFractionDigits: 2 , style: 'currency', currency: label }
      return valor.toLocaleString('pt-BR', formato)
    }
    valorResgatado(){
        console.log("Valor Inicial: "+this.vP);
        console.log("Depósito: "+this.dM);
        console.log("Taxa: "+this.i);
        console.log("Tempo: "+this.n);
      /* Aplicamos a fórmula de Valor Futuro com Valor Inicial e Depósitos Periódicos  */
      this.vF = this.vP*Math.pow((1+this.i),this.n)+this.dM*(((Math.pow((1+this.i),this.n))-1)/this.i);
      return this.formataMascara('BRL',this.vF);
    }
    getDm(){
     return this.formataMascara('BRL',this.dM);
    }
}

module.exports.investir = investir;

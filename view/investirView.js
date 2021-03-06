let {investir} = require("../controller/investirController");
let $ = require("jquery");
$(document).ready(function () {
  let periodoTaxa  = "mês";
  let periodoTempo = "meses";
  let periodoResgate = "meses";

  $("div.campo input[type=radio]").change(function(){
    let tipo = $('input[name=tipo]:checked').val();
    if(tipo=="ano"){
      //$("#despositos-mensais").fadeOut();
      periodoTempo ="anos";
      //$("#deposito").val(0);
    }else if(tipo=="mes"){
      $("#despositos-mensais").fadeIn();
      periodoTempo = "meses";
    }
    $("#periodoTaxa").html(periodoTaxa);
    $("#periodoTempo").html(periodoTempo);
  });
  // $('input:radio[name=tipo]').on('change',function() {
  //   if (this.value == 'ano') {
  //       alert("Ano");
  //   }
  //   else if (this.value == 'mes') {
  //       alert("Mês");
  //   }
  // });

  $('#simulador').on('submit', function (event) {
    event.preventDefault();//Para não fazer refresh
  });




  let simular = function(){
    let valor    = $("#valor").val();//vP
    let deposito = $("#deposito").val();//dM
    let taxa     = $("#taxa").val();//i
    let parcelas = $("#parcelas").val();//n
    let tipoPeriodo = $('input[name=tipo]:checked').val();//Anual ou Mensal
    if(deposito==""){
      deposito = 0;
    }
     if(valor!=="" && taxa!=="" && parcelas!==""){
       if(tipoPeriodo==="ano"){
         periodoTaxa  = "mês";
         periodoTempo ="ano";
         periodoResgate = (parcelas>1)?parcelas+" anos":parcelas+" ano";
         parcelas = parcelas*12;

       }else if(tipoPeriodo==="mes"){
         periodoTaxa  = "mês";
         periodoTempo = "meses";
         periodoResgate = (parcelas>1)?parcelas+" meses":parcelas+" mês";
       }
        let simulador = new investir(valor, deposito, taxa, parcelas, tipoPeriodo);
            simulador.tratarMascaraReal();/* Remove a máscara de 0.000,00 */
            simulador.formataDados(); /* Faz as conversões para Int e Float */
              let valorResgatado = simulador.valorResgatado();
              let investido = parseFloat(valor)+(parseFloat(deposito)*parseInt(parcelas));
              let redimentoJuros = simulador.vF-investido;
                  investido = simulador.formataMascara('BRL',investido);
                  redimentoJuros = simulador.formataMascara('BRL',redimentoJuros);
              $("#resultado").html("");
              $("#resultado").append("<h2>RESGATE DO DE INVESTIMENTO EM "+periodoResgate+"</h2><br>");
              $("#resultado").append("O valor investido foi de "+investido+"<hr>");
              $("#resultado").append("Os juros recebidos foram de "+redimentoJuros+"<hr>");
              $("#resultado").append("O Investimento Resgatado é "+valorResgatado+"<hr>");
              $("#resultado").append("Com Taxa de Juros de "+taxa+"% ao "+periodoTaxa+". <hr>");
              $("#resultado").append("Com depósitos Mensais de: "+simulador.getDm()+"<hr>");

     }else{
         alert("Preencha o valor, a taxa e o tempo de investimento!");
     }
  };
  $(document).keypress(function(e) {
     if(e.which == 13) {
       $("#simulador").submit();
       simular();
     }
   });

   $("#simular").click(function(){
     simular();
   });

  /* Mock para teste no console */
  // $("#simular").click(function(){
  //   let simuladorA = new financiar("50.000,00", "1,00", "60");
  //   simuladorA.tratarMascaraReal();/* Remove a máscara de R$ */
  //   simuladorA.formataDados(); /* Faz as conversões para Int e Float */
  //   console.log("----------------- SIMULAÇÃO DE FINANCIAMENTE PRICE ----------------- INI");
  //   console.log("Valor da Prestação é: "+simuladorA.financiarPrice());
  //   console.log("Valor Total do Financiamento Pago é: "+simuladorA.calculaTotalPagoPrice());
  //   console.log("Valor Total de Juros Pago é: "+simuladorA.calculaTotalJurosPrice());
  //   console.log("----------------- SIMULAÇÃO DE FINANCIAMENTE PRICE ----------------- FIM");
  //
  //   console.log("----------------- |||||||||||||||||||||||||||||||| ----------------- FIM");
  //
  //   let simuladorB = new financiar("50.000,00", "1,00", "60");
  //   simuladorB.tratarMascaraReal();/* Remove a máscara de R$ */
  //   simuladorB.formataDados(); /* Faz as conversões para Int e Float */
  //   simuladorB.financiarSac();/* Faz a simulação Sac e constrói a lista de prestações */
  //   console.log("----------------- SIMULAÇÃO DE FINANCIAMENTE SAC ----------------- INI");
  //   console.log("Os Valores das Prestações são: \n\r"+simuladorB.listaSacText);
  //   console.log("Valor Total do Financiamento Pago é: "+simuladorB.calculaTotalPagoSac());
  //   console.log("Valor Total de Juros Pago é: "+simuladorB.calculaTotalJurosSac());
  //   console.log("----------------- SIMULAÇÃO DE FINANCIAMENTE SAC ----------------- FIM");
  // });




});

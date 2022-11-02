$(document).ready(function() {
//Variables
  var name,inst,pic,exp_v,com_v,com_c,hab_a,hab_p;
  //Info Dummy
  name  = 'John Doe';
  inst  = 'Universidad de los Andes';
  pic   = 'img/default-profile.svg';
  exp_v = 70;
  com_v = 65;
  com_c = 5;
  hab_a = 70;
  hab_p = 30;

  // Carga de funciones
  loadUInnfo(name,inst,pic);
  puntosExp(exp_v);
  puntosCom(com_v,com_c);
  puntosHab(hab_a, hab_p);
});


function loadUInnfo(n,i,p){
    $('.profile-data .image').attr('src', p);

    $('.profile-data .image').attr('alt', n);
    $('.profile-data .name').text(n);

    $('.profile-data .institution').text(i);
}
function puntosExp(v) {
    var exp = $('.exp-bar');
    exp.attr('aria-valuenow', v);
    exp.css('width', v+'%');
    $('.dato-puntos-exp').text(v+'%');
}

function puntosCom(v,c) {
  var prog  = $('#seccion-competencia .progress');
  var med   = '<span class="medal"></span>';
  var p     = 100/(c-1);
  var u     = c/4;
  $('.medal').remove();
  prog.find('.progress-bar').attr('aria-valuenow', v);
  prog.find('.progress-bar').css('width', v+'%');
  $(".dato-puntos-comp").text(v+'%');

  for (i=0; i<c; i++) {
    prog.append(med);
  }
  prog.find('.medal').each(function(i, k){
    $(this).css('left', (i*p)+'%')
    if(i<=u && i<=p) {
      $(this).addClass('style1');
    }else if(u<=i && i<=(u*2)) {
      $(this).addClass('style2');
    }else if((u*2)<=i) {
      $(this).addClass('style3');
    }
  });
}

function puntosHab (a, p) {
    console.log(a, p);
    $(".puntos-abstraccion").text(a);
    $(".puntos-programacion").text(p);

    $("#input_izq").val(a);
    //$("#input_izq").trigger("change");
    $("#input_der").val(p);
    //$("#input_der").trigger("change");

    $("body").trigger("updateValues");
}







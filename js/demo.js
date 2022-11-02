$(document).ready(function(){
  //Variables
  var name,inst,pic,exp_v,com_v,com_c,hab_a,hab_p;
  //Info Dummy
  name  = '';
  inst  = '';
  pic   = '';
  exp_v = 0
  com_v = 0
  com_c = 0
  hab_a = 50
  hab_p = 50

  loadUInnfo(name,inst,pic);
  puntosExp(exp_v);
  puntosCom(com_v,com_c);
  puntosHab(hab_a,hab_p);


  $('#demo button').click(function(e){
    e.preventDefault;
    name  = $('#vala').val();
    inst  = $('#vali').val();
    pic   = $('#vals').val();
    exp_v = $('#val1').val();
    com_c = $('#val2').val();
    com_v = $('#val3').val();
    hab_a = $('#val4').val();
    hab_p = $('#val5').val();
    loadUInnfo(name,inst,pic);
    puntosExp(exp_v);
    puntosCom(com_v,com_c);
    if(hab_a !== "" || hab_p !== "")
    {
      if(hab_a !== "0" || hab_p !== "0")
      {
        puntosHab(hab_a,hab_p);
      }
    }
    
    return false;
  });
});
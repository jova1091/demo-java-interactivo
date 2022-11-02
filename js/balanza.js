var balanza = function ( p ) {
  var base;
  var centro;
  var derecha;
  var izquierda;
  var ANG;
  var mov_y;
  var p_izq;
  var p_der;
  var valor_derecha, valor_p_izquierda;
  var valor_izquierda, valor_p_derecha;
  var delta_der, delta_izq, delta_ang, delta_input_der, delta_input_izq;
  var label_izq, label_der;
  
  p.setup = function() {
    var canvasDiv = document.getElementById('contenedorCanvas');
    var width = canvasDiv.offsetWidth;
    var height = width;

    canvas = p.createCanvas(width, width);
    canvas.parent('contenedorCanvas');

    base = p.loadImage("img/balanza_base.png");
    centro = p.loadImage("img/balanza_centro.png");
    derecha = p.loadImage("img/balanza_der.png");
    izquierda = p.loadImage("img/balanza_izq.png");
    
    p_izq = p.select('#input_izq')
    //p_izq.position(width/6, height/2);
    p_izq.size((width/6 < 45) ? 45 : width/6,(height/15 < 25) ? 25 : height/15);
    p_izq.addClass('input_izq');
    p_izq.value("50");
    p_izq.style("font-size", (width/6 < 45) ? "10pt" : "13pt");
    p_izq.attribute("disabled","true");

    label_izq = p.select('#label_izq');
    label_izq.size((width/4 < 65) ? 65 : width/4,(height/15 < 25) ? 25 : height/15);

    p_der = p.select('#input_der')
    //p_der.position(width - width/4.2, height/2);
    p_der.size((width/6 < 45) ? 45 : width/6,(height/15 < 25) ? 25 : height/15);
    p_der.addClass('input_der');
    p_der.value("50");
    p_der.style("font-size", (width/6 < 45) ? "10pt" : "13pt");
    p_der.attribute("disabled","true");

    label_der = p.select('#label_der');
    label_der.size((width/4 < 75) ? 75 : width/4,(height/15 < 25) ? 25 : height/15);

    //$('#input_izq').change(inputChangedL);
    //$('#input_der').change(inputChangedR);
    $("body").on("updateValues", UpdateValues);
    mov_y = 0;
    
    ANG = 0;

    valor_izquierda = 0;
    valor_derecha = 0;

    delta_ang = 0;
    delta_der = 0;
    delta_izq = 0;

    valor_p_derecha = height/1.77;
    delta_input_der = height/1.77;
    valor_p_izquierda = height/1.77;
    delta_input_izq = height/1.77;
  };

  p.draw = function() {
    var width = p.width;
    var height = p.height;
    p.background(255, 255, 255);
    p.noStroke();
    p.smooth();
    
    p.push();
    
    p.scale(1.3,1.3);
    p.translate(-width/8.5, -height/3);
    p.image(base, width/4, height/2, width/2, height/2);
    
    p.push();
      p.translate(0,10);
      p.push();
        p.translate(width/2,height/2);
        p.rotate(p.radians(delta_ang));
        p.image(centro,-width/4,-height/4, width/2, height/2);
      p.pop();
    p.pop();
    
    p.push();
      p.translate(0, delta_izq);
      p.image(izquierda, width/3 - width/4.2, height/1.925, width/3, height/3);
    p.pop();
    
    p.push();
      p.translate(0, delta_der);
      p.image(derecha, width/3 + width/4.2, height/1.925, width/3, height/3);
    p.pop();
    
    p.pop(); 
    delta_der = p.lerp(delta_der, valor_derecha, 0.1);
    delta_izq = p.lerp(delta_izq, valor_izquierda, 0.1);
    delta_ang = p.lerp(delta_ang, ANG, 0.1);

    delta_input_izq = p.lerp(delta_input_izq, valor_p_izquierda, 0.1);
    p_izq.position((width/6 < 45) ? width/11 : width/9.5, delta_input_izq);
    label_izq.position((width/6 < 45) ? width/8.5 - width/14 : width/8.5 - width/16, delta_input_izq+height/8);

    delta_input_der = p.lerp(delta_input_der, valor_p_derecha, 0.1);
    p_der.position((width/6 < 45) ? width - width/3.5 : width - width/3.7, delta_input_der);
    label_der.position((width/6 < 45) ? width - width/3.9 - width/12 : width - width/3.9 - width/16, delta_input_der+height/8);
  };


function UpdateValues() {
    var width = p.width;
    var height = p.height;
    var valorInput = (parseInt(p_izq.value()*100))/(parseInt(p_izq.value())+parseInt(p_der.value()));
    valorInput = (valorInput > 100) ? 100 : valorInput;
    valor_izquierda = porcentaje(height/9, valorInput);
    valor_derecha = porcentaje(height/9, 100 - valorInput);
    ANG = porcentaje(25, 100 - valorInput);
    console.log(valor_izquierda, valor_derecha);
    valor_p_izquierda = height/1.77 + valor_izquierda*1.2;
    valor_p_derecha = height/1.77 + valor_derecha*1.2;
    p_der.value(p_der.value());
    p_izq.value(p_izq.value());
    $(".puntos-abstraccion").text(p_izq.value());
    $(".puntos-programacion").text(p_der.value());
}
/*
Código antiguo para cambiar cada valor izquierdo de la balanza independientemente
  function inputChangedL() {
    var width = p.width;
    var height = p.height;
    
    //var valorInput = sortNumber(p_izq.value());
    var valorInput = (p_izq.value()*100)/(p_izq.value()+p_der.value());
    valorInput = (valorInput > 100) ? 100 : valorInput;
    valor_izquierda = porcentaje(height/9, valorInput);
    valor_derecha = porcentaje(height/9, 100 - valorInput);
    ANG = porcentaje(25, 100 - valorInput);
    valor_p_izquierda = height/1.77 + valor_izquierda*1.2;
    valor_p_derecha = height/1.77 + valor_derecha*1.2;
    p_der.value((100 - valorInput));
    p_izq.value(valorInput);
    $(".puntos-abstraccion").text(valorInput);
    $(".puntos-programacion").text((100 - valorInput));
  }*/


/*
Código antiguo para cambiar cada valor derecho de la balanza independientemente
  function inputChangedR() {
    var width = p.width;
    var height = p.height;

    var valorInput = sortNumber(p_der.value());
    valorInput = (valorInput > 100) ? 100 : valorInput;
    valor_derecha = porcentaje(height/9, valorInput);
    valor_izquierda = porcentaje(height/9, 100 - valorInput);
    ANG = porcentaje(25, valorInput);
    valor_p_izquierda = height/1.77 + valor_izquierda*1.2;
    valor_p_derecha = height/1.77 + valor_derecha*1.2;
    p_izq.value((100 - valorInput));
    p_der.value(valorInput);
    $(".puntos-abstraccion").text((100 - valorInput));
    $(".puntos-programacion").text(valorInput);
  }*/

  function porcentaje( v, p ) {
    return ((v*2*p)/(100))-v;
  }

  function sortNumber(n){
    var newNumber="";
    for(var i = 0; i<n.length; i++)
      if(n[i] != "%")
        newNumber += n[i];
    return newNumber;
  }
};

var myp5 = new p5( balanza );

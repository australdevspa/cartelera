function dale(color) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color);
   
    /*
    rojo = (255,0,0);
    verde = (0,255,0);
    azul = (0,0,255);
    */

    var primario_rojo_1 = parseInt(result[1], 16);
    var primario_azul_1 = parseInt(result[3], 16);
    var primario_verde_1 = parseInt(result[2], 16);

    if(primario_rojo_1 > primario_azul_1 && primario_azul_1 == primario_verde_1){
        var terciario_rojo_1 = primario_rojo_1;
        var terciario_verde_1 = Math.ceil(primario_rojo_1/2);
        var terciario_azul_1 = primario_azul_1;

        var terciario_rojo_2 = primario_rojo_1;
        var terciario_verde_2 = primario_verde_1;
        var terciario_azul_2 = Math.ceil(primario_rojo_1/2);

        //contrario
        var terciario_rojo_3 = primario_verde_1;
        var terciario_verde_3 = primario_rojo_1;
        var terciario_azul_3 = primario_rojo_1;

        var evento = []
        evento.push("#" + ((1 << 24) + (terciario_rojo_1 << 16) + (terciario_verde_1 << 8) + terciario_azul_1).toString(16).slice(1));
        evento.push("#" + ((1 << 24) + (terciario_rojo_2 << 16) + (terciario_verde_2 << 8) + terciario_azul_2).toString(16).slice(1));
        evento.push("#" + ((1 << 24) + (terciario_rojo_3 << 16) + (terciario_verde_3 << 8) + terciario_azul_3).toString(16).slice(1));
        return evento;
        //return "rojo"
    }else if(primario_azul_1 > primario_verde_1 && primario_verde_1 == primario_rojo_1){
        var terciario_rojo_1 = Math.ceil(primario_azul_1/2);
        var terciario_verde_1 = primario_verde_1;
        var terciario_azul_1 = primario_azul_1;

        var terciario_rojo_2 = primario_rojo_1;
        var terciario_verde_2 = Math.ceil(primario_azul_1/2);
        var terciario_azul_2 = primario_azul_1;

                //contrario
                var terciario_rojo_3 = primario_azul_1;
                var terciario_verde_3 = primario_azul_1;
                var terciario_azul_3 = primario_rojo_1;

        var evento = []
        evento.push("#" + ((1 << 24) + (terciario_rojo_1 << 16) + (terciario_verde_1 << 8) + terciario_azul_1).toString(16).slice(1));
        evento.push("#" + ((1 << 24) + (terciario_rojo_2 << 16) + (terciario_verde_2 << 8) + terciario_azul_2).toString(16).slice(1));
        evento.push("#" + ((1 << 24) + (terciario_rojo_3 << 16) + (terciario_verde_3 << 8) + terciario_azul_3).toString(16).slice(1));
        
        return evento;
        //return "azul"
    }else if(primario_verde_1 > primario_rojo_1 && primario_rojo_1 == primario_azul_1){
        var terciario_rojo_1 = primario_rojo_1;
        var terciario_verde_1 = primario_verde_1;
        var terciario_azul_1 = Math.ceil(primario_verde_1/2);

        var terciario_rojo_2 = Math.ceil(primario_verde_1/2);
        var terciario_verde_2 = primario_verde_1;
        var terciario_azul_2 = primario_azul_1;
 //contrario
 var terciario_rojo_3 = primario_verde_1;
 var terciario_verde_3 = primario_azul_1;
 var terciario_azul_3 = primario_verde_1;

        var evento = []
        evento.push("#" + ((1 << 24) + (terciario_rojo_1 << 16) + (terciario_verde_1 << 8) + terciario_azul_1).toString(16).slice(1));
        evento.push("#" + ((1 << 24) + (terciario_rojo_2 << 16) + (terciario_verde_2 << 8) + terciario_azul_2).toString(16).slice(1));
        evento.push("#" + ((1 << 24) + (terciario_rojo_3 << 16) + (terciario_verde_3 << 8) + terciario_azul_3).toString(16).slice(1));
        
        return evento;
        //return "verde"
    }else if(primario_rojo_1 == primario_azul_1 && primario_rojo_1 > primario_verde_1){
        var terciario_rojo_1 = primario_rojo_1;
        var terciario_verde_1 = primario_verde_1;
        var terciario_azul_1 = Math.ceil(primario_azul_1/2);

        var terciario_rojo_2 = Math.ceil(primario_rojo_1/2);
        var terciario_verde_2 = primario_verde_1;
        var terciario_azul_2 = primario_azul_1;

         //contrario
 var terciario_rojo_3 = primario_verde_1;
 var terciario_verde_3 = primario_rojo_1;
 var terciario_azul_3 = primario_verde_1;

        var evento = []
        evento.push("#" + ((1 << 24) + (terciario_rojo_1 << 16) + (terciario_verde_1 << 8) + terciario_azul_1).toString(16).slice(1));
        evento.push("#" + ((1 << 24) + (terciario_rojo_2 << 16) + (terciario_verde_2 << 8) + terciario_azul_2).toString(16).slice(1));
        evento.push("#" + ((1 << 24) + (terciario_rojo_3 << 16) + (terciario_verde_3 << 8) + terciario_azul_3).toString(16).slice(1));
        
        return evento;
        //return "rosa"
    }else if(primario_azul_1 == primario_verde_1 && primario_azul_1 > primario_rojo_1){

        var terciario_rojo_1 = primario_rojo_1;
        var terciario_verde_1 = Math.ceil(primario_verde_1/2);
        var terciario_azul_1 = primario_azul_1;

        var terciario_rojo_2 = primario_rojo_1;
        var terciario_verde_2 = primario_verde_1;
        var terciario_azul_2 = Math.ceil(primario_azul_1/2);
 //contrario
 var terciario_rojo_3 = primario_verde_1;
 var terciario_verde_3 = primario_rojo_1;
 var terciario_azul_3 = primario_rojo_1;

        var evento = []
        evento.push("#" + ((1 << 24) + (terciario_rojo_1 << 16) + (terciario_verde_1 << 8) + terciario_azul_1).toString(16).slice(1));
        evento.push("#" + ((1 << 24) + (terciario_rojo_2 << 16) + (terciario_verde_2 << 8) + terciario_azul_2).toString(16).slice(1));
        evento.push("#" + ((1 << 24) + (terciario_rojo_3 << 16) + (terciario_verde_3 << 8) + terciario_azul_3).toString(16).slice(1));
        
        return evento;

        //return "celeste"
        //return "#" + ((1 << 24) + (terciario_rojo_1 << 16) + (terciario_azul_1 << 8) + terciario_verde_1).toString(16).slice(1);
        //return "celeste"+terciario_rojo_1+terciario_azul_1+terciario_verde_1+"-"+terciario_rojo_2+terciario_azul_2+terciario_verde_2;

    }else if(primario_verde_1 == primario_rojo_1 && primario_verde_1 > primario_azul_1){
        
        var terciario_rojo_1 = Math.ceil(primario_rojo_1/2);
        var terciario_verde_1 = primario_verde_1;
        var terciario_azul_1 = primario_azul_1;

        var terciario_rojo_2 = primario_rojo_1;
        var terciario_verde_2 = Math.ceil(primario_verde_1/2);
        var terciario_azul_2 = primario_azul_1;

        //contrario
 var terciario_rojo_3 = primario_azul_1;
 var terciario_verde_3 = primario_azul_1;
 var terciario_azul_3 = primario_rojo_1;

        var evento = []
        evento.push("#" + ((1 << 24) + (terciario_rojo_1 << 16) + (terciario_verde_1 << 8) + terciario_azul_1).toString(16).slice(1));
        evento.push("#" + ((1 << 24) + (terciario_rojo_2 << 16) + (terciario_verde_2 << 8) + terciario_azul_2).toString(16).slice(1));
        evento.push("#" + ((1 << 24) + (terciario_rojo_3 << 16) + (terciario_verde_3 << 8) + terciario_azul_3).toString(16).slice(1));
        
        return evento;
        //return "amarillo"
    }else if(primario_rojo_1 > primario_azul_1 && primario_rojo_1 > primario_verde_1){
        if(primario_verde_1 > primario_azul_1){
            var terciario_rojo_1 = primario_rojo_1;
            var terciario_verde_1 = primario_rojo_1;
            var terciario_azul_1 = primario_azul_1;
    
            var terciario_rojo_2 = primario_rojo_1;
            var terciario_verde_2 = primario_azul_1;
            var terciario_azul_2 = primario_azul_1;
    //contrario
 var terciario_rojo_3 = primario_azul_1;
 var terciario_verde_3 = primario_verde_1;
 var terciario_azul_3 = primario_rojo_1;

            var evento = []
            evento.push("#" + ((1 << 24) + (terciario_rojo_1 << 16) + (terciario_verde_1 << 8) + terciario_azul_1).toString(16).slice(1));
            evento.push("#" + ((1 << 24) + (terciario_rojo_2 << 16) + (terciario_verde_2 << 8) + terciario_azul_2).toString(16).slice(1));
            
            evento.push("#" + ((1 << 24) + (terciario_rojo_3 << 16) + (terciario_verde_3 << 8) + terciario_azul_3).toString(16).slice(1));
            return evento;
            //return "rojo izq"
        }else if(primario_verde_1 < primario_azul_1){
            var terciario_rojo_1 = primario_rojo_1;
            var terciario_verde_1 = primario_azul_1;
            var terciario_azul_1 = primario_azul_1;
    
            var terciario_rojo_2 = primario_rojo_1;
            var terciario_verde_2 = primario_azul_1;
            var terciario_azul_2 = primario_rojo_1;
    
                //contrario
 var terciario_rojo_3 = primario_verde_1;
 var terciario_verde_3 = primario_rojo_1;
 var terciario_azul_3 = primario_azul_1;

            var evento = []
            evento.push("#" + ((1 << 24) + (terciario_rojo_1 << 16) + (terciario_verde_1 << 8) + terciario_azul_1).toString(16).slice(1));
            evento.push("#" + ((1 << 24) + (terciario_rojo_2 << 16) + (terciario_verde_2 << 8) + terciario_azul_2).toString(16).slice(1));
            evento.push("#" + ((1 << 24) + (terciario_rojo_3 << 16) + (terciario_verde_3 << 8) + terciario_azul_3).toString(16).slice(1));
            
            return evento;
            //return "rojo der"
        }
    }else if(primario_azul_1 > primario_verde_1 && primario_azul_1 > primario_rojo_1){
        if(primario_rojo_1 > primario_verde_1){
            var terciario_rojo_1 = primario_azul_1;
            var terciario_verde_1 = primario_verde_1;
            var terciario_azul_1 = primario_azul_1;
    
            var terciario_rojo_2 = primario_verde_1;
            var terciario_verde_2 = primario_verde_1;
            var terciario_azul_2 = primario_azul_1;
    
            //contrario
 var terciario_rojo_3 = primario_rojo_1;
 var terciario_verde_3 = primario_azul_1;
 var terciario_azul_3 = primario_verde_1;

            var evento = []
            evento.push("#" + ((1 << 24) + (terciario_rojo_1 << 16) + (terciario_verde_1 << 8) + terciario_azul_1).toString(16).slice(1));
            evento.push("#" + ((1 << 24) + (terciario_rojo_2 << 16) + (terciario_verde_2 << 8) + terciario_azul_2).toString(16).slice(1));
            
            evento.push("#" + ((1 << 24) + (terciario_rojo_3 << 16) + (terciario_verde_3 << 8) + terciario_azul_3).toString(16).slice(1));
            return evento;
            //return "azul izq"
        }else if(primario_rojo_1 < primario_verde_1){
            var terciario_rojo_1 = primario_rojo_1;
            var terciario_verde_1 = primario_rojo_1;
            var terciario_azul_1 = primario_azul_1;
    
            var terciario_rojo_2 = primario_rojo_1;
            var terciario_verde_2 = primario_azul_1;
            var terciario_azul_2 = primario_azul_1;
          //contrario
 var terciario_rojo_3 = primario_azul_1;
 var terciario_verde_3 = primario_verde_1;
 var terciario_azul_3 = primario_rojo_1;

            var evento = []
            evento.push("#" + ((1 << 24) + (terciario_rojo_1 << 16) + (terciario_verde_1 << 8) + terciario_azul_1).toString(16).slice(1));
            evento.push("#" + ((1 << 24) + (terciario_rojo_2 << 16) + (terciario_verde_2 << 8) + terciario_azul_2).toString(16).slice(1));
            evento.push("#" + ((1 << 24) + (terciario_rojo_3 << 16) + (terciario_verde_3 << 8) + terciario_azul_3).toString(16).slice(1));
            
            return evento;
            //return "azul der"
        }
        //return "azul claro oscuro"
    }else if(primario_verde_1 > primario_rojo_1 && primario_verde_1 > primario_azul_1){
        if(primario_azul_1 > primario_rojo_1){
            var terciario_rojo_1 = primario_rojo_1;
            var terciario_verde_1 = primario_verde_1;
            var terciario_azul_1 = primario_verde_1;
    
            var terciario_rojo_2 = primario_rojo_1;
            var terciario_verde_2 = primario_verde_1;
            var terciario_azul_2 = primario_rojo_1;
              //contrario
 var terciario_rojo_3 = primario_verde_1;
 var terciario_verde_3 = primario_rojo_1;
 var terciario_azul_3 = primario_azul_1;

            var evento = []
            evento.push("#" + ((1 << 24) + (terciario_rojo_1 << 16) + (terciario_verde_1 << 8) + terciario_azul_1).toString(16).slice(1));
            evento.push("#" + ((1 << 24) + (terciario_rojo_2 << 16) + (terciario_verde_2 << 8) + terciario_azul_2).toString(16).slice(1));
            evento.push("#" + ((1 << 24) + (terciario_rojo_3 << 16) + (terciario_verde_3 << 8) + terciario_azul_3).toString(16).slice(1));
            
            return evento;
            //return "verde izq"
        }else if(primario_azul_1 < primario_rojo_1){
            var terciario_rojo_1 = primario_azul_1;
            var terciario_verde_1 = primario_verde_1;
            var terciario_azul_1 = primario_azul_1;
    
            var terciario_rojo_2 = primario_verde_1;
            var terciario_verde_2 = primario_verde_1;
            var terciario_azul_2 = primario_azul_1;
                 //contrario
 var terciario_rojo_3 = primario_rojo_1;
 var terciario_verde_3 = primario_azul_1;
 var terciario_azul_3 = primario_verde_1;
            var evento = []
            evento.push("#" + ((1 << 24) + (terciario_rojo_1 << 16) + (terciario_verde_1 << 8) + terciario_azul_1).toString(16).slice(1));
            evento.push("#" + ((1 << 24) + (terciario_rojo_2 << 16) + (terciario_verde_2 << 8) + terciario_azul_2).toString(16).slice(1));
            evento.push("#" + ((1 << 24) + (terciario_rojo_3 << 16) + (terciario_verde_3 << 8) + terciario_azul_3).toString(16).slice(1));
            
            return evento;
            //return "verde der"
        }
        //return "verde claro oscuro"
    }
    /*if(color_primario_rojo_1 > color_primario_azul_1 && color_primario_rojo_1 > color_primario_verde_1){
        return "rojo"
    }else if(color_primario_azul_1 > color_primario_rojo_1 && color_primario_azul_1 > color_primario_verde_1){
        return "azul"
    }else if(color_primario_verde_1 > color_primario_rojo_1 && color_primario_verde_1 > color_primario_azul_1){
        return "verde"
    }*/

    /*return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;*/
}

export {
    dale
}
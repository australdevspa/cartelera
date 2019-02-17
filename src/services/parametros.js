import moment from 'moment';
moment.locale('es')
import dc from 'dale_color';

//Asignacion y modificacion de parametros a los objetos de la api
function setParametros(x){
    moment.locale('es')
    if(x.thumbnail == null){
        x.thumbnail = "../static/img/default/evento_default.jpg"

        x.fecha_inicio_formato = moment(x.fecha_ini).format('DD/MM/YYYY')
        x.fecha_inicio_formato_day = moment(x.fecha_ini).format('DD')
        x.fecha_inicio_formato_month = moment(x.fecha_ini).format('MMMM')
        x.fecha_inicio_formato_year = moment(x.fecha_ini).format('YYYY')
        x.fecha_fin_formato = moment(x.fecha_fin).format('DD/MM/YYYY')
        x.fecha_rango = fecha_rango(x.fecha_ini, x.fecha_fin)

        x.dia_semana = diaSemana(x.fecha_ini, x.fecha_fin);
        x.entrada = precio(x.valor);
        x.donde = donde(x.lugar);

        x.cuanto_moment = cuantoMoment(x.fecha_ini);
        x.cuanto_moment_en = cuantoMomentEn(x.fecha_ini);
        x.horario = horario(x.fecha_ini, x.fecha_fin)

        if(x.area_color == null){
            x.area_color = "#734525"
        }
        x.color_claro = dc.brillo.aclarar(x.area_color, 30)
        x.color_oscuro = dc.brillo.oscurecer(x.area_color, 30) 
        x.color_opuesto = colorOpuesto(x.color_claro);

        x.w = w(x.fecha_ini);
    }else{
        x.fecha_inicio_formato = moment(x.fecha_ini).format('DD/MM/YYYY')
        x.fecha_inicio_formato_day = moment(x.fecha_ini).format('DD')
        x.fecha_inicio_formato_month = moment(x.fecha_ini).format('MMMM')
        x.fecha_inicio_formato_year = moment(x.fecha_ini).format('YYYY')
        x.fecha_fin_formato = moment(x.fecha_fin).format('DD/MM/YYYY')
        x.fecha_rango = fecha_rango(x.fecha_ini, x.fecha_fin)
        
        x.dia_semana = diaSemana(x.fecha_ini, x.fecha_fin);
        x.entrada = precio(x.valor);
        x.donde = donde(x.lugar);

        x.cuanto_moment = cuantoMoment(x.fecha_ini);
        x.cuanto_moment_en = cuantoMomentEn(x.fecha_ini);
        x.horario = horario(x.fecha_ini, x.fecha_fin)

        if(x.area_color == null){
            x.area_color = "#734525"
        }
        x.color_claro = dc.brillo.aclarar(x.area_color, 30)
        x.color_oscuro = dc.brillo.oscurecer(x.area_color, 30) 
        x.color_opuesto = colorOpuesto(x.color_claro);

        x.w = w(x.fecha_ini);
    }
}

/*se utiliza para determinar si una exposicion se encuentra dentro del rango de su realizacion*/
function fecha_rango(inicio, fin) {
    var fecha_actual = moment().format('YYYY-MM-DD')
    var fecha_inicio = moment(inicio).format('YYYY-MM-DD')
    var fecha_fin = moment(fin).format('YYYY-MM-DD')
    
    if(fecha_inicio === fecha_fin){
        return moment(inicio).format('DD/MM/YYYY');
    }else{
        if(moment(fecha_actual).isBetween(fecha_inicio, fecha_fin) === true){
            return moment(fecha_actual).format('DD/MM/YYYY');
        }else{
            return moment(inicio).format('DD/MM/YYYY');
        }
    }
}

/*se utiliza en el calendario de los cards */
function diaSemana(inicio, fin) {
    moment.locale('es')
    var fecha_actual = moment()
    var fecha_inicio = moment(inicio).format('DD/MM/YYYY')
    var fecha_fin = moment(fin).format('DD/MM/YYYY')
    if(fecha_inicio == fecha_fin){
        return moment(inicio).format('dddd');
    }else{
        if(moment(fecha_actual).isBetween(fecha_inicio, fecha_fin) == true){
            return moment(inicio).format('dddd');
        }else{
            return moment(inicio).format('dddd');
        }
    }
}

/*se utiliza en los cards*/
function precio(valor) {
    if(valor == null){
        return "indefinido";
    }else{
        if(valor == "0.-" || valor == "0"){
            return "liberada";
        }else if(valor.indexOf(".-") != -1){
            return "$" + valor.substr(0, valor.indexOf(".-"))
        }else {
            return "$" + valor;
        }
    }
}

/*se utiliza en los cards*/
function donde(lugar) {
    if(lugar == "Arena Puerto Montt"){
        var centro = "Arena"
        return lugar + " - " + centro;
    }else if(lugar == "Casona Cultural Ex Banco Llanquihuet" || lugar == "2° piso"){
        var centro = "Casona"
        return lugar + " - " + centro;
    }else{
        var centro = "Casa del Arte Diego Rivera"
        if(lugar == "Sala Teatro Diego Rivera"){
            return "Sala Teatro - " + centro;
        }else{
            return lugar + " - " + centro;
        }
    }
}

/*se utiliza en el ribbon*/
function cuantoMoment(date) {
    moment.updateLocale('es', {
        calendar : {
            lastDay : '[Ayer]',
            sameDay : '[Hoy]',
            nextDay : '[Mañana]',
            lastWeek : '[Pasado] dddd',
            nextWeek : '[Próximo] dddd',
            sameElse: function () {
                var fromNow = moment( date ).fromNow();
                return "[" + fromNow + "]";
            }
        }
    });
    return moment(date).startOf('days').locale('es').calendar();
}

/*se utiliza en el ribbon*/
function cuantoMomentEn(date) {
    moment.updateLocale('en', {
        calendar : {
            lastDay : '[Yesterday]',
            sameDay : '[Today]',
            nextDay : '[Tomorrow]',
            lastWeek : '[Last] dddd',
            nextWeek : '[Next] dddd',
            sameElse: function () {
                var fromNow = moment( date ).fromNow();
                return "[" + fromNow + "]";
            }
        }
    });
    return moment(date).startOf('days').locale('en').calendar();
}

/*se utiliza en el ribbon */
function horario(inicio, fin) {
    var fecha_inicio = moment(inicio).format('DD/MM/YYYY')
    var fecha_fin = moment(fin).format('DD/MM/YYYY')
    if(fecha_inicio == fecha_fin){
        var hora_inicio = moment(inicio).format('HH:mm')
        return hora_inicio + " hrs";
    }else{
        return "horario indefinido";
    }
}

/*se utiliza en el slider*/
function colorOpuesto(color) {
    var opuesto = dc.armonias.opuesto(color)
    if(dc.validaciones.isClaro(opuesto, 177) == true){
        var masOscuro = dc.brillo.oscurecer(opuesto, 50)
        return masOscuro
    }else{
        return opuesto
    }
}

/*se utiliza para determinar si una actividad se encuentra dentro de un determinado rango*/
function w(inicio) {
    var hoy = moment().format('YYYY-MM-DD')
    var dos_semanas = moment(hoy, "YYYY-MM-DD").add('days', 28);
    
    var fecha_inicio = moment(inicio).format('YYYY-MM-DD')

    if(fecha_inicio === hoy){
        return "hoy";
    }else{
        if(moment(fecha_inicio).isBetween(hoy, dos_semanas) === true){
            return "4 semanas";
        }else{
            return "no";
        }
    }
}

export {
    setParametros
}
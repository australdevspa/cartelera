document.addEventListener("DOMContentLoaded", function(){
    if(!Notification){
        alert("Este navegador no soporta notificaciones");
        return;
    }
    if(Notification.permission !== "granted"){
        Notification.requestPermission();
    }
});

function notificar(){
    if(Notification.permission !== "granted"){
        Notification.requestPermission();
    }else{
        var notification = new Notification("Titulo de la Notificación",
            {
                icon: "",
                body: "descripcion"
            }
        );

        notification.onclick = function(){
            window.open("https://www.github.com/laloinsane/");
        }
    }
}

export {
    notificar
}
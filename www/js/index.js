var arrayObjetos = [];
document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    // Cordova is now initialized. Have fun!

    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    //document.getElementById('deviceready').classList.add('ready');
    loadItems();
}

let botonAdd = $("#add").click(function() {
    let noti = prompt("Escribe el nombre de la tarea que quieres añadir:");
    var elem = $("ul").append("<li><a href='#page1'>"+noti+"<button class='botonNuevo' style='border:0px;background-color:black;color:white;float:right'>Delete</button></a></li>");
    setLocal();
    $("a", elem).click(editar);
    $("ul").listview( "refresh" );
    $('ul li button').click(function(e){
        var tar = e.target || e.srcElement;
        $(tar.parentElement.parentElement).remove();
        setLocal();
        return false;
    });
});

var targetElem = null;

function editar(e){
    var tar = e.target || e.srcElement;
    targetElem = tar;
    var text = $(targetElem)
    .clone() 
    .children()
    .remove()
    .end() 
    .text();
    $("#editName").val(text);
    setLocal();
}

$("[id='editButton']").click(function (){
    var editli = $("#editName").val();
    newStr = "<button class='botonNuevo' style='border:0px;background-color:black;color:white;float:right'>Delete</button>";
    $(targetElem).html(editli+newStr);
    setLocal();
    //vuelve a la pagina de inicio con la lista
    document.location= "#";
    $('ul li button').click(function(e){
        var tar = e.target || e.srcElement;
        $(tar.parentElement.parentElement).remove();
        setLocal();
        return false;
    });
});

function setLocal(){
    arrayObjetos = [];
    $("ul>li>a").each(function (){
        var text = $(this)
        .clone() 
        .children()
        .remove()
        .end() 
        .text();
        arrayObjetos.push(text);
    })
    arrayObjetos = JSON.stringify(arrayObjetos)
    localStorage.setItem("objetos", arrayObjetos);
}

function loadItems(){
    let objects = localStorage.getItem("objetos")
    objects = JSON.parse(objects)
    for(let i = 0; i<objects.length;i++){
        var loadElem = $("ul").append("<li><a href='#page1'>"+objects[i]+"<button data-role='none' class='botonNuevo' style='border:0px;background-color:black;color:white;float:right'>Delete</button></a></li>");        
        $("a", loadElem).click(editar);
        setLocal();
        $("ul").listview("refresh");
        $('ul li button').click(function(e){
            var tar = e.target || e.srcElement;
            $(tar.parentElement.parentElement).remove();
            setLocal();
            return false;
        });
    }
    $("ul").listview( "refresh" );
}
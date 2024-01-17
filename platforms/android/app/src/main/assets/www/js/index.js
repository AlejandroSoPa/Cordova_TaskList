var arrayObjetos = ["Hacer un taskList funcional", "Preguntar si tiene que tener un modelo de inicio al Enric"];
document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    // Cordova is now initialized. Have fun!

    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    //document.getElementById('deviceready').classList.add('ready');
    loadItems();
}

let botonAdd = $("#afegir").click(function() {
    let pro = prompt("Escribe el nombre de la tarea que quieres añadir:");
    var elem = $("ul").append("<li><a href='#page1'>"+pro+"<button class='botonNuevo' style='border:0px;background-color:black;color:white;float:right'>Delete</button></a></li>");
    setearLocal();
    $("a", elem).click(editar);
    $("ul").listview( "refresh" );
    $('ul li button').click(function(e){
        var tar = e.target || e.srcElement;
        $(tar.parentElement.parentElement).remove();
        setearLocal();
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
    setearLocal();
}

$("[id='btnEditar']").click(function (){
    var editTaskList = $("#editName").val();
    botoStr = "<button class='botonNuevo' style='border:0px;background-color:black;color:white;float:right'>Delete</button>";
    $(targetElem).html(editTaskList+botoStr);
    setearLocal();
    document.location= "#";
    $('ul li button').click(function(e){
        var tar = e.target || e.srcElement;
        $(tar.parentElement.parentElement).remove();
        setearLocal();
        return false;
    });
});

function setearLocal(){
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
    let items = localStorage.getItem("objetos")
    items = JSON.parse(items)
    for(let i = 0; i<items.length;i++){
        var elem = $("ul").append("<li><a href='#page1'>"+items[i]+"<button data-role='none' class='botonNuevo' style='border:0px;background-color:black;color:white;float:right'>Delete</button></a></li>");        
        $("a", elem).click(editar);
        setearLocal();
        $("ul").listview("refresh");
        $('ul li button').click(function(e){
            var tar = e.target || e.srcElement;
            $(tar.parentElement.parentElement).remove();
            setearLocal();
            return false;
        });
    }
    $("ul").listview( "refresh" );
}
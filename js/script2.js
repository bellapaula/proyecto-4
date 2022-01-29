const firebaseConfig = {
    apiKey: "AIzaSyAJ7-8Xka7KJC1td3S8847y62evPj-2LNA",
    authDomain: "proyecto-pancho-chancho-prueba.firebaseapp.com",
    projectId: "proyecto-pancho-chancho-prueba",
    storageBucket: "proyecto-pancho-chancho-prueba.appspot.com",
    messagingSenderId: "144688252808",
    appId: "1:144688252808:web:f2b71d17dec2d211685c3d",
    measurementId: "G-29VPCXCKR7"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
//Inicializar servicio de la bd Firestore

const db = firebase.firestore();

//Selectores
const post_Form = document.getElementById("postForm");
const post_Form2 = document.getElementById("postForm2");

/* METODOS DE FIREBASE STORE*/

// Leer Estado
function readPosts() {
    db.collection('posts').get().then((posts) => {
        listPosts(posts.docs);
    })
}

// Leer Consejos
function readPosts2() {
    db.collection('posts2').get().then((posts2) => {
        listPosts2(posts2.docs);
    })
}

// Listar Estado
function listPosts(data) {
    var divContent = $("#post-feed");
    divContent.empty();
    if (data.length > 0) {
        let content = "";
        data.forEach(document => {
            let doc = document.data();
            const divPost = `
                    <div style='border:solid 2px;'>
                        <p>${doc.description}</p><br>
                        <textarea style='display: none;'></textarea>
                        <button data-id="${document.id}" style='display: none;'>Guardar</button>
                        <span>Publicado el: ${doc.day}/${doc.month}/${doc.year}</span>
                        <button data-id="${document.id}" class="btn btn-warning edit">Editar</button>
                        <button data-id="${document.id}" class="btn btn-danger delete">Eliminar</button>
                    </div>
                    <hr>
                `;
            content += divPost;
        });
        divContent.append(content);
        //Agregar listener a btn-delete
        const btnDelete = document.querySelectorAll(".delete");
        btnDelete.forEach(btn => {
            btn.addEventListener("click", (e) => {
                e.preventDefault();
                const id = e.target.dataset.id;
                DeletePost(id);
            })
        })
        const btnEdit = document.querySelectorAll(".edit");
        btnEdit.forEach(btn => {
            btn.addEventListener("click", (e) => {
                e.preventDefault();
                const id = e.target.dataset.id;
                OpenEdit(id, btn);
            })
        })
    }
};

// Listar Consejos
function listPosts2(data) {
    var divContent = $("#post-feed2");
    divContent.empty();
    if (data.length > 0) {
        let content = "";
        data.forEach(document => {
            let doc = document.data();
            const divPost = `
                <div style='border:solid 2px;'>
                    <p>${doc.post}</p><br>
                    <textarea style='display: none;'></textarea>
                    <button data-id="${document.id}" style='display: none;'>Guardar</button>
                    <span>Publicado el: ${doc.day}/${doc.month}/${doc.year}</span>
                    <button data-id="${document.id}" class="btn btn-warning edit2">Editar</button>
                    <button data-id="${document.id}" class="btn btn-danger delete2">Eliminar</button>
                </div>
                <hr>
            `;
            content += divPost;
        });
        divContent.append(content);
        //Agregar listener a btn-delete
        const btnDelete = document.querySelectorAll(".delete2");
        btnDelete.forEach(btn => {
            btn.addEventListener("click", (e) => {
                e.preventDefault();
                const id = e.target.dataset.id;
                DeletePost2(id);
            })
        })
        const btnEdit = document.querySelectorAll(".edit2");
        btnEdit.forEach(btn => {
            btn.addEventListener("click", (e) => {
                e.preventDefault();
                const id = e.target.dataset.id;
                OpenEdit2(id, btn);
            })
        })
    }
};

// Abrir cuadros para Editar Estado
function OpenEdit(id, button) {
    let parent = button.parentNode;
    let textEdit = $(parent).children().eq(2);
    let btnEdit = $(parent).children().eq(3);
    textEdit.show();
    btnEdit.show();
    btnEdit.on("click", function (e) {
        SaveUpdate(e, id, textEdit.val())
    });
};

// Abrir cuadros para Editar Consejo
function OpenEdit2(id, button) {
    let parent = button.parentNode;
    let textEdit = $(parent).children().eq(2);
    let btnEdit = $(parent).children().eq(3);
    textEdit.show();
    btnEdit.show();
    btnEdit.on("click", function (e) {
        SaveUpdate2(e, id, textEdit.val())
    });
};

// Eliminar Estado
function DeletePost(id) {
    db.collection("posts").doc(id).delete().then(() => {
        const ms_eliminado = document.querySelector(".alert-secondary"); 
        ms_eliminado.style.display ="block";
        setTimeout(()=>{
            ms_eliminado.style.display="none";
        },3000);
        readPosts();
        // readPosts2();
    }).catch((error) => {
        console.error("Detalle del Error: ", error);
    });
};

//Eliminar Consejo
function DeletePost2(id) {
    db.collection("posts2").doc(id).delete().then(() => {
        const cn_eliminado = document.querySelector(".alert-warning"); 
        cn_eliminado.style.display ="block";
        setTimeout(()=>{
            cn_eliminado.style.display="none";
        },3000);
        //readPosts();
        readPosts2();
    }).catch((error) => {
        console.error("Detalle del Error: ", error);
    });
};

// Actualizar Estado
function SaveUpdate(e, id_post, text_new) {
    e.preventDefault();
    db.collection("posts").doc(id_post).update({
        description: text_new,
    }).then(() => {
        const ms_editado = document.querySelector(".alert-danger"); 
        ms_editado.style.display ="block";
        setTimeout(()=>{
            ms_editado.style.display="none";
        },3000);
        readPosts();
    })
        .catch((error) => {
            alert("Error:", error);
        })
}

// Actualizar Consejo
function SaveUpdate2(e, id_post, text_new) {
    e.preventDefault();
    db.collection("posts2").doc(id_post).update({
        post: text_new,
    }).then(() => {
        const cn_editado = document.querySelector(".alert-success"); 
        cn_editado.style.display ="block";
        setTimeout(()=>{
            cn_editado.style.display="none";
        },3000);
        readPosts2();
    })
        .catch((error) => {
            alert("Error:", error);
        })
}

/* EVENTOS*/
// Al cargar la Pagina, listar los Estados.
window.addEventListener('DOMContentLoaded', (e) => {
    readPosts();
});

// Al cargar la Pagina, listar los Consejos.
window.addEventListener('DOMContentLoaded', async (e) => {
    readPosts2();
});

// Al Publicar un nuevo Estado
$("#btnSendPost").click(function (e) {
    e.preventDefault();
    let postText = $("#postText").val();
    let date = new Date();
    db.collection("posts").add({
        description: postText,
        day: date.getDate(),
        month: date.getMonth() + 1,
        year: date.getFullYear(),
    })
        .then((docRef) => {
            const ms_publicado = document.querySelector(".alert-info"); 
            ms_publicado.style.display ="block";
            setTimeout(()=>{
                ms_publicado.style.display="none";
            },3000);
            $("#status-text").val('');
            readPosts();
        })
        .catch((error) => {
            alert(error);
        })
});

// Al Publicar un nuevo Consejo
$("#btnSendPost2").click(function (e) {
    e.preventDefault();
    let postText2 = $("#postText2").val();
    let date = new Date();
    db.collection("posts2").add({
        post: postText2,
        day: date.getDate(),
        month: date.getMonth() + 1,
        year: date.getFullYear(),
    })
        .then((docRef) => {
            const cn_publicado = document.querySelector(".alert-dark"); 
            cn_publicado.style.display ="block";
            setTimeout(()=>{
                cn_publicado.style.display="none";
            },3000);
            $("#status-text2").val('');
            readPosts2();
        })
        .catch((error) => {
            alert(error);
        })
});

// Al Salir de la cuenta
// Cambio de estado de autentificacion
const btnSalir = document.querySelector("#logout");
auth.onAuthStateChanged((user) => {
    if (user) {
      console.log("logeado");
      
      btnSalir.style.display="block";
     //formularioPost.style.display="block";
    } else {
      console.log("no has ingresado");
     
     //formularioPost.style.display="none";
     btnSalir.style.display="none";
    }
  });

//Salir
btnSalir.addEventListener("click", (e) => {
  e.preventDefault();
  auth.signOut().then(() => {
    console.log("salistes de tu cuenta");
    window.location.href = "./index.html"
  });
});







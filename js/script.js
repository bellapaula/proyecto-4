
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
    const fs = firebase.firestore();
 
const registroformulario= document.querySelector("#registro-formulario");
const ingresoformulario= document.querySelector("#ingreso-formulario");

//registro
registroformulario.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = registroformulario["mail-new"].value;
    const password = registroformulario["pass-new"].value;
  console.log(email,password);
    // Authenticate the User
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // clear the form
        registroformulario.reset();
        // close the modal
        $("#registro").modal("hide");
        console.log("registrado");
      });
  });
  //Ingreso

ingresoformulario.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = ingresoformulario["mail"].value;
      const password = ingresoformulario["pass"].value;
  
    // Authenticate the User
    auth.signInWithEmailAndPassword(email, password).then((userCredential) => {
      // clear the form
      ingresoformulario.reset();
      console.log("logeado");
      window.location.href = "./contenido2.html";

    });
  });
  // Login with Google
const googleButton = document.querySelector("#btn-login-google");

googleButton.addEventListener("click", (e) => {
  e.preventDefault();
  ingresoformulario.reset();


  const provider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithPopup(provider).then((result) => {
    console.log(result);
    console.log("Iniciado con tu cuenta Google");
    window.location.href = "./contenido2.html";

  })
  .catch(err => {
    console.log(err);
  })
});

  // evento: cambio de estado de autentificacion
  const btnSalir =document.querySelector("#logout");
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

logout.addEventListener("click", (e) => {
  e.preventDefault();
  auth.signOut().then(() => {
    console.log("salistes de tu cuenta");
  });
});

//Operaciones con POST
//Definicion de Constantes
const post = firebase.firestore();
const post_Form = document.getElementById('postForm');
const PostList = document.getElementById('postList');


// Al enviar el Post con el boton Postear
post_Form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const mensaje = post_Form['postText'];
  await savePost(mensaje.value);
  console.log("Post Guardado")
  post_Form.reset();
  mensaje.focus();

});

// Guardar post
const savePost = (mensaje) =>
  post.collection("posts").add({
    description: mensaje,
  });

  

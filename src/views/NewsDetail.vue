<script setup lang="ts">

import { ref, onMounted } from "vue"
import { useRoute } from "vue-router"
import { db } from "../firebase"

import {
  doc,
  getDoc,
  collection,
  addDoc,
  getDocs,
  query,
  where,
  Timestamp
} from "firebase/firestore"

const route = useRoute()

const noticia = ref<any>(null)

const comentarios = ref<any[]>([])
const nuevoComentario = ref("")

/* CARGAR NOTICIA */

const cargarNoticia = async () => {

  const docRef = doc(db,"news", route.params.id as string)

  const snapshot = await getDoc(docRef)

  if(snapshot.exists()){

    noticia.value = {
      id: snapshot.id,
      ...snapshot.data()
    }

  }

}

/* GUARDAR NOTICIA VISTA */

const guardarNoticiaVista = () => {

  let vistas = JSON.parse(
    localStorage.getItem("noticiasVistas") || "[]"
  )

  if(!vistas.includes(route.params.id)){

    vistas.unshift(route.params.id)

    if(vistas.length > 5){
      vistas = vistas.slice(0,5)
    }

    localStorage.setItem(
      "noticiasVistas",
      JSON.stringify(vistas)
    )

  }

}

/* CARGAR COMENTARIOS */

const cargarComentarios = async () => {

  const q = query(
    collection(db,"comments"),
    where("newsId","==", route.params.id)
  )

  const snapshot = await getDocs(q)

  comentarios.value = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }))

}

/* PUBLICAR COMENTARIO */

const publicarComentario = async () => {

  if(!nuevoComentario.value) return

  await addDoc(collection(db,"comments"),{

    newsId: route.params.id,
    author: "Usuario",
    text: nuevoComentario.value,
    createdAt: Timestamp.now()

  })

  nuevoComentario.value = ""

  await cargarComentarios()

}

onMounted(async () => {

  await cargarNoticia()

  guardarNoticiaVista()

  await cargarComentarios()

})

</script>

<template>

<div class="container mt-5" v-if="noticia">

<!-- VOLVER -->

<router-link
to="/"
class="btn btn-outline-warning mb-4"
>
← Volver
</router-link>

<!-- NOTICIA -->

<div class="card news-card shadow-lg">

<img
:src="noticia.image"
class="card-img-top"
/>

<div class="card-body">

<p class="badge bg-danger">
{{ noticia.categoria }}
</p>

<h1 class="card-title">
{{ noticia.title }}
</h1>

<p class="card-text mt-3">
{{ noticia.content }}
</p>

</div>

</div>


<!-- COMENTARIOS -->

<div class="mt-5">

<h3 class="section-title">
Comentarios
</h3>

<!-- FORMULARIO -->

<div class="card news-card p-3 mb-4">

<textarea
v-model="nuevoComentario"
class="form-control mb-3"
placeholder="Escribe un comentario..."
></textarea>

<button
class="btn btn-warning"
@click="publicarComentario"
>
Publicar comentario
</button>

</div>

<!-- LISTA COMENTARIOS -->

<div
v-for="comentario in comentarios"
:key="comentario.id"
class="card news-card p-3 mb-2"
>

<strong>
{{ comentario.author }}
</strong>

<p class="mb-0 mt-2">
{{ comentario.text }}
</p>

</div>

</div>

</div>

</template>
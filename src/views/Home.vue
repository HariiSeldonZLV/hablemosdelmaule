<script setup lang="ts">

import { ref, onMounted, computed, watch } from "vue"
import { useRoute } from "vue-router"
import { db } from "../firebase"
import { collection, getDocs, query, orderBy } from "firebase/firestore"

const route = useRoute()

const noticias = ref<any[]>([])
const noticiasVistas = ref<any[]>([])
const categoriaSeleccionada = ref("todas")
const comentariosCount = ref<any>({})

/* CARGAR NOTICIAS */

const cargarNoticias = async () => {

  const q = query(
    collection(db,"news"),
    orderBy("createdAt","desc")
  )

  const snapshot = await getDocs(q)

  noticias.value = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }))

}

/* CARGAR NOTICIAS VISTAS */

const cargarNoticiasVistas = async () => {

  const ids = JSON.parse(localStorage.getItem("noticiasVistas") || "[]")

  if(ids.length === 0) return

  const snapshot = await getDocs(collection(db,"news"))

  const todas = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }))

  noticiasVistas.value = todas.filter(n => ids.includes(n.id))

}

/* CONTAR COMENTARIOS */

const cargarComentariosCount = async () => {

  const snapshot = await getDocs(collection(db,"comments"))

  const contador:any = {}

  snapshot.docs.forEach(doc => {

    const data:any = doc.data()
    const newsId = data.newsId

    if(!contador[newsId]){
      contador[newsId] = 0
    }

    contador[newsId]++

  })

  comentariosCount.value = contador

}

/* FILTRO DE CATEGORIAS */

const noticiasFiltradas = computed(() => {

  if(categoriaSeleccionada.value === "todas"){
    return noticias.value
  }

  return noticias.value.filter(n =>
    n.categoria === categoriaSeleccionada.value
  )

})

/* NOTICIA DESTACADA */

const noticiaDestacada = computed(() => {
  return noticiasFiltradas.value.length > 0
    ? noticiasFiltradas.value[0]
    : null
})

/* RESTO DE NOTICIAS */

const noticiasRestantes = computed(() => {
  return noticiasFiltradas.value.slice(1)
})

/* FILTRO DESDE NAVBAR */

watch(
  () => route.query.categoria,
  (categoria) => {

    if(categoria){
      categoriaSeleccionada.value = categoria as string
    }else{
      categoriaSeleccionada.value = "todas"
    }

  },
  { immediate: true }
)

/* CARGA INICIAL */

onMounted(async () => {

  await cargarNoticias()
  await cargarNoticiasVistas()
  await cargarComentariosCount()

})

</script>

<template>

<div>

<!-- HERO -->

<section class="hero">

<div class="container">

<h1>Portal Noticias Maule</h1>

<p>Las últimas noticias de la región</p>

</div>

</section>


<!-- NOTICIA DESTACADA -->

<div v-if="noticiaDestacada" class="container mt-5">

<h2 class="section-title">Noticia destacada</h2>

<div class="card news-card shadow-lg">

<img
:src="noticiaDestacada.image"
class="card-img-top destacada-img"
/>

<div class="card-body">

<p class="badge bg-danger">
{{ noticiaDestacada.categoria }}
</p>

<h2 class="card-title">

<router-link :to="'/news/' + noticiaDestacada.id">
{{ noticiaDestacada.title }}
</router-link>

</h2>

<p class="card-text">
{{ noticiaDestacada.content.substring(0,200) }}...
</p>

<p class="mt-2 text-muted">
💬 {{ comentariosCount[noticiaDestacada.id] || 0 }} comentarios
</p>

</div>

</div>

</div>


<!-- NOTICIAS VISTAS -->

<div v-if="noticiasVistas.length > 0" class="container mt-5">

<h3 class="section-title">Últimas noticias revisadas</h3>

<div class="row">

<div
v-for="noticia in noticiasVistas"
:key="noticia.id"
class="col-md-4 mb-4"
>

<div class="card news-card h-100 shadow">

<img
:src="noticia.image"
class="card-img-top"
/>

<div class="card-body">

<p class="badge bg-danger">
{{ noticia.categoria }}
</p>

<h5 class="card-title">

<router-link :to="'/news/' + noticia.id">
{{ noticia.title }}
</router-link>

</h5>

<p class="text-muted">
💬 {{ comentariosCount[noticia.id] || 0 }} comentarios
</p>

</div>

</div>

</div>

</div>

</div>


<!-- TODAS LAS NOTICIAS -->

<div class="container mt-5">

<h3 class="section-title">Últimas noticias</h3>

<div class="row">

<div
v-for="noticia in noticiasRestantes"
:key="noticia.id"
class="col-md-4 mb-4"
>

<div class="card news-card h-100 shadow">

<img
:src="noticia.image"
class="card-img-top"
/>

<div class="card-body">

<p class="badge bg-danger">
{{ noticia.categoria }}
</p>

<h5 class="card-title">

<router-link :to="'/news/' + noticia.id">
{{ noticia.title }}
</router-link>

</h5>

<p class="card-text">
{{ noticia.content.substring(0,120) }}...
</p>

<p class="text-muted">
💬 {{ comentariosCount[noticia.id] || 0 }} comentarios
</p>

</div>

</div>

</div>

</div>

</div>

</div>

</template>

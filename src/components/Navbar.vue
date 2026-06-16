<script setup lang="ts">

import { useRouter } from "vue-router"

const router = useRouter()

const irCategoria = (categoria:string) => {

  router.push({
    path: "/",
    query: { categoria }
  })

}

</script>

<template>

<nav class="navbar navbar-expand-lg navbar-dark bg-dark">

<div class="container">

<router-link class="navbar-brand" to="/">
Noticias Maule
</router-link>

<button
class="navbar-toggler"
type="button"
data-bs-toggle="collapse"
data-bs-target="#navbarNav"
>
<span class="navbar-toggler-icon"></span>
</button>

<div class="collapse navbar-collapse" id="navbarNav">

<!-- CATEGORÍAS -->

<ul class="navbar-nav me-auto">

<li class="nav-item">
<a class="nav-link" @click="irCategoria('todas')">
Todas
</a>
</li>

<li class="nav-item">
<a class="nav-link" @click="irCategoria('politica')">
Política
</a>
</li>

<li class="nav-item">
<a class="nav-link" @click="irCategoria('deportes')">
Deportes
</a>
</li>

<li class="nav-item">
<a class="nav-link" @click="irCategoria('tecnologia')">
Tecnología
</a>
</li>

<li class="nav-item">
<a class="nav-link" @click="irCategoria('economia')">
Economía
</a>
</li>

</ul>

<!-- BOTONES DERECHA -->

<div class="d-flex">

<router-link to="/create-news" class="btn btn-warning me-2">
Publicar
</router-link>

<router-link to="/login" class="btn btn-outline-light me-2">
Login
</router-link>

<router-link to="/register" class="btn btn-primary">
Registro
</router-link>

</div>

</div>

</div>

</nav>

</template>
<script setup lang="ts">

import { ref } from "vue"
import { db } from "../firebase"
import { collection, addDoc, Timestamp } from "firebase/firestore"
import { useRouter } from "vue-router"

const router = useRouter()

const title = ref("")
const content = ref("")
const image = ref("")
const categoria = ref("politica")

const publicarNoticia = async () => {

  try {

    await addDoc(collection(db,"news"),{

      title: title.value,
      content: content.value,
      image: image.value,
      categoria: categoria.value,
      createdAt: Timestamp.now()

    })

    router.push("/")

  } catch(error){

    console.error(error)

  }

}

</script>


<template>

<div class="container mt-5">

<div class="row justify-content-center">

<div class="col-md-8">

<div class="card news-card p-4 shadow">

<h2 class="mb-4 section-title">
Publicar noticia
</h2>

<!-- TITULO -->

<div class="mb-3">

<label class="form-label">
Título
</label>

<input
v-model="title"
type="text"
class="form-control"
/>

</div>

<!-- CATEGORIA -->

<div class="mb-3">

<label class="form-label">
Categoría
</label>

<select
v-model="categoria"
class="form-control"
>

<option value="politica">Política</option>
<option value="deportes">Deportes</option>
<option value="tecnologia">Tecnología</option>
<option value="economia">Economía</option>

</select>

</div>

<!-- CONTENIDO -->

<div class="mb-3">

<label class="form-label">
Contenido
</label>

<textarea
v-model="content"
rows="6"
class="form-control"
></textarea>

</div>

<!-- IMAGEN -->

<div class="mb-3">

<label class="form-label">
URL Imagen
</label>

<input
v-model="image"
type="text"
class="form-control"
/>

</div>

<button
class="btn btn-warning"
@click="publicarNoticia"
>

Publicar noticia

</button>

</div>

</div>

</div>

</div>

</template>
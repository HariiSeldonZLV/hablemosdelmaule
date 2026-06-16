<template>
  <v-card>
    <v-img
      src="https://picsum.photos/400/200"
      height="200"
    ></v-img>

    <v-card-title>
      Título de la noticia
    </v-card-title>

    <v-card-text>
      Breve descripción de la noticia.
    </v-card-text>

    <v-card-actions>
      <v-btn
        color="primary"
        :to="'/news/1'"
      >
        Leer más
      </v-btn>
    </v-card-actions>

  </v-card>
</template>
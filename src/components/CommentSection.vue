<template>
  <v-card class="mt-6">

    <v-card-title>
      Comentarios
    </v-card-title>

    <v-card-text>

      <v-textarea
        label="Escribe un comentario"
      />

      <v-btn
        color="primary"
        class="mt-2"
      >
        Comentar
      </v-btn>

      <v-divider class="my-4" />

      <div
        v-for="n in 3"
        :key="n"
      >
        <p><strong>Usuario</strong></p>
        <p>Este es un comentario de ejemplo.</p>
      </div>

    </v-card-text>

  </v-card>
</template>
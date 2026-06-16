<script setup lang="ts">

import { ref } from "vue"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth, db } from "../firebase"
import { doc, setDoc } from "firebase/firestore"
import { useRouter } from "vue-router"

const email = ref("")
const password = ref("")

const router = useRouter()

const register = async () => {

  try {

    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email.value,
      password.value
    )

    const user = userCredential.user

    // Guardar usuario en Firestore
    await setDoc(doc(db, "users", user.uid), {

      uid: user.uid,
      email: user.email,
      createdAt: new Date()

    })

    alert("Usuario creado correctamente")

    router.push("/login")

  } catch (error) {

    console.error(error)

    alert("Error al registrar usuario")

  }

}

</script>

<template>

<v-container>

<h1 class="text-h4 mb-6">Registro</h1>

<v-text-field
label="Email"
v-model="email"
/>

<v-text-field
label="Password"
type="password"
v-model="password"
/>

<v-btn
color="primary"
class="mt-4"
@click="register"
>
Crear cuenta
</v-btn>

</v-container>

</template>
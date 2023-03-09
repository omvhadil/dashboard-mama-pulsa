<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { useAuthStore } from "../stores";
import * as Yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";

// schema Yup
const schema = Yup.object().shape({
  email: Yup.string()
    .required("Email tidak boleh kosong")
    .typeError("Email tidak boleh kosong"),
  password: Yup.string()
    .required("Password tidak boleh kosong")
    .typeError("Password tidak boleh kosong"),
});

const onSubmit = (values) => {
  const sendData = {
    email: values.email,
    password: values.password,
  };
  useAuthStore().PostLogin(sendData);
};
</script>
<template>
  <section class="login">
    <div class="row m-0 d-flex align-items-center" style="height: 100vh">
      <div class="col-11 col-sm-9 col-md-7 col-lg-6 col-xl-5 mx-auto">
        <div class="shadow-lg border rounded-3 p-4 bg-white">
          <h3 class="text-dark mb-5">Login</h3>
          <Form
            @submit="onSubmit"
            :validation-schema="schema"
            v-slot="{ errors }"
          >
            <div class="mb-3">
              <h6 for="email" class="form-label">Email Address</h6>
              <Field
                name="email"
                type="email"
                class="form-control"
                :class="{ 'is-invalid': errors.email }"
                id="email"
                aria-placeholder="Email Address"
              />
              <ErrorMessage name="email" class="invalid-feedback" />
              <div id="emailHelp" class="form-text">
                We'll never share your email with anyone else.
              </div>
            </div>
            <div class="mb-3">
              <h6 for="password" class="form-label">Password</h6>
              <Field
                name="password"
                type="password"
                class="form-control"
                :class="{ 'is-invalid': errors.password }"
                id="password"
                aria-placeholder="Password"
              />
              <ErrorMessage name="password" class="invalid-feedback" />
            </div>
            <div class="mb-3 form-check">
              <input
                type="checkbox"
                class="form-check-input"
                id="exampleCheck1"
              />
              <label class="form-check-label" for="exampleCheck1"
                >Check me out</label
              >
            </div>
            <button type="submit" class="btn btn-success mt-3">Sign In</button>
          </Form>
        </div>
      </div>
    </div>
  </section>
</template>
<style scoped></style>

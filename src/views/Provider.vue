<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { ref, onMounted, reactive } from "vue";
import Modal from "../components/Modal.vue";
import { useProviderStore } from "../stores/useProvider";

const showModal = ref();
const showModalEdit = ref();

const data = reactive({
  provider: "",
  providerEdit: "",
  activeEdit: "",
  providerId: null,
});

// ====== Tambah Profider
const addProvider = () => {
  const form = {
    name: data.provider,
    active: "y",
  };
  useProviderStore()
    .PostProvider(form)
    .then(() => {
      showModal.value = false;
      useProviderStore().getProvider();
      data.provider = null;
    });
};

// ====== Get detail Provider
const change = (id) => {
  showModalEdit.value = true;
  data.providerId = id;
  useProviderStore().showProvider(id);
};

// ====== Edit provider
const updateProvider = async () => {
  const form = {
    name: data.providerEdit,
    active: data.activeEdit,
  };
  const id = data.providerId;
  await useProviderStore()
    .PutProvider(id, form)
    .then(() => {
      showModalEdit.value = false;
      useProviderStore().getProvider();
      data.providerEdit = null;
      data.activeEdit = null;
    });
};

// ====== Hapus provider
const del = (id) => {
  useProviderStore().delProvider(id);
};

// ====== Style status provider
const onStatus = (status) => {
  switch (status) {
    case "y":
      return "badge text-bg-success";
    case "n":
      return "badge text-bg-danger";
    default:
      return "badge text-bg-dark";
  }
};

onMounted(() => {
  useProviderStore().getProvider();
});
</script>
<template>
  <h3 class="text-success mb-4">Provider</h3>
  <div class="row">
    <div class="col-xl-12 col-12">
      <div class="card h-100 card-lg border-0">
        <div class="p-4">
          <div class="row justify-content-between">
            <div class="col-2">
              <button
                @click="showModal = true"
                class="btn btn-success d-flex align-items-center"
              >
                <i class="ri-add-line me-2"></i>Tambah
              </button>
            </div>
            <div class="col-7 col-xl-3">
              <form action="" class="d-flex">
                <input
                  type="search"
                  class="form-control"
                  placeholder="Search"
                />
              </form>
            </div>
          </div>
        </div>
        <div class="card-body">
          <div class="table-responsive">
            <table
              class="table table-centered table-hover text-nowrap table-borderless mb-0 table-with-checkbox"
            >
              <thead class="bg-light">
                <tr>
                  <th scope="col-1">No</th>
                  <!-- <th scope="col-1">Image</th> -->
                  <th scope="col-6">Provider</th>
                  <th scope="col-3">status</th>
                  <th scope="col-1">Aksi</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(items, index) in useProviderStore().provider"
                  :key="items.id"
                >
                  <th scope="row">{{ index + 1 }}</th>
                  <!-- <td><img :src="items.image" style="height: 30px" /></td> -->
                  <td>{{ items.name }}</td>
                  <td>
                    <span :class="onStatus(items.avtive)">{{
                      items.active
                    }}</span>
                  </td>
                  <td class="d-flex gap-1">
                    <button @click="change(items.id)" class="btn btn-primary">
                      <i class="ri-edit-2-line"></i>
                    </button>
                    <button @click="del(items.id)" class="btn btn-danger">
                      <i class="ri-delete-bin-6-line"></i>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- Modal post -->
  <Teleport to="body">
    <Modal :show="showModal" @close="showModal = false">
      <template #body>
        <h2 class="text-dark mb-4">Tambah Provider</h2>
        <form @submit.prevent="addProvider">
          <div class="mb-3">
            <label for="provider" class="form-label text-secondary"
              >Provider</label
            >
            <input
              type="text"
              v-model="data.provider"
              class="form-control"
              id="provider"
            />
          </div>
          <button type="submit" class="btn btn-success">Submit</button>
        </form>
      </template>
    </Modal>
  </Teleport>
  <!-- Modal put -->
  <Teleport to="body">
    <Modal :show="showModalEdit" @close="showModalEdit = false">
      <template #body>
        <h2 class="text-dark mb-4">Edit Provider</h2>
        <form @submit.prevent="updateProvider">
          <div class="mb-3">
            <label for="provider" class="form-label text-secondary"
              >Provider</label
            >
            <input
              type="text"
              v-model="data.providerEdit"
              class="form-control"
              id="provider"
            />
          </div>
          <div class="mb-3">
            <div class="form-check form-check-inline">
              <input
                class="form-check-input"
                type="radio"
                name="y"
                id="y"
                value="y"
                v-model="data.activeEdit"
              />
              <label class="form-check-label" for="y">Y</label>
            </div>
            <div class="form-check form-check-inline">
              <input
                class="form-check-input"
                type="radio"
                name="n"
                id="n"
                value="n"
                v-model="data.activeEdit"
              />
              <label class="form-check-label" for="n">N</label>
            </div>
          </div>
          <button type="submit" class="btn btn-success">Submit</button>
        </form>
      </template>
    </Modal>
  </Teleport>
</template>

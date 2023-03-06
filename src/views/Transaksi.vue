<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { ref, reactive, onMounted, watch } from "vue";
import Modal from "../components/Modal.vue";
import { useProviderStore, useTransaksiStore } from "../stores";
import Swal from "sweetalert2";
import { debounce } from "lodash";
// import { Textsearch } from "../stores/search.js";

const form = reactive({
  search: "",
  idDetail: null,
  provider_id: "",
  no_hp: "",
  nominal: "",
  catatan: "",
  status: "",
  edit_provider_id: "",
  edit_no_hp: "",
  edit_nominal: "",
  edit_catatan: "",
  edit_status: "pending",
});

const showModal = ref();
const showModalPut = ref();
const formatForm = () => {
  form.provider_id = null;
  form.no_hp = null;
  form.nominal = null;
  form.catatan = null;
  form.status = null;
};
const onStatus = (status) => {
  switch (status) {
    case "pending":
      return "badge text-warning-emphasis bg-warning-subtle";
    case "success":
      return "badge text-success-emphasis bg-success-subtle";
    case "failed":
      return "badge text-danger-emphasis bg-danger-subtle";
    default:
      return "badge text-bg-dark";
  }
};
// tambah transaksi
const addTransaksi = () => {
  useTransaksiStore()
    .postTransaksi(form)
    .then(() => {
      showModal.value = false;
      formatForm();
      useTransaksiStore().getTransaksi();
    });
};
// delete transaksi
const deleteTransaksi = (id) => {
  Swal.fire({
    title: "Apakah kamu yakin?",
    text: "Anda tidak akan dapat mengembalikan ini!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Ya, Hapus!",
  }).then((result) => {
    if (result.isConfirmed) {
      useTransaksiStore().delTransaksi(id);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Data berhasil dihapus",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  });
};
// show transaksi
const showTransaksi = (id) => {
  useTransaksiStore()
    .showTransaksi(id)
    .then(({ data }) => {
      form.edit_provider_id = data.provider_id;
      form.edit_no_hp = data.no_hp;
      form.edit_nominal = data.nominal;
      form.edit_catatan = data.catatan;
      form.edit_status = data.status;
      showModalPut.value = true;
      form.idDetail = id;
    });
};
// put transaksi
const editTransaksi = () => {
  const id = form.idDetail;
  const formPut = {
    provider_id: form.edit_provider_id,
    no_hp: form.edit_no_hp,
    nominal: form.edit_nominal,
    catatan: form.edit_catatan,
    status: form.edit_status,
  };
  useTransaksiStore()
    .putTransaksi(id, formPut)
    .then(() => {
      showModalPut.value = false;
      useTransaksiStore().getTransaksi();
      formatForm();
    });
};
// search transaksi
const delaySearch = debounce((e) => {
  form.search = e.target.value;
}, 500);
// watchEffect(() => {
//   useTransaksiStore().getTransaksi(form.search);
// });
watch(
  () => form.search,
  (val) => {
    useTransaksiStore().getTransaksi(val);
  }
);

onMounted(() => {
  useTransaksiStore().getTransaksi();
  useProviderStore().getProvider();
});
</script>
<template>
  <div>
    <h3 class="text-success mb-4">Transaksi</h3>
    <!-- {{ useTransaksiStore().searchTransaksi }} -->
    <div class="row">
      <div class="col-xl-12 col-12">
        <div class="card h-100 card-lg border-light">
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
              <div class="col-7 col-lg-3">
                <form action="" class="d-flex">
                  <input
                    type="search"
                    class="form-control"
                    placeholder="Search"
                    @input="delaySearch"
                  />
                </form>
              </div>
            </div>
          </div>
          <div class="card-body">
            <div class="table-responsive">
              <table
                class="table table-hover text-nowrap table-borderless mb-0 table-with-checkbox"
              >
                <thead class="bg-light">
                  <tr>
                    <th scope="col-1">No</th>
                    <th scope="col-1">Provider</th>
                    <th scope="col-3">No Hp</th>
                    <th scope="col-2">Nominal</th>
                    <th scope="col-1">Catatan</th>
                    <th scope="col-3">Status</th>
                    <th scope="col-1">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(item, index) in useTransaksiStore().allTransaksi"
                    :key="item.id"
                    @dblclick="showTransaksi(item.id)"
                  >
                    <th scope="row">{{ index + 1 }}</th>
                    <td>{{ item.provider_name }}</td>
                    <td>{{ item.no_hp }}</td>
                    <td>{{ item.nominal }}</td>
                    <td>{{ item.catatan }}</td>
                    <td>
                      <span :class="onStatus(item.status)">{{
                        item.status
                      }}</span>
                    </td>
                    <td class="d-flex gap-1">
                      <button
                        @click="deleteTransaksi(item.id)"
                        class="btn btn-danger btn-sm"
                      >
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

    <!-- Modal -->
    <Teleport to="body">
      <Modal :show="showModal" @close="showModal = false">
        <template #body>
          <h2 class="text-dark mb-4">Tambah Transaksi</h2>
          <form @submit.prevent="addTransaksi">
            <div class="mb-3">
              <label for="provider" class="form-label text-secondary"
                >Provider</label
              >
              <select
                v-model="form.provider_id"
                class="form-select"
                aria-label="Default select example"
              >
                <option class="text-secondary" value>
                  Open this select Provider
                </option>
                <option
                  v-for="item in useProviderStore().provider"
                  :key="item.id"
                  :value="item.id"
                >
                  {{ item.name }}
                </option>
              </select>
            </div>
            <div class="mb-3">
              <label for="provider" class="form-label text-secondary"
                >No Telephone</label
              >
              <input
                v-model="form.no_hp"
                type="number"
                class="form-control"
                id="provider"
              />
            </div>
            <div class="mb-3">
              <label for="provider" class="form-label text-secondary"
                >Nominal</label
              >
              <input
                v-model="form.nominal"
                type="number"
                class="form-control"
                id="provider"
              />
            </div>
            <div class="mb-3">
              <label for="provider" class="form-label text-secondary"
                >Catatan</label
              >
              <textarea
                v-model="form.catatan"
                class="form-control"
                id="exampleFormControlTextarea1"
                rows="3"
              ></textarea>
            </div>
            <button type="submit" class="btn btn-success">Submit</button>
          </form>
        </template>
      </Modal>
    </Teleport>
    <!-- modal put -->
    <Teleport to="body">
      <Modal :show="showModalPut" @close="showModalPut = false">
        <template #body>
          <h2 class="text-dark mb-4">Tambah Transaksi</h2>
          <form @submit.prevent="editTransaksi">
            <div class="mb-3">
              <label for="provider" class="form-label text-secondary"
                >Provider</label
              >
              <select
                v-model="form.edit_provider_id"
                class="form-select"
                aria-label="Default select example"
              >
                <option class="text-secondary" value>
                  Open this select Provider
                </option>
                <option
                  v-for="item in useProviderStore().provider"
                  :key="item.id"
                  :value="item.id"
                >
                  {{ item.name }}
                </option>
              </select>
            </div>
            <div class="mb-3">
              <label for="provider" class="form-label text-secondary"
                >No Telephone</label
              >
              <input
                v-model="form.edit_no_hp"
                type="number"
                class="form-control"
                id="provider"
              />
            </div>
            <div class="mb-3">
              <label for="provider" class="form-label text-secondary"
                >Nominal</label
              >
              <input
                v-model="form.edit_nominal"
                type="number"
                class="form-control"
                id="provider"
              />
            </div>
            <div class="mb-3">
              <label for="provider" class="form-label text-secondary"
                >Catatan</label
              >
              <textarea
                v-model="form.edit_catatan"
                class="form-control"
                id="exampleFormControlTextarea1"
                rows="3"
              ></textarea>
            </div>
            <label for="status" class="form-label text-secondary">Status</label>
            <div class="d-flex mb-3">
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="radio"
                  name="inlineRadioOptions"
                  id="failed"
                  value="failed"
                  v-model="form.edit_status"
                />
                <label class="form-check-label" for="failed">Failed</label>
              </div>
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="radio"
                  name="inlineRadioOptions"
                  id="pending"
                  value="pending"
                  v-model="form.edit_status"
                />
                <label class="form-check-label" for="pending">Pending</label>
              </div>
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="radio"
                  name="inlineRadioOptions"
                  id="success"
                  value="success"
                  v-model="form.edit_status"
                />
                <label class="form-check-label" for="success">Success</label>
              </div>
            </div>
            <button type="submit" class="btn btn-success">Submit</button>
          </form>
        </template>
      </Modal>
    </Teleport>
  </div>
</template>

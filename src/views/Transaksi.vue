<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { ref, reactive, onMounted, watch } from "vue";
import Modal from "../components/Modal.vue";
import { useProviderStore, useTransaksiStore } from "../stores";
import Swal from "sweetalert2";
import { debounce } from "lodash";

const showModal = ref();
const showModalPut = ref();
const data = reactive({
  query: {
    search: "",
    page: 1,
    per_page: 10,
  },
  formAdd: {
    provider_id: "",
    no_hp: "",
    nominal: "",
    catatan: "",
    status: "pending",
  },
  formEdit: {
    edit_provider_id: "",
    edit_no_hp: "",
    edit_nominal: "",
    edit_catatan: "",
    edit_status: "",
  },
  idDetail: null,
});
// fromat form
const formatForm = () => {
  data.formAdd.provider_id = null;
  data.formAdd.no_hp = null;
  data.formAdd.nominal = null;
  data.formAdd.catatan = null;
  data.formAdd.status = null;
};
// pagination
const paginate = (item) => {
  data.query.page = item;
};
// styling status
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
    .postTransaksi(data.formAdd)
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
      data.formEdit.edit_provider_id = data.provider_id;
      data.formEdit.edit_no_hp = data.no_hp;
      data.formEdit.edit_nominal = data.nominal;
      data.formEdit.edit_catatan = data.catatan;
      data.formEdit.edit_status = data.status;
      data.formEdit.idDetail = id;
      showModalPut.value = true;
    });
};
// put transaksi
const editTransaksi = () => {
  const id = data.idDetail;
  const formPut = {
    provider_id: data.formEdit.edit_provider_id,
    no_hp: data.formEdit.edit_no_hp,
    nominal: data.formEdit.edit_nominal,
    catatan: data.formEdit.edit_catatan,
    status: data.formEdit.edit_status,
  };
  useTransaksiStore()
    .putTransaksi(id, formPut)
    .then(() => {
      showModalPut.value = false;
      useTransaksiStore().getTransaksi();
      formatForm();
    });
};
// debounce search
const delaySearch = debounce((e) => {
  data.query.search = e.target.value;
}, 500);
// watch
watch(
  () => data.query.search || data.query.page || data.query.perPage,
  () => {
    useTransaksiStore().getTransaksi(data.query);
  }
);
onMounted(() => {
  useTransaksiStore().getTransaksi();
  useProviderStore().getProvider();
});
</script>
<template>
  <div class="px-xl-3 px-0">
    <!-- ==== Modal Tambah ==== -->
    <div class="row mb-4 mt-xl-3">
      <div class="col-6 col-xl-6 d-flex align-items-center">
        <h3 class="text-success">Transaksi</h3>
      </div>
      <div class="col-6 col-xl-6">
        <button
          @click="showModal = true"
          class="btn btn-success d-flex align-items-center ms-auto"
        >
          <i class="ri-add-line me-2"></i>Add Transaksi
        </button>
      </div>
    </div>
    <!-- ==== container Table ==== -->
    <div class="row">
      <div class="col-xl-12 col-12">
        <div class="card h-100 card-lg border-light">
          <div class="p-4">
            <div class="row row-gap-2 justify-content-between">
              <!-- ==== Searching ====  -->
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
              <!-- ==== Filter ==== -->
              <div class="col-7 col-xl-2 ms-xl-auto">
                <select class="form-select" aria-label="Default select example">
                  <option selected>Provider</option>
                  <option value="1">Telkomsel</option>
                  <option value="2">Im3</option>
                  <option value="3">Xl</option>
                </select>
              </div>
              <div class="col-7 col-xl-2">
                <select class="form-select" aria-label="Default select example">
                  <option selected>Status</option>
                  <option value="1">success</option>
                  <option value="2">failed</option>
                  <option value="3">pending</option>
                </select>
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
                    v-for="(item, index) in useTransaksiStore().allTransaksi
                      .data"
                    :key="item.id"
                    @dblclick="showTransaksi(item.id)"
                    role="button"
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
          <!-- ==== pagination ==== -->
          <nav aria-label="Page navigation example">
            <ul class="pagination justify-content-center">
              <li class="page-item">
                <a
                  class="page-link text-success"
                  href="#"
                  aria-label="Previous"
                >
                  <span aria-hidden="true">&laquo;</span>
                </a>
              </li>
              <li
                v-for="(itm, idx) in useTransaksiStore().allTransaksi
                  .total_page"
                :key="idx"
                class="page-item"
              >
                <a
                  class="page-link text-success"
                  @click="paginate(itm)"
                  href="#"
                  >{{ itm }}</a
                >
              </li>
              <li class="page-item">
                <a class="page-link text-success" href="#" aria-label="Next">
                  <span aria-hidden="true">&raquo;</span>
                </a>
              </li>
            </ul>
          </nav>
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

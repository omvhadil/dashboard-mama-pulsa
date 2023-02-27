<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { ref, onMounted } from "vue";
import Modal from "../components/Modal.vue";
import { useTransaksiStore } from "../stores";
const showModal = ref();

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

onMounted(() => {
  useTransaksiStore().getTransaksi();
});
</script>
<template>
  <div>
    <h3 class="text-success mb-4">Transaksi</h3>
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
                      <button class="btn btn-primary">
                        <i class="ri-edit-2-line"></i>
                      </button>
                      <button class="btn btn-danger">
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
          <form>
            <div class="mb-3">
              <label for="provider" class="form-label text-secondary"
                >Provider</label
              >
              <select class="form-select" aria-label="Default select example">
                <option selected class="text-secondary">
                  Open this select Provider
                </option>
                <option value="1">Telkomsel</option>
                <option value="2">Im3</option>
                <option value="3">3</option>
              </select>
            </div>
            <div class="mb-3">
              <label for="provider" class="form-label text-secondary"
                >No Telephone</label
              >
              <input type="number" class="form-control" id="provider" />
            </div>
            <div class="mb-3">
              <label for="provider" class="form-label text-secondary"
                >Nominal</label
              >
              <input type="number" class="form-control" id="provider" />
            </div>
            <div class="mb-3">
              <label for="provider" class="form-label text-secondary"
                >Catatan</label
              >
              <textarea
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
  </div>
</template>

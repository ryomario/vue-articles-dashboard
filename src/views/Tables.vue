<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-12">
        <articles-table />
      </div>
    </div>
    <div class="mt-4 row" v-if="false">
      <div class="col-12">
        <projects-table />
      </div>
    </div>
  </div>
</template>

<script>
import ArticlesTable from "./components/ArticlesTable.vue";
import ProjectsTable from "./components/ProjectsTable.vue";

import d$auth from '@/store/auth.d';
import { mapState } from "pinia";

export default {
  name: "tables",
  components: {
    ProjectsTable,
    ArticlesTable
  },
  data() {
    return {
      stats: {
        titleColor: "opacity-7 text-white",
        descColor: "text-white",
        trip: {
          title: "Today's Trip",
          desc: "145 KM",
          classIcon: "text-dark ni ni-money-coins",
        },
        health: {
          title: "Battery Health",
          desc: "99 %",
          classIcon: "text-dark ni ni-controller ",
        },
        speed: {
          title: "Average Speed",
          desc: "56 Km/h",
          classIcon: "text-dark ni ni-delivery-fast",
        },
        volume: {
          title: "Music Volume",
          desc: "15/100",
          classIcon: "text-dark ni ni-note-03",
        },
      },
    };
  },
  computed: {
    ...mapState(d$auth, ['g$user']),
  },
  mounted() {
    if (this.g$user == undefined) {
      // console.error('App Updates',error)
      this.$router.replace('/signin')
    }
  },
};
</script>

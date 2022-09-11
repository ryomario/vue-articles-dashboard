<template>
  <div class="card">
    <div class="card-header pb-0">
      <h6>Articles table</h6>
    </div>
    <div class="card-body px-0 pt-0 pb-2">
      <div class="table-responsive p-0">
        <table class="table align-items-center mb-0">
          <thead>
            <tr>
              <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Article</th>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
              >Author</th>
              <th
                class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >Comments</th>
              <th
                class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >Created</th>
              <th
                class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >Changed</th>
              <!-- <th class="text-secondary opacity-7"></th> -->
            </tr>
          </thead>
          <tbody class="position-relative">
            <tr v-for="article in g$articles" :key="article.id">
              <td>
                <div class="d-flex px-2 py-1">
                  <div>
                    <img
                      src="@/assets/img/illustrations/rocket-white.png"
                      class="avatar avatar-sm me-3"
                      alt="article1"
                    />
                  </div>
                  <div class="d-flex flex-column justify-content-center" style="width: 70%; max-width: 300px">
                    <h6 class="mb-0 text-sm text-truncate">{{article.title}}</h6>
                    <p class="text-xs text-secondary text-truncate mb-0" >{{article.summary}}</p>
                  </div>
                </div>
              </td>
              <td>
                <p class="text-xs font-weight-bold mb-0">{{article.user.name}}</p>
                <p class="text-xs text-secondary mb-0">{{article.user.username}}</p>
              </td>
              <td class="align-middle text-center text-sm">
                <span class="badge badge bg-gradient-success">{{article.comment.length}}</span>
              </td>
              <td class="align-middle text-center">
                <span class="text-secondary text-xs font-weight-bold">{{dateFormat(article.created_at)}}</span>
              </td>
              <td class="align-middle text-center">
                <span class="text-secondary text-xs font-weight-bold">{{dateFormat(article.updated_at)}}</span>
              </td>
              <!-- <td class="align-middle">
                <a
                  href="javascript:;"
                  class="text-secondary font-weight-bold text-xs"
                  data-toggle="tooltip"
                  data-original-title="Edit user"
                >Edit</a>
              </td> -->
            </tr>
            <vue-loading 
              :active="isLoading"
              :can-cancel="false" 
              :is-full-page="false" 
              :lock-scroll="false"
              :background-color="this.$store.state.darkMode?'var(--bs-dark)':'var(--bs-light)'"/>
            <tr>
              <td colspan="5">
                <div class="w-sm-40 mx-auto" v-if="!isLoading && g$articles.length === 0">
                  <argon-alert color="warning" icon="ni ni-basket ni-lg" >
                    <strong>Empty table</strong>
                  </argon-alert>
                </div>
                <div class="w-md-70 mx-auto" v-if="alert">
                  <argon-alert :color="alert.type" icon="ni ni-bell-55 ni-lg" >
                    <strong>{{alert.name}}</strong>
                    <hr>
                    {{alert.message}}
                  </argon-alert>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import VueLoading from 'vue-loading-overlay';
import ArgonAlert from "@/components/ArgonAlert.vue";

import d$article from '@/store/article.d';
import { mapActions, mapState } from 'pinia';

import { format } from 'date-fns';

export default {
  name: "articles-table",
  data: () => ({
    isLoading: false,
    alert: undefined,
  }),
  components:{
    VueLoading,
    ArgonAlert,
  },
  computed: {
    ...mapState(d$article,['g$articles']),
  },
  methods: {
    ...mapActions(d$article,['a$fetchArticles']),
    async fetchArticles() {
      this.isLoading = true
      try {
        await this.a$fetchArticles()
        // berhasil
        // console.log('dt',this.g$articles)
        this.alert = undefined
      } catch (error) {
        this.alert = {
          type: 'danger',
          name: error?.name ?? 'Error',
          message: error?.message ?? 'Unknown'
        }
      } finally {
        this.isLoading = false
      }
    },
    dateFormat(date){
      return format(date,'dd/MM/yy - HH:mm')
    },
  },
  mounted() {
    this.fetchArticles()
  }
};
</script>

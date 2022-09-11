import { defineStore } from 'pinia';
import * as sv$auth from '@/services/auth';
import { s$certCookies, g$certUserCookies, d$certCookies } from '@/utils/cookies';

import { parseISO } from 'date-fns';

export default defineStore({
  id: 'auth',
  state: () => ({
    user: undefined
  }),
  actions: {
    async a$setUser() {
      try {
        const { 
            id, 
            username,
        } = g$certUserCookies();
        this.user = {
          id,
          username
        }
        return 'User Authenticated!';
      } catch (error ) {
        this.user = undefined;
        // console.log('err',error)
        throw error;
      }
    },
    async a$login(body) {
      try {
        const { data } = await sv$auth.login(body);
        s$certCookies(data.token, { datetime: parseISO(data.expiresAt) });
        await this.a$setUser();
        return true;
      } catch (error) {
        throw error;
      }
    },
    async a$logout() {
      try {
        d$certCookies();
        await this.a$setUser();
        // gagal logout
        return false;
      } catch (error) {
        // Tidak perlu handle karena ini untuk set user undefined dari a$setUser
        // jadi begitulah
        // throw error;
        return true;
      }
    },
    async a$userValidation() {
      try {
        await this.a$setUser();
        // console.log(this.user)
        return true;
      } catch (error) {
        throw error;
      }
    },
  },
  getters: {
    g$user: ({ user }) => user,
  },
})
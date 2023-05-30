import type { Artwork, User } from "./model.types";
import { backendRequest } from "./request";

export default {
  apps: {},
  users: {
    create(user: User) {
      const path = `/admin/users`;
      return backendRequest("POST", path, JSON.stringify(user));
    },
    update(userId: string, update: User) {
      const path = `/admin/users/${userId}`;
      return backendRequest("POST", path, JSON.stringify(update));
    },
    retrieve(userId: string) {
      const path = `/admin/users/${userId}`;
      return backendRequest("GET", path);
    },
    delete(userId: string) {
      const path = `/admin/users/${userId}`;
      return backendRequest("DELETE", path);
    },
  },
  auth: {
    session(refresh?: boolean) {
      const path = `/admin/auth/`;
      if (refresh) {
        return backendRequest("POST", path);
      } else {
        return backendRequest("GET", path);
      }
    },

    login(data: { email: string; password: string }) {
      const path = `/admin/auth/login`;
      return backendRequest("POST", path, JSON.stringify(data));
    },
  },
};

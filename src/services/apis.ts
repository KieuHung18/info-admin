import type { User } from "./model.types";
import { backendRequest } from "./request";

export default {
  apps: {},
  users: {
    create(user: User) {
      const path = `/admin/users`;
      return backendRequest("POST", path, JSON.stringify(user));
    },
    update(userId: number, update: User) {
      const path = `/admin/users/${userId}`;
      return backendRequest("POST", path, update);
    },
    retrieve(userId: number) {
      const path = `/admin/users/${userId}`;
      return backendRequest("GET", path);
    },
    delete(userId: number) {
      const path = `/admin/users/${userId}`;
      return backendRequest("DELETE", path);
    },
  },
  uploads: {
    profile(files: FormData) {
      return backendRequest("POST", "/admin/upload-profile", files, true);
    },
  },
};
import type { ArtworkProps, ProjectProps, UserProps } from "./model.types";
import { backendRequest } from "./request";

export default {
  apps: {},
  users: {
    create(user: UserProps) {
      const path = `/admin/users`;
      return backendRequest("POST", path, JSON.stringify(user));
    },
    update(userId: string, update: UserProps) {
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
    session() {
      const path = `/admin/auth/`;
      return backendRequest("GET", path);
    },

    login(data: { email: string; password: string }) {
      const path = `/admin/auth/login`;
      return backendRequest("POST", path, JSON.stringify(data));
    },
    logout() {
      const path = `/admin/auth/logout`;
      return backendRequest("POST", path);
    },
  },
  artworks: {
    create(artwork: ArtworkProps[]) {
      const path = `/admin/artworks`;
      return backendRequest("POST", path, JSON.stringify(artwork));
    },
    update(artworkId: string, update: ArtworkProps) {
      const path = `/admin/artworks/${artworkId}`;
      return backendRequest("POST", path, JSON.stringify(update));
    },
    retrieve(artworkId: string) {
      const path = `/admin/artworks/${artworkId}`;
      return backendRequest("GET", path);
    },
    delete(artworkId: string) {
      const path = `/admin/artworks/${artworkId}`;
      return backendRequest("DELETE", path);
    },
    list() {
      const path = `/admin/artworks/`;
      return backendRequest("GET", path);
    },
  },
  projects: {
    create(project: ProjectProps) {
      const path = `/admin/projects`;
      return backendRequest("POST", path, JSON.stringify(project));
    },
    update(projectId: string, update: ProjectProps) {
      const path = `/admin/projects/${projectId}`;
      return backendRequest("POST", path, JSON.stringify(update));
    },
    retrieve(projectId: string) {
      const path = `/admin/projects/${projectId}`;
      return backendRequest("GET", path);
    },
    list() {
      const path = `/admin/projects`;
      return backendRequest("GET", path);
    },
    delete(projectId: string) {
      const path = `/admin/projects/${projectId}`;
      return backendRequest("DELETE", path);
    },
  },
  uploads: {
    create(files: FormData) {
      return backendRequest("POST", "/admin/uploads", files, true);
    },
    delete(publicId: string) {
      const path = `/admin/uploads/${publicId}`;
      return backendRequest("DELETE", path);
    },
  },
};

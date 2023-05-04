export interface User {
  id?: string;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  email?: string;
  hashPassword?: string;
  intro?: string;
  title?: string;
  phone?: string;
  address?: string;
  aboutMe?: string;
  description?: string;
  profileUrl?: string;
}
export interface Artwork {
  id: string;
  publicId: string;
  url?: string;
  name?: string;
  feature?: boolean;
  publish?: boolean;
}

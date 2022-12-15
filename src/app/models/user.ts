import { Basket } from "./basket";

interface User {
  displayName: string;
  email: string;
  photoURL?: string;
  basket?: Basket;
  roles?: string[];
}

export default User;

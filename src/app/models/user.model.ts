import {Deserialize} from './deserialize.interface';

export class User implements Deserialize {
  constructor() {}
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  emailVerified: boolean;

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }

}


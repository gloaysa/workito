import {Deserialize} from './deserialize.interface';
import {UserInfo} from 'firebase';

export class UserModel implements Deserialize, UserInfo {
  constructor() {}
  uid: string;
  displayName: string;
  email: string;
  phoneNumber: string;
  photoURL: string;
  providerId: string;
  protected createdAt = new Date();

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }

}


import {Deserialize} from './deserialize.interface';

export class ProjectModel implements Deserialize {
  constructor(id, uid, name) {
    this.id = id;
    this.uid = uid;
    this.name = name;
    this.createdAt = new Date().toString();
  }
  id: string;
  uid: string;
  createdAt: string;
  name: string;
  status: string;
  totalTime: string;


  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }

}

import {Deserialize} from './deserialize.interface';

export class ProjectModel implements Deserialize {
  constructor(id, uid, name) {
    this.id = id;
    this.uid = uid;
    this.name = name;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
  id: string;
  uid: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  status: string;
  totalTime: string;


  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }

}

import {Deserialize} from './deserialize.interface';

export class ProjectModel implements Deserialize {
  id: string;
  createdAt: string;
  name: string;
  status: string;
  totalTime: string;


  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }

}

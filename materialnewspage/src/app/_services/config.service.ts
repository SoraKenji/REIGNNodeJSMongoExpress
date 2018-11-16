import { Injectable } from '@angular/core';
import { Host } from '../_class';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  // constructor() { }
  public host: Host = new Host('api');
}

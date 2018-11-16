import { ToastrService } from 'ngx-toastr';
import { timeout } from '../../../node_modules/@types/q';

export enum ToasterPosition {
  topRight = 'toast-top-right',
  topLeft = 'toast-top-left',
  bottomRight = 'toast-bottom-right',
  bottomLeft = 'toast-bottom-left',
}

export class ToasterClass {
  constructor(private toastr: ToastrService) { }

  public error(title: string, message: string, positionClass: ToasterPosition) {
    this.toastr.error(message, title, { positionClass });
  }
  public success(title: string, message: string, positionClass: ToasterPosition) {
    this.toastr.success(message, title, { positionClass });
  }
  public info(title: string, message: string, positionClass: ToasterPosition) {
    this.toastr.info(message, title, { positionClass });
  }
}

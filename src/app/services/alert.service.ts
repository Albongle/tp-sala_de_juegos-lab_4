import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  public showAlert({
    icon,
    message,
  }: {
    icon: SweetAlertIcon;
    message: string;
  }) {
    Swal.fire({
      position: 'center',
      icon: icon,
      title: message,
      showConfirmButton: false,
      timer: 3000,
    });
  }
}

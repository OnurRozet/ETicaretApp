import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SwalService {

  constructor() { }

  canSwal(text:string, title:string, btnName:string,callBack:() => void){
    Swal.fire({
      text:text,
      title: title,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: btnName,
      cancelButtonText: "Vazgeç",
    }).then((res)=> {
      if(res.isConfirmed) {
        callBack();
      }
    })
  }
}

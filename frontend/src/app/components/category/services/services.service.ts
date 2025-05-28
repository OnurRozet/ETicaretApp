import { Injectable } from '@angular/core';
import { GenericHttpService } from '../../../services/generic-http.service';
import { CategoryModel } from '../models/category.model';
import { CategoryResponseModel } from '../models/category-response.model';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  constructor(private _services:GenericHttpService) { }

  Post(category:CategoryModel,callback: (res: CategoryResponseModel) => void) {
    return this._services.post<CategoryResponseModel>('category/add', category, (res) => {
      callback(res);
    })
  }
  GetAll(callback: (res: CategoryResponseModel[]) => void) {
    return this._services.get<CategoryResponseModel[]>('category/getAllCategory', {}, (res) => {
      callback(res);
    })
  }

  Delete(_id:string,callback: (res:CategoryResponseModel) => void) {
    return this._services.post<CategoryResponseModel>(`category/removeById`, { _id }, (res:CategoryResponseModel) => {
      callback(res);
    });
  }

    update(model: CategoryModel, callBack: (res:CategoryResponseModel)=> void){    
    this._services.post<CategoryResponseModel>("category/updateCategory",model, res=> callBack(res));
  }
}

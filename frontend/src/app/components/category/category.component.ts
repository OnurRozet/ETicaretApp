import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../common/shared/shared.module';
import { NgForm } from '@angular/forms';
import { CategoryModel } from './models/category.model';
import { ServicesService } from './services/services.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { SwalService } from '../../services/swal.service';
import { CategoryPipe } from './pipes/category.pipe';

@Component({
  selector: 'app-category',
  imports: [SharedModule,CategoryPipe],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css',
})
export class CategoryComponent implements OnInit {
  categories: CategoryModel[] = [];
  updateCategory: CategoryModel = new CategoryModel();
  search: string = '';
  constructor(
    private _categoryService: ServicesService,
    private _toastr: ToastrService,
    private _router: Router,
    private _swalService: SwalService,
  ) {}

  ngOnInit(): void {
    this.getAll();
  }

  addCategory(addCategoryForm: NgForm) {
    if (!addCategoryForm.valid) {
      this._toastr.error('Lütfen tüm alanları doldurun');
      return;
    }

    let model = new CategoryModel();
    model.name = addCategoryForm.value.name;

    this._categoryService.Post(model, () => {
      this._toastr.success('Kategori başarıyla eklendi');
      let element = document.getElementById('addModalCloseBtn');
      element?.click();
      addCategoryForm.resetForm();
      this.getAll();
      this._router.navigate(['/category']);
    });
  }

  update(updateForm: NgForm) {
    if (!updateForm.valid) {
      this._toastr.error('Lütfen tüm alanları doldurun');
      return;
    }

    this._categoryService.update(this.updateCategory, () => {
      this._toastr.success('Kategori başarıyla güncellendi');
      let element = document.getElementById('updateModalCloseBtn');
      element?.click();
      updateForm.resetForm();
      this.getAll();
    });
  }

  getAll() {
    this._categoryService.GetAll((res) => {
      this.categories = res.map((item) => {
        let model = new CategoryModel();
        model._id = item._id ?? '';
        model.name = item.name ?? '';
        return model;
      });
    });
  }

  get(model: CategoryModel) {
    this.updateCategory = { ...model };
  }

  delete(_id: string) {
    this._swalService.canSwal(
      'Bu kategoriyi silmek istediğinize emin misiniz?',"Kategori Sil",
      'Evet, Sil',() => {
        this._categoryService.Delete(_id, () => {
          this._toastr.success('Kategori başarıyla silindi');
          this.getAll();
        });
      });
  }
}

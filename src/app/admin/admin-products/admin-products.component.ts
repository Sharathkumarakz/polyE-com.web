import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from '../../services/admin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrl: './admin-products.component.css'
})
export class AdminProductsComponent implements OnInit{


  private fb = inject(FormBuilder);
  private adminService= inject(AdminService);
  private toster = inject(ToastrService);

  productForm:any;
  mainCategory:any;
  subCategory:any;
  products:any;

  image: File | null = null;

  ngOnInit(): void {
    this.initFormGroup();
    this.getMainCategory();
    this.getProducts();
  }

initFormGroup(): void { 
  this.productForm = this.fb.group({
    name: new FormControl('', [Validators.required]),
    image: new FormControl('', [
      Validators.required
    ]),
    price: new FormControl('',[
      Validators.required,
    ]),
    category: new FormControl('', [
      Validators.required,
    ]),
    subCategory: new FormControl('', [
      Validators.required,
    ]),
    stock: new FormControl('', [
      Validators.required,
    ]),
    description: new FormControl('', [
      Validators.required,
    ]),
    brand:new FormControl('',[Validators.required]), 
  });
}

getSubcategory(){
    this.productForm.controls.subCategory.reset('');
    this.getSubCategories();
}

getProducts(){

 this.adminService.getProducts().subscribe({
   next:(res:any)=>{
      this.products =res.data;  
   },
   error:(err)=>{
       this.toster.warning(err.error.message)
   }
 })
}

onImageSelected(event:Event): void {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files.length > 0) {
    this.image = input.files[0];
  } else {
    this.image = null;
  }
}



 getSubCategories(){
    if(!this.productForm.get('category').value){
      this.subCategory =[];
      return;
    }
   this.adminService.getCategories(this.productForm.get('category').value).subscribe({
     next:(res:any)=>{
        this.subCategory =res.data;  
     },
     error:(err)=>{
         this.toster.warning(err.error.message)
     }
   })
 }

 getMainCategory(){
   this.adminService.getMainCategories().subscribe({
     next:(res:any)=>{
        this.mainCategory =res.data;  
     },
     error:(err)=>{
         this.toster.warning(err.error.message)
     }
   })
 }



addProduct(){
  if (this.productForm.invalid) {
    this.productForm.markAllAsTouched();
    return;
  }
  
  const formData = new FormData();
  let productDetails = this.productForm.getRawValue();
 
   

  if(this.image){
    formData.append('image', this.image, this.image.name);
    formData.append('textFieldName', JSON.stringify(productDetails));
  }
  
  this.adminService.addProduct(formData).subscribe({
    next:(res:any)=>{
      this.toster.success('Product added successfully','Success')
       this.products = res.data;
    },
    error:(err)=>{
        this.toster.warning(err.error.message)
    }
  })
}


deleteProduct(id:string){
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.isConfirmed) {
       this.adminService.deleteProduct(id)
       .subscribe({
        next:(res:any) => {
          Swal.fire(
            'Deleted!',
            'Your product has been deleted.',
            'success'
          )
        this.products= res.data;
      },
      error:(err) => {
        this.toster.warning(err.error.message,'Warning')
      }
     } )
    }
  })
}
}

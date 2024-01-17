import { Component, inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from '../../services/admin.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrl: './admin-category.component.css'
})
export class AdminCategoryComponent {

  private adminService = inject(AdminService);
  private toster = inject(ToastrService);

  subCategory:any[] = [];
  mainCategory:any[] = [];
  isProcessing:boolean=false; 

  categoryForm=new FormGroup({
    category:new FormControl('',[Validators.required]),
    description:new FormControl('',[Validators.required]),
    origin:new FormControl('',[Validators.required]),
  })

  mainCategoryForm=new FormGroup({
    mainCategory:new FormControl('',[Validators.required]),
    mainDescription:new FormControl('',[Validators.required]),
  })


  ngOnInit(): void {
   this.getSubCategories();
   this.getMainCategory();
  }


  getSubCategories(){
    this.adminService.getCategories().subscribe({
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


    //form submission
    addCategory() {
 
      if (this.categoryForm.invalid) {
        return
      } else {
        if(this.isProcessing){
          return;
        }
        this.isProcessing = true;
        this.adminService.addCategory(this.categoryForm.value).pipe(finalize(()=>{
          this.isProcessing = false;;
         }))
        .subscribe({
          next:(res:any) => {
          this.toster.success('Category added','Success')
          this.subCategory= res.data;
  
        },
        error:(err) => {
          this.toster.warning(err.error.message, 'warning')
  
        }}
        )
      }
  
    }



    delete(id:string) {
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
          if(this.isProcessing){
            return;
          }
          this.isProcessing = true;
           this.adminService.deleteCategory(id).pipe(finalize(()=>{
            this.isProcessing = false;
           }))
           .subscribe({
            next:(res:any) => {
              Swal.fire(
                'Deleted!',
                'Your Category has been deleted.',
                'success'
              )
            this.subCategory= res.data;
          },
          error:(err) => {
            this.toster.warning(err.error.message,'Warning')
          }
         } )
        }
      })
    }


    addMainCategory(){
      if (this.mainCategoryForm.invalid) {
        return
      } else {
        if(this.isProcessing){
          return;
        }
        this.adminService.addMainCategory(this.mainCategoryForm.value).pipe(finalize(()=>{
          this.isProcessing = false;;
         }))
        .subscribe({
          next:(res:any) => {
          this.toster.success('Category added','Success')
          this.mainCategory= res.data;
  
        },
        error:(err) => {
          this.toster.warning(err.error.message, 'warning')
        }}
        )
      }
  
    }


    deleteMainCategory(id:string){
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
          if(this.isProcessing){
            return;
          }
          this.isProcessing = true;
           this.adminService.deleteMainCategory(id).pipe(finalize(()=>{
            this.isProcessing = false;;
           }))
           .subscribe({
            next:(res:any) => {
              Swal.fire(
                'Deleted!',
                'Your Category has been deleted.',
                'success'
              )
            this.mainCategory= res.data;
          },
          error:(err) => {
            this.toster.warning(err.error.message,'Warning')
          }
         } )
        }
      })
    }
}


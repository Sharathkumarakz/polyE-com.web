import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SuperAdminService } from '../../services/super-admin.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent {

  private superAdminService = inject(SuperAdminService);
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
    this.superAdminService.getCategories().subscribe({
      next:(res:any)=>{
         this.subCategory =res.data;  
      },
      error:(err)=>{
          this.toster.warning(err.error.message)
      }
    })
  }

  getMainCategory(){
    this.superAdminService.getMainCategories().subscribe({
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
        this.superAdminService.addCategory(this.categoryForm.value).pipe(finalize(()=>{
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
           this.superAdminService.deleteCategory(id).pipe(finalize(()=>{
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
        this.superAdminService.addMainCategory(this.mainCategoryForm.value).pipe(finalize(()=>{
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
           this.superAdminService.deleteMainCategory(id).pipe(finalize(()=>{
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

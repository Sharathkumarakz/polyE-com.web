import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SuperAdminService {

  private http = inject(HttpClient);

  apiUrl = environment.apiUrl;

  /**
   * Api function to get admin requsts
   */
  getAdminRequests(){
    return this.http.get(`${this.apiUrl}/suAdmin/admin-requests`);
  }

   /**
   * Api function to get admin verification
   */
  verifyAdmins(id:string){
    return this.http.get(`${this.apiUrl}/suAdmin/verify-admin/`+id);
  }

  /**
  * Api function to get all active admins
  */
  getAdmins(){
    return this.http.get(`${this.apiUrl}/suAdmin/admins`);
  }

  
   /**
   * Api function to block admin;
   */
   block(id:string){
    return this.http.get(`${this.apiUrl}/suAdmin/admin-block/`+id);
  }

    /**
   * Api function to unblock admin;
   */
  unBlock(id:string){
    return this.http.get(`${this.apiUrl}/suAdmin/admin-unBlock/`+id);
  }


  /**
  * Api function to get sub categories requsts
  */
  getCategories(id?:string){
    return this.http.post(`${this.apiUrl}/suAdmin/categories`,{id:id});
  }

    /**
  * Api function to get main categories requsts
  */
  getMainCategories(){
    return this.http.get(`${this.apiUrl}/suAdmin/main-categories`);
  }


 /**
  * Api function for add category;
  */
  addCategory(data:object){
    return this.http.post(`${this.apiUrl}/suAdmin/add-category`,data);
  }

  
 /**
  * Api function for add main category;
  */
 addMainCategory(data:object){
  return this.http.post(`${this.apiUrl}/suAdmin/add-main-category`,data);
}

/**
* Api function for delete sub category;
*/
deleteCategory(id:string){
  return this.http.get(`${this.apiUrl}/suAdmin/delete-category/`+id);
}

/**
* Api function for delete main category;
*/
deleteMainCategory(id:string){
  return this.http.get(`${this.apiUrl}/suAdmin/delete-main-category/`+id);
}

/**
* Api function for add product
*/
addProduct(data:FormData): Observable<any> {
  return this.http.post<any>(`${this.apiUrl}/suAdmin/add-product`,data);
}

/**
 * Method to get all products
 */
getProducts(){
  return this.http.get(`${this.apiUrl}/suAdmin/products`);
}

/**
 * Method to delete products
 */
deleteProduct(id:string){
  return this.http.get(`${this.apiUrl}/suAdmin/delete-product/`+id);
}
  
}

import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private http = inject(HttpClient);

  apiUrl = environment.apiUrl;

  
/**
 * api Method for geting users
 */
getUsers(){
  return this.http.get(`${this.apiUrl}/admin/users`);
 }

   /**
   * Api function to block user;
   */
  blockUser(id:string){
    return this.http.get(`${this.apiUrl}/admin/user-block/`+id);
  }

    /**
   * Api function to unblock user;
   */
  unblockUser(id:string){
    return this.http.get(`${this.apiUrl}/admin/user-unBlock/`+id);
  }

  /**
 * Method to get all products
 */
getProducts(){
  return this.http.get(`${this.apiUrl}/admin/products`);
}

  /**
  * Api function to get sub categories requsts
  */
  getCategories(id?:string){
    return this.http.post(`${this.apiUrl}/admin/categories`,{id:id});
  }

  
    /**
  * Api function to get main categories requsts
  */
    getMainCategories(){
      return this.http.get(`${this.apiUrl}/admin/main-categories`);
    }

    
/**
* Api function for add product
*/
addProduct(data:FormData): Observable<any> {
  return this.http.post<any>(`${this.apiUrl}/admin/add-product`,data);
}


/**
 * Method to delete products
 */
deleteProduct(id:string){
  return this.http.get(`${this.apiUrl}/admin/delete-product/`+id);
}

 /**
  * Api function for add category;
  */
 addCategory(data:object){
  return this.http.post(`${this.apiUrl}/admin/add-category`,data);
}

/**
* Api function for delete sub category;
*/
deleteCategory(id:string){
  return this.http.get(`${this.apiUrl}/admin/delete-category/`+id);
}

  
 /**
  * Api function for add main category;
  */
 addMainCategory(data:object){
  return this.http.post(`${this.apiUrl}/admin/add-main-category`,data);
}

/**
* Api function for delete main category;
*/
deleteMainCategory(id:string){
  return this.http.get(`${this.apiUrl}/admin/delete-main-category/`+id);
}

/**
 * api Method to get orders
 */
getOrders(){
  return this.http.get(`${this.apiUrl}/admin/orders`);
}

/**
 * api Method to set order status
 */
setOrderStatus(data:object){
  return this.http.post(`${this.apiUrl}/admin/order-status`,data);
}

}

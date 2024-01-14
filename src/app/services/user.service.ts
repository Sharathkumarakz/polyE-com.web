import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private http = inject(HttpClient);

  apiUrl = environment.apiUrl;

  /**
   * Api function to get category
   */
  getCategories(){
    return this.http.get(`${this.apiUrl}/categories`);
  }

    /**
  * Api function to get sub categories requsts
  */
    getSubCategories(id?:string){
      return this.http.post(`${this.apiUrl}/suAdmin/categories`,{id:id});
    }

   /**
  * Api function to get product based on main category
  */
  getProductsByCategory(id?:string){
    return this.http.post(`${this.apiUrl}/product-by-main-category`,{id:id});
  }

     /**
  * Api function to get product based on categories
  */
  getProductsByActualCategories(cat1?:string,cat2?:string){
    return this.http.post(`${this.apiUrl}/product-by-categoryies`,{mainCat:cat1,subCat:cat2});
  }

  /**
  * Api function to add wishlist
  */
  addToWhishList(id?:string){
    return this.http.post(`${this.apiUrl}/add-whishlist`,{id:id});
  }

  /**
  * Api function to get wishlist
  */
  getWishList(){
    return this.http.get(`${this.apiUrl}/whishlist`);
  }

    /**
  * Api function to remove from wishlist
  */
  removeFromWishlist(id:string){
      return this.http.post(`${this.apiUrl}/remove-whishlist`,{id:id});
  }
 /**
  * Method to get product details
  */
  getProductDetails(id:string){
    return this.http.get(`${this.apiUrl}/product-details/`+id);
  }

}
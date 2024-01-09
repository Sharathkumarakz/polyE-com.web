import { Routes } from '@angular/router';

export const routes: Routes = [
    {path: '', loadChildren:() => import('../app/user/user.module').then((m)=>m.UserModule)},
    {path: 'admin', loadChildren:() => import('../app/admin/admin.module').then((m)=>m.AdminModule)},
    {path: 'super-admin', loadChildren:() => import('../app/su-admin/su-admin.module').then((m)=>m.SuAdminModule)},
];

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  ServerUrl = "https://dummyjson.com/users";
  errorData !: {};


  constructor(private http:HttpClient) { }

  get(){
    return this.http.get<User>(this.ServerUrl).pipe(
      catchError(this.handleError)
    )
  }

  getById(id:number){
    return this.http.get<User>(this.ServerUrl+'/'+id).pipe(
      catchError(this.handleError)
    )
  }

  getByKeyword(searchString:string, limit:number, skip:number){
    return this.http.get<User>(this.ServerUrl+'/search?q='+searchString+'&limit='+limit+'&skip='+skip).pipe(
      catchError(this.handleError)
    )
  }
  getPaginationData(limit:number, skip:number){
    return this.http.get<any>(this.ServerUrl+'?limit='+limit+'&skip='+skip).pipe(
      catchError(this.handleError)
    )
  }
  update(id:number, data:any){
    return this.http.put<User>(this.ServerUrl+'/'+id, data).pipe(
      catchError(this.handleError)
    )
  }
  create(data:any){
    return this.http.post<any>(this.ServerUrl, data).pipe(
      catchError(this.handleError)
    )
  }
  delete(id:number){
    return this.http.delete(this.ServerUrl+"/"+id).pipe(
      catchError(this.handleError)
    )
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
    }

    // return an observable with a user-facing error message

    this.errorData = {
      errorTitle: 'Oops! Request for document failed',
      errorDesc: 'Something bad happened. Please try again later.'
    };
    return throwError(this.errorData);
  }
}

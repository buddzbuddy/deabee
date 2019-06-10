import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class DataService {
  
  //private wcfHostURL = 'http://' + location.host + '/DynamicWebService/'//prod
  private wcfHostURL = '/DynamicWebService/'//dev
  private oDataServiceURL = this.wcfHostURL + 'DynamicODataService.svc/'
  private metaServiceURL = this.wcfHostURL + 'DynamicMetadataService.svc/'
  constructor(private http: HttpClient) { }

  postODataResource(entityName: string, data){
    const endpoint = `${this.oDataServiceURL}` + entityName + 's';
    return this.http.post<any>(endpoint, data, httpOptions).pipe(
      tap(datas => this.log(`created OData resource of "${entityName}"`)),
      catchError(this.handleError('postDataToWcf', []))
    );
  }
  putODataResource(entityName: string, data){
    const endpoint = `${this.oDataServiceURL}` + entityName + 's' + `(${data.Id})`;
    return this.http.put<any>(endpoint, data, httpOptions).pipe(
      tap(datas => this.log(`updated OData resource of "${entityName}"`)),
      catchError(this.handleError('putODataResource', []))
    );
  }

  deleteODataResource(entityName: string, Id: number) {
    const endpoint = `${this.oDataServiceURL}` + entityName + 's' + `(${Id})`;
    //const requestUrl = `${endpoint}?$format=json`;//&$orderby=Id desc=${sort}&order=${order}&page=${page + 1}
    return this.http.delete(endpoint, httpOptions).pipe(
      tap(datas => this.log(`deleted "${entityName}" from wcf data`)),
      catchError(this.handleError('deleteODataResource', null))
    );
  }

  getODataResource(entityName: string) {
    const endpoint = `${this.oDataServiceURL}` + entityName;
    const requestUrl = `${endpoint}?$format=json`;//&$orderby=Id desc=${sort}&order=${order}&page=${page + 1}
    return this.http.get(requestUrl, httpOptions).pipe(
      tap(datas => this.log(`getODataResource "${entityName}" from wcf data`)),
      catchError(this.handleError('getODataResource', null))
    );
  }

  getODataResourceItem(entityName: string, itemId: number) {
    const endpoint = `${this.oDataServiceURL}` + entityName + 's(' + itemId + ')';
    const requestUrl = `${endpoint}?$format=json`;
    return this.http.get(requestUrl, httpOptions).pipe(
      tap(datas => this.log(`getODataResourceItem "${entityName}" from wcf data`)),
      catchError(this.handleError('getODataResourceItem', null))
    );
  }

  getODataResources() {
    const endpoint = `${this.oDataServiceURL}`;
    const requestUrl = `${endpoint}`;
    return this.http.get(requestUrl, httpOptions).pipe(
      tap(datas => this.log(`getODataResources from wcf data`)),
      catchError(this.handleError('getListFromWcfData', null))
    );
  }
  getODataMetadata(){
    const endpoint = `${this.oDataServiceURL}`;
    const requestUrl = `${endpoint}$metadata`;
    return this.http.get(requestUrl, {
      ...httpOptions,
      responseType: "text"
    }).pipe(
      tap(datas => this.log(`get metadata from wcf data`)),
      catchError(this.handleError('getODataMetadata', null))
    );
  }
  getDynamicTemplates(){
    const endpoint = `${this.metaServiceURL}`;
    const requestUrl = `${endpoint}DynamicTemplates?$format=json&$filter=IsExist eq 1`;
    return this.http.get(requestUrl, httpOptions).pipe(
      tap(datas => this.log(`getDynamicTemplates from wcf data`)),
      catchError(this.handleError('getDynamicTemplates', null))
    );
  }
  getTemplateById(templateId){
    const endpoint = `${this.metaServiceURL}`;
    const requestUrl = `${endpoint}DynamicTemplates(${templateId})?$format=json`;
    return this.http.get(requestUrl, httpOptions).pipe(
      tap(datas => this.log(`getTemplateById from wcf data`)),
      catchError(this.handleError('getTemplateById', null))
    );
  }
  getFieldsByTemplateId(templateId){
    const endpoint = `${this.metaServiceURL}`;
    const requestUrl = `${endpoint}DynamicFields?$format=json&$filter=TemplateId%20eq%20` + templateId + '%20and%20ElementType%20ne%20%27button%27';
    return this.http.get(requestUrl, httpOptions).pipe(
      tap(datas => this.log(`getFieldsByTemplateId from wcf data`)),
      catchError(this.handleError('getFieldsByTemplateId', null))
    );
  }
  getButtonsByTemplateId(templateId){
    const endpoint = `${this.metaServiceURL}`;
    const requestUrl = `${endpoint}DynamicFields?$format=json&$filter=TemplateId%20eq%20` + templateId + '%20and%20ElementType%20eq%20%27button%27';
    return this.http.get(requestUrl, httpOptions).pipe(
      tap(datas => this.log(`getFieldsByTemplateId from wcf data`)),
      catchError(this.handleError('getFieldsByTemplateId', null))
    );
  }

  getMenuItems(){
    const endpoint = `${this.metaServiceURL}`;
    const requestUrl = `${endpoint}MenuItems/?$expand=MenuItems&$format=json&$filter=ParentMenuItemId eq null`;
    return this.http.get(requestUrl, httpOptions).pipe(
      tap(datas => this.log(`getMenuItems from wcf data`)),
      catchError(this.handleError('getMenuItems', null))
    );
  }
  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    //console.log(message);
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}

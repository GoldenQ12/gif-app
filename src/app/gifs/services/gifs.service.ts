import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  public gifList: Gif[] = [];

  private _tagHistory:string[] = [];
  private serviceUrl:string = 'https://api.giphy.com/v1/gifs';
  private apikey:string = 'J3KuMGO8uGOym3AueIabCb6Jb5HaKu1r';

  constructor(private http: HttpClient) {
    this.loadLocalStorage();
  }

  private saveLocalStorage():void{
    localStorage.setItem('history', JSON.stringify(this._tagHistory));
  }

  private loadLocalStorage():void{
    if (!localStorage.getItem('history')) return;
    this._tagHistory = JSON.parse(localStorage.getItem('history')!);

    if(this._tagHistory.length === 0) return;
    this.searchTag(this._tagHistory[0]);
  }



  private organizeHistory(tag:string){

    tag = tag.toLowerCase();

    if ( this._tagHistory.includes(tag)) {
      this._tagHistory =  this._tagHistory.filter( (oldTag) => oldTag !== tag)
    }

    this._tagHistory.unshift(tag);
    this._tagHistory = this.tagsHistory.splice(0,10);
    this.saveLocalStorage()

  }

  public get tagsHistory() {
    return [...this._tagHistory];
  }

  public async  searchTag(newTag:string):Promise<void>{
    this.organizeHistory(newTag);
    const params = new HttpParams()
      .set('api_key', this.apikey)
      .set('limit', '10')
      .set('q', newTag)
    this.http.get<SearchResponse>(`${this.serviceUrl}/search`, {params}).subscribe (resp =>
    {
      this.gifList = resp.data;

    }

    )

  }
}

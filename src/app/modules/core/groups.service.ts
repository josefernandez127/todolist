import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { IGroup } from './todo.model';

@Injectable({
  providedIn: 'root'
})
export class GroupsService {

  groups: IGroup[] = [
    {id: 1 , name : "Personal"},
    {id: 2 , name : "Trabajo"}
  ]

  constructor(private httpClient: HttpClient) { }

  getAll() {
    return of(this.groups);
  }

  getById(gId: number) {
    return this.groups.find(g => g.id == gId);
  }
}

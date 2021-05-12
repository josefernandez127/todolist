import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'groupBy'
})
export class GroupByPipe implements PipeTransform {

  transform(value: any[], [key, groupName = key, list = "list"]: string[]): any[] {
    var listGrouped = value.reduce(function (rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});


    let returnedList = [];
    for (const groupKey in listGrouped) {
      returnedList.push({ [groupName]: groupKey, [list]: listGrouped[groupKey] });
    }

    return returnedList;
  }

}

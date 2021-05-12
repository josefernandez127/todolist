import { AfterViewInit, Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import { MatInput } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { GroupsService } from '../../core/groups.service';
import { TasksService } from '../../core/tasks.service';
import { IGroup, ITask, ITodoList } from '../../core/todo.model';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-todo-list',
  templateUrl: 'todo-list.component.html',
  styleUrls: ['todo-list.style.scss']
})
export class TodoListComponent implements OnInit {

  @ViewChildren(MatCheckbox) matCheckboxs: QueryList<MatCheckbox> = new QueryList();

  model: ITodoList = {} as ITodoList;

  constructor(private tasksSvc: TasksService, private groupsSvc: GroupsService, private router: Router, public dialog: MatDialog, private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.model = {
      tasks: [],
      groups: [],
      selectedTasks: [],
      filter: {
        date: null,
        groupName: '',
        title: ''
      },
      isToday: false
    }

    this.tasksSvc.get().subscribe(tasks => {
      this.model.tasks = tasks;
    });

    this.groupsSvc.getAll().subscribe(groups => {
      this.model.groups = groups;
    });

    this.activeRoute.queryParams.subscribe((params) => {
      this.model.filter.groupName = this.groupsSvc.getById(params['gId'])?.name || '';
    })

    if (this.activeRoute.snapshot.data.isToday) {
      const today = new Date();
      this.model.filter.date = new Date(today.getFullYear(), today.getMonth(), today.getDate());
      this.model.isToday = true;
    }
  }

  filteredGroups(value: string) {
    return this.model.groups.filter(g => g.name.toLowerCase().indexOf(value.toLowerCase()) > -1);
  }

  trackByGroups(item: any) {
    return item.id;
  }

  taskClick(e: Event, task: ITask) {
    // Stop Event bubbling  
    e.stopPropagation();

    const tIndx = this.model.selectedTasks.indexOf(task.id);
    if (tIndx > -1) {
      this.model.selectedTasks.splice(tIndx, 1);
    } else {
      this.model.selectedTasks.push(task.id);
    }
  }

  taskRowClick(task: ITask) {
    this.router.navigate([`app/list/view/${task.id}`]);
  }

  getGroupName(groupId: number) {
    return this.model.groups.find(g => g.id == groupId)?.name;
  }

  deleteTask(e: Event, task: ITask) {
    // Stop Event bubbling  
    e.stopPropagation();
    this.confirmDialog('Está seguro de que quiere borrar esta tarea?').afterClosed().subscribe(res => {
      if (res) {
        this.tasksSvc.update({ ...task, deleted: true }).subscribe(res => {
          this.model.tasks = this.model.tasks.filter(t => t.id !== task.id);
          this.model.selectedTasks = [];
        })
      }
    })
  }

  doneTask(e: Event, task: ITask) {
    // Stop Event bubbling  
    e.stopPropagation();
    this.tasksSvc.update({ ...task, done: true }).subscribe(res => {
      task.done = true;
      // this.model.selectedTasks = [];
      // this.model.tasks = this.model.tasks.filter(t => t.id !== task.id);
    })
  }

  get filteredTasks() {
    // Get groups Ids for filter groups by id
    let groupsIds = this.filteredGroups(this.model.filter.groupName).map(g => g.id);

    return this.model.tasks.filter(t => {
      if (groupsIds.length > 0 && !groupsIds.includes(t.groupId)) {
        return false
      }

      if (this.model.filter.title && t.name.toLowerCase().indexOf(this.model.filter.title.toLowerCase()) === -1) {
        return false
      }

      if (this.model.filter.date && (+new Date(t.dueDate)) != (+new Date(this.model.filter.date))) {
        return false
      }

      return true
    })

  }

  trackByTasksFn(group: any) {
    return group;
  }

  deleteTasks() {
    this.confirmDialog("Are you sure to delete these tasks").afterClosed().subscribe(res => {
      if (res) {
        this.tasksSvc.removeTasks(this.model.selectedTasks).subscribe(tasks => {
          this.model.tasks = tasks;
          this.model.selectedTasks = [];
        });
      }
    })
  }

  doneTasks() {
    this.tasksSvc.doneTasks(this.model.selectedTasks).subscribe(tasks => {
      this.model.tasks = tasks;
      this.model.selectedTasks = [];
      this.matCheckboxs.forEach(checkbox => {
        if (checkbox.checked) {
          checkbox.toggle()
        }
      })
    });
  }

  confirmDialog(msg: string) {
    return this.dialog.open(ConfirmDialogComponent, {
      data: {
        message: msg
      }
    });
  }

}

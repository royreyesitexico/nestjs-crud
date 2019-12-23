import { Injectable } from '@nestjs/common';
import { ITodo } from 'src/shared/interfaces/todos.interface';
import { Observable, of, throwError } from 'rxjs';

@Injectable()
export class TodosService {
  private readonly todos: ITodo[] = [];

  add(todo: ITodo): Observable<ITodo> {
    this.todos.push(todo);
    return of(todo);
  }

  getAll(): Observable<ITodo[]> {
    return of(this.todos);
  }

  getTodo(id: string): Observable<ITodo> {
    const findTodo = this.todos.find(todo => todo.id === Number(id));
    if (!findTodo) {
      return throwError('No todo found');
    } else {
      return of(findTodo);
    }
  }

  deleteTodo(id: string): Observable<boolean> {
    const index = this.todos.findIndex(todo => todo.id === Number(id));
    if (index < 0) {
      return throwError('Todo not found');
    } else {
      this.todos.splice(index, 1);
      return of(true);
    }
  }

  updateTodo(todo: ITodo, id: string): Observable<ITodo> {
    const todoIndex = this.todos.findIndex(todoList => todoList.id === Number(id));
    if (todoIndex < 0) {
      return throwError('Todo not found');
    }
    this.todos[todoIndex] = todo;
    return of(todo);
  }
}

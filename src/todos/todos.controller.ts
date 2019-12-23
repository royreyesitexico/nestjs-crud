import { Controller, Get, Post, Put, Delete, Param, Body, Res, HttpCode } from '@nestjs/common';
import { Response } from 'express';
import { TodosService } from './todos.service';
import { ITodo } from 'src/shared/interfaces/todos.interface';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Get('/')
  getAllTodos(): ITodo[] {
    let allTodos: ITodo[];
    this.todosService.getAll().subscribe(todos => allTodos = todos);
    return allTodos;
  }

  @Get('/:id')
  getTodo(@Param('id') id, @Res() response: Response): ITodo | any {
    let foundTodo: ITodo;
    this.todosService.getTodo(id).subscribe({
      next: todo => foundTodo = todo,
      error: _ => response.sendStatus(404),
    });
    return foundTodo;
  }

  @Post('/')
  createTodo( @Body() body ): ITodo {
    let newTodo: ITodo;
    this.todosService.add(body).subscribe(todo => newTodo = todo);
    return newTodo;
  }

  @Put('/:id')
  updateTodo(@Body() body, @Param('id') id, @Res() response: Response): ITodo | any {
    let updatedTodo: ITodo;
    this.todosService.updateTodo(body, id).subscribe({
      next: todo => updatedTodo = todo,
      error: _ => response.sendStatus(400),
    });
    return updatedTodo;
  }

  @HttpCode(204)
  @Delete('/:id')
  deleteTodo(@Param('id') id, @Res() response: Response) {
    this.todosService.deleteTodo(id).subscribe({
      error: _ => response.sendStatus(400),
    });
  }
}

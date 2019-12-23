import { Controller, Get, Post, Put, Delete, Param, Body, Res, HttpCode } from '@nestjs/common';
import { Response } from 'express';
import { TodosService } from './todos.service';
import { ITodo } from 'src/shared/interfaces/todos.interface';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Get('/')
  getAllTodos(@Res() response: Response) {
    this.todosService.getAll().subscribe(todos => response.send(todos));
  }

  @Get('/:id')
  getTodo(@Param('id') id, @Res() response: Response) {
    this.todosService.getTodo(id).subscribe({
      next: todo => response.send(todo),
      error: _ => response.sendStatus(404),
    });
  }

  @Post('/')
  createTodo( @Body() body, @Res() response: Response ) {
    this.todosService.add(body).subscribe(next => response.send(next));
  }

  @Put('/:id')
  updateTodo(@Body() body, @Param('id') id, @Res() response: Response) {
    this.todosService.updateTodo(body, id).subscribe({
      next: todo => response.send(todo),
      error: _ => response.sendStatus(400),
    });
  }

  @HttpCode(204)
  @Delete('/:id')
  deleteTodo(@Param('id') id, @Res() response: Response) {
    this.todosService.deleteTodo(id).subscribe({
      next: _ => response.send(),
      error: _ => response.sendStatus(400),
    });
  }
}

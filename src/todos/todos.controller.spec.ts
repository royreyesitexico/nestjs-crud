import { Test, TestingModule } from '@nestjs/testing';
import { TodosController } from './todos.controller';
import { TodosService } from './todos.service';
import { ITodo } from 'src/shared/interfaces/todos.interface';
import { response } from 'express';

describe('Todos Controller', () => {
  let controller: TodosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodosController],
      providers: [TodosService],
    }).compile();

    controller = module.get<TodosController>(TodosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('New environment', () => {
    it('Should return empty array', () => {
      expect(controller.getAllTodos()).toMatchObject([]);
    });

    it('should create a todo', () => {
      const body: ITodo = {
        id: 1,
        title: 'firt todo',
        description: 'keep testing',
        done: false,
      };
      expect(controller.createTodo(body)).toMatchObject(body);
    });

  });

  describe('', () => {
    const baseTodo: ITodo = {
      id: 1,
      title: 'firt todo',
      description: 'keep testing',
      done: false,
    };
    beforeEach(() => {
      controller.createTodo(baseTodo);
    });

    it('should get first todo by ID', () => {
      expect(controller.getTodo('1', response)).toMatchObject(baseTodo);
    });

    it('should update firt todo', () => {
      const updatedTodo = {
        ...baseTodo,
        done: true,
      };
      expect(controller.updateTodo(updatedTodo, '1', response)).toMatchObject(updatedTodo);
    });

    it('should delete first todo', () => {
      controller.deleteTodo('1', response);
      expect(controller.getAllTodos()).toMatchObject([]);
    });

  });
});

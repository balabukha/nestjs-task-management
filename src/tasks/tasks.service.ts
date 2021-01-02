import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v1 as uuidv1 } from 'uuid';
import { GetTasksFilterDto } from './dto/create-tasks-filter.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
    const { status, search } = filterDto;

    let tasks: Task[];

    if (status) {
      tasks = this.tasks.filter((task) => task.status === status);
    }

    if (search) {
      tasks = tasks.filter(
        (task) =>
          task.title.includes(search) || task.description.includes(search),
      );
    }

    return tasks;
  }

  getTaskById(id: string): Task {
    const task = this.tasks.find((task) => task.id === id);

    if (!task) {
      throw new NotFoundException();
    }

    return task;
  }

  createTask(createTaskDto): Task {
    const { title, description } = createTaskDto;

    const task: Task = {
      id: uuidv1(),
      title,
      description,
      status: TaskStatus.IN_PROGRESS,
    };

    this.tasks.push(task);
    return task;
  }

  updateTaskStatus(id, status): Task {
    const task = this.getTaskById(id);
    // if (task) {
    task.status = status;
    return task;
    // }
  }

  deleteTaskById(id: string) {
    const filteredTask: Task = this.getTaskById(id);
    this.tasks = this.tasks.filter((task) => task.id !== filteredTask.id);
  }
}

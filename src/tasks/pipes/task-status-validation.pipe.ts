import { BadRequestException, PipeTransform } from '@nestjs/common';
import { TaskStatus } from '../task-status.enum';

export class TaskStatusValidationPipe implements PipeTransform {
  readonly allowedTaskStatuses = [
    TaskStatus.IN_PROGRESS,
    TaskStatus.DONE,
    TaskStatus.OPEN,
  ];

  transform(value: any) {
    value = value.toUpperCase();
    if (!this.isStatusValid) {
      throw new BadRequestException('bad status');
    }
    return value;
  }

  private isStatusValid(status: any) {
    const idx = this.allowedTaskStatuses.indexOf(status);

    return idx !== -1;
  }
}

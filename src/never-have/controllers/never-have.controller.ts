import { Controller, Get } from '@nestjs/common';

@Controller('never-have')
export class NeverHaveController {

  @Get("")
  async getAllUsers(): Promise<[]> {
    return [];
  }
}
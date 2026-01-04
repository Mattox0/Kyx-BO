import { Controller, Get } from '@nestjs/common';

@Controller('prefer')
export class PreferController {

  @Get("")
  async getAllUsers(): Promise<[]> {
    return [];
  }
}
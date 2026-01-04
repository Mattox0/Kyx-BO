import { Controller, Get } from '@nestjs/common';

@Controller('truth-dare')
export class TruthDareController {

  @Get("")
  async getAllUsers(): Promise<[]> {
    return [];
  }
}
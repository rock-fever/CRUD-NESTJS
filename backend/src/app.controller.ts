import { Controller, Get, Post, UseGuards , Request, Body, Delete, Put, Param, Query} from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { StateService } from './state/state.service';

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService, private readonly stateService: StateService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req):any {
    return this.authService.login(req.user);
  }
  @UseGuards(JwtAuthGuard)
  @Post('create')
  createState(@Body() body:any):any {
    return this.stateService.create(body)
  }
  @UseGuards(JwtAuthGuard)
  @Get('getData')
  getHello(@Request() req): any {
    return this.stateService.getAll();
  }

  @UseGuards(JwtAuthGuard)
  @Delete('delete/:id')
  deleteState(@Param('id') id:string): any {
    return this.stateService.deleteOne(id);
  }
  @UseGuards(JwtAuthGuard)
  @Put('update/:id')
  updateState(@Param('id') id:string, @Query('code') code: string, @Query('name') name: string): any {
    return this.stateService.updateOne( code, name, id )
  }
}


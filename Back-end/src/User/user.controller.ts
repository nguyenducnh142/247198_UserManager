import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Delete,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDTO } from './user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly UserService: UserService) {}

  @Get()
  async Get(
    @Query('username') username: string,
    @Query('fullname') fullname: string,
    @Query('role') role: string,
    @Query('project') project: string,
  ): Promise<UserDTO[]> {
    const searchvalue = { username, fullname, role, project };
    return await this.UserService.GetUser(searchvalue);
  }

  @Post()
  async AddUser(@Body() user: UserDTO): Promise<string> {
    return await this.UserService.AddUser(user);
  }

  @Patch()
  async UpdateUser(
    @Body() user: UserDTO,
    @Query('username') username: string,
  ): Promise<string> {
    return await this.UserService.UpdateUser(user, username);
  }

  @Delete()
  async DeleteUser(@Query('username') username: string): Promise<string> {
    return await this.UserService.DeleteUser(username);
  }
}

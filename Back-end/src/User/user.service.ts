import { Injectable } from '@nestjs/common';
import { UserDTO } from './user.dto';
import * as path from 'path';
import * as fs from 'fs-extra';

@Injectable()
export class UserService {
  private filePath = path.join('src/User', 'user.json');

  async GetUser(searchvalue: {
    username?: string;
    fullname?: string;
    role?: string;
    project?: string;
  }): Promise<UserDTO[]> {
    const data: UserDTO[] = await fs.readJson(this.filePath);
    var datatmp = data;
    if (searchvalue.username) {
      datatmp = await datatmp.filter(
        (e) => e.username.toLowerCase() === searchvalue.username.toLowerCase(),
      );
    }
    if (searchvalue.fullname) {
      datatmp = await datatmp.filter(
        (e) => e.fullname.toLowerCase() === searchvalue.fullname.toLowerCase(),
      );
    }
    if (searchvalue.role) {
      datatmp = await datatmp.filter(
        (e) => e.role.toLowerCase() === searchvalue.role.toLowerCase(),
      );
    }
    if (searchvalue.project) {
      const project1: string[] = searchvalue.project.split(',');
      if (Array.isArray(project1)) {
        for (let key in project1) {
          datatmp = await datatmp.filter((e) =>
            e.project.includes(project1[key]),
          );
        }
      } else {
        datatmp = await datatmp.filter((e) => e.project.includes(project1));
      }
    }
    return datatmp;
  }

  async AddUser(user: UserDTO): Promise<string> {
    const data = await fs.readJson(this.filePath);
    const userExist = data.find((e) => user.username === e.username);
    if (userExist) {
      return 'User already exist';
    } else {
      const updatedata = [...data, user];
      await fs.writeJson(this.filePath, updatedata);
      return 'Add user successfully';
    }
  }

  async UpdateUser(user: UserDTO, username: string): Promise<string> {
    const data = await fs.readJson(this.filePath);
    const userExist = data.find((e) => username === e.username);
    if (!userExist) {
      return 'User not exist';
    } else {
      const index = data.indexOf(userExist);
      data[index] = user;
      data[index].username = username;
      await fs.writeJson(this.filePath, data);
      return 'Update user successfully';
    }
  }

  async DeleteUser(username: string): Promise<string> {
    const data = await fs.readJson(this.filePath);
    const userExist = data.find((e) => username === e.username);
    const index = data.indexOf(userExist);
    if (index === -1) {
      data.splice(1, 1);
      return 'User not exist';
    } else {
      data.splice(index, 1);
      await fs.writeJson(this.filePath, data);
      return 'Delete user successfully';
    }
  }
}

import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Res,
  UseGuards,
  Req,
  NotFoundException,
} from '@nestjs/common';
import { User as UserModel } from '@prisma/client';
import { ApiResponse, WithPagination } from 'src/interfaces';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/authentication/auth.guard';
import { Response } from 'express';
import { Guest } from 'src/authentication/auth.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(
    @Body() createUserDto: CreateUserDto,
  ): Promise<ApiResponse<UserModel>> {
    return {
      data: await this.usersService.create(createUserDto),
    };
  }

  @Get()
  @Guest()
  async findAll(
    @Query('page') page: number = 1,
    @Query('q') q = '',
  ): Promise<ApiResponse<WithPagination<UserModel[]>>> {
    return {
      data: await this.usersService.users({ page, q }),
    };
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
    @Res({ passthrough: true }) res: Response,
  ): Promise<any> {
    try {
      const user = await this.usersService.user({ id });

      res.json({
        data: user,
      });
    } catch (error) {
      res
        .status(error instanceof NotFoundException ? error.getStatus() : 500)
        .json({
          data: null,
          message: error instanceof NotFoundException ? error.message : error,
        });
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<any> {
    try {
      const user = await this.usersService.update(+id, updateUserDto);

      res.json({
        data: user,
      });
    } catch (error) {
      res
        .status(error instanceof NotFoundException ? error.getStatus() : 500)
        .json({
          data: null,
          message: error instanceof NotFoundException ? error.message : error,
        });
    }
  }

  @Delete(':id')
  async remove(
    @Param('id') id: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    try {
      const user = await this.usersService.remove(+id);

      res.json({
        data: true,
      });
    } catch (error) {
      res
        .status(error instanceof NotFoundException ? error.getStatus() : 500)
        .json({
          data: null,
          message: error instanceof NotFoundException ? error.message : error,
        });
    }
  }
}

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Res,
  NotFoundException,
} from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { ApiResponse, WithPagination } from 'src/interfaces';
import { Contact as ContactModel, User } from '@prisma/client';
import { AuthUser, Role, Roles } from 'src/authentication/auth.decorator';
import { Response } from 'express';

@Controller('contacts')
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  @Post()
  async create(
    @Body() createContactDto: CreateContactDto,
    @AuthUser() user: User,
  ): Promise<ApiResponse<ContactModel>> {
    return {
      data: await this.contactsService.create(user, createContactDto),
    };
  }

  @Get()
  // @Roles(Role.Admin)
  async findAll(
    @Query('page') page: number = 1,
    @Query('q') q = '',
    @AuthUser() user: User,
  ): Promise<ApiResponse<WithPagination<ContactModel[]>>> {
    return {
      data: await this.contactsService.contacts(user, { page, q }),
    };
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @Res({ passthrough: true }) res: Response,
    @AuthUser() user: User,
  ): Promise<any> {
    try {
      const contact = await this.contactsService.contact({
        id: +id,
        userId: user.id,
      });

      res.json({
        data: contact,
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
    @Body() updateContactDto: UpdateContactDto,
    @AuthUser() user: User,
    @Res({ passthrough: true }) res: Response,
  ): Promise<any> {
    try {
      const contact = await this.contactsService.update(
        user,
        +id,
        updateContactDto,
      );

      res.json({
        data: contact,
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
    @AuthUser() user: User,
    @Res({ passthrough: true }) res: Response,
  ) {
    try {
      const deleted = await this.contactsService.remove(user, +id);

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

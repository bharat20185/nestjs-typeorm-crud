import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  NotFoundException,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { PhotosService } from './photos.service';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { UpdatePhotoDto } from './dto/update-photo.dto';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { UserTokenPayload } from 'src/users/interface/user.interface';
import { PhotoInterface } from './interface/photo.interface';
import { AlbumsService } from '../albums.service';

@Controller('/albums/:albumId/photos')
export class PhotosController {
  constructor(
    private readonly photosService: PhotosService,
    private albumService: AlbumsService,
  ) {}

  @Post()
  async create(
    @Body() createPhotoDto: CreatePhotoDto,
    @Param('albumId', ParseIntPipe) albumId: number,
    @CurrentUser() user: UserTokenPayload,
  ) {
    const album = await this.albumService.findOne(albumId, user);
    if (!album) throw new NotFoundException('Album not found');
    return await this.photosService.create(createPhotoDto, {
      id: album.id,
      title: album.title,
    });
  }

  @Get()
  findAll(
    @Param('albumId', ParseIntPipe) albumId: number,
    @CurrentUser() user: UserTokenPayload,
  ): Promise<PhotoInterface[]> {
    return this.photosService.findAll(albumId, user);
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
    @Param('albumId', ParseIntPipe) albumId: number,
    @CurrentUser() user: UserTokenPayload,
  ): Promise<PhotoInterface> {
    const photo = await this.photosService.findOne(id, albumId, user);
    if (!photo) throw new NotFoundException('Photo not found');
    return photo;
  }

  @Patch(':id')
  async update(
    @Body() UpdatePhotoDto: UpdatePhotoDto,
    @Param('id', ParseIntPipe) id: number,
    @Param('albumId', ParseIntPipe) albumId: number,
    @CurrentUser() user: UserTokenPayload,
  ): Promise<PhotoInterface> {
    const album = await this.albumService.findOne(albumId, user);
    if (!album) throw new NotFoundException('Album not found');
    const updatedPhoto = await this.photosService.update(id, UpdatePhotoDto);
    if(updatedPhoto.affected === 0) throw new NotFoundException('Photo not found');
    const photo = await this.photosService.findOne(id, albumId, user);
    return photo;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(
    @Param('id', ParseIntPipe) id: number,
    @Param('albumId', ParseIntPipe) albumId: number,
    @CurrentUser() user: UserTokenPayload,
  ) {
    const album = await this.albumService.findOne(albumId, user);
    if (!album) throw new NotFoundException('Album not found');
    return this.photosService.remove(id);
  }
}

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
import { AlbumsService } from './albums.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { UserTokenPayload } from 'src/users/interface/user.interface';
import { AlbumInterface } from './interface/album.interface';

@Controller('albums')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}

  @Post()
  create(@Body() createAlbumDto: CreateAlbumDto, @CurrentUser() loggedInUser: UserTokenPayload): Promise<AlbumInterface> {
    return this.albumsService.create(createAlbumDto, loggedInUser);
  }

  @Get()
  async findAll(@CurrentUser() loggedInUser: UserTokenPayload): Promise<AlbumInterface[]> {
    return await this.albumsService.findAll(loggedInUser);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number, @CurrentUser() loggedInUser: UserTokenPayload): Promise<AlbumInterface> {
    const album = await this.albumsService.findOne(id, loggedInUser);
    if (!album) throw new NotFoundException('Album not found');
    return album;
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAlbumDto: UpdateAlbumDto,
    @CurrentUser() loggedInUser: UserTokenPayload,
  ): Promise<AlbumInterface> {
    const updatedAlbum = await this.albumsService.update(
      id,
      updateAlbumDto,
      loggedInUser,
    );
    if (updatedAlbum.affected === 0)
      throw new NotFoundException('Album not found');
    const album = await this.albumsService.findOne(id, loggedInUser);
    if (!album) throw new NotFoundException('Album not found');
    return album;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe) id: number, @CurrentUser() loggedInUser: UserTokenPayload) {
    return this.albumsService.remove(id, loggedInUser);
  }
}

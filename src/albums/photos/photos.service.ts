import { Injectable } from '@nestjs/common';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { UpdatePhotoDto } from './dto/update-photo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Photo } from './entities/photo.entity';
import { UserTokenPayload } from 'src/users/interface/user.interface';
import { AlbumInterface } from '../interface/album.interface';

@Injectable()
export class PhotosService {
  constructor(@InjectRepository(Photo) private repo: Repository<Photo>) {}

  async create(createPhotoDto: CreatePhotoDto, album: AlbumInterface) {
    const createdAlumn = this.repo.create({...createPhotoDto, album: { ...album } });
    return await this.repo.save(createdAlumn);
  }

  findAll(albumId: number, user: UserTokenPayload) {
    return this.repo.find({
      where: { album: { id: albumId, user: { id: user.id } } },
      relations: ['album'],
      select: {
        id: true,
        title: true,
        url: true,
        thumbnailUrl: true,
        album: {
          id: true,
          title: true,
        },
      },
    });
  }

  async findOne(id: number, albemId: number, user: UserTokenPayload) {
    const photo = await this.repo.findOne({
      where: { id, album: { id: albemId, user: { id: user.id } } },
      relations: ['album'],
      select: {
        id: true,
        title: true,
        url: true,
        thumbnailUrl: true,
        album: {
          id: true,
          title: true,
        },
      },
    });
    return photo;
  }

  async update(id: number, updatePhotoDto: UpdatePhotoDto) {
    return await this.repo.update(id, updatePhotoDto);
  }

  async remove(id: number) {
    return await this.repo.delete(id);
  }
}

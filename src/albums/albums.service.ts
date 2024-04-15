import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Album } from './entities/album.entity';
import { Repository } from 'typeorm';
import { UserTokenPayload } from 'src/users/interface/user.interface';
import { AlbumInterface } from './interface/album.interface';
import { UserColumns } from 'src/common/UserColumns';

@Injectable()
export class AlbumsService {
  constructor(@InjectRepository(Album) private repo: Repository<Album>) {}

  create(createAlbumDto: CreateAlbumDto, loggedInUser: UserTokenPayload): Promise<AlbumInterface> {
    const createdAlbum = this.repo.create(createAlbumDto);
    createdAlbum.user = loggedInUser;
    return this.repo.save(createdAlbum);
  }

  findAll(loggedInUser: UserTokenPayload): Promise<AlbumInterface[]> {
    return this.repo.find({
      where: { user: { id: loggedInUser.id } },
      relations: ['user'],
      select: {
        id: true,
        title: true,
        user: UserColumns,
      },
    });
  }

  findOne(id: number, loggedInUser: UserTokenPayload): Promise<AlbumInterface> {
    return this.repo.findOne({
      where: { id, user: { id: loggedInUser.id } },
      relations: ['user'],
      select: {
        id: true,
        title: true,
        user: UserColumns,
      },
    });
  }

  async update(id: number, updateAlbumDto: UpdateAlbumDto, loggedInUser: UserTokenPayload) {
    return await this.repo.update({ id, user: { id: loggedInUser.id } }, updateAlbumDto);
  }

  remove(id: number, loggedInUser: UserTokenPayload) {
    return this.repo.delete({ id, user: { id: loggedInUser.id } });
  }
}

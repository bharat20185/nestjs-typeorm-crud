import { Module } from '@nestjs/common';
import { PhotosService } from './photos.service';
import { PhotosController } from './photos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Photo } from './entities/photo.entity';
import { Album } from '../entities/album.entity';
import { AlbumsModule } from '../albums.module';

@Module({
  imports: [TypeOrmModule.forFeature([Photo]), AlbumsModule],
  controllers: [PhotosController],
  providers: [PhotosService],
})
export class PhotosModule {}

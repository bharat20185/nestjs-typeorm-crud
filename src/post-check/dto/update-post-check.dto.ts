import { PartialType } from '@nestjs/mapped-types';
import { CreatePostCheckDto } from './create-post-check.dto';

export class UpdatePostCheckDto extends PartialType(CreatePostCheckDto) {}

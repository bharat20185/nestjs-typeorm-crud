import { PartialType } from '@nestjs/mapped-types';
import { CreateCommentCheckDto } from './create-comment-check.dto';

export class UpdateCommentCheckDto extends PartialType(CreateCommentCheckDto) {}

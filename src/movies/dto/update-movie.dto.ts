import { PartialType } from '@nestjs/mapped-types';
import { IsString, IsNumber } from 'class-validator';
import { CreateMovieDto } from './create-movie.dto';

export class UpdateMovieDto extends PartialType(CreateMovieDto) {}

/**
export class UpdateMovieDto{ //모든 속성이 optional
    
    @IsString() //클래스 유효성 검사
    readonly title?: string;

    @IsNumber()
    readonly year?: number;

    @IsString({each: true})
    readonly genres?: string[];
}
*/
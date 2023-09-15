import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateMovieDto{
    
    @IsString() //클래스 유효성 검사
    readonly title: string;

    @IsNumber()
    readonly year: number;

    @IsOptional()
    @IsString({each: true})
    readonly genres: string[];
}
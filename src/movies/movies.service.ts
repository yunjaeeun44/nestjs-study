import { Injectable, NotFoundException } from '@nestjs/common';
import { Movie } from './entities/Movie.entity';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Injectable()
export class MoviesService {
    private movies: Movie[] = []; //데이터베이스 용도

    getAll(): Movie[] {
        return [...this.movies];
    }

    getOne(id: number): Movie { //url을 통해 들어오는 데이터는 string. 따라서 entitiy에 맞으려면 형변환을 해야한다.
        const movie = this.movies.find(movie => movie.id === id); //parseInt(id)
        if(!movie){
            throw new NotFoundException(`Movie with ID ${id} not found.`)
        }
        return movie;
    }

    deleteOne(id: number){
        this.getOne(id)
        this.movies = this.movies.filter(movie => movie.id !== +id) //parseInt(id)
    }

    create(movieData: CreateMovieDto){
        this.movies.push({
            id: this.movies.length + 1,
            ...movieData,
        });
    }

    update(id: number, updateData: UpdateMovieDto){
        const movie = this.getOne(id);
        this.deleteOne(id);
        this.movies.push({
            ...movie, 
            ...updateData,
        })
    }
}

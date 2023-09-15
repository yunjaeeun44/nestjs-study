import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';
import { NotFoundException } from '@nestjs/common';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe("getAll", () => {
    it("should return an array", () =>{
      const result = service.getAll();
      expect(result).toBeInstanceOf(Array);
    })
  });

  describe("getOne", () => {
    it("should return a Movie", () => {
      service.create({
        title:"Test Movie",
        genres: ['test'],
        year: 2000,
      });
      const movie = service.getOne(1);
      expect(movie).toBeDefined();
      expect(movie.id).toEqual(1);
    });
    it("should throw 404 error", () =>{
      try{
        service.getOne(999);
      }catch(e){
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual(`Movie with ID 999 not found.`)
      }
    });
  });

  describe("deleteOne", () =>{
    it("should delete a movie", () => {
      service.create({
        title:"Test Movie",
        genres: ['test'],
        year: 2000,
      });
      const beforeDelete = service.getAll();
      service.deleteOne(1);
      const afterDelete = service.getAll();
      expect(afterDelete.length).toBeLessThan(beforeDelete.length);
    });
    it("should return a 404", () =>{
      try{
        service.deleteOne(999);
      }catch(e){
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe("create", () => {
    it("should create a movie", () => {
      const beforeCreate = service.getAll();
      service.create({
        title:"Test Movie",
        genres: ['test'],
        year: 2000,
      });
      const afterCreate = service.getAll();
      expect(afterCreate.length).toBeGreaterThan(beforeCreate.length)
    });
  });

  describe("update", () => {
    it("should update a movie", () => {
      service.create({
        title:"Test Movie",
        genres: ['test'],
        year: 2000,
      });
      service.update(1, {title:"Updated Movie"});
      const movie = service.getOne(1);
      expect(movie.title).toEqual("Updated Movie");
    });
    it("should throw a NotFoundException", () =>{
      try{
        service.update(999, {title:"Updated Movie"});
      }catch(e){
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });


});

import {
  Body,
  Controller,
  Get,
  Headers,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { VocabularyService } from "./vocabulary.service";
import { AuthGuard } from "../guard/auth.guard";
import { FileInterceptor } from "@nestjs/platform-express";
import * as FormData from "form-data";
import { AnswerDto } from "./dto/answer.dto";
import { AuthService } from "../auth/auth.service";
import { WordDto } from "./dto/word.dto";

@Controller("/api/vocabulary")
export class VocabularyController {
  constructor(
    private readonly vocabularyService: VocabularyService,
    private readonly authService: AuthService,
  ) {}
  @Get("/")
  @UseGuards(AuthGuard)
  public async all(
    @Query("page") page: number,
    @Query("search") search: string,
  ) {
    return await this.vocabularyService.paginate(page ?? 1, search ?? "");
  }

  @Post("/create/file")
  @UseInterceptors(FileInterceptor("file"))
  public async createUsingFile(@UploadedFile() file): Promise<any> {
    const formData = new FormData();
    formData.append("file", file.buffer, { filename: file.originalname });

    const response = await this.vocabularyService.createUsingFile(formData);

    if (response.status != HttpStatus.OK) {
      throw new HttpException("Error", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get("/random/:count")
  @UseGuards(AuthGuard)
  public async getRandom(@Param("count") count: number) {
    return await this.vocabularyService.getRandom(count);
  }

  @Post("/save-answer")
  @UseGuards(AuthGuard)
  public async saveAnswer(
    @Headers() headers: any,
    @Body() answerDto: AnswerDto,
  ) {
    const user = await this.authService.getUser(headers.token);
    answerDto.user_id = user.id;
    await this.vocabularyService.saveAnswer(answerDto);
  }

  @Get("/result/:hash")
  @UseGuards(AuthGuard)
  public async getResult(@Headers() headers: any, @Param("hash") hash: string) {
    const user = await this.authService.getUser(headers.token);
    return await this.vocabularyService.getResult(user.id, hash);
  }

  @Get("/results")
  @UseGuards(AuthGuard)
  public async getResults(@Headers() headers: any) {
    const user = await this.authService.getUser(headers.token);
    return await this.vocabularyService.getAllResults(user.id);
  }

  @Post("/create")
  @UseGuards(AuthGuard)
  public async create(@Body() wordDto: WordDto) {
    await this.vocabularyService.create(wordDto);
  }

  @Post("/update/:id")
  @UseGuards(AuthGuard)
  public async update(@Param("id") id: number, @Body() wordDto: WordDto) {
    await this.vocabularyService.update(id, wordDto);
  }
  @Post("/delete/:id")
  @UseGuards(AuthGuard)
  public async delete(@Param("id") id: number) {
    await this.vocabularyService.delete(id);
  }
}

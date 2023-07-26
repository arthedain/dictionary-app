import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { firstValueFrom } from "rxjs";
import { HttpService } from "@nestjs/axios";
import * as FormData from "form-data";
import { AnswerDto } from "./dto/answer.dto";
import { WordDto } from "./dto/word.dto";

@Injectable()
export class VocabularyService {
  constructor(
    @Inject("VOCABULARY") private readonly vocabularyClient: ClientProxy,
    private readonly httpService: HttpService,
  ) {}
  public async all() {
    return await firstValueFrom(this.vocabularyClient.send("get-all", []));
  }

  public async createUsingFile(formData: FormData) {
    return await this.httpService.axiosRef.post(
      "http://localhost:3002/api/vocabulary/create-using-file",
      formData,
      {
        headers: {
          ...formData.getHeaders(),
          "Content-Length": formData.getLengthSync(),
        },
      },
    );
  }

  async getRandom(count: number) {
    return await firstValueFrom(
      this.vocabularyClient.send("get-random", { count }),
    );
  }

  async saveAnswer(answerDto: AnswerDto) {
    await this.vocabularyClient.emit("answer", answerDto);
  }

  async getResult(userId: number, hash: string) {
    return await firstValueFrom(
      this.vocabularyClient.send("get-quiz-result", { user_id: userId, hash }),
    );
  }

  async getAllResults(id) {
    return await firstValueFrom(
      this.vocabularyClient.send("all-quiz-results", { user_id: id }),
    );
  }

  async paginate(page: number, search: string) {
    return await firstValueFrom(
      this.vocabularyClient.send("paginate", {
        page: page,
        search: search,
      }),
    );
  }

  async create(wordDto: WordDto) {
    this.vocabularyClient.emit("create", wordDto);
  }

  async update(id: number, wordDto: WordDto) {
    this.vocabularyClient.emit("create", { id, ...wordDto });
  }

  async delete(id: number) {
    this.vocabularyClient.emit("delete", { id });
  }
}

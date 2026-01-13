import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class QuestionsService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createQuestionDto: CreateQuestionDto, request: number) {
    return await this.prisma.questions.create({
      data: { ...createQuestionDto, userId: request },
    });
  }

  async findAll() {
    return await this.prisma.questions.findMany();
  }

  async findOne(id: number) {
    const findQuestion = await this.prisma.questions.findUnique({
      where: { id },
    });
    if (!findQuestion) throw new NotFoundException('Question not found');
    return findQuestion;
  }

  async update(id: number, updateQuestionDto: UpdateQuestionDto) {
    const findQuestion = await this.prisma.questions.findUnique({
      where: { id },
    });
    if (!findQuestion) throw new NotFoundException('Question not found');
    return this.prisma.questions.update({
      where: { id },
      data: { ...updateQuestionDto },
    });
  }

  async remove(id: number) {
    const findQuestion = await this.prisma.questions.findUnique({
      where: { id },
    });
    if (!findQuestion) throw new NotFoundException('Question not found');
    return this.prisma.questions.delete({ where: { id } });
  }
}

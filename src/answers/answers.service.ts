import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class AnswersService {
  constructor(private readonly prisma: PrismaService) {}
  async create(
    createAnswerDto: CreateAnswerDto,
    request: { sub: { sub: number } },
    questionId: string,
  ) {
    const newAnswer = {
      body: createAnswerDto.body,
      user: {
        connect: { id: request.sub.sub },
      },
      question: {
        connect: { id: +questionId },
      },
    };
    return await this.prisma.answers.create({
      data: newAnswer,
    });
  }

  async findAll() {
    return await this.prisma.answers.findMany({
      include: {
        question: true,
        user: { select: { name: true, email: true } },
      },
    });
  }

  async findOne(id: number) {
    const findOneAnswer = await this.prisma.answers.findUnique({
      where: { id },
      include: {
        question: true,
        user: { select: { name: true, email: true } },
      },
    });
    if (!findOneAnswer) throw new NotFoundException('Answer not found');
    return findOneAnswer;
  }

  async update(id: number, updateAnswerDto: UpdateAnswerDto) {
    const findAnswer = await this.prisma.answers.findUnique({ where: { id } });
    if (!findAnswer) throw new NotFoundException('Answer not found');
    return this.prisma.answers.update({
      where: { id },
      data: { ...updateAnswerDto },
    });
  }

  async remove(id: number) {
    const findAnswer = await this.prisma.answers.findUnique({ where: { id } });
    if (!findAnswer) throw new NotFoundException('Answer not found');
    await this.prisma.answers.delete({ where: { id } });
    return { message: 'Answer deleted successfully' };
  }
}

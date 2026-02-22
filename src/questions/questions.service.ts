import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class QuestionsService {
  constructor(private readonly prisma: PrismaService) {}
  async create(
    createQuestionDto: CreateQuestionDto,
    request: { sub: { sub: number } },
  ) {
    const findQuestion = await this.prisma.questions.findFirst({
      where: { title: createQuestionDto.title },
    });
    if (findQuestion)
      throw new ConflictException('Já existe uma pergunta com esse titulo');
    await this.prisma.questions.create({
      data: { ...createQuestionDto, userId: request.sub.sub },
    });
    return { message: 'Pergunta criada com sucesso' };
  }

  async findAll() {
    return await this.prisma.questions.findMany({
      include: {
        user: {
          select: { id: true, name: true },
        },
        answers: {
          include: {
            user: {
              select: { id: true, name: true },
            },
          },
        },
      },
    });
  }

  async findOne(id: number) {
    const findQuestion = await this.prisma.questions.findUnique({
      where: { id },
      include: {
        answers: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
        user: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
    if (!findQuestion) throw new NotFoundException('Pergunta não encontrada');
    return findQuestion;
  }

  async update(id: number, updateQuestionDto: UpdateQuestionDto) {
    const findQuestion = await this.prisma.questions.findUnique({
      where: { id },
    });
    if (!findQuestion) throw new NotFoundException('Pergunta não encontrada');
    return this.prisma.questions.update({
      where: { id },
      data: { ...updateQuestionDto },
    });
  }

  async remove(id: number) {
    const findQuestion = await this.prisma.questions.findUnique({
      where: { id },
    });
    if (!findQuestion) throw new NotFoundException('Pergunta não encontrada');
    await this.prisma.questions.delete({ where: { id } });
    return { message: 'Pergunta deletada com sucesso' };
  }
}

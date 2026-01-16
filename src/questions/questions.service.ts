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
      throw new ConflictException('Question with this title already exists');
    await this.prisma.questions.create({
      data: { ...createQuestionDto, userId: request.sub.sub },
    });
    return { message: 'Question created successfully' };
  }

  async findAll() {
    return await this.prisma.questions.findMany({
      include: { answers: true, user: { select: { name: true, email: true } } },
    });
  }

  async findOne(id: number) {
    const findQuestion = await this.prisma.questions.findUnique({
      where: { id },
      include: { answers: true, user: { select: { name: true, email: true } } },
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
    await this.prisma.questions.delete({ where: { id } });
    return { message: 'Question deleted successfully' };
  }
}

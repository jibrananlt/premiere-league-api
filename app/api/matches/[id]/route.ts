import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

type Props = { params: Promise<{ id: string }> }

export async function PATCH(req: Request, { params }: Props) {
  const { id } = await params;
  const body = await req.json();

  const updatedMatch = await prisma.match.update({
    where: { id: parseInt(id) },
    data: {
      homeScore: parseInt(body.homeScore),
      awayScore: parseInt(body.awayScore),
      isFinished: true
    }
  });
  return NextResponse.json(updatedMatch);
}

export async function DELETE(req: Request, { params }: Props) {
  const { id } = await params;
  await prisma.match.delete({ where: { id: parseInt(id) } });
  return NextResponse.json({ message: 'Match deleted' });
}
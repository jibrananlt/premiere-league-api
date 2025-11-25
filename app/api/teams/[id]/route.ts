import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

type Props = { params: Promise<{ id: string }> }

export async function GET(req: Request, { params }: Props) {
  const { id } = await params;
  const team = await prisma.team.findUnique({ 
    where: { id: parseInt(id) },
    include: { players: true } 
  });
  return NextResponse.json(team);
}

export async function PATCH(req: Request, { params }: Props) {
  const { id } = await params;
  const body = await req.json();
  const updated = await prisma.team.update({
    where: { id: parseInt(id) },
    data: body
  });
  return NextResponse.json(updated);
}

export async function DELETE(req: Request, { params }: Props) {
  const { id } = await params;
  await prisma.team.delete({ where: { id: parseInt(id) } });
  return NextResponse.json({ message: 'Team deleted' });
}
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

type Props = { params: Promise<{ id: string }> }

export async function PATCH(req: Request, { params }: Props) {
  const { id } = await params;
  const body = await req.json();
  
  // Konversi angka jika ada update nomor/teamId
  if (body.number) body.number = parseInt(body.number);
  if (body.teamId) body.teamId = parseInt(body.teamId);

  const updated = await prisma.player.update({
    where: { id: parseInt(id) },
    data: body
  });
  return NextResponse.json(updated);
}

export async function DELETE(req: Request, { params }: Props) {
  const { id } = await params;
  await prisma.player.delete({ where: { id: parseInt(id) } });
  return NextResponse.json({ message: 'Player deleted' });
}
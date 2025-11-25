import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

type Props = { params: Promise<{ id: string }> }

export async function PATCH(req: Request, { params }: Props) {
  const { id } = await params;
  const body = await req.json();
  
  // Pastikan semua input dikonversi ke Int
  const dataToUpdate = {
    played: parseInt(body.played),
    won: parseInt(body.won),
    drawn: parseInt(body.drawn),
    lost: parseInt(body.lost),
    goalsFor: parseInt(body.goalsFor),
    goalsAgainst: parseInt(body.goalsAgainst),
    points: parseInt(body.points),
  };

  const updated = await prisma.standing.update({
    where: { id: parseInt(id) },
    data: dataToUpdate
  });
  return NextResponse.json(updated);
}
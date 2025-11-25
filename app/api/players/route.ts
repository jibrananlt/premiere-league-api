import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const player = await prisma.player.create({
      data: {
        name: body.name,
        position: body.position,
        number: parseInt(body.number),
        photo: body.photo,
        teamId: parseInt(body.teamId)
      }
    });
    return NextResponse.json(player, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Error adding player' }, { status: 500 });
  }
}
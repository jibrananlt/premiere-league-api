import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const teams = await prisma.team.findMany({
    include: { players: true }
  });
  return NextResponse.json(teams);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newTeam = await prisma.team.create({
      data: {
        name: body.name,
        logo: body.logo,
        coach: body.coach,
        stadium: body.stadium,
        founded: parseInt(body.founded),
        // Otomatis buat data klasemen kosong saat tim dibuat
        standing: {
          create: { points: 0, played: 0 }
        }
      }
    });
    return NextResponse.json(newTeam, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Error creating team' }, { status: 500 });
  }
}
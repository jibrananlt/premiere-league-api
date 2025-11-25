import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  const matches = await prisma.match.findMany({
    include: {
      homeTeam: { select: { name: true, logo: true } },
      awayTeam: { select: { name: true, logo: true } }
    },
    orderBy: { date: 'asc' }
  });
  return NextResponse.json(matches);
}

// POST: Buat Jadwal Baru dengan Validasi
export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // --- VALIDASI 1: Tim tidak boleh sama ---
    if (body.homeTeamId === body.awayTeamId) {
       return NextResponse.json(
         { error: 'Tim Kandang dan Tandang tidak boleh sama!' }, 
         { status: 400 }
       );
    }

    // --- VALIDASI 2: Cek apakah jadwal tanggal itu valid ---
    if (!body.date) {
        return NextResponse.json({ error: 'Tanggal wajib diisi' }, { status: 400 });
    }

    const newMatch = await prisma.match.create({
      data: {
        // new Date("YYYY-MM-DD") akan otomatis set jam ke 00:00:00 (UTC)
        date: new Date(body.date), 
        homeTeamId: parseInt(body.homeTeamId),
        awayTeamId: parseInt(body.awayTeamId),
        isFinished: false 
      }
    });
    return NextResponse.json(newMatch, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Gagal membuat jadwal' }, { status: 500 });
  }
}
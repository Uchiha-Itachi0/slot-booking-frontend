import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req: Request) {
    const { date, slot } = await req.json();

    try {
        const response = await axios.post(`${process.env.BACKEND_URL}/api/book-slot`, { date, slot });
        return NextResponse.json(response.data);
    } catch (error) {
        return NextResponse.json({ message: 'Error booking slot' }, { status: 500 });
    }
}

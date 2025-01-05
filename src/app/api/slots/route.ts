import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(req: Request) {
    const url = new URL(req.url);
    const date = url.searchParams.get('date');

    try {
        const response = await axios.get(`${process.env.BACKEND_URL}/api/slots/${date}`);
        return NextResponse.json(response.data);
    } catch (error) {
        return NextResponse.json({ message: 'Error fetching slots' }, { status: 500 });
    }
}

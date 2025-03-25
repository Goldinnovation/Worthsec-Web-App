import { NextResponse } from "next/server";
export async function GET() {
    return NextResponse.json({ 'message': successful });
}
export async function POST(request) {
    const body = await request.json();
    console.log(body);
    return NextResponse.json({ result: 'succesfull req', succes: true }, { status: 201 });
}

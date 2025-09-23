import { NextRequest, NextResponse } from "next/server";

export function GET() {

    return NextResponse.json({
    })

}


export async function POST(request: NextRequest) {

    const properties = await request.json();

    return NextResponse.json({ properties });
}
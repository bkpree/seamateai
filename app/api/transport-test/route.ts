import { NextResponse } from "next/server";
import { transportInfo } from "@/lib/transport";

export async function GET() {
  return NextResponse.json(transportInfo);
}
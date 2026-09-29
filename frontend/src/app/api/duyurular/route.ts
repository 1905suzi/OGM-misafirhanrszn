import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const dataFilePath = path.join(process.cwd(), "src", "data", "duyurular.json");

export async function GET() {
  try {
    if (!fs.existsSync(dataFilePath)) {
      return NextResponse.json([]);
    }
    const fileContents = fs.readFileSync(dataFilePath, "utf8");
    const data = JSON.parse(fileContents);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Veri okunamadı" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const newData = await req.json();
    fs.writeFileSync(dataFilePath, JSON.stringify(newData, null, 2), "utf8");
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Veri yazılamadı" }, { status: 500 });
  }
}

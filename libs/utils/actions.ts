import { NextResponse } from "next/server";

export default async function actions(){
    console.log("Hello world....");
    return NextResponse.json({ message: "Hello world..." });
}
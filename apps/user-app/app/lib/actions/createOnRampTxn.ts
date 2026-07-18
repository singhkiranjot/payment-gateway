"use server"

import { getServerSession } from "next-auth"
import { authOptions } from "../auth"
import prisma from "@repo/db/client"

export const createOnRampTransaction = async (provider:string , amount:number) =>{
    const session = await getServerSession(authOptions)
    const userId = session?.user?.id
    if(!userId){
        return {
            message: "user is not logged in"
        }
    }
    const token = Math.random().toString()
    await prisma.onRampTransaction.create({
        data:{
            userId: Number(userId),
            provider,
            amount,
            token,
            startTime: new Date(),
            status:  "Processing"
        }
    })

    return {
        message : "transaction created"
    }
}
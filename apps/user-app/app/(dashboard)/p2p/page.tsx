import { getServerSession } from "next-auth";
import { SendCard } from "../../../components/SendCard";
import { authOptions } from "../../lib/auth";
import prisma from "@repo/db/client";
import { P2PTransfer } from "../../../components/P2PTransfer";

async function getTransfers() {
    const session = await getServerSession(authOptions);
    const txns = await prisma.p2pTransfer.findMany({
        where: {
            fromUserId: Number(session?.user?.id)
        }
    });
    return txns.map(t => ({
        amount: t.amount,
        timestamp: t.timestamp,
        fromUserId: t.fromUserId,
        toUserId: t.toUserId
    }))
}

export default async function(){
    const transfers = await getTransfers();
    return <div className="w-full flex justify-evenly items-center gap-5">
        <SendCard/>
        <div className="pt-4">
            <P2PTransfer  transfer={transfers}/>
        </div>
    </div>
}
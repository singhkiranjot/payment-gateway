import { Card } from "@repo/ui/card";


export const P2PTransfer = ({
    transfer
}:{
    transfer:{
        amount: number;
        timestamp: Date;
        fromUserId: number;
        toUserId: number;
    }[]
})=>{
    if(!transfer.length){
        return <Card title="Recent Transactions">
            <div className="text-center pb-8 pt-8">
                No Recent transactions
            </div>
        </Card>
    }
    return <Card title="Recent Transactions">
        <div className="pt-2">
            {transfer.map(t => <div className="flex justify-between">
                <div>
                    <div className="text-sm">
                        SENT
                    </div>
                    <div>
                        {t.toUserId}
                    </div>
                    <div className="text-slate-600 text-xs">
                        {t.timestamp.toDateString()}
                    </div>
                </div>
                <div className="flex flex-col justify-center">
                    Rs {t.amount / 100}
                </div>

            </div>)}
        </div>
    </Card>
}
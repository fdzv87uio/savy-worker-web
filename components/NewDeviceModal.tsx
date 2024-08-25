import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { TransactionType } from "@/interfaces/transactionInterfaces"


export function NewDeviceModal({ onClick, modalData, modalOpen, setModalOpen }: { onClick: any, modalData: TransactionType, modalOpen: boolean, setModalOpen: any }) {
    return (
        <Dialog onOpenChange={() => setModalOpen(false)} open={modalOpen}>
            <DialogContent className="sm:max-w-[425px]" >
                <DialogHeader>
                    <DialogTitle>New Device Detected</DialogTitle>
                    <DialogDescription>
                        <div className="flex mt-[10px] flex-col gap-[15px]">
                            <p>A New device has been detected:</p>
                            <ul>
                                <li><strong>Os: </strong>{modalData.os}</li>
                                <li><strong>Browser: </strong>{modalData.browser}</li>
                                <li><strong>Version: </strong>{modalData.version}</li>
                                <li><strong>IP: </strong>{modalData.ip}</li>
                            </ul>
                            <p>Do you want to proceed?</p>
                        </div>
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button variant="default" size="sm" onClick={() => onClick()}>Accept</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
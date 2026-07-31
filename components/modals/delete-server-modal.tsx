"use client"
import {useModal} from "@/hooks/use-modal-store"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,

} from "@/components/ui/dialog"

import { Button } from "@/components/ui/button";
import {useState} from "react";
import {useRouter} from "next/navigation";
import axios from "axios";



export const  DeleteServerModal = () => {
    const {isOpen,onClose,type,data}= useModal();
    const router =useRouter();
    

    const isModalOpen = isOpen && type === "deleteServer";
    const {server} = data
    const [isLoading, setIsLoading] = useState(false);

    const onClick= async ()=>{
        try{
            setIsLoading(true)
            await axios.delete(`/api/servers/${server?.id}`);
            onClose();
            router.refresh();
            router.push("/")

        }catch(error){
            console.log(error)
        }
        finally{
            setIsLoading(false)
        }
    }
   
   
   
    
    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent className="bg-white text-black p-0 overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-2xl text-center font-bold">
                        Delete Server
                    </DialogTitle>
                    <DialogDescription className="text-center text-zinc-500">
                        Are you sure you want to delete this server <span className="font-semibold text-indigo-700">{server?.name}</span>?
                    </DialogDescription>
                    

                </DialogHeader>
                <DialogFooter className="bg-gray-300 px-6 py-4">
                    <div className="flex items-center justify-center w-full">
                        <Button disabled={isLoading}
                        onClick={onClose}
                        variant="ghost"
                        
                        >
                            Cancel
                        </Button>
                        <Button disabled={isLoading}
                        onClick={onClick}
                        variant="primary">
                            Confirm
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>

        </Dialog>
    )
}
import type { SizeEnum } from "@/enums/sizeEnum";
import type { ToastTypeEnum } from "@/enums/toastEnum";

export interface ToastProps {
    msg: string;
    type?: ToastTypeEnum;
    // size?: SizeEnum;
    // time?: number;
    //type: string;
}
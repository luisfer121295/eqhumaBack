declare const readline: any;
declare const fs: any;
declare class CodesListService {
    readData(idcode: any): Promise<number>;
    processBlock(idcode: any, block: any): Promise<void>;
}

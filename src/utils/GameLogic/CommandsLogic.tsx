import { MoveCommand } from "../../domains/enums";

export function parseInput(input : string) : MoveCommand[] | undefined {
    if (input === '') return undefined;
    const tokens = input.toLocaleLowerCase().split(/\s+/);
    let result : number[] = [];
    for(var token of tokens){
        switch(token){
            case 'go':
                result.push(MoveCommand.Go);
                break;
            case 'left':
                result.push(MoveCommand.Left);
                break
            case 'right':
                result.push(MoveCommand.Right);
                break;
            default:
                return undefined;
        }
    }
    return result;
}
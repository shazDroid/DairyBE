import { Branch } from "./Branch";
import { City } from "./City";

export class State {
    id: number
    state_name: string
    cities: City[];
    branch: Branch
}
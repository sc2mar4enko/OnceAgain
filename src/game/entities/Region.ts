export class Region {
    public readonly id: string;
    public owner: string | null = null;

    constructor(id: string) {
        this.id = id;
    }
}

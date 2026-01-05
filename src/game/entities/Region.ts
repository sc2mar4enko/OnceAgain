export class Region {
    public readonly id: string;
    public owner: string | null = null;
    public score: number;

    constructor(id: string) {
        this.id = id;
        this.score = Math.floor(Math.random() * 10) + 1;
    }
}

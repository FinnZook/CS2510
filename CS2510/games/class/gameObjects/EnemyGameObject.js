class EnemyGameObject extends GameObject{
    constructor(){
        super("Enemy", ["Enemy"])
        this.addComponent(new Polygon(), {fillStyle: "green", points:Assets.triangle})
        this.addComponent(new EnemyController())
        this.addComponent(new Health(), {health:2})
    }
}
class CreatureGameObject extends GameObject{
    constructor(){
        super("CreatureGameObject", [], "default")
        this.addComponent(new Polygon(), {fillStyle: 'magenta', points: Assets.square})
        this.addComponent(new Collider())
        this.addComponent(new CreatureGameObjectController())
        this.addComponent(new RigidBody())
        this.transform.scale = new Vector2(20, 20)
        this.transform.position = new Vector2(200, 200)
        this.transform.rotation = 0

    }
}

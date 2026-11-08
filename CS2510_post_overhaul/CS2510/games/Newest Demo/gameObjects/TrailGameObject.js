class TrailGameObject extends GameObject{
    constructor(){
        super("TrailGameObject", [], "default")
        this.addComponent(new Polygon(), {fillStyle: 'orange', points: Assets.square})
        //this.addComponent(new Collider())
        //this.addComponent(new RigidBody())
        this.addComponent(new TrailGameObjectController)
        this.transform.scale = new Vector2(20,20)
    }
}

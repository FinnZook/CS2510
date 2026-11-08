class SniperGameObject extends GameObject{
    constructor(){
        super("SniperGameObject", [], "default")
        this.addComponent(new Polygon(), {fillStyle: 'black', points: Assets.square})
        //this.addComponent(new Collider())
        //this.addComponent(new RigidBody())
        this.addComponent(new SniperGameObjectController)
        this.transform.scale = new Vector2(20, 20)
    }
}

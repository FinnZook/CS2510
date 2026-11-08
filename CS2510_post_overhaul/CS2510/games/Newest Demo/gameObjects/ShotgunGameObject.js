class ShotgunGameObject extends GameObject{
    constructor(){
        super("ShotgunGameObject", [], "default")
        this.addComponent(new Polygon(), {fillStyle: 'magenta', points: Assets.triangle})
        //this.addComponent(new Collider())
        //this.addComponent(new RigidBody())
        this.addComponent(new ShotgunGameObjectController)
        this.transform.scale = new Vector2(20,20)
    }
}

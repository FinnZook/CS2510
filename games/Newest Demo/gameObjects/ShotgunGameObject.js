class ShotgunGameObject extends GameObject{
    constructor(){
        super("ShotgunGameObject", [], "default")
        this.addComponent(new Polygon(), {fillStyle: 'magenta', points: Assets.shotgun})
        //this.addComponent(new Collider())
        //this.addComponent(new RigidBody())
        this.addComponent(new ShotgunGameObjectController)
        this.transform.scale = new Vector2(4,4)
    }
}

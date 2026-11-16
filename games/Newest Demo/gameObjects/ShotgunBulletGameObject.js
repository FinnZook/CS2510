class ShotgunBulletGameObject extends GameObject{
    constructor(){
        super("ShotgunBulletGameObject", [], "default")
        this.addComponent(new Polygon(), {fillStyle: 'magenta', points: Assets.square})
        this.addComponent(new Collider())
        //this.addComponent(new RigidBody())
        this.addComponent(new ShotgunBulletGameObjectController)
        this.transform.scale = new Vector2(10,10)
    }
}

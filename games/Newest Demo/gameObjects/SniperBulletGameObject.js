class SniperBulletGameObject extends GameObject{
    constructor(){
        super("SniperBulletGameObject", ["sniper_bullet"], "default")
        this.addComponent(new Polygon(), {fillStyle: 'black', points: Assets.square})
        this.addComponent(new Collider())
        //this.addComponent(new RigidBody())
        this.addComponent(new SniperBulletGameObjectController)
        this.transform.scale = new Vector2(10,10)
    }
}

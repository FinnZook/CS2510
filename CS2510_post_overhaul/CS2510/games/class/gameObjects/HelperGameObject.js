class HelperGameObject extends GameObject{
    constructor(){
        super("HelperGameObject", [])
        this.addComponent(new Polygon(), {fillStyle: "red", points:Assets.triangle})
        this.transform.scale = new Vector2(1,1)
    }
}
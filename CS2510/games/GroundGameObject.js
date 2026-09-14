class GroundGameObject extends GameObject {
    constructor(){
    super()
        this.addComponent(new Polygon(), {fillStyle:"grey", points:[
            new Vector2(250, 400),
            new Vector2(850, 400),
            new Vector2(850, 500),
            new Vector2(250, 500),
        ]})
}


}
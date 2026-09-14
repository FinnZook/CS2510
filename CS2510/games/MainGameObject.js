class MainGameObject extends GameObject{
constructor(){
    super()
        this.addComponent(new UpdateComponent())
        this.addComponent(new Polygon(), {fillStyle:"turquoise", points:[
            new Vector2(0, 30),
            new Vector2(30, 30),
            new Vector2(30, 0),
            new Vector2(0, 0),

        ]})
}



}
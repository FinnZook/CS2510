class CreatureGameObject extends GameObject{
constructor(){
    super("Creature", [], "player")
        this.addComponent(new CreatureUpdateComponent())
        this.addComponent(new Polygon(), {fillStyle:"turquoise", points:[
            new Vector2(0, 30),
            new Vector2(30, 30),
            new Vector2(30, 0),
            new Vector2(0, 0),

        ]})
}



}
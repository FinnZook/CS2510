class CreatureGameObject extends GameObject {
    constructor(given_alpha=1){
    super("Creature", [], "player")
        this.addComponent(new CreatureUpdateComponent())

        this.trail_polygon = new Polygon();

        this.addComponent(this.trail_polygon, {
        fillStyle: "red",
        alpha: given_alpha,
        points: [
        new Vector2(0, 30),
        new Vector2(30, 30),
        new Vector2(30, 0),
        new Vector2(0, 0),
    ]
});
}


}
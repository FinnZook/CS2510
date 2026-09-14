class MainScene extends Scene{
    constructor(){
        super()
        this.instantiate(new MainGameObject(), new Vector2(50, 50))
        this.instantiate(new GroundGameObject(), new Vector2(0, 0))
    }
    
}
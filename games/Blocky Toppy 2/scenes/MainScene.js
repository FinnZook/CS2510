class MainScene extends Scene{
    constructor(){
        super()
        this.instantiate(new MainGameObject(), new Vector2(530, 200))
        this.instantiate(new GroundGameObject(), new Vector2(0, 0))


        

    }

    
    
}
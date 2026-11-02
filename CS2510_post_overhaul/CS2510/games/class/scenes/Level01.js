class Level01 extends Scene{
    constructor(){
        super("black")
        
        this.instantiate(new EnemyGameObject(), new Vector2(25, 150), Math.PI)
        
        this.instantiate(new LevelControllerGameObject())
    }
}
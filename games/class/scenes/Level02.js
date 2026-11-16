class Level02 extends Scene{
    constructor(){
        super()
        
        this.instantiate(new EnemyGameObject(), new Vector2(25, 150), Math.PI)
        this.instantiate(new EnemyGameObject(), new Vector2(125, 150), Math.PI)
        
         this.instantiate(new LevelControllerGameObject())
    }
}
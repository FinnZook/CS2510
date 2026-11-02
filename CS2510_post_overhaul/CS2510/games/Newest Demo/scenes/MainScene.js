class MainScene extends Scene{
  constructor(){
    super()
    this.instantiate(new SquareGameObject(), new Vector2(0,0), 0)
    this.instantiate(new CreatureGameObject(), new Vector2(0,0), 100)


    this.instantiate(new PlatformGameObject(), new Vector2(0,50), 0)
  }
}

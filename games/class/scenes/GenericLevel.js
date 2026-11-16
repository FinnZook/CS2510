class GenericLevel extends Scene{
    constructor(){
        super()
        let mainGameObject = this.instantiate(new MainGameObject(), new Vector2(50, 300))
        //this.instantiate(new MainGameObject(), new Vector2(50, 300))
        this.instantiate(new PointsGameObject(), new Vector2(0, 20))



    let helperGameObject = this.instantiate(new HelperGameObject(), new Vector2(50, 50))

    helperGameObject.transform.setParent(mainGameObject.transform)

    let sceneTimer = new GameObject("SceneTimer", [], "UI")
    sceneTimer.addComponent(new TextLabel(), {fillStyle:"gray", font:"30px Times"})
    sceneTimer.addComponent(new SceneTimerController())
    this.instantiate(sceneTimer, new Vector2(0, 50))


    let wrappedText = new GameObject("WrappedText", [], "UI")
    wrappedText.addComponent(new MultiLineTextLabel(), {fillStyle:"gray", text:"We the people of the United States, in order to make a more prefect union, do ordain and establish this", font:"30px Times"})
    this.instantiate(wrappedText, new Vector2(0, 100))

    }
}
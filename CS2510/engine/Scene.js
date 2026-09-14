class Scene
{
    gameObejects = [];

    instantiate(gameObject, position = new Vector2(0, 0)){
        this.gameObejects.push(gameObject);
        gameObject.transform.position = position;

    }

    start(){
    for (const gameObject of this.gameObejects)
        {
            gameObject.start();
        }
    }


    update(){
        for (const gameObject of this.gameObejects)
        {
            gameObject.update();
        }
    }


    draw(ctx){
        for (const gameObject of this.gameObejects)
        {
            gameObject.draw(ctx);
        }
    }
}
    function instantiate(gameObject, position = new Vector2(0,0)){
        Engine.currentScene.instantiate(gameObject, position)
}
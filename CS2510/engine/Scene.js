

class Scene{
    
    gameObjects = []

    
    constructor(backgroundColor){
        let cameraGameObject = new GameObject("MainCamera", ["MainCamera"])
        cameraGameObject.addComponent(new Camera())
        this.instantiate(cameraGameObject)
        if (backgroundColor)
            cameraGameObject.getComponent(Camera).backgroundColor = backgroundColor
    }
    
    
    
    instantiate(gameObject, position = new Vector2(0,0), rotation = 0){
        this.gameObjects.push(gameObject)
        gameObject.transform.position = position
        gameObject.transform.rotation = rotation
        return gameObject;
    }

    
    
    start(){
        for(const gameObject of this.gameObjects){
            gameObject.start()
        }
    }

    
    
    update(){
        for(const gameObject of this.gameObjects){
            gameObject.update()
        }

        let temp = []
        for(const gameObject of this.gameObjects){
            if(!gameObject.markForDestroy)
                temp.push(gameObject)
        }
        this.gameObjects = temp
    }

    
    
    
    draw(ctx){


            // Start camera code
            ctx.fillStyle = Camera.main.backgroundColor
            ctx.fillRect(0, 0, Engine.canvas.width, Engine.canvas.height)

            ctx.save()
            ctx.translate(Engine.canvas.width/2, Engine.canvas.height/2)
            ctx.translate(-Camera.main.transform.position.x, -Camera.main.transform.position.y)

        for (const layer of Engine.layers.filter(l=>l!="UI"))
        {

            for(const gameObject of this.gameObjects.filter(go => go.layer == layer)){
                gameObject.draw(ctx)
            }
        }

        
        ctx.restore();
        // Stop camera code


        // UI Layer
        for(const gameObject of this.gameObjects.filter(go=>go.layer == "UI")){
            gameObject.draw(ctx)
        }
    }
}






function instantiate(gameObject, position = new Vector2(0,0), rotation = 0){
    SceneManager.currentScene.instantiate(gameObject, position, rotation)
    return gameObject
}
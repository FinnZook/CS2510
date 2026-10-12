class Engine
{
    /**
    * @type{HTMLCanvasElement};
    */
   // ^ask

    static canvas

    /**
    * @type{CanvasRenderingContext2D}
    */  
   // ^ask
    

    static ctx


    static layers = ["default", "UI"]




    static start(nextScene, settings)
    {
        
        Engine.canvas = document.querySelector("#canv");

    

        Engine.ctx = Engine.canvas.getContext("2d")

        
        



        //OG//Engine.canvas = document.querySelector("#canv");

        //OG//Engine.ctx = Engine.canvas.getContext("2d");

        addEventListener("keydown", Input.keydown);
        addEventListener("keyup", Input.keyup);

        addEventListener("mousedown", Input.mousedown);
        addEventListener("mouseup", Input.mouseup);

        SceneManager.nextScene = nextScene



        if(settings){
            Engine.layers = settings.layers
        }

        requestAnimationFrame(Engine.gameLoop);


    }


    static gameLoop()
    {
        SceneManager.update()

        Engine.update();
        Engine.draw();

        Time.update();



        
        requestAnimationFrame(Engine.gameLoop);
    }

    static update()
    {
        SceneManager.currentScene.start()
        SceneManager.currentScene.update()
        // // ^ ^ Engine.currentScene.update();
    }


    static draw()
    {
        // Clear the canvas
        Engine.canvas.width = window.innerWidth;
        Engine.canvas.height = window.innerHeight;
        SceneManager.currentScene.draw(Engine.ctx);
        // // ^ Engine.currentScene.draw(Engine.ctx);

    }
}
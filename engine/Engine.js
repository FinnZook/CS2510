class Engine
{

    static canvas

    static ctx

    static layers = ["default", "UI"]


    static aspectRatio

    static cameraWidthInWorldSpace

    static letterBoxingWidth = 0
    static letterBoxingHeight = 0


    static letterBoxWidth
    
    static letterBoxHeight












    static start(nextScene, settings)
    {
        
        Engine.canvas = document.querySelector("#canv");

        Engine.ctx = Engine.canvas.getContext("2d")

        addEventListener("keydown", Input.keydown);
        addEventListener("keyup", Input.keyup);

        addEventListener("mousedown", Input.mousedown);
        addEventListener("mouseup", Input.mouseup);

        addEventListener("mousemove", Input.mousemove)

        SceneManager.nextScene = nextScene

        if(settings){
            Engine.layers = settings.layers

            Engine.aspectRatio = settings.aspectRatio
            Engine.cameraWidthInWorldSpace = settings.cameraWidthInWorldSpace

        }

        // // // // Time.reset(settings?.timeScale ?? 1);

        requestAnimationFrame(Engine.gameLoop);

    }

    static gameLoop(timestamp)
    {
        Time.update(timestamp); // // mine

        SceneManager.update()

        Engine.canvas.width = window.innerWidth;
        Engine.canvas.height = window.innerHeight;


        Engine.letterBoxingWidth = 0;
            Engine.letterBoxingHeight = 0;

            if (Engine.aspectRatio)
            {
                const { width, height } = Engine.canvas;
                const currentAspectRatio = width / height;

                if (currentAspectRatio > Engine.aspectRatio)
                {
                    Engine.letterBoxingWidth = width - height * Engine.aspectRatio;
                }
                else if (currentAspectRatio < Engine.aspectRatio)
                {
                    Engine.letterBoxingHeight = height - width / Engine.aspectRatio;
                }
            }

        Engine.update();
        Engine.draw();

        Input.update();

        requestAnimationFrame(Engine.gameLoop);
    }

    static update()
    {
        SceneManager.currentScene.start()
        SceneManager.currentScene.update()
        
    }

    static draw()
    {
        
        
        SceneManager.currentScene.draw(Engine.ctx);

    }
}

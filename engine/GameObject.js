class GameObject
{
    components = [];
    markForDestroy = false;

    name
    tags = []
    layer = "default"

    get transform(){
        return this.components[0];
    }

    constructor(name, tags = [], layer = 'default'){
        this.addComponent(new Transform());
        this.name = name
        this.tags = tags
        this.layer = layer
    }

    addComponent(component, parameters){
        Object.assign(component, parameters);
        this.components.push(component);
        component.gameObject = this;
    }



    broadcastMessage(message, args = [])  
    {
        for (const component of this.components)
        {
            component[message]?.(...args)
        }
    }


    start()
    {
        for (const component of this.components)
        {
            if (!component.didStart) {
            component.didStart = true;
            component.start?.();
        }
        }
    }

    update()
    {
        for (const component of this.components)
        {
            component.update?.();
        }
    }


    draw(ctx)
    {

        ctx.save();

        ctx.setTransform(ctx.getTransform().multiply(this.transform.getWorldMatrix()))

        for (const component of this.components)
        {
            component.draw?.(ctx);
        }


        ctx.restore();
    }


    destroy()
    {
        this.markForDestroy = true;
    }

    getComponent(type){
        return this.components.find(c => c instanceof type)
    }


    static find(name) {
    return SceneManager.currentScene.gameObjects.find(go => go.name === name);
}


    static findGameObjectsWithTag(tag){
        return SceneManager.currentScene.gameObjects.filter(go=>go.tags.includes(tag) )
    }


    static findGameObjectsByType(type)
    {
        return SceneManager.currentScene.gameObjects.filter(go=>go.components.find(c=>c instanceof type))
    }





}
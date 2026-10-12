

class Input{
    
    
    
    static keysDown = []


    static keysDownThisFrame = []

    static keysUpThisFrame = []
    
    
    static mouseButtonsDown = []
    static mouseButtonsDownThisFrame = []
    static mouseButtonsUp = []
    static mouseButtonsUpThisFrame = [] 
    


    static mousedown(event){
    if(!Input.mouseButtonsDown.includes(event.button))
        {
            Input.mouseButtonsDown.push(event.button)
            Input.mouseButtonsDownThisFrame.push(event.button)
        }
    }


    static mouseup(event){
    let index = Input.mouseButtonsDown.indexOf(event.button)

        
        Input.mouseButtonsDown.splice(index,1)


        Input.mouseButtonsUpThisFrame.push(event.button)
    }










    static keydown(event){
        
        
        if(!Input.keysDown.includes(event.code))
        {
            Input.keysDown.push(event.code)
            Input.keysDownThisFrame.push(event.code)

        }
    }

    
    
    
    static keyup(event){
        
        

        
        let index = Input.keysDown.indexOf(event.code)

        
        Input.keysDown.splice(index,1)


        Input.keysUpThisFrame.push(event.code)
    }




    static Update(){
        Input.keysDownThisFrame = []
        Input.keysUpThisFrame = []
        Input.mouseButtonsDownThisFrame = []
        Input.mouseButtonsUpThisFrame = []
    }
}
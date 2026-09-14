class UpdateComponent extends Component {
    
    can_we_jump_yet = true

    start(){
        this.timeSinceLastLaser = 0
    }
    update() {
        // // //this.timeSinceLastLaser += 1
        if (Input.keysDown.includes("ArrowRight"))
            this.transform.position.x = this.transform.position.x + 3

        if (Input.keysDown.includes("ArrowLeft"))
            this.transform.position.x = this.transform.position.x - 3

        
        
        if (Input.keysDown.includes("ArrowUp") && this.can_we_jump_yet) {
            // - - - - - my jump stuff - - - - -
            this.transform.position.y -= 70
            this.can_we_jump_yet = false

            setTimeout(() => {
                this.can_we_jump_yet = true
            }, 500)
            // - - - - - - - - - - - - - - - - - 

        }
        

        this.Gravity_Process()


        
        
        if (Input.keysDown.includes("ArrowDown"))
        {
            this.transform.position.y = this.transform.position.y + 1
        }
        
        
        // // if(this.timeSinceLastLaser > 20){
        // //     this.timeSinceLastLaser = 0
        // //     instantiate(new LaserGameObject(), this.transform.position.clone())
        // // }
    
    
    
    
    
    }
    

    Gravity_Process()
    {
        if ((this.transform.position.y < 370) || ((this.gameObject.transform.position.x < 220) || (this.gameObject.transform.position.x > 850)))
        {
        this.transform.position.y += 1
        }

    }

    

}
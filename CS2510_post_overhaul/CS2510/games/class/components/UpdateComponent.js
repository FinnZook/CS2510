class UpdateComponent extends Component {

    speed = 50
    laser_interval = 0.35
    start(){
        this.timeSinceLastLaser = 0
    }
    update() {
        this.timeSinceLastLaser += Time.deltaTime

        if (Input.keysDown.includes("ArrowRight"))
            this.transform.position.x = this.transform.position.x + Time.deltaTime * this.speed

        if (Input.keysDown.includes("ArrowLeft"))
            this.transform.position.x = this.transform.position.x - Time.deltaTime * this.speed

        if (Input.keysDown.includes("ArrowUp"))
            this.transform.position.y = this.transform.position.y - Time.deltaTime * this.speed

        if (Input.keysDown.includes("ArrowDown"))
            this.transform.position.y = this.transform.position.y + Time.deltaTime * this.speed

        while(this.timeSinceLastLaser >= this.laser_interval){
            this.timeSinceLastLaser -= this.laser_interval
            instantiate(new LaserGameObject(), this.transform.position.clone())
        }

        Camera.main.transform.position = this.transform.position.clone()


    }
        //
        // some of the repository edits
        //
        
        onCollisionStay(other)
        {
            console.log(other)
        }

        onMouseOver()
        {
        console.log("Mouse Over")
        }


    
}

class SniperBulletGameObjectController extends Component{
    
    speed 
    angle 
    
    
    
    start(){
        const mouse_position_vect = new Vector2(Globals.mouse_x, Globals.mouse_y)

        const direction_towards_player = mouse_position_vect.minus(this.transform.position)

        if (direction_towards_player.x !== 0 || direction_towards_player.y !== 0) 
        {
            this.transform.rotation = Math.atan2(direction_towards_player.y, direction_towards_player.x)
        }

        this.angle = this.transform.rotation 
        this.speed = Globals.shotgun_bullet_speed


    }
    update()
    {
        // uncomment this for some FREAKY bullets
        // const spread = Globals.shotgun_bullet_spread * ((Math.floor(Math.random() * 10) + 1)) // this is a random number gen
        // const speed = 10 // World units per update
        // const angle = this.transform.rotation + spread
        if (this.angle !== undefined) {
    this.transform.position.x += Math.cos(this.angle) * this.speed
    this.transform.position.y += Math.sin(this.angle) * this.speed
}

    }
}

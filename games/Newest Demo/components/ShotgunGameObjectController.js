class ShotgunGameObjectController extends Component{
    
    player_weapon

   


    start()
    {
        
        this.player_weapon = Globals.player_weapon

        if (this.player_weapon == "shotgun")
            {
                this.Show_Shotgun()
            }
            else
            {
                this.Hide_Shotgun()
            }


    }
    
    
    update()
    {
        

        if (this.player_weapon != Globals.player_weapon)
        {
            this.player_weapon = Globals.player_weapon
            if (this.player_weapon == "shotgun")
            {
                this.Show_Shotgun()
            }
            else
            {
                this.Hide_Shotgun()
            }
        }


        if (this.player_weapon == "shotgun")
        {
            this.transform.position.x = Globals.player_x
            this.transform.position.y = Globals.player_y

            // I realize that I turn mouse position from a vector, into 2 different vars for globals, and then back to a vector here

            const mouse_position_vect = new Vector2(Globals.mouse_x, Globals.mouse_y)

            const direction_towards_player = mouse_position_vect.minus(this.transform.position)

            if (direction_towards_player.x !== 0 || direction_towards_player.y !== 0) 
            {
                    this.transform.rotation = Math.atan2(direction_towards_player.y, direction_towards_player.x)
            }

        }



        if ((Input.mouseButtonsDownThisFrame.includes(0)) && (this.player_weapon == "shotgun"))
        {
            //console.log("ready to fire")
            // Fire the shotgun

            instantiate(new ShotgunBulletGameObject(), this.transform.position.clone())
            

        }

    }


    Show_Shotgun()
    {
            this.gameObject.getComponent(Polygon).alpha = 1;

    }



    Hide_Shotgun()
    {
            this.gameObject.getComponent(Polygon).alpha = 0;

    }



}

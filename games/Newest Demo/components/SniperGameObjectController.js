class SniperGameObjectController extends Component{
    
    

    player_weapon




    start()
    {
        
        this.player_weapon = Globals.player_weapon

        if (this.player_weapon == "sniper")
            {
                this.Show_Sniper()
            }
            else
            {
                this.Hide_Sniper()
            }


    }
    
    
    update()
    {
        

        if (this.player_weapon != Globals.player_weapon)
        {
            this.player_weapon = Globals.player_weapon
            if (this.player_weapon == "sniper")
            {
                this.Show_Sniper()
            }
            else
            {
                this.Hide_Sniper()
            }
        }


        if (this.player_weapon == "sniper")
        {
            this.transform.position.x = Globals.player_x
            this.transform.position.y = Globals.player_y


            const mouse_position_vect = new Vector2(Globals.mouse_x, Globals.mouse_y)

            const direction_towards_player = mouse_position_vect.minus(this.transform.position)

            if (direction_towards_player.x !== 0 || direction_towards_player.y !== 0) 
            {
                    this.transform.rotation = Math.atan2(direction_towards_player.y, direction_towards_player.x)
            }


        }



        if ((Input.mouseButtonsDownThisFrame.includes(0)) && (this.player_weapon == "sniper"))
        {
            //console.log("ready to fire")
            // Fire the shotgun

            instantiate(new SniperBulletGameObject(), this.transform.position.clone())
            

        }


    }


    Show_Sniper()
    {
            this.gameObject.getComponent(Polygon).alpha = 1;

    }



    Hide_Sniper()
    {
            this.gameObject.getComponent(Polygon).alpha = 0;

    }





}

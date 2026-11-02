class CreatureUpdateComponent extends Component {

    // Movement tuning variables, these are grabbed from globals
    terminal_horizontal_velocity
    horizontal_jolt
    vertical_jolt
    jump_force
    jump_cooldown
    dash_cooldown
    vertical_dash_force
    horizontal_dash_force
    horiz_movement_noise_threshhold
    how_many_trails_to_spawn
    trail_spawn_interval
    max_stored_dashes


    // Status Stuff
    stored_double_jump = true
    jump_cooldown_remaining = 0
    dash_cooldown_remaining = 0
    can_we_jump_yet = true
    are_we_on_platform = false
    vertical_velocity = 0
    horizontal_velocity = 0


    // More Status Stuff
    last_direction = "N"
    stored_dashes = 0
    can_we_dash_yet = true
    spawn_player_trails = false
    how_many_trails_spawned = 0
    



    // = = - - Constants - - = = //
    left_platform_edge = 220
    right_platform_edge = 850







    /// Le Behavior Functions ///
    /// Behavior_Loop()
    /// Sensing_Function()
    /// Thinking_Function()
    /// Acting_Function()



    /// - - - - - Sensing Honing Variables - - - - - ///
    similar_cordinate_threshold = 10
    off_the_platform_threshhold_y = 200


    /// - - - - - Thinking Honing Variables - - - - - ///
    // these might change as creature learns, maybe
    threshold_for_melee = 50
    threshold_for_dash = 100
    threshold_for_shotgun = 200
    threshold_for_sniper = 300
    desirable_distance_min = 0
    desirable_distance_max = 10
    increment__out_of_desirable_distance_max = 10







    /// = = = = = Sensing Variables = = = = = = ///
    player_direction = "none"
    player_distance = 0





    // = = = = = Thinking Variables = = = = = = ///
    Offensive_Moving_Incentive = 0
    Defensive_Moving_Incentive = 0
    Falling_Moving_Incentive = 0
    i_want_to_move = false
    direction_i_want_to_move = "none"
    i_want_to_dash = false
    direction_i_want_to_dash = "none"
    i_want_to_use_melee = false
    direction_i_want_to_melee = "none"
    i_want_to_use_parry = false
    direction_i_want_to_parry = "none"
    i_want_to_use_shotgun = false
    direction_i_want_to_shotgun = "none"
    i_want_to_use_sniper = false
    direction_i_want_to_sniper = "none"
    i_am_in_falling_danger = false


    // = = = = = Deciding Variables = = = = = = ///
    chosen_movement;



    start()
    {
        this.trail_spawn_timer = 0;

        this.Get_Movement_Tuning_Variables()

        // // Dev
        // console.log("terminal_horizontal_velocity:", Globals.terminal_horizontal_velocity);
        // console.log("horizontal_jolt:", Globals.horizontal_jolt);
        // console.log("vertical_jolt:", Globals.vertical_jolt);
        // console.log("jump_force:", Globals.jump_force);
        // console.log("jump_cooldown:", Globals.jump_cooldown);
        // console.log("dash_cooldown:", Globals.dash_cooldown);
        // console.log("vertical_dash_force:", Globals.vertical_dash_force);
        // console.log("horizontal_dash_force:", Globals.horizontal_dash_force);
        // console.log("horiz_movement_noise_threshhold:", Globals.horiz_movement_noise_threshhold);
        // console.log("how_many_trails_to_spawn:", Globals.how_many_trails_to_spawn);
        // console.log("trail_spawn_interval:", Globals.trail_spawn_interval);
    }

    update()
    {

        
        this.Movement_Updates();

        this.Behavior_Loop()


    }


    Behavior_Loop()
    {
        this.Sensing_Function()
        this.Thinking_Function()
        this.Deciding_Function()
        this.Acting_Function()
    }


    


    Sensing_Function()
    {
        this.player_is_left_of_me = false
        this.player_is_right_of_me = false
        this.player_is_above_me = false
        this.player_is_below_me = false

        this.player_distance = Math.sqrt(Math.pow((Globals.player_x - this.transform.position.x), 2) + Math.pow((Globals.player_y - this.transform.position.y), 2))

        if ((Math.abs(Globals.player_x - this.transform.position.x)) > this.similar_cordinate_threshold)
        {
            if (Globals.player_x < this.transform.position.x)
            {
                this.player_is_left_of_me = true
            }
            if (Globals.player_x > this.transform.position.x)
            {
                this.player_is_right_of_me = true
            }
        }

        if ((Math.abs(Globals.player_y - this.transform.position.y)) > this.similar_cordinate_threshold)
        {
            if (Globals.player_y < this.transform.position.y)
            {
                this.player_is_above_me = true
            }
            if (Globals.player_y > this.transform.position.y)
            {
                this.player_is_below_me = true
            }
        }


        
        
    }




    Thinking_Function()
    {

        this.Offensive_Moving_Incentive = 0
        this.Defensive_Moving_Incentive = 0
        this.Falling_Moving_Incentive = 0
        
        
        if (this.player_distance > this.desirable_distance_max)
        {
            this.Offensive_Moving_Incentive += this.increment__out_of_desirable_distance_max
        }
        
        this.Falling_Moving_Incentive = this.Calculate_Fall_Risk() * 3        


        
    }



    Deciding_Function()
    {
        this.chosen_movement = "None" // None, To_Platform, To_Player, Away_From_Player, Evasive_Manuevers
        if ((this.Falling_Moving_Incentive > this.Defensive_Moving_Incentive) && (this.Falling_Moving_Incentive > this.Offensive_Moving_Incentive))
        {
            this.chosen_movement = "To_Platform"
        }
        else if (this.Offensive_Moving_Incentive > 0)
        {
            this.chosen_movement = "To_Player"
        }
        console.log(this.chosen_movement);
    }

    

    Acting_Function()
    {
        if (this.chosen_movement == "To_Platform")
        {
            this.Move_Back_To_Platform();
        }
        else if (this.chosen_movement == "To_Player")
        {
            this.Move_Towards_Player();
        }


        
    }





    Whats_Best_Current_Attack()
    {

    }


    Whats_Best_Future_Attack()
    {

    }


    risk

    Calculate_Fall_Risk()
    {
        this.risk = 0

        if (this.transform.position.x > this.right_platform_edge)
        {
            this.risk += 5
        }
        else if (this.transform.position.x > this.right_platform_edge + 100)
        {
            this.risk += 20
        }

        if (this.transform.position.x < this.left_platform_edge)
        {
            this.risk += 5
        }
        else if (this.transform.position.x < this.left_platform_edge - 100)
        {
            this.risk += 20
        }

        if (this.transform.position.y > 400)
        {
            this.risk += 5
        }
        else if (this.transform.position.y > 500)
        {
            this.risk += 10
        }
        else if (this.transform.position.y > 600)
        {
            this.risk += 20
        }

        if (this.stored_dashes == 0)
        {
            this.risk += 30
        }
        else if (this.stored_dashes == 1)
        {
            this.risk += 15
        }
        else if (this.stored_dashes == 2)
        {
            this.risk += 5
        }

        return this.risk
    }



    Move_Towards_Player()
    {
        if (this.player_is_left_of_me)
        {
            this.Move_Left()
        }
        if (this.player_is_right_of_me)
        {
            this.Move_Right()
        }
        if (this.player_is_above_me)
        {
            this.Jump()
        }
    }


    Move_Away_From_Player()
    {

    }

    right_or_left_of_platform
    underneath_platform

    Move_Back_To_Platform()
    {
        this.right_or_left_of_platform = ""
        this.underneath_platform = false


        if (this.transform.position.x > this.right_platform_edge)
        {
            this.right_or_left_of_platform = "Right"
            this.Move_Left();
        }
        if (this.transform.position.x < this.left_platform_edge)
        {
            this.right_or_left_of_platform = "Left"
            this.Move_Right();
        }

        if (this.transform.y > 400)
        {
            this.underneath_platform = true
            //direction = "up"
            this.Jump();
        }

        // here, make it set this.last_direction to either "N", "NE", "NW", "W", or "E" based off the vars above using if statements (follow my format)

        
    }




    Movement_Updates()
    {
        this.Gravity_Process();
        this.Velocity_Process();
        this.Update_Cooldowns()
        
        this.Reset_Air_Abilities();

    }





    Get_Movement_Tuning_Variables()
    {
        this.terminal_horizontal_velocity = Globals.terminal_horizontal_velocity

        this.horizontal_jolt = Globals.horizontal_jolt
        this.vertical_jolt = Globals.vertical_jolt

        this.horizontal_movement_force = Globals.horizontal_movement_force

        this.jump_force = Globals.jump_force
        this.jump_cooldown = Globals.jump_cooldown
        this.dash_cooldown = Globals.dash_cooldown

        this.vertical_dash_force = Globals.vertical_dash_force
        this.horizontal_dash_force = Globals.horizontal_dash_force

        this.horiz_movement_noise_threshhold = Globals.horiz_movement_noise_threshhold

        this.how_many_trails_to_spawn = Globals.how_many_trails_to_spawn
        this.trail_spawn_interval = Globals.trail_spawn_interval

        this.max_stored_dashes = Globals.max_stored_dashes
        this.stored_dashes = this.max_stored_dashes // set dashes to max for the start
    }



    Update_Cooldowns()
    {
        this.jump_cooldown_remaining = Math.max(0, this.jump_cooldown_remaining - Time.deltaTime); // this will catch a negative number 
        this.dash_cooldown_remaining = Math.max(0, this.dash_cooldown_remaining - Time.unscaledDeltaTime); // this prevents the dash from quickly using all dashes (becuause we pumped the timescale so high)
        this.can_we_jump_yet = this.jump_cooldown_remaining <= 0;
        this.can_we_dash_yet = this.dash_cooldown_remaining <= 0;
    }



    Dash()
    {
        if (!this.can_we_dash_yet) return false;

        if (this.are_we_on_platform)
        {
            this.stored_dashes = this.max_stored_dashes
        }
        else if (this.stored_dashes > 0)
        {
            this.stored_dashes -= 1
        }
        else
        {
            return false
        }

        this.vertical_velocity = 0
        this.horizontal_velocity = 0
        this.Apply_Dash_Force();

        this.can_we_dash_yet = false
        this.dash_cooldown_remaining = this.dash_cooldown

        return true
    }



    Move_Right()
    {
        if (this.horizontal_velocity < this.terminal_horizontal_velocity)
        {
            if (this.horizontal_velocity < 0.5)
            {
                this.horizontal_velocity += this.horizontal_jolt;
            }
        }

        this.horizontal_velocity += this.horizontal_movement_force * Time.deltaTime
    }



    Move_Left()
    {
        if ((this.horizontal_velocity *-1) > (this.terminal_horizontal_velocity*-1))
        {
            if (this.horizontal_velocity > -0.5)
            {
                this.horizontal_velocity -= this.horizontal_jolt;
            }
        }

        this.horizontal_velocity -= this.horizontal_movement_force * Time.deltaTime
    }



    Jump()
    {
        if (!this.can_we_jump_yet) return false;

        if (this.are_we_on_platform)
        {
            this.stored_double_jump = true
        }
        else if (this.stored_double_jump)
        {
            this.stored_double_jump = false
        }
        else
        {
            return false
        }

        this.vertical_velocity = 0
        this.vertical_velocity -= this.jump_force

        this.can_we_jump_yet = false
        this.jump_cooldown_remaining = this.jump_cooldown

        return true
    }



    Reset_Air_Abilities()
    {
        if (this.are_we_on_platform)
        {
            this.stored_dashes = this.max_stored_dashes
            this.stored_double_jump = true
        }
    }



    Move_Down()
    {
        if (this.vertical_velocity < 0)
        {
            this.vertical_velocity += this.vertical_jolt * Time.deltaTime;
        }

        this.vertical_velocity += 1 * Time.deltaTime
    }



    // Set_Last_Direction(up, down, left, right)
    // {
    //     if (up && right)
    //     {
    //         this.last_direction = "NE"
    //     }
    //     else if (up && left)
    //     {
    //         this.last_direction = "NW"
    //     }
    //     else if (up)
    //     {
    //         this.last_direction = "N"
    //     }
    //     else if (down && right)
    //     {
    //         this.last_direction = "SE"
    //     }
    //     else if (down && left)
    //     {
    //         this.last_direction = "SW"
    //     }
    //     else if (down)
    //     {
    //         this.last_direction = "S"
    //     }
    //     else if (right)
    //     {
    //         this.last_direction = "E"
    //     }
    //     else if (left)
    //     {
    //         this.last_direction = "W"
    //     }
    // }



    Apply_Dash_Force()
    {
        this.vertical_velocity = 0
        this.horizontal_velocity = 0

        this.spawn_player_trails = true
        this.how_many_trails_spawned = 0
        this.trail_spawn_timer = 0

        if (this.last_direction == "N")
        {
            this.vertical_velocity -= this.vertical_dash_force
        }
        else if (this.last_direction == "NE")
        {
            this.vertical_velocity -= this.vertical_dash_force
            this.horizontal_velocity += this.horizontal_dash_force
        }
        else if (this.last_direction == "E")
        {
            this.horizontal_velocity += this.horizontal_dash_force
        }
        else if (this.last_direction == "SE")
        {
            this.vertical_velocity += this.vertical_dash_force
            this.horizontal_velocity += this.horizontal_dash_force
        }
        else if (this.last_direction == "S")
        {
            this.vertical_velocity += this.vertical_dash_force
        }
        else if (this.last_direction == "SW")
        {
            this.vertical_velocity += this.vertical_dash_force
            this.horizontal_velocity -= this.horizontal_dash_force
        }
        else if (this.last_direction == "W")
        {
            this.horizontal_velocity -= this.horizontal_dash_force
        }
        else if (this.last_direction == "NW")
        {
            this.vertical_velocity -= this.vertical_dash_force
            this.horizontal_velocity -= this.horizontal_dash_force
        }
    }



    Player_Trail_Protocol()
    {
        if (this.how_many_trails_spawned == 0)
        {
            this.trail_transperency = 1
        }

        if (this.how_many_trails_spawned < this.how_many_trails_to_spawn)
        {
            while (this.trail_spawn_timer >= this.trail_spawn_interval &&
                this.how_many_trails_spawned < this.how_many_trails_to_spawn)
            {
                instantiate(new PlayerTrailGameObject(this.trail_transperency), this.transform.position.clone());

                this.spawn_player_trails = false
                this.how_many_trails_spawned += 1
                this.trail_spawn_timer -= this.trail_spawn_interval
            }
        }
    }



    Gravity_Process()
    {
        this.Apply_Gravity();
        this.Apply_Horizontal_Friction();
    }



    Apply_Gravity()
    {
        if (((this.transform.position.y < 370) || (this.transform.position.y > 500)) || ((this.gameObject.transform.position.x < 220) || (this.gameObject.transform.position.x > 850)))
        {
            this.vertical_velocity += 0.3 * Time.deltaTime
            this.are_we_on_platform = false
        }
        else
        {
            this.are_we_on_platform = true

            if (this.transform.position.y > 371 && this.transform.position.y < 390)
            {
                this.vertical_velocity -= 0.1 * Time.deltaTime
            }
        }
    }



    Apply_Horizontal_Friction()
    {
        if (this.horizontal_velocity > 0)
        {
            if (this.horizontal_velocity > 0 && this.horizontal_velocity < this.horiz_movement_noise_threshhold)
            {
                this.horizontal_velocity = 0
            }
            else
            {
                this.horizontal_velocity -= 0.2 * Time.deltaTime
            }

            this.transform.position.x += this.horizontal_velocity * Time.deltaTime
        }

        if (this.horizontal_velocity < 0)
        {
            if (this.horizontal_velocity < 0 && this.horizontal_velocity > (-1 * this.horiz_movement_noise_threshhold))
            {
                this.horizontal_velocity = 0
            }
            else
            {
                this.horizontal_velocity += 0.2 * Time.deltaTime
            }

            this.transform.position.x += this.horizontal_velocity * Time.deltaTime
        }
    }



    Velocity_Process()
    {
        if (this.vertical_velocity > 0)
        {
            if (this.are_we_on_platform)
            {
                this.vertical_velocity = 0
            }
            else
            {
                this.transform.position.y += this.vertical_velocity * Time.deltaTime
            }
        }

        if (this.vertical_velocity < 0)
        {
            this.transform.position.y += this.vertical_velocity * Time.deltaTime
        }
    }

}
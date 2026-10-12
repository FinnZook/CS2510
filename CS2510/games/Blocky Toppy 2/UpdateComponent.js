class UpdateComponent extends Component {

    can_we_jump_yet = true

    are_we_on_platform = false

    time_multiplier = 50

    vertical_velocity = 0

    horizontal_velocity = 0

    terminal_horizontal_velocity = 999999

    horizontal_jolt = 3 // this is the initial horizontal jolt that happens when you first press left or right, it makes the movement feel more responsive

    vertical_jolt = 5 // this is the initial vertical jolt that happens when you first press up or down, it makes the movement feel more responsive

    vertical_dash_force = 15

    horizontal_dash_force = 15

    horiz_movement_noise_threshhold = 0.5 // horiz movement under this level gets set to 0 so it doesn't slowly move forever 

    stored_double_jump = true

    last_direction = "N" // this can be N, NE, E, SE, S, SW, W, NW

    stored_dash = true

    can_we_dash_yet = false

    spawn_player_trails = false

    how_many_trails_to_spawn = 6

    trail_spawn_interval = 0.010

    // trail_transperency = 1 // 1 is fully opaque, 0 is fully transparent
    // trail_transperency_interval = 0.1

    how_many_trails_spawned = 0

    // DO NOT TOUCH THESE

    up_pressed = false

    down_pressed = false

    left_pressed = false

    right_pressed = false

    // // /// /// /// ////

    start(){

        this.timeSinceLastLaser = 0

        this.trail_spawn_timer = 0;

    }

    update() {

        // // //this.timeSinceLastLaser += 1

        this.trail_spawn_timer += Time.deltaTime * this.time_multiplier;

        this.Player_Trail_Protocol();

        if (Input.keysDown.includes("Space"))

        {

            if (this.are_we_on_platform)

            {

                this.stored_dash = true

                this.vertical_velocity = 0

                this.horizontal_velocity = 0

                this.Dashing_Protocal();

                this.can_we_dash_yet = false

                setTimeout(() => {

                    this.can_we_dash_yet = true

                }, 600 / this.time_multiplier)

            }

            else if (this.stored_dash)

            {

                this.stored_dash = false

                this.vertical_velocity = 0

                this.horizontal_velocity = 0

                this.Dashing_Protocal();

                this.can_we_dash_yet = false

                setTimeout(() => {

                    this.can_we_dash_yet = true

                }, 600 / this.time_multiplier)

            }

            //this.horizontal_velocity += 0.3 * Time.deltaTime * this.time_multiplier

        }

        if (Input.keysDown.includes("ArrowRight") || Input.keysDown.includes("KeyD"))

        {

            // // //this.transform.position.x = this.transform.position.x + 3

            if ((this.horizontal_velocity < this.terminal_horizontal_velocity))

            {

                if (this.horizontal_velocity < 0.5) // initial horiz jolt for more responsiv movement

                {

                    this.horizontal_velocity += this.horizontal_jolt;   

                }

            }

            this.horizontal_velocity += 0.3 * Time.deltaTime * this.time_multiplier

        }

        if (Input.keysDown.includes("ArrowLeft") || Input.keysDown.includes("KeyA"))

        {

            // // //this.transform.position.x = this.transform.position.x - 3

            if ((this.horizontal_velocity *-1) > (this.terminal_horizontal_velocity*-1))

            {

                if (this.horizontal_velocity > -0.5) // initial horiz jolt for more responsiv movement

                {

                    this.horizontal_velocity -= this.horizontal_jolt;

                }

            }

            this.horizontal_velocity -= 0.3 * Time.deltaTime * this.time_multiplier

        }

        if ((Input.keysDown.includes("ArrowUp") || Input.keysDown.includes("KeyW")) && this.can_we_jump_yet) {

            // < < legacy jump system > >

            // // // - - - - - my jump stuff - - - - -

            // // if (this.are_we_on_platform)

            // // {

            // //     this.transform.position.y -= 90

            // //     this.can_we_jump_yet = false

            // //     setTimeout(() => {

            // //         this.can_we_jump_yet = true

            // //     }, 500)

            // // }

            // // // - - - - - - - - - - - - - - - - - 

            // - - - - - my jump stuff - - - - -

            if (this.are_we_on_platform)

            {

                this.stored_double_jump = true

                this.vertical_velocity = 0

                this.vertical_velocity -= 8 * Time.deltaTime * this.time_multiplier // this is the jump force

                this.can_we_jump_yet = false

                setTimeout(() => {

                    this.can_we_jump_yet = true

                }, 300 / this.time_multiplier)

            }

            else if (this.stored_double_jump)

            {

                this.stored_double_jump = false

                this.vertical_velocity = 0

                this.vertical_velocity -= 8 * Time.deltaTime * this.time_multiplier // this is the jump force

                this.can_we_jump_yet = false

                setTimeout(() => {

                    this.can_we_jump_yet = true

                }, 300 / this.time_multiplier)

            }

            // - - - - - - - - - - - - - - - - - 

        }

        if (this.are_we_on_platform){

            this.stored_dash = true

            this.stored_double_jump = true

        }

        if (Input.keysDown.includes("ArrowDown") || Input.keysDown.includes("KeyS"))

        {

            if (this.vertical_velocity < 0)

            {

                this.vertical_velocity += this.vertical_jolt;

            }

            this.vertical_velocity += 1 * Time.deltaTime * this.time_multiplier

        }

        this.Gravity_Process();

        this.Velocity_Process();

        this.Last_Direction_Tracking();

        Camera.main.transform.position = this.transform.position.clone();

        // // if(this.timeSinceLastLaser > 20){

        // //     this.timeSinceLastLaser = 0

        // //     instantiate(new LaserGameObject(), this.transform.position.clone())

        // // }

    }

    Last_Direction_Tracking()

    {

        this.up_pressed = false

        this.down_pressed = false

        this.left_pressed = false

        this.right_pressed = false

        if (Input.keysDown.includes("ArrowUp") || Input.keysDown.includes("KeyW"))

        {

            this.up_pressed = true

        }

        if (Input.keysDown.includes("ArrowDown") || Input.keysDown.includes("KeyS"))

        {

            this.down_pressed = true

        }

        if (Input.keysDown.includes("ArrowLeft") || Input.keysDown.includes("KeyA"))

        {

            this.left_pressed = true

        }

        if (Input.keysDown.includes("ArrowRight") || Input.keysDown.includes("KeyD"))

        {

            this.right_pressed = true

        }

        if (this.up_pressed && this.right_pressed)

        {

            this.last_direction = "NE"

        }

        else if (this.up_pressed && this.left_pressed)

        {

            this.last_direction = "NW"

        }

        else if (this.up_pressed)

        {

            this.last_direction = "N"

        }

        else if (this.down_pressed && this.right_pressed)

        {

            this.last_direction = "SE"

        }

        else if (this.down_pressed && this.left_pressed)

        {

            this.last_direction = "SW"

        }

        else if (this.down_pressed)

        {

            this.last_direction = "S"

        }

        else if (this.right_pressed)

        {

            this.last_direction = "E"

        }

        else if (this.left_pressed)

        {

            this.last_direction = "W"

        }

        //console.log("last direction: " + this.last_direction)

    }



    Dashing_Protocal()
    {

        this.vertical_velocity = 0

        this.horizontal_velocity = 0

        this.spawn_player_trails = true

        this.how_many_trails_spawned = 0

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

    Player_Trail_Protocol(){

        if (this.how_many_trails_spawned == 0){
            this.trail_transperency = 1
        }



        if (this.how_many_trails_spawned < this.how_many_trails_to_spawn)

        {

            if (this.trail_spawn_timer > this.trail_spawn_interval)

            {

                instantiate(new PlayerTrailGameObject(this.trail_transperency), this.transform.position.clone());


                this.spawn_player_trails = false

                this.how_many_trails_spawned += 1

                this.trail_spawn_timer = 0

            }

        }

    }

    Gravity_Process() 

    {

        if (((this.transform.position.y < 370) || (this.transform.position.y > 500)) || ((this.gameObject.transform.position.x < 220) || (this.gameObject.transform.position.x > 850)))

        {

            // we are not on platform

            this.vertical_velocity += 0.3 * Time.deltaTime * this.time_multiplier // this is gravity

            this.are_we_on_platform = false

        }

        else

        {

            // we are on the platform

            this.are_we_on_platform = true

            if (this.transform.position.y > 371 && this.transform.position.y < 390)

            {

                this.vertical_velocity -= 0.1 * Time.deltaTime * this.time_multiplier

            }

            // < < this is a version of the platform top de-lodging system that accidentally makes the platform bouncy > >

            // // if (this.transform.position.y > 370 && this.transform.position.y < 390)

            // // {

            // //     this.vertical_velocity -= 1

            // // }

        }

        // horiz friciton and horiz velocity actuation

        if (this.horizontal_velocity > 0)

        {

            // // terminal velocity

            // if (this.horizontal_velocity > this.terminal_horizontal_velocity)

            // {

            //     this.horizontal_velocity = this.terminal_horizontal_velocity

            // }

            if (this.horizontal_velocity > 0 && this.horizontal_velocity < this.horiz_movement_noise_threshhold)

            {

                this.horizontal_velocity = 0

            }

            else

            {

                this.horizontal_velocity -= 0.2 * Time.deltaTime * this.time_multiplier

            }

            this.transform.position.x += this.horizontal_velocity * Time.deltaTime * this.time_multiplier

        }

        if (this.horizontal_velocity < 0)

        {

            // // terminal velocity

            // if (this.horizontal_velocity < (-1 * this.terminal_horizontal_velocity))

            // {

            //     this.horizontal_velocity = (-1 * this.terminal_horizontal_velocity)

            // }

            if (this.horizontal_velocity < 0 && this.horizontal_velocity > (-1 * this.horiz_movement_noise_threshhold))

            {

                this.horizontal_velocity = 0

            }

            else

            {

                this.horizontal_velocity += 0.2 * Time.deltaTime * this.time_multiplier

            }

            this.transform.position.x += this.horizontal_velocity * Time.deltaTime * this.time_multiplier

        }

    }

    // only does vert velocity, horiz is done in gravity process

    Velocity_Process()

    {

        if (this.vertical_velocity > 0)

        {

            // we are falling downwards

            if (this.are_we_on_platform)

            {

                // we are falling down and hit platform

                this.vertical_velocity = 0

            }

            else

            {

                // we are falling down and not on platform

                this.transform.position.y += this.vertical_velocity * Time.deltaTime * this.time_multiplier

            }

        }

        if (this.vertical_velocity < 0)

        {

            // we are flying upwards

            this.transform.position.y += this.vertical_velocity * Time.deltaTime * this.time_multiplier

        }

        // if (this.vertical_velocity < 0)

        // {

        //     this.vertical_velocity += 0.5

        // }

    }

}
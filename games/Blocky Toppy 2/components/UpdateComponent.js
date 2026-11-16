class UpdateComponent extends Component {

    can_we_jump_yet = true

    are_we_on_platform = false

    vertical_velocity = 0

    horizontal_velocity = 0

    terminal_horizontal_velocity = 999999

    horizontal_jolt = 3 

    vertical_jolt = 6 

    jump_force = 20 / 3

    jump_cooldown = 0.3

    dash_cooldown = 0.6

    jump_cooldown_remaining = 0

    dash_cooldown_remaining = 0

    vertical_dash_force = 15

    horizontal_dash_force = 15

    horiz_movement_noise_threshhold = 0.5 

    stored_double_jump = true

    last_direction = "N" 

    stored_dash = true

    can_we_dash_yet = true

    spawn_player_trails = false

    how_many_trails_to_spawn = 6

    trail_spawn_interval = 5 / 6

    how_many_trails_spawned = 0

    up_pressed = false

    down_pressed = false

    left_pressed = false

    right_pressed = false

    start(){

        this.timeSinceLastLaser = 0

        this.trail_spawn_timer = 0;

    }

    update() {
        if (Time.deltaTime <= 0) return;

        this.jump_cooldown_remaining = Math.max(0, this.jump_cooldown_remaining - Time.deltaTime);
        this.dash_cooldown_remaining = Math.max(0, this.dash_cooldown_remaining - Time.deltaTime);
        this.can_we_jump_yet = this.jump_cooldown_remaining <= 0;
        this.can_we_dash_yet = this.dash_cooldown_remaining <= 0;

        this.trail_spawn_timer += Time.deltaTime;

        this.Player_Trail_Protocol();

        if (Input.keysDown.includes("Space") && this.can_we_dash_yet)

        {

            if (this.are_we_on_platform)

            {

                this.stored_dash = true

                this.vertical_velocity = 0

                this.horizontal_velocity = 0

                this.Dashing_Protocal();

                this.can_we_dash_yet = false

                this.dash_cooldown_remaining = this.dash_cooldown

            }

            else if (this.stored_dash)

            {

                this.stored_dash = false

                this.vertical_velocity = 0

                this.horizontal_velocity = 0

                this.Dashing_Protocal();

                this.can_we_dash_yet = false

                this.dash_cooldown_remaining = this.dash_cooldown

            }

        }

        if (Input.keysDown.includes("ArrowRight") || Input.keysDown.includes("KeyD"))

        {

            if ((this.horizontal_velocity < this.terminal_horizontal_velocity))

            {

                if (this.horizontal_velocity < 0.5) 

                {

                    this.horizontal_velocity += this.horizontal_jolt;   

                }

            }

            this.horizontal_velocity += 0.3 * Time.deltaTime

        }

        if (Input.keysDown.includes("ArrowLeft") || Input.keysDown.includes("KeyA"))

        {

            if ((this.horizontal_velocity *-1) > (this.terminal_horizontal_velocity*-1))

            {

                if (this.horizontal_velocity > -0.5) 

                {

                    this.horizontal_velocity -= this.horizontal_jolt;

                }

            }

            this.horizontal_velocity -= 0.3 * Time.deltaTime

        }

        if ((Input.keysDown.includes("ArrowUp") || Input.keysDown.includes("KeyW")) && this.can_we_jump_yet) {

            if (this.are_we_on_platform)

            {

                this.stored_double_jump = true

                this.vertical_velocity = 0

                this.vertical_velocity -= this.jump_force 

                this.can_we_jump_yet = false

                this.jump_cooldown_remaining = this.jump_cooldown

            }

            else if (this.stored_double_jump)

            {

                this.stored_double_jump = false

                this.vertical_velocity = 0

                this.vertical_velocity -= this.jump_force 

                this.can_we_jump_yet = false

                this.jump_cooldown_remaining = this.jump_cooldown

            }

        }

        if (this.are_we_on_platform){

            this.stored_dash = true

            this.stored_double_jump = true

        }

        if (Input.keysDown.includes("ArrowDown") || Input.keysDown.includes("KeyS"))

        {

            if (this.vertical_velocity < 0)

            {

                this.vertical_velocity += this.vertical_jolt * Time.deltaTime;

            }

            this.vertical_velocity += 1 * Time.deltaTime

        }

        this.Gravity_Process();

        this.Velocity_Process();

        this.Last_Direction_Tracking();

        Camera.main.transform.position = this.transform.position.clone();

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

    }

    Dashing_Protocal()
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

    Player_Trail_Protocol(){

        if (this.how_many_trails_spawned == 0){
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

class SquareController extends Component {
  speed = 100




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
    jump_was_held = false // this is so holding jump doesn't immediatly use the double jump
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
    up_pressed = false
    down_pressed = false
    left_pressed = false
    right_pressed = false



    
  start() {

    //this.trail_spawn_timer = 0;

    this.Get_Movement_Tuning_Variables()


  }

  update() {
    
    this.Update_Cooldowns();

        this.up_pressed = Input.keysDown.includes("ArrowUp") || Input.keysDown.includes("KeyW")
        this.down_pressed = Input.keysDown.includes("ArrowDown") || Input.keysDown.includes("KeyS")
        this.left_pressed = Input.keysDown.includes("ArrowLeft") || Input.keysDown.includes("KeyA")
        this.right_pressed = Input.keysDown.includes("ArrowRight") || Input.keysDown.includes("KeyD")

        let jump_just_pressed = this.up_pressed && !this.jump_was_held
        this.jump_was_held = this.up_pressed


        if (Input.keysDown.includes("Space"))
        {
            this.Dash();
        }

        if (this.right_pressed)
        {
            this.Move_Right();
        }

        if (this.left_pressed)
        {
            this.Move_Left();
        }

        if (jump_just_pressed)
        {
            this.Jump();
        }

        this.Reset_Air_Abilities();

        if (this.down_pressed)
        {
            this.Move_Down();
        }


        this.Gravity_Process();

        this.Set_Last_Direction(this.up_pressed, this.down_pressed, this.left_pressed, this.right_pressed);

        Globals.player_x = this.gameObject.transform.position.x
        Globals.player_y = this.gameObject.transform.position.y

        Camera.main.transform.position = this.transform.position.clone();

        this.Velocity_Process();
        this.are_we_on_platform = false



  }


  onCollisionStay(other, minimumTransformVector)
  {
    if (minimumTransformVector.y < 0)
    {
        this.are_we_on_platform = true
    }

    if ((minimumTransformVector.y < 0 && this.vertical_velocity > 0) ||
        (minimumTransformVector.y > 0 && this.vertical_velocity < 0))
    {
        this.vertical_velocity = 0
    }

    if ((minimumTransformVector.x < 0 && this.horizontal_velocity > 0) ||
        (minimumTransformVector.x > 0 && this.horizontal_velocity < 0))
    {
        this.horizontal_velocity = 0
    }
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

      this.vertical_velocity += 900 * Time.deltaTime
  }



  Set_Last_Direction(up, down, left, right)
  {
    if (up && right)
    {
        this.last_direction = "NE"
    }
    else if (up && left)
    {
        this.last_direction = "NW"
    }
    else if (up)
    {
        this.last_direction = "N"
    }
    else if (down && right)
    {
        this.last_direction = "SE"
    }
    else if (down && left)
    {
        this.last_direction = "SW"
    }
    else if (down)
    {
        this.last_direction = "S"
    }
    else if (right)
    {
        this.last_direction = "E"
    }
    else if (left)
    {
        this.last_direction = "W"
    }
  }



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
              instantiate(new PlayerTrailGameObject(this.trail_transperency), this.transform.position.clone()); // we don't use transform

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
      if (!this.are_we_on_platform)
      {
          this.vertical_velocity += 900 * Time.deltaTime
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
              this.horizontal_velocity -= 800 * Time.deltaTime
          }
      }

      if (this.horizontal_velocity < 0)
      {
          if (this.horizontal_velocity < 0 && this.horizontal_velocity > (-1 * this.horiz_movement_noise_threshhold))
          {
              this.horizontal_velocity = 0
          }
          else
          {
              this.horizontal_velocity += 800 * Time.deltaTime
          }
      }
  }



  Velocity_Process()
  {
      this.gameObject.getComponent(RigidBody).velocity.x = this.horizontal_velocity
      this.gameObject.getComponent(RigidBody).velocity.y = this.vertical_velocity
  }

}

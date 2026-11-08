class SquareController extends Component {
  speed = 100
  gravity = 80
  start() {
    this.isGrounded = false
  }


fixedUpdate()
{
this.isGrounded = false
//Check to see if the right arrow key is down.
    //If it is, move our character right
    if (Input.keysDown.includes("ArrowRight"))
      this.transform.position.x = this.transform.position.x + Time.deltaTime * this.speed

    //Check to see if the left arrow key is down.
    //If it is, move our character left
    if (Input.keysDown.includes("ArrowLeft"))
      this.transform.position.x = this.transform.position.x - Time.deltaTime * this.speed

}



  update() {
    
    if (Input.keysDown.includes("Space"))
    {
      if (this.isGrounded == true)
      {
      this.gameObject.getComponent(RigidBody).velocity.y = -100

      }
    }

  }




  onCollisionStay(other, minimumTransformVector)
  {
    this.gameObject.getComponent(RigidBody).velocity.y = 0
    this.isGrounded = true
  }
}

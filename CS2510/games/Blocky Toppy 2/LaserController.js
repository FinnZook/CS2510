class LaserController extends Component{
    update(){
        this.gameObject.transform.position.y -= 1;

        if (this.transform.position.y < 50)
        {
            this.gameObject.destroy();
        }

        let myPosition =  this.transform.position
        let enemyGameObject = GameObject.find("Enemy")
        if (enemyGameObject)
        {
            let enemyPosition = enemyGameObject.transform.position
            let distance = myPosition.minus(enemyPosition).magnitude
            if (distance < 20){
            this.gameObject.destroy()

            enemyGameObject.destroy()
            }
        }

    }
}
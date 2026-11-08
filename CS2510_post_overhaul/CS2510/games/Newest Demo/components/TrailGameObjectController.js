class TrailGameObjectController extends Component{
    trail_transperency = 1;
    trail_transperency_interval = 0.1;
    trail_transperency_increment = 5 / 6;
    timer = 0;

    start() {
        this.trail_transperency = this.gameObject.getComponent(Polygon).alpha;

        


        console.log("I lowkey exist")
    }

    update() {
        this.timer += Time.deltaTime;

        while (this.timer >= this.trail_transperency_interval && this.trail_transperency > 0) {
            this.timer = 0;
            this.trail_transperency = Math.max(0, this.trail_transperency - this.trail_transperency_increment);
            this.gameObject.getComponent(Polygon).alpha = this.trail_transperency;
        }

        if (this.trail_transperency <= 0.000001) {
            this.gameObject.getComponent(Polygon).alpha = 0;
            this.gameObject.destroy();
        }
    }
}

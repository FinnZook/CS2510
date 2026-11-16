class TrailUpdateComponent extends Component {
    trail_transperency = 1;
    trail_transperency_interval = 0.1;
    trail_transperency_increment = 5 / 6;
    timer = 0;

    start() {
        this.trail_transperency = this.gameObject.trail_polygon.alpha;
    }

    update() {
        this.timer += Time.deltaTime;

        while (this.timer >= this.trail_transperency_increment && this.trail_transperency > 0) {
            this.timer -= this.trail_transperency_increment;
            this.trail_transperency = Math.max(0, this.trail_transperency - this.trail_transperency_interval);
            this.gameObject.trail_polygon.alpha = this.trail_transperency;
        }

        if (this.trail_transperency <= 0.000001) {
            this.gameObject.trail_polygon.alpha = 0;
            this.gameObject.destroy();
        }
    }
}

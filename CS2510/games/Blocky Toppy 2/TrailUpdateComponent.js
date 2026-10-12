class TrailUpdateComponent extends Component {

    trail_transperency = 1 
    trail_transperency_interval = 0.1
    trail_transperency_increment = 0.01





    timer = 0;

    update() 
    {
        this.timer += Time.deltaTime;

        if (this.timer >= this.trail_transperency_increment) 
        {
            this.timer = 0;
            this.trail_transperency -= this.trail_transperency_interval
            this.gameObject.trail_polygon.alpha = this.trail_transperency;
        }

        if (this.trail_transperency <= 0)
        {
            this.gameObject.destroy();
        }
    }






}
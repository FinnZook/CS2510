class Polygon extends Component {

    fillStyle = "magenta"
    alpha = 1
    points = []

    draw(ctx) {

        ctx.save();
        // ctx.translate(this.transform.position.x, this.transform.position.y);
        // ctx.rotate(this.transform.rotation)
        // ctx.scale(this.transform.scale.x, this.transform.scale.y)

        ctx.globalAlpha = this.alpha;

        ctx.beginPath();
        for (const point of this.points) {
            ctx.lineTo(point.x, point.y);
        }

        ctx.fillStyle = this.fillStyle;
        ctx.fill();

        ctx.restore();
    }
}





